import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';
const PLACEHOLDER_POSTER = 'https://via.placeholder.com/342x513?text=No+Poster';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
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
  const displayGenres = Array.isArray(genres) ? genres.slice(0, 2) : [];

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Rating badge overlay */}
      {rating !== 'N/A' && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-sm px-2 py-1 text-xs font-semibold text-white shadow-lg">
          <span className="text-amber-400">⭐</span>
          <span>{rating}</span>
        </div>
      )}

      <Link to={`/movie/${movie.id}`} className="block flex-1">
        <div className="relative overflow-hidden aspect-[2/3] bg-slate-100">
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {movie.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{year}</span>
            {rating !== 'N/A' && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="text-amber-500">⭐</span>
                  {rating}
                </span>
              </>
            )}
          </div>
          
          {/* Genre tags */}
          {displayGenres.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {displayGenres.map((genre, idx) => {
                const genreName = typeof genre === 'string' ? genre : genre.name;
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[0.65rem] font-medium text-indigo-700 ring-1 ring-indigo-100"
                  >
                    {genreName}
                  </span>
                );
              })}
            </div>
          )}
          
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {movie.overview || 'No description available.'}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
