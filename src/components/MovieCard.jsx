import { Link } from 'react-router-dom';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const posterUrl = movie.poster_path ? IMAGE_BASE + movie.poster_path : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/movie/${movie.id}`} className="block flex-1">
        <div className="relative overflow-hidden">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-64 object-cover transition-transform duration-200 ease-out hover:scale-105"
            />
          ) : (
            <div className="h-64 flex items-center justify-center bg-slate-100 text-slate-400 text-sm">
              No Image
            </div>
          )}
        </div>
        <div className="p-3 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
              {movie.title}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {movie.release_date?.slice(0, 4) || 'N/A'} • Rating: {movie.vote_average?.toFixed(1) || 'N/A'}
          </p>
          <p className="text-xs text-slate-500 line-clamp-3">
            {movie.overview || 'No description available.'}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
