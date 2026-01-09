import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Other'];
const GENRES = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Documentary'];

const STATIC_MOVIES = [
  {
    id: 1,
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    status: 'Published',
    releaseYear: 2010,
    releaseDate: '2010-07-16',
    duration: 148,
    rating: 8.8,
    language: 'English',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0'
  },
  {
    id: 2,
    title: 'Interstellar',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    status: 'Published',
    releaseYear: 2014,
    releaseDate: '2014-11-07',
    duration: 169,
    rating: 8.6,
    language: 'English',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E'
  },
  {
    id: 3,
    title: 'Dune',
    overview: 'Feature adaptation of Frank Herbert\'s science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.',
    status: 'Published',
    releaseYear: 2021,
    releaseDate: '2021-10-22',
    duration: 155,
    rating: 8.1,
    language: 'English',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/embed/8g18jFHCLXk'
  },
];

function AdminMovies() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [movies, setMovies] = useState(STATIC_MOVIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    overview: '',
    releaseYear: new Date().getFullYear(),
    releaseDate: new Date().toISOString().split('T')[0],
    duration: 120,
    rating: '',
    status: 'Published',
    language: 'English',
    genres: [],
    posterUrl: '',
    trailerUrl: ''
  });

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ? true : movie.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesQuery && matchesStatus;
    });
  }, [movies, query, statusFilter]);

  const handleOpenAdd = () => {
    setShowAddModal(true);
  };

  const handleCloseAdd = () => {
    setShowAddModal(false);
    setNewMovie({
      title: '',
      overview: '',
      releaseYear: new Date().getFullYear(),
      releaseDate: new Date().toISOString().split('T')[0],
      duration: 120,
      rating: '',
      status: 'Published',
      language: 'English',
      genres: [],
      posterUrl: '',
      trailerUrl: ''
    });
  };

  const handleGenreToggle = (genre) => {
    setNewMovie(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleChangeField = (field, value) => {
    setNewMovie((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitNewMovie = (e) => {
    e.preventDefault();
    if (!newMovie.title.trim()) return;

    const nextId = movies.length ? Math.max(...movies.map((m) => m.id)) + 1 : 1;
    const movieToAdd = {
      id: nextId,
      title: newMovie.title.trim(),
      overview: newMovie.overview,
      releaseYear: Number(newMovie.releaseYear) || new Date().getFullYear(),
      releaseDate: newMovie.releaseDate,
      duration: Number(newMovie.duration) || 120,
      rating: Number(newMovie.rating) || 0,
      status: newMovie.status || 'Published',
      language: newMovie.language || 'English',
      genres: [...newMovie.genres],
      posterUrl: newMovie.posterUrl,
      trailerUrl: newMovie.trailerUrl
    };

    setMovies((prev) => [...prev, movieToAdd]);
    handleCloseAdd();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Movies</h2>
        <button className="admin-button" onClick={handleOpenAdd}>
          + Add Movie
        </button>
      </div>
      <div className="admin-toolbar">
        <div className="admin-search">
          <input
            type="text"
            placeholder="Search by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="admin-filter-chips">
          <button
            type="button"
            className={`admin-chip ${statusFilter === 'all' ? 'admin-chip-active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`admin-chip ${statusFilter === 'Published' ? 'admin-chip-active' : ''}`}
            onClick={() => setStatusFilter('Published')}
          >
            Published
          </button>
          <button
            type="button"
            className={`admin-chip ${statusFilter === 'Draft' ? 'admin-chip-active' : ''}`}
            onClick={() => setStatusFilter('Draft')}
          >
            Draft
          </button>
        </div>
      </div>
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Poster</th>
              <th>Title</th>
              <th>Genres</th>
              <th>Status</th>
              <th>Year</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>
                  {movie.posterUrl && (
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title} 
                      style={{ width: '50px', height: '75px', objectFit: 'cover', borderRadius: '4px' }}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                </td>
                <td>
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-language">{movie.language}</div>
                </td>
                <td>
                  <div className="movie-genres">
                    {movie.genres.map(genre => (
                      <span key={genre} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={`admin-badge admin-badge-${movie.status.toLowerCase()}`}>
                    {movie.status}
                  </span>
                </td>
                <td>{movie.releaseYear}</td>
                <td>{movie.rating}</td>
                <td className="admin-actions">
                  <button 
                    className="admin-action-button"
                    onClick={() => navigate(`/admin/movies/${movie.id}`)}
                    title="Edit movie"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button 
                    className="admin-action-button admin-action-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this movie?')) {
                        // In a real app, you would call an API to delete the movie
                        console.log('Deleting movie:', movie.id);
                      }
                    }}
                    title="Delete movie"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={handleCloseAdd}>
          <div className="admin-modal admin-modal-wide" onClick={(e) => e.stopPropagation()}>
            <h3 className="admin-modal-title">Add New Movie</h3>
            <form className="admin-modal-form" onSubmit={handleSubmitNewMovie}>
              <div className="admin-form-grid">
                <div className="admin-form-column">
                  <label className="admin-field">
                    <span>Title *</span>
                    <input
                      type="text"
                      value={newMovie.title}
                      onChange={(e) => handleChangeField('title', e.target.value)}
                      required
                      placeholder="Movie title"
                    />
                  </label>

                  <label className="admin-field">
                    <span>Overview</span>
                    <textarea
                      value={newMovie.overview}
                      onChange={(e) => handleChangeField('overview', e.target.value)}
                      rows={4}
                      placeholder="Brief movie description"
                    />
                  </label>

                  <label className="admin-field">
                    <span>Release Date</span>
                    <input
                      type="date"
                      value={newMovie.releaseDate}
                      onChange={(e) => handleChangeField('releaseDate', e.target.value)}
                    />
                  </label>

                  <div className="admin-field-group">
                    <label className="admin-field" style={{ flex: 1 }}>
                      <span>Duration (minutes)</span>
                      <input
                        type="number"
                        min="1"
                        value={newMovie.duration}
                        onChange={(e) => handleChangeField('duration', e.target.value)}
                      />
                    </label>

                    <label className="admin-field" style={{ flex: 1 }}>
                      <span>Rating (0-10)</span>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={newMovie.rating}
                        onChange={(e) => handleChangeField('rating', e.target.value)}
                        placeholder="0.0"
                      />
                    </label>
                  </div>

                  <label className="admin-field">
                    <span>Language</span>
                    <select
                      value={newMovie.language}
                      onChange={(e) => handleChangeField('language', e.target.value)}
                    >
                      {LANGUAGES.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="admin-form-column">
                  <label className="admin-field">
                    <span>Genres</span>
                    <div className="admin-genre-tags">
                      {GENRES.map(genre => (
                        <button
                          key={genre}
                          type="button"
                          className={`admin-tag ${newMovie.genres.includes(genre) ? 'active' : ''}`}
                          onClick={() => handleGenreToggle(genre)}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  </label>

                  <label className="admin-field">
                    <span>Poster URL</span>
                    <input
                      type="url"
                      value={newMovie.posterUrl}
                      onChange={(e) => handleChangeField('posterUrl', e.target.value)}
                      placeholder="https://example.com/poster.jpg"
                    />
                    {newMovie.posterUrl && (
                      <div className="admin-image-preview">
                        <img src={newMovie.posterUrl} alt="Poster preview" onError={(e) => e.target.style.display = 'none'} />
                      </div>
                    )}
                  </label>

                  <label className="admin-field">
                    <span>Trailer URL (YouTube)</span>
                    <input
                      type="url"
                      value={newMovie.trailerUrl}
                      onChange={(e) => handleChangeField('trailerUrl', e.target.value)}
                      placeholder="https://youtube.com/embed/..."
                    />
                  </label>

                  <label className="admin-field">
                    <span>Status</span>
                    <select
                      value={newMovie.status}
                      onChange={(e) => handleChangeField('status', e.target.value)}
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-button-outline" onClick={handleCloseAdd}>
                  Cancel
                </button>
                <button type="submit" className="admin-button">
                  Save Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMovies;
