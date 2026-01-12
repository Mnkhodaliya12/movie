import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';
import { fetchCategories, deleteCategory } from '../services/adminCategory';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setSuccess('Category deleted successfully');
      setError(null);
    } catch (err) {
      // When delete fails (e.g., category is in use), show a clear message
      setError('Category can\'t be deleted');
      setSuccess(null);
    }
  };

  return (
    <AdminLayout
      title="Categories"
      subtitle="Add, rename, or remove categories."
    >
      {/* Add category entry point */}
      <div className="space-y-6 px-4 py-4 md:px-6 md:py-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
            <span>{categories.length} categories</span>
            <div className="flex items-center gap-3">
              {loading && <span>Loading...</span>}
              {success && !loading && (
                <span className="text-emerald-600">{success}</span>
              )}
              {error && !loading && (
                <span className="text-rose-500">{error}</span>
              )}
            </div>
          </div>
          <ul className="divide-y divide-slate-100 text-xs sm:text-sm">
            {categories.map((cat) => (
              <li key={cat.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-[0.7rem] font-semibold text-indigo-700">
                    {cat.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">{cat.name}</p>
                    {cat.movies !== undefined && (
                      <p className="text-[0.7rem] text-slate-500">{cat.movies} movies</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(cat.id)}
                  className="rounded-full border border-rose-200 px-3 py-1 text-[0.7rem] text-rose-500 hover:bg-rose-50"
                >
                  Remove
                </button>
              </li>
            ))}
            {categories.length === 0 && (
              <li className="py-6 text-center text-xs text-slate-500">
                No categories yet. Add your first category above.
              </li>
            )}
          </ul>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminCategories;
