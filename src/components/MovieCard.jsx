import { Link } from 'react-router-dom';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';
const PLACEHOLDER_POSTER = 'https://via.placeholder.com/342x513?text=No+Poster';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const posterPath = movie.posterPath || movie.poster_path;
  const posterUrl = posterPath ? IMAGE_BASE + posterPath : PLACEHOLDER_POSTER;

  const year =
    (typeof movie.releaseDate === 'string' && movie.releaseDate.slice(0, 4)) ||
    (typeof movie.release_date === 'string' && movie.release_date.slice(0, 4)) ||
    'N/A';

  const rating =
    (typeof movie.rating === 'number' && movie.rating.toFixed(1)) ||
    (typeof movie.vote_average === 'number' && movie.vote_average.toFixed(1)) ||
    'N/A';

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/movie/${movie.id}`} className="block flex-1">
        <div className="relative overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-64 object-cover transition-transform duration-200 ease-out hover:scale-105"
          />
        </div>
        <div className="p-3 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
              {movie.title}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {year} • Rating: {rating}
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
