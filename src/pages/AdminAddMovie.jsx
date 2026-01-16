import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useToast } from '../components/ToastContainer.jsx';
import { createMovie } from '../services/adminMovies';
import { fetchCategories } from '../services/adminCategory';

function AdminAddMovie() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('published');
  const [rating, setRating] = useState('');
  const [popularity, setPopularity] = useState('');
  const [overview, setOverview] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        const response = await fetchCategories();
        const data = response && response.data ? response.data : [];
        if (isMounted) {
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePosterChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPosterFile(null);
      setPosterPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      showToast('Please enter a movie title', 'error', 2000);
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      title: title.trim(),
      overview: overview.trim(),
      releaseDate: year ? `${year}-01-01` : null,
      rating: rating ? Number(rating) : null,
      popularity: popularity ? Number(popularity) : null,
      status: status.toUpperCase(),
      categoryIds: selectedCategoryIds,
    };

    try {
      await createMovie(payload, posterFile);
      showToast('Movie created successfully!', 'success', 2000);
      navigate('/admin/movies');
    } catch (err) {
      const errorMsg = err.message || 'Failed to create movie';
      setError(errorMsg);
      showToast(errorMsg, 'error', 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title="Add movie"
      subtitle="Create a new movie entry."
    >
      {/* Form */}
      <div className="px-4 py-4 md:px-6 md:py-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="title" className="block text-xs font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Inception"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="year" className="block text-xs font-medium text-slate-700">
                    Year
                  </label>
                  <input
                    id="year"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2010"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="poster" className="block text-xs font-medium text-slate-700">
                  Poster image
                </label>
                <input
                  id="poster"
                  type="file"
                  accept="image/*"
                  onChange={handlePosterChange}
                  className="block w-full text-xs text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-700 hover:file:bg-slate-200"
                />
                {posterPreview && (
                  <div className="mt-2">
                    <img
                      src={posterPreview}
                      alt="Poster preview"
                      className="h-48 w-32 rounded-lg border border-slate-200 object-cover"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label htmlFor="status" className="block text-xs font-medium text-slate-700">
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="rating" className="block text-xs font-medium text-slate-700">
                    Rating (0-10)
                  </label>
                  <input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="8.5"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="popularity" className="block text-xs font-medium text-slate-700">
                    Popularity
                  </label>
                  <input
                    id="popularity"
                    type="number"
                    value={popularity}
                    onChange={(e) => setPopularity(e.target.value)}
                    placeholder="90"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="overview" className="block text-xs font-medium text-slate-700">
                  Overview
                </label>
                <textarea
                  id="overview"
                  rows={4}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Short plot summary or notes for this movie."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                />
              </div>

              <div className="space-y-1.5">
                <span className="block text-xs font-medium text-slate-700">Categories</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {categories.map((cat) => {
                    const checked = selectedCategoryIds.includes(cat.id);
                    return (
                      <label
                        key={cat.id}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-500"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategoryIds((prev) => [...prev, cat.id]);
                            } else {
                              setSelectedCategoryIds((prev) => prev.filter((id) => id !== cat.id));
                            }
                          }}
                        />
                        <span>{cat.name}</span>
                      </label>
                    );
                  })}
                  {categories.length === 0 && (
                    <span className="text-slate-400">No categories found. Create some in the Categories admin page.</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting && <LoadingSpinner size="sm" className="text-white" />}
                    <span>{submitting ? 'Saving...' : 'Save movie'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/movies')}
                    disabled={submitting}
                    className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminAddMovie;
