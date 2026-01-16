import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';
import ErrorCard from '../components/ErrorCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { useToast } from '../components/ToastContainer.jsx';
import { fetchCategories, deleteCategory } from '../services/adminCategory';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchCategories();
        const data = response && response.data ? response.data : [];
        if (isMounted) {
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load categories');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemove = async (id) => {
    try {
      await deleteCategory(id);
      const category = categories.find((c) => c.id === id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      showToast(`${category?.name || 'Category'} deleted successfully`, 'success', 2000);
      setDeleteConfirm(null);
    } catch (err) {
      showToast(err.message || 'Category cannot be deleted (may be in use)', 'error', 3000);
      setDeleteConfirm(null);
    }
  };

  return (
    <AdminLayout
      title="Categories"
      subtitle="Add, rename, or remove categories."
    >
      {/* Add category entry point */}
      <div className="space-y-6 px-4 py-4 md:px-6 md:py-5 bg-slate-50/60 rounded-b-2xl">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Add new category</h2>
              <p className="mt-1 text-xs text-slate-500">
                Use the dedicated form page to create a new category.
              </p>
            </div>
            <Link
              to="/admin/categories/add"
              className="rounded-full bg-orange-500 px-4 py-2 text-xs font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400"
            >
              Add
            </Link>
          </div>
        </section>

        {/* Categories list */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{categories.length} categories</span>
            </span>
            {loading && (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <span>Loading…</span>
              </span>
            )}
          </div>

          {error && !loading && (
            <div className="mb-4">
              <ErrorCard
                message={error}
                onRetry={async () => {
                  setError(null);
                  setLoading(true);
                  try {
                    const response = await fetchCategories();
                    const data = response && response.data ? response.data : [];
                    setCategories(Array.isArray(data) ? data : []);
                  } catch (err) {
                    setError(err.message || 'Failed to load categories');
                  } finally {
                    setLoading(false);
                  }
                }}
              />
            </div>
          )}

          {!loading && !error && categories.length === 0 && (
            <EmptyState
              icon="🏷️"
              title="No categories yet"
              message="Create your first category to organize movies."
              action={() => {}}
              actionLabel={undefined}
            />
          )}

          {!loading && categories.length > 0 && (
            <ul className="divide-y divide-slate-100 text-xs sm:text-sm">
              {categories.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center justify-between gap-3 py-2.5 sm:py-3 px-1 -mx-1 rounded-xl transition-colors hover:bg-slate-50/80"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-[0.7rem] font-semibold text-indigo-700 ring-1 ring-indigo-100">
                    {cat.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">{cat.name}</p>
                    {cat.description && (
                      <p className="text-[0.7rem] text-slate-500">{cat.description}</p>
                    )}
                    {cat.movies !== undefined && (
                      <p className="mt-0.5 text-[0.7rem] text-slate-500">
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5">
                          <span className="h-1 w-1 rounded-full bg-slate-400" />
                          <span>{cat.movies} movies</span>
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/categories/${cat.id}/edit`}
                    className="rounded-full border border-slate-200 px-3 py-1 text-[0.7rem] text-slate-600 hover:bg-slate-50"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm({ id: cat.id, name: cat.name })}
                    className="rounded-full border border-rose-200 px-3 py-1 text-[0.7rem] text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </li>
              ))}
            </ul>
          )}
        </section>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={() => handleRemove(deleteConfirm?.id)}
          title="Delete Category"
          message={`Are you sure you want to delete "${deleteConfirm?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
        />
      </div>
    </AdminLayout>
  );
}

export default AdminCategories;
