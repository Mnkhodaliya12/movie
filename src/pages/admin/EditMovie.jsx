import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Other'];
const GENRES = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Documentary'];

// This would typically come from an API
const getMovieById = (id) => {
  return {
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
  };
};

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    status: 'Draft',
    releaseYear: new Date().getFullYear(),
    releaseDate: '',
    duration: 120,
    rating: 0,
    language: 'English',
    genres: [],
    posterUrl: '',
    trailerUrl: ''
  });

  useEffect(() => {
    // In a real app, you would fetch the movie data from an API
    const movie = getMovieById(id);
    if (movie) {
      setFormData({
        title: movie.title,
        overview: movie.overview,
        status: movie.status,
        releaseYear: movie.releaseYear,
        releaseDate: movie.releaseDate,
        duration: movie.duration,
        rating: movie.rating,
        language: movie.language,
        genres: [...movie.genres],
        posterUrl: movie.posterUrl,
        trailerUrl: movie.trailerUrl
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        genres: checked
          ? [...prev.genres, value]
          : prev.genres.filter(genre => genre !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    console.log('Updating movie:', formData);
    // Simulate API call
    setTimeout(() => {
      alert('Movie updated successfully!');
      navigate('/admin/movies');
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Movie</h1>
        <button 
          onClick={() => navigate('/admin/movies')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back to Movies
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="overview">
                Overview
              </label>
              <textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="releaseYear">
                  Release Year
                </label>
                <input
                  type="number"
                  id="releaseYear"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  min="1900"
                  max="2100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="releaseDate">
                  Release Date
                </label>
                <input
                  type="date"
                  id="releaseDate"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                  Rating (0-10)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  min="0"
                  max="10"
                  step="0.1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Genres
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GENRES.map(genre => (
                  <div key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`genre-${genre}`}
                      name="genres"
                      value={genre}
                      checked={formData.genres.includes(genre)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor={`genre-${genre}`} className="text-sm">
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="posterUrl">
                Poster URL
              </label>
              <input
                type="url"
                id="posterUrl"
                name="posterUrl"
                value={formData.posterUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
              {formData.posterUrl && (
                <div className="mt-2">
                  <img 
                    src={formData.posterUrl} 
                    alt="Movie poster preview" 
                    className="h-40 object-cover rounded"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trailerUrl">
                Trailer URL (YouTube)
              </label>
              <input
                type="url"
                id="trailerUrl"
                name="trailerUrl"
                value={formData.trailerUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/movies')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
