import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails.jsx';
import ErrorCard from '../components/ErrorCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useToast } from '../components/ToastContainer.jsx';
import { fetchMovieById } from '../services/moviesApi.js';
import { loadFavorites, saveFavorites, toggleFavorite } from '../services/favorites.js';

function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState(loadFavorites());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function fetchMovie() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchMovieById(id);
        if (!active) return;
        setMovie(data);
      } catch (err) {
        if (!active) return;
        setError('Failed to load movie details.');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchMovie();

    return () => {
      active = false;
    };
  }, [id]);

  const { showToast } = useToast();

  const handleToggleFavorite = (movieToToggle) => {
    const wasFavorite = favorites.some((m) => m.id === movieToToggle.id);
    const updated = toggleFavorite(favorites, movieToToggle);
    setFavorites(updated);
    saveFavorites(updated);
    
    if (wasFavorite) {
      showToast(`${movieToToggle.title} removed from favorites`, 'info', 2000);
    } else {
      showToast(`${movieToToggle.title} added to favorites`, 'success', 2000);
    }
  };

  const isFavorite = favorites.some((m) => m.id === movie?.id);

  const handleDownloadPoster = () => {
    if (!movie?.poster_path) return;
    
    const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    const link = document.createElement('a');
    link.href = posterUrl;
    link.download = `${movie.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_poster.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:border-indigo-500"
          onClick={() => {
            if (window.history.length > 2) {
              navigate(-1);
            } else {
              navigate('/');
            }
          }}
        >
          ← Back
        </button>
        {movie?.poster_path && (
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-indigo-500 bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
            onClick={handleDownloadPoster}
            title="Download Poster"
          >
            ↓ Download Poster
          </button>
        )}
      </div>
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-sm text-slate-500">Loading movie details...</p>
        </div>
      )}
      {error && !loading && (
        <ErrorCard
          message={error}
          onRetry={() => {
            setError('');
            setLoading(true);
            fetchMovieById(id)
              .then((data) => {
                setMovie(data);
                setLoading(false);
              })
              .catch((err) => {
                setError('Failed to load movie details.');
                setLoading(false);
              });
          }}
        />
      )}
      {!loading && !error && movie && (
        <MovieDetails movie={movie} isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />
      )}
    </div>
  );
}

export default MoviePage;
