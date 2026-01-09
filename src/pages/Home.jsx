import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList.jsx';
import Categories from '../components/Categories.jsx';
import { getPopularMovies, searchMovies } from '../services/moviesApi.js';
import { loadFavorites, saveFavorites, toggleFavorite } from '../services/favorites.js';

function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(loadFavorites());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('Popular Movies');

  useEffect(() => {
    let active = true;

    async function fetchData() {
      setLoading(true);
      setError('');

      try {
        if (query) {
          setTitle(`Search results for "${query}"`);
          const data = await searchMovies(query);
          if (!active) return;
          setMovies(data.results || []);
        } else {
          setTitle('Popular Movies');
          const data = await getPopularMovies();
          if (!active) return;
          setMovies(data.results || []);
        }
      } catch (err) {
        if (!active) return;
        setError('Failed to load movies. Check your network or API key.');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, [query]);

  const handleToggleFavorite = (movie) => {
    const updated = toggleFavorite(favorites, movie);
    setFavorites(updated);
    saveFavorites(updated);
  };

  // Filter movies by category if a category is selected
  const selectedCategory = searchParams.get('category') || 'all';
  
  const filteredMovies = selectedCategory === 'all' 
    ? movies 
    : movies.filter(movie => 
        movie.genres?.some(genre => 
          genre.name.toLowerCase() === selectedCategory.toLowerCase() ||
          genre.name.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );

  return (
    <div className="page">
      <div className="page-header">
        <h2>{title}</h2>
      </div>
      <Categories />
      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && (
        <MovieList 
          movies={filteredMovies} 
          favorites={favorites} 
          onToggleFavorite={handleToggleFavorite} 
        />
      )}
      {!loading && filteredMovies.length === 0 && (
        <p className="empty-state">No movies found in this category.</p>
      )}
    </div>
  );
}

export default Home;
