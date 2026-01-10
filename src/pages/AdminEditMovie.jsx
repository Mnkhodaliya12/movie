import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';

// Mock movies source to populate initial values by id
const mockMovies = [
  {
    id: '1',
    title: 'Inception',
    year: 2010,
    status: 'published',
    popularity: 98,
    rating: 8.8,
    overview: 'A thief who steals corporate secrets through dream-sharing technology.',
  },
  {
    id: '2',
    title: 'Interstellar',
    year: 2014,
    status: 'published',
    popularity: 94,
    rating: 8.6,
    overview: 'A team of explorers travel through a wormhole in space.',
  },
];

function AdminEditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = mockMovies.find((m) => m.id === id) || mockMovies[0];

  const [title, setTitle] = useState(existing?.title || '');
  const [year, setYear] = useState(existing?.year?.toString() || '');
  const [status, setStatus] = useState(existing?.status || 'published');
  const [rating, setRating] = useState(existing?.rating?.toString() || '');
  const [popularity, setPopularity] = useState(existing?.popularity?.toString() || '');
  const [overview, setOverview] = useState(existing?.overview || '');

  useEffect(() => {
    if (!existing) return;
    setTitle(existing.title || '');
    setYear(existing.year ? String(existing.year) : '');
    setStatus(existing.status || 'published');
    setRating(existing.rating ? String(existing.rating) : '');
    setPopularity(existing.popularity ? String(existing.popularity) : '');
    setOverview(existing.overview || '');
  }, [existing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    // Simulate save then go back to movies list
    navigate('/admin/movies');
  };

  return (
    <AdminLayout
      title="Edit movie"
      subtitle="Update the details for this movie. This page is frontend-only and does not yet save to a real backend."
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
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                  />
                </div>
              </div>

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
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-full bg-orange-500 px-4 py-2 font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400"
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/movies')}
                    className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-slate-500">
                  This will not hit a real API yet. Wire it to your backend later.
                </p>
              </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminEditMovie;
