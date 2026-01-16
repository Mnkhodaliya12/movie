import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useToast } from '../components/ToastContainer.jsx';
import { createCategory } from '../services/adminCategory';

function AdminAddCategory() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Category name is required');
      showToast('Please enter a category name', 'error', 2000);
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await createCategory({ name: trimmed, description });
      showToast('Category created successfully!', 'success', 2000);
      navigate('/admin/categories');
    } catch (err) {
      const errorMsg = err.message || 'Failed to save category';
      setError(errorMsg);
      showToast(errorMsg, 'error', 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title="Add category"
      subtitle="Create a new category that you can later assign to movies."
    >
      {/* Form */}
      <div className="px-4 py-4 md:px-6 md:py-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700" htmlFor="name">
                  Category name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Horror"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                  required
                />
              </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700" htmlFor="description">
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of what fits in this category."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/70"
                />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting && <LoadingSpinner size="sm" className="text-white" />}
                  <span>{submitting ? 'Saving...' : 'Save category'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/categories')}
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

export default AdminAddCategory;
