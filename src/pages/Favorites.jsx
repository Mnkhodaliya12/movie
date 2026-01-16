import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { useToast } from '../components/ToastContainer.jsx';
import { loadFavorites, saveFavorites, toggleFavorite } from '../services/favorites.js';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const handleToggleFavorite = (movie) => {
    const updated = toggleFavorite(favorites, movie);
    setFavorites(updated);
    saveFavorites(updated);
    showToast(`${movie.title} removed from favorites`, 'info', 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Your Favorites</h2>
          <p className="mt-1 text-sm text-slate-500">
            Movies you've saved for later viewing
          </p>
        </div>
        {favorites.length > 0 && (
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 ring-1 ring-indigo-100">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}
          </div>
        )}
      </div>
      
      {favorites.length === 0 ? (
        <EmptyState
          icon="⭐"
          title="No favorites yet"
          message="Start building your collection by adding movies you love from the home page."
          action={() => window.location.href = '/'}
          actionLabel="Browse Movies"
        />
      ) : (
        <MovieList movies={favorites} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
      )}
    </div>
  );
}

export default Favorites;
