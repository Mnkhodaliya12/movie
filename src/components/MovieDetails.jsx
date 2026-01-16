const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_POSTER = 'https://via.placeholder.com/500x750?text=No+Poster';

function MovieDetails({ movie, isFavorite, onToggleFavorite }) {
  if (!movie) return null;

  const posterPath = movie.posterPath || movie.poster_path;
  let posterUrl = PLACEHOLDER_POSTER;

  if (posterPath) {
    if (typeof posterPath === 'string' && posterPath.startsWith('/uploads/')) {
      posterUrl = `${API_BASE_URL}${posterPath}`;
    } else {
      posterUrl = TMDB_IMAGE_BASE + posterPath;
    }
  }

  const year =
    (typeof movie.releaseDate === 'string' && movie.releaseDate.slice(0, 4)) ||
    (typeof movie.release_date === 'string' && movie.release_date.slice(0, 4)) ||
    'N/A';

  const rating =
    (typeof movie.rating === 'number' && movie.rating.toFixed(1)) ||
    (typeof movie.vote_average === 'number' && movie.vote_average.toFixed(1)) ||
    'N/A';

  const genres = movie.genres || movie.categories || [];

  return (
    <section className="space-y-6">
      {/* Hero section with backdrop */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start">
          {posterUrl && (
            <div className="flex-shrink-0">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full max-w-[280px] rounded-xl border-2 border-white/20 shadow-2xl md:max-w-[320px]"
              />
            </div>
          )}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {movie.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
                  {year !== 'N/A' && (
                    <span className="flex items-center gap-1">
                      <span>📅</span>
                      {year}
                    </span>
                  )}
                  {rating !== 'N/A' && (
                    <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                      <span className="text-amber-400">⭐</span>
                      {rating}
                    </span>
                  )}
                </div>
              </div>
              <button
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                  isFavorite
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 hover:bg-amber-500/30'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm'
                }`}
                onClick={() => onToggleFavorite(movie)}
              >
                <span className="text-lg">{isFavorite ? '★' : '☆'}</span>
                <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
              </button>
            </div>

            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genres.map((genre, idx) => {
                  const genreName = typeof genre === 'string' ? genre : genre.name;
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm"
                    >
                      {genreName}
                    </span>
                  );
                })}
              </div>
            )}

            {movie.overview && (
              <p className="max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
                {movie.overview}
              </p>
            )}
          </div>
        </div>
        {/* Decorative gradient overlay */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      {/* Additional details section */}
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-900">Release Information</h3>
          <p className="text-sm text-slate-600">
            {year !== 'N/A' ? `Released in ${year}` : 'Release date not available'}
          </p>
        </div>
        {rating !== 'N/A' && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Rating</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-lg font-semibold text-slate-900">{rating}</span>
              <span className="text-sm text-slate-500">/ 10</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MovieDetails;
