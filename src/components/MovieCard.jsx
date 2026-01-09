import { Link } from 'react-router-dom';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const posterUrl = movie.poster_path ? IMAGE_BASE + movie.poster_path : null;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-card-image-wrapper">
          {posterUrl ? (
            <img src={posterUrl} alt={movie.title} className="movie-card-image" />
          ) : (
            <div className="movie-card-placeholder">No Image</div>
          )}
        </div>
        <div className="movie-card-body">
          <div className="movie-card-header">
            <h3 className="movie-title">{movie.title}</h3>
          </div>
          <p className="movie-meta">
            {movie.release_date?.slice(0, 4) || 'N/A'} • Rating: {movie.vote_average?.toFixed(1) || 'N/A'}
          </p>
          <p className="movie-overview">{movie.overview || 'No description available.'}</p>
        </div>
      </Link>
      
    </div>
  );
}

export default MovieCard;
