import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';
import ErrorCard from '../components/ErrorCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { useToast } from '../components/ToastContainer.jsx';
import { fetchMovies, deleteMovie } from '../services/adminMovies';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w92';
const PLACEHOLDER_POSTER = 'https://via.placeholder.com/60x90?text=No+Poster';

function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { showToast } = useToast();

  const [page, setPage] = useState(0);
  const [pageSize] = useState(15);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
   
    let isMounted = true;
    
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchMovies(page, pageSize);
        const { data, pageResult } = response || {};
        if (isMounted) {
          const moviesList = Array.isArray(data) ? data : [];
          setMovies(moviesList);
          setFilteredMovies(moviesList);
          setPageInfo(pageResult || null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load movies');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      isMounted = false;
    };
    
  }, [page, pageSize]);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMovies(movies);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = movies.filter((movie) => {
      const title = (movie.title || '').toLowerCase();
      const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear().toString() : '';
      const categories = Array.isArray(movie.categories)
        ? movie.categories.map((c) => c.name).join(' ').toLowerCase()
        : '';
      
      return title.includes(query) || year.includes(query) || categories.includes(query);
    });
    
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);
  
  const handleRemove = async (id) => {
    try {
      await deleteMovie(id);
      const movie = movies.find((m) => m.id === id);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
      setFilteredMovies((prev) => prev.filter((movie) => movie.id !== id));
      showToast(`${movie?.title || 'Movie'} deleted successfully`, 'success', 2000);
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.message || 'Failed to delete movie');
      showToast('Failed to delete movie', 'error', 3000);
      setDeleteConfirm(null);
    }
  };

  return (
    <AdminLayout
      title="Movies"
      subtitle="View and manage the movies available in your catalog. This page uses mock data for now."
    >
      {/* Toolbar inside card */}
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="hidden sm:inline">
            Showing {filteredMovies.length} movies
          </span>
          {pageInfo && (
            <span className="hidden sm:inline ml-2">
              Page {pageInfo.currentPageNumber} of {pageInfo.totalPages}
            </span>
          )}
          {loading && (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              <span>Loading...</span>
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-56">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 pl-8 text-xs text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[0.7rem] text-slate-400">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <Link
            to="/admin/movies/add"
            className="inline-flex items-center justify-center gap-1 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400 transition-colors"
          >
            <span>+</span>
            <span>Add movie</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-sm text-slate-500">Loading movies...</p>
        </div>
      )}

      {error && !loading && (
        <div className="px-4 py-6 md:px-6">
          <ErrorCard
            message={error}
            onRetry={async () => {
              setError(null);
              setLoading(true);
              try {
                const response = await fetchMovies(page, pageSize);
                const { data, pageResult } = response || {};
                const moviesList = Array.isArray(data) ? data : [];
                setMovies(moviesList);
                setFilteredMovies(moviesList);
                setPageInfo(pageResult || null);
              } catch (err) {
                setError(err.message || 'Failed to load movies');
              } finally {
                setLoading(false);
              }
            }}
          />
        </div>
      )}

      {!loading && !error && filteredMovies.length === 0 && (
        <div className="px-4 py-6 md:px-6">
          <EmptyState
            icon="🎬"
            title={searchQuery ? 'No movies found' : 'No movies yet'}
            message={
              searchQuery
                ? `No movies match "${searchQuery}". Try a different search term.`
                : 'Get started by adding your first movie to the catalog.'
            }
            action={searchQuery ? () => setSearchQuery('') : () => {}}
            actionLabel={searchQuery ? 'Clear Search' : undefined}
          />
        </div>
      )}

      {/* Table - Desktop */}
      {!loading && !error && filteredMovies.length > 0 && (
        <>
          <div className="hidden md:block overflow-x-auto text-xs sm:text-sm">
            <table className="min-w-full border-t border-slate-200">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Poster</th>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Year</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Categories</th>
                  <th className="px-4 py-3 text-left font-medium">Rating</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMovies.map((movie) => {
              const posterPath = movie.posterPath || movie.poster_path;
              let posterUrl = PLACEHOLDER_POSTER;

              if (posterPath) {
                if (typeof posterPath === 'string' && posterPath.startsWith('/uploads/')) {
                  posterUrl = `${API_BASE_URL}${posterPath}`;
                } else {
                  posterUrl = TMDB_IMAGE_BASE + posterPath;
                }
              }

                  return (
                    <tr key={movie.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3">
                        <img
                          src={posterUrl}
                          alt={movie.title}
                          className="h-16 w-11 rounded border border-slate-200 object-cover bg-slate-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{movie.title}</div>
                        {movie.overview && (
                          <div className="mt-1 text-xs text-slate-500 line-clamp-1">{movie.overview}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ring-1 ${
                          movie.status === 'PUBLISHED' || movie.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
                            : movie.status === 'DRAFT' || movie.status === 'draft'
                            ? 'bg-amber-50 text-amber-700 ring-amber-100'
                            : 'bg-indigo-50 text-indigo-700 ring-indigo-100'
                        }`}>
                          {movie.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {Array.isArray(movie.categories) && movie.categories.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {movie.categories.slice(0, 2).map((c, idx) => (
                              <span key={idx} className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[0.65rem] font-medium text-indigo-700 ring-1 ring-indigo-100">
                                {c.name}
                              </span>
                            ))}
                            {movie.categories.length > 2 && (
                              <span className="text-[0.65rem] text-slate-500">+{movie.categories.length - 2}</span>
                            )}
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {movie.rating ? (
                          <span className="flex items-center gap-1">
                            <span className="text-amber-500">⭐</span>
                            {movie.rating}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-2">
                          <Link
                            to={`/admin/movies/${movie.id}/edit`}
                            className="rounded-full border border-slate-200 px-3 py-1.5 text-[0.7rem] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm({ id: movie.id, title: movie.title })}
                            className="rounded-full border border-rose-200 px-3 py-1.5 text-[0.7rem] font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3 px-4 py-4">
            {filteredMovies.map((movie) => {
              const posterPath = movie.posterPath || movie.poster_path;
              let posterUrl = PLACEHOLDER_POSTER;

              if (posterPath) {
                if (typeof posterPath === 'string' && posterPath.startsWith('/uploads/')) {
                  posterUrl = `${API_BASE_URL}${posterPath}`;
                } else {
                  posterUrl = TMDB_IMAGE_BASE + posterPath;
                }
              }

              return (
                <div key={movie.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex gap-4">
                    <img
                      src={posterUrl}
                      alt={movie.title}
                      className="h-20 w-14 flex-shrink-0 rounded border border-slate-200 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">{movie.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        {movie.releaseDate && (
                          <span>{new Date(movie.releaseDate).getFullYear()}</span>
                        )}
                        {movie.rating && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span>⭐</span>
                              {movie.rating}
                            </span>
                          </>
                        )}
                      </div>
                      {Array.isArray(movie.categories) && movie.categories.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {movie.categories.slice(0, 2).map((c, idx) => (
                            <span key={idx} className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[0.65rem] font-medium text-indigo-700">
                              {c.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 flex gap-2">
                        <Link
                          to={`/admin/movies/${movie.id}/edit`}
                          className="flex-1 rounded-full border border-slate-200 px-3 py-1.5 text-center text-xs font-medium text-slate-600 hover:bg-slate-50"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm({ id: movie.id, title: movie.title })}
                          className="flex-1 rounded-full border border-rose-200 px-3 py-1.5 text-center text-xs font-medium text-rose-600 hover:bg-rose-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {!loading && !error && pageInfo && pageInfo.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 px-4 py-4 text-xs text-slate-700">
          <button
            type="button"
            className="rounded-full bg-slate-100 px-4 py-1.5 font-medium ring-1 ring-slate-300 disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page <= 0}
          >
            Previous
          </button>
          <span>
            Page {pageInfo.currentPageNumber} of {pageInfo.totalPages}
          </span>
          <button
            type="button"
            className="rounded-full bg-slate-100 px-4 py-1.5 font-medium ring-1 ring-slate-300 disabled:opacity-50"
            onClick={() =>
              setPage((prev) =>
                pageInfo && pageInfo.totalPages ? Math.min(prev + 1, pageInfo.totalPages - 1) : prev + 1
              )
            }
            disabled={pageInfo && pageInfo.totalPages ? page >= pageInfo.totalPages - 1 : false}
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleRemove(deleteConfirm?.id)}
        title="Delete Movie"
        message={`Are you sure you want to delete "${deleteConfirm?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </AdminLayout>
  );
}

export default AdminMovies;
