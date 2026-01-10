const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

function MovieDetails({ movie, isFavorite, onToggleFavorite }) {
  if (!movie) return null;

  const posterUrl = movie.poster_path ? IMAGE_BASE + movie.poster_path : null;

  return (
    <section className="flex flex-col gap-6 md:flex-row">
      {posterUrl && (
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full max-w-xs rounded-xl border border-slate-200 shadow-sm"
        />
      )}
      <div className="flex-1 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-slate-900">
            {movie.title}
          </h1>
          <button
            className={`inline-flex items-center gap-1 rounded-full border text-sm font-medium px-4 py-2 transition-colors ${
              isFavorite
                ? 'bg-amber-400/10 text-amber-600 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            onClick={() => onToggleFavorite(movie)}
          >
            <span>{isFavorite ? '★' : '☆'}</span>
            <span>{isFavorite ? 'Remove Favorite' : 'Add to Favorites'}</span>
          </button>
        </div>
        <p className="text-sm text-slate-500">
          {movie.release_date?.slice(0, 4) || 'N/A'} • Rating: {movie.vote_average?.toFixed(1) || 'N/A'}
        </p>
        {movie.genres && (
          <p className="text-sm text-slate-500">
            Genres: {movie.genres.map((g) => g.name).join(', ')}
          </p>
        )}
        <p className="text-sm leading-relaxed text-slate-700">
          {movie.overview}
        </p>
      </div>
    </section>
  );
}

export default MovieDetails;
