import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList.jsx';
import { loadFavorites, saveFavorites, toggleFavorite } from '../services/favorites.js';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const handleToggleFavorite = (movie) => {
    const updated = toggleFavorite(favorites, movie);
    setFavorites(updated);
    saveFavorites(updated);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Your Favorites</h2>
      </div>
      <MovieList movies={favorites} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
}

export default Favorites;
