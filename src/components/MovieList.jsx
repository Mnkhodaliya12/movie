import MovieCard from './MovieCard.jsx';

function MovieList({ movies, favorites, onToggleFavorite }) {
  if (!movies || movies.length === 0) {
    return <p className="empty-state">No movies to display.</p>;
  }

  const favoriteIds = new Set(favorites.map((m) => m.id));

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favoriteIds.has(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MovieList;
