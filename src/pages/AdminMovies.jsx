import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';

function AdminMovies() {
  const movies = [
    {
      id: 1,
      title: 'Inception',
      year: 2010,
      status: 'Published',
      popularity: 98,
      rating: 8.8,
    },
    {
      id: 2,
      title: 'Interstellar',
      year: 2014,
      status: 'Published',
      popularity: 94,
      rating: 8.6,
    },
    {
      id: 3,
      title: 'The Dark Knight',
      year: 2008,
      status: 'Featured',
      popularity: 99,
      rating: 9.0,
    },
    {
      id: 4,
      title: 'Dune: Part Two',
      year: 2024,
      status: 'Draft',
      popularity: 87,
      rating: 8.4,
    },
  ];

  return (
    <AdminLayout
      title="Movies"
      subtitle="View and manage the movies available in your catalog. This page uses mock data for now."
    >
      {/* Toolbar inside card */}
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="hidden sm:inline">Showing {movies.length} movies</span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-56">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 pl-8 text-xs text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[0.7rem] text-slate-400">
              🔍
            </span>
          </div>
          <div className="flex gap-2 text-xs">
            <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 hover:bg-slate-100">
              Status
            </button>
            <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 hover:bg-slate-100">
              Sort
            </button>
            <Link
              to="/admin/movies/add"
              className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400"
            >
              + Add movie
            </Link>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-xs sm:text-sm">
        <table className="min-w-full border-t border-slate-200">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="w-10 px-4 py-2 text-left">
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-500" />
              </th>
              <th className="px-4 py-2 text-left font-medium">Title</th>
              <th className="px-4 py-2 text-left font-medium">Year</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-left font-medium">Popularity</th>
              <th className="px-4 py-2 text-left font-medium">Rating</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {movies.map((movie) => (
              <tr key={movie.id} className="hover:bg-slate-50/70">
                <td className="px-4 py-2">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-500" />
                </td>
                <td className="px-4 py-2 text-slate-900 font-medium">{movie.title}</td>
                <td className="px-4 py-2 text-slate-600">{movie.year}</td>
                <td className="px-4 py-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.7rem] font-medium text-emerald-700 ring-1 ring-emerald-100">
                    {movie.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-slate-600">{movie.popularity}</td>
                <td className="px-4 py-2 text-slate-600">{movie.rating}</td>
                <td className="px-4 py-2 text-right">
                  <div className="inline-flex gap-1">
                    <Link
                      to={`/admin/movies/${movie.id}/edit`}
                      className="rounded-full border border-slate-200 px-3 py-1 text-[0.7rem] text-slate-600 hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    <button className="rounded-full border border-rose-200 px-3 py-1 text-[0.7rem] text-rose-500 hover:bg-rose-50">
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminMovies;
