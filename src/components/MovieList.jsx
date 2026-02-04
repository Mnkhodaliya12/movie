import MovieCard from './MovieCard.jsx';

function MovieList({ movies, favorites, onToggleFavorite }) {
  if (!movies || movies.length === 0) {
    return (
      <p className="mt-6 text-sm text-slate-500 text-center">
        No movies to display.
      </p>
    );
  }

  const favoriteIds = new Set(favorites.map((m) => m.id));

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
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
