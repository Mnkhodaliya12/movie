import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminLayout({ title, subtitle, children }) {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', to: '/admin', match: '/admin' },
    { label: 'Movies', to: '/admin/movies', match: '/admin/movies' },
    { label: 'Categories', to: '/admin/categories', match: '/admin/categories' },
  ];

  const isActive = (match) => location.pathname.startsWith(match);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-slate-900 text-slate-100">
        <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold">
            MH
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">Movies Hub</p>
            <p className="text-[0.7rem] text-slate-400">Admin</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                'flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ' +
                (isActive(item.match)
                  ? 'bg-slate-800 text-slate-50'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-50')
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-slate-800 text-[0.7rem] text-slate-400">
          <p className="font-medium text-slate-300">Environment</p>
          <p className="mt-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Production
          </p>
        </div>
      </aside>

      {/* Right column: top bar + content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 md:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="font-medium text-slate-900">Admin Panel</span>
            <span className="hidden sm:inline">/</span>
            <span className="hidden sm:inline text-slate-400">{title}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="hidden sm:inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 hover:bg-slate-100">
              Row per page: 10
            </button>
            <button className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400">
              Add New
            </button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 px-4 py-5 md:px-8 md:py-7">
          <div className="mx-auto max-w-6xl space-y-4">
            {/* Page header inside card */}
            {(title || subtitle) && (
              <div className="rounded-t-2xl border border-b-0 border-slate-200 bg-white px-4 py-4 md:px-6 md:py-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                      {title}
                    </h1>
                    {subtitle && (
                      <p className="mt-1 text-xs text-slate-500 md:text-sm">{subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Card body */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
