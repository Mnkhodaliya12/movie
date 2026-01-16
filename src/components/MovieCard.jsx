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

  return (
    <div className="relative bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      {/* Favorite toggle placed outside the Link to avoid navigation when toggling */}
      {typeof onToggleFavorite === 'function' && (
        <button
          type="button"
          aria-pressed={!!isFavorite}
          aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onToggleFavorite(movie);
          }}
          className="absolute top-3 right-3 z-0 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/90 text-amber-500 border border-slate-200 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className="text-lg">{isFavorite ? '★' : '☆'}</span>
        </button>
      )}

      <Link to={`/movie/${movie.id}`} className="block flex-1">
        <div className="relative overflow-hidden aspect-[2/3]">
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-200 ease-out hover:scale-105"
          />
        </div>
        <div className="p-1 space-y-0.5">
          <div className="flex items-start justify-between gap-1">
            <h3 className="text-xs font-semibold text-slate-900 line-clamp-1">
              {movie.title}
            </h3>
          </div>
          <p className="text-[0.7rem] text-slate-500">
            {year} • Rating: {rating}
          </p>
          <p className="text-[0.7rem] text-slate-500 line-clamp-2">
            {movie.overview || 'No description available.'}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
