const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

function MovieDetails({ movie, isFavorite, onToggleFavorite }) {
  if (!movie) return null;

  const posterUrl = movie.poster_path ? IMAGE_BASE + movie.poster_path : null;

  return (
    <section className="movie-details">
      {posterUrl && (
        <img src={posterUrl} alt={movie.title} className="movie-details-poster" />
      )}
      <div className="movie-details-body">
        <div className="movie-details-header">
          <h1>{movie.title}</h1>
          <button
            className={`favorite-btn large ${isFavorite ? 'favorite' : ''}`}
            onClick={() => onToggleFavorite(movie)}
          >
            {isFavorite ? '★ Remove Favorite' : '☆ Add to Favorites'}
          </button>
        </div>
        <p className="movie-details-meta">
          {movie.release_date?.slice(0, 4) || 'N/A'} • Rating: {movie.vote_average?.toFixed(1) || 'N/A'}
        </p>
        {movie.genres && (
          <p className="movie-details-genres">
            Genres: {movie.genres.map((g) => g.name).join(', ')}
          </p>
        )}
        <p className="movie-details-overview">{movie.overview}</p>
      </div>
    </section>
  );
}

export default MovieDetails;
