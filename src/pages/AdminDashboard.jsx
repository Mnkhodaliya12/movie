import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout.jsx';
import { fetchMovies } from '../services/adminMovies';
import { fetchCategories } from '../services/adminCategory';
import { loadFavorites } from '../services/favorites';

function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        setLoading(true);
        setError(null);

        const [moviesResponse, categoriesResponse] = await Promise.all([
          fetchMovies(),
          fetchCategories(),
        ]);

        if (!isMounted) return;

        const moviesData = moviesResponse && moviesResponse.data ? moviesResponse.data : [];
        const categoriesData =
          categoriesResponse && categoriesResponse.data ? categoriesResponse.data : [];

        const safeMovies = Array.isArray(moviesData) ? moviesData : [];
        setMovies(safeMovies);
        setMoviesCount(safeMovies.length);
        setCategoriesCount(Array.isArray(categoriesData) ? categoriesData.length : 0);

        const favorites = loadFavorites();
        setFavoritesCount(Array.isArray(favorites) ? favorites.length : 0);

        setLastUpdated(Date.now());
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load dashboard data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  function formatRelativeTime(timestamp) {
    if (!timestamp) return '';
    const diffMs = now - timestamp;
    const diffSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffSeconds < 10) return 'just now';
    if (diffSeconds < 60) return `${diffSeconds} sec ago`;
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} d ago`;
  }

  const stats = [
    { label: 'Total Movies', value: moviesCount.toString(), trend: '' },
    { label: 'Categories', value: categoriesCount.toString(), trend: '' },
    { label: 'Favorites Saved', value: favoritesCount.toString(), trend: '' },
  ];

  const recentActivity = movies
    .slice()
    .filter((m) => m.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)
    .map((movie) => ({
      id: movie.id,
      user: 'Movie',
      action: `"${movie.title}" was added`,
      time: Date.parse(movie.createdAt),
    }));

  const systemHealth = [
    {
      name: 'Backend status',
      value: error ? 'Degraded' : 'Online',
      status: error ? 'Issues detected' : 'Healthy',
    },
    {
      name: 'Movies in catalog',
      value: moviesCount.toString(),
      status: 'OK',
    },
    {
      name: 'Categories configured',
      value: categoriesCount.toString(),
      status: 'OK',
    },
  ];

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Monitor movies, user activity, and system health for the Movies Hub platform."
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="text-xs text-slate-500">Overview of platform metrics</div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button className="rounded-full bg-orange-500 px-4 py-1.5 font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400">
            Add movie
          </button>
          <button className="rounded-full border border-slate-200 px-4 py-1.5 font-medium text-slate-600 hover:bg-slate-50">
            Export data
          </button>
        </div>
      </div>

      {/* Stats and activity in light cards */}
      <div className="space-y-6 px-4 py-4 md:px-6 md:py-5">
        <section className="grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
            >
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {item.value}
              </p>
              {item.trend && (
                <p className="mt-1 text-xs text-emerald-600">
                  {item.trend}
                </p>
              )}
            </div>
          ))}
        </section>

        <section className="grid gap-6 items-start lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Recent activity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Recent activity</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.7rem] text-slate-600">
                {loading ? 'Loading…' : 'Live'}
              </span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {error && !loading && (
                <div className="py-2.5 text-[0.7rem] text-rose-500">
                  {error}
                </div>
              )}
              {!error &&
                recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 py-2.5"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{item.user}</p>
                      <p className="mt-0.5 text-slate-500">{item.action}</p>
                    </div>
                    <p className="whitespace-nowrap text-[0.7rem] text-slate-500">
                      {formatRelativeTime(item.time)}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* System health */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">System health</h2>
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px] shadow-emerald-500/20" />
            </div>
            <ul className="space-y-2 text-xs">
              {systemHealth.map((metric) => (
                <li
                  key={metric.name}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-slate-900">{metric.name}</p>
                    <p className="text-[0.7rem] text-slate-500">{metric.status}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{metric.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
