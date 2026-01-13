import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from './SearchBar.jsx';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleSearch = (query) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  const showSearch = location.pathname === '/';

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:bg-slate-100"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link
            to="/"
            className="text-lg font-semibold tracking-wide text-slate-900 hover:text-indigo-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            Movies Hub
          </Link>
        </div>

        <div className="flex-1 hidden md:flex justify-center max-w-xl">
          {showSearch && <SearchBar onSearch={handleSearch} />}
        </div>

        <nav className="hidden md:flex items-center gap-3">
          <Link
            to="/"
            className="text-sm px-3 py-1.5 rounded-full border border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-sm px-3 py-1.5 rounded-full border border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            className="text-sm px-3 py-1.5 rounded-full border border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Profile
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          {showSearch && (
            <div className="mb-3">
              <SearchBar onSearch={handleSearch} />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Link to="/" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-md text-slate-700 bg-slate-50">Home</Link>
            <Link to="/favorites" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-md text-slate-700 hover:bg-slate-50">Favorites</Link>
            <Link to="/profile" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-md text-slate-700 hover:bg-slate-50">Profile</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
