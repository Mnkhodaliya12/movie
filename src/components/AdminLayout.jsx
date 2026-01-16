import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminLayout({ title, subtitle, children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', to: '/admin', match: '/admin', icon: '🏠' },
    { label: 'Movies', to: '/admin/movies', match: '/admin/movies', icon: '🎬' },
    { label: 'Categories', to: '/admin/categories', match: '/admin/categories', icon: '🏷️' },
  ];

  const isActive = (match) => location.pathname.startsWith(match);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      {/* Sidebar */}
      <aside
        className={
          'hidden md:flex flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-100 shadow-xl transition-all duration-200 ' +
          (collapsed ? 'md:w-20' : 'md:w-72')
        }
      >
        <div
          className={
            'pt-6 pb-5 border-b border-white/5 flex items-center ' +
            (collapsed ? 'justify-center px-3' : 'justify-between px-4')
          }
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 text-sm font-bold shadow-md shadow-orange-500/40">
              MH
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold tracking-tight">Movies Hub</p>
                <p className="text-[0.7rem] text-slate-300/80 tracking-wide">Admin Panel</p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className={
              'flex items-center justify-center rounded-full border text-[0.7rem] transition-colors ' +
              (collapsed
                ? 'ml-2 h-6 w-6 border-slate-600/70 text-slate-300 bg-transparent hover:border-orange-400/80 hover:text-orange-300'
                : 'h-8 w-8 bg-slate-900/60 border-white/10 text-slate-300 hover:bg-slate-900/80 hover:border-orange-400/70 hover:text-orange-300')
            }
          >
            {collapsed ? '⟩' : '≡'}
          </button>
        </div>

        <nav
          className={
            'flex-1 py-5 space-y-4 text-sm overflow-y-auto transition-[padding] duration-200 ' +
            (collapsed ? 'px-2' : 'px-4')
          }
        >
          <div>
            {!collapsed && (
              <p className="px-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500/80">
                Main
              </p>
            )}
            <div className={collapsed ? 'mt-2 space-y-2' : 'mt-3 space-y-1.5'}>
              {navItems.map((item) => {
                const active = isActive(item.match);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={
                      'group flex items-center justify-between rounded-xl px-3 py-2.5 text-[0.86rem] transition-colors ' +
                      (active
                        ? 'bg-white/10 text-white shadow-sm shadow-black/30 border border-white/15'
                        : 'text-slate-200/80 hover:bg-white/5 hover:text-white')
                    }
                  >
                    <span className={collapsed ? 'flex items-center justify-center' : 'flex items-center gap-3'}>
                      <span
                        className={
                          'flex h-8 w-8 items-center justify-center rounded-xl border text-[0.9rem] ' +
                          (active
                            ? 'border-orange-400/80 bg-orange-500/20 text-orange-200'
                            : 'border-slate-600/60 bg-slate-900/70 text-slate-200 group-hover:border-orange-400/80 group-hover:text-orange-200')
                        }
                      >
                        {item.icon}
                      </span>
                      {!collapsed && <span>{item.label}</span>}
                    </span>
                    {!collapsed && (
                      <span
                        className={
                          'text-xs font-semibold transition-colors ' +
                          (active ? 'text-orange-400' : 'text-slate-500 group-hover:text-orange-400')
                        }
                      >
                        ›
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
        {!collapsed && (
          <div className="px-6 py-4 border-t border-white/5 text-[0.7rem] text-slate-400/90 bg-slate-950/80">
            <p className="font-medium text-slate-200/90">Environment</p>
            <p className="mt-1 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
              Production
            </p>
          </div>
        )}
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
          {/* <div className="flex items-center gap-2 text-xs">
            <button className="hidden sm:inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 hover:bg-slate-100">
              Row per page: 10
            </button>
            <button className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400">
              Add New
            </button>
          </div> */}
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
