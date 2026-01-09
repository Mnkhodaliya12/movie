import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails.jsx';
import { getMovieDetails } from '../services/moviesApi.js';
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
        const data = await getMovieDetails(id);
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

  const handleToggleFavorite = (movieToToggle) => {
    const updated = toggleFavorite(favorites, movieToToggle);
    setFavorites(updated);
    saveFavorites(updated);
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
    <div className="page">
      <div className="action-buttons">
        <button
          type="button"
          className="back-button"
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
            className="download-button"
            onClick={handleDownloadPoster}
            title="Download Poster"
          >
            ↓ Download Poster
          </button>
        )}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && movie && (
        <MovieDetails movie={movie} isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />
      )}
    </div>
  );
}

export default MoviePage;
