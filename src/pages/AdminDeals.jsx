import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useToast } from '../components/ToastContainer.jsx';
import { fetchMovies } from '../services/adminMovies';
import { fetchDeals, createDeal, deleteDeal } from '../services/adminDeals';

function AdminDeals() {
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingDeals, setLoadingDeals] = useState(true);
  const [deals, setDeals] = useState([]);
  const [title, setTitle] = useState('');
  const [movieId, setMovieId] = useState('');
  const [badgeColor, setBadgeColor] = useState('orange');
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    async function loadMovies() {
      try {
        setLoadingMovies(true);
        const response = await fetchMovies();
        const data = response && response.data ? response.data : [];
        if (isMounted) {
          setMovies(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to load movies for deals', err);
      } finally {
        if (isMounted) {
          setLoadingMovies(false);
        }
      }
    }

    async function loadDeals() {
      try {
        setLoadingDeals(true);
        const response = await fetchDeals();
        const data = response && response.data ? response.data : [];
        if (isMounted) {
          setDeals(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to load deals', err);
      } finally {
        if (isMounted) {
          setLoadingDeals(false);
        }
      }
    }

    loadMovies();
    loadDeals();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddDeal = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a deal title', 'error', 2000);
      return;
    }
    if (!movieId) {
      showToast('Please choose a movie', 'error', 2000);
      return;
    }

    setSubmitting(true);

    const payload = {
      title: title.trim(),
      movieId: Number(movieId),
      badgeColor,
      active: isActive,
    };

    try {
      const response = await createDeal(payload);
      const createdDeal = response && response.data ? response.data : response;

      setDeals((prev) => [createdDeal, ...prev]);
      setTitle('');
      setMovieId('');
      setBadgeColor('orange');
      setIsActive(true);
      showToast('Deal created successfully', 'success', 2000);
    } catch (err) {
      showToast(err.message || 'Failed to create deal', 'error', 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveDeal = async (id) => {
    try {
      await deleteDeal(id);
      setDeals((prev) => prev.filter((d) => d.id !== id));
      showToast('Deal removed', 'success', 1500);
    } catch (err) {
      showToast(err.message || 'Failed to delete deal', 'error', 3000);
    }
  };

  return (
    <AdminLayout
      title="Deals / Trending Movies"
      subtitle="Create promotional deals highlighting trending movies. These deals are stored in the backend."
    >
      <div className="px-4 py-4 md:px-6 md:py-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
          {/* Add Deal Form */}
          <form onSubmit={handleAddDeal} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="deal-title" className="block text-xs font-medium text-slate-700">
                  Deal title
                </label>
                <input
                  id="deal-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Trending Now, Hot Deal, Editor's Pick..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="deal-movie" className="block text-xs font-medium text-slate-700">
                  Movie
                </label>
                <select
                  id="deal-movie"
                  value={movieId}
                  onChange={(e) => setMovieId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                >
                  <option value="">Select movie</option>
                  {movies.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
                {loadingMovies && (
                  <div className="mt-1 flex items-center gap-2 text-[0.7rem] text-slate-500">
                    <LoadingSpinner size="xs" />
                    <span>Loading movies...</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1.5">
                <label htmlFor="badge-color" className="block text-xs font-medium text-slate-700">
                  Badge color
                </label>
                <select
                  id="badge-color"
                  value={badgeColor}
                  onChange={(e) => setBadgeColor(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                >
                  <option value="orange">Orange</option>
                  <option value="indigo">Indigo</option>
                  <option value="emerald">Emerald</option>
                  <option value="rose">Rose</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  id="deal-active"
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-500"
                />
                <label htmlFor="deal-active" className="text-xs font-medium text-slate-700">
                  Active deal
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 text-xs">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting && <LoadingSpinner size="sm" className="text-white" />}
                <span>{submitting ? 'Saving...' : 'Add deal'}</span>
              </button>
            </div>
          </form>

          {/* Deals list */}
          <div className="pt-4 border-t border-slate-200">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Current deals</h2>
            {loadingDeals ? (
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <span>Loading deals...</span>
              </div>
            ) : deals.length === 0 ? (
              <p className="text-xs text-slate-500">No deals added yet. Use the form above to create one.</p>
            ) : (
              <div className="overflow-x-auto text-xs sm:text-sm">
                <table className="min-w-full border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Deal</th>
                      <th className="px-3 py-2 text-left font-medium">Movie</th>
                      <th className="px-3 py-2 text-left font-medium">Status</th>
                      <th className="px-3 py-2 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {deals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-3 py-2">
                          <div className="font-medium text-slate-900">{deal.title}</div>
                          <div className="mt-0.5 text-[0.7rem] text-slate-500">
                            Created {new Date(deal.createdAt).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-slate-700">{deal.movie?.title || deal.movieTitle}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ring-1 ${
                              (deal.active ?? deal.isActive)
                                ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
                                : 'bg-slate-50 text-slate-500 ring-slate-100'
                            }`}
                          >
                            {(deal.active ?? deal.isActive) ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveDeal(deal.id)}
                            className="rounded-full border border-rose-200 px-3 py-1.5 text-[0.7rem] font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminDeals;
