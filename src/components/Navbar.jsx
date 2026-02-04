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

        <nav className="hidden md:flex items-center gap-2">
          {/* <Link
            to="/"
            className={`text-sm px-4 py-2 rounded-full transition-all ${
              location.pathname === '/'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`text-sm px-4 py-2 rounded-full transition-all ${
              location.pathname === '/favorites'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            className={`text-sm px-4 py-2 rounded-full transition-all ${
              location.pathname === '/profile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Profile
          </Link> */}
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 pb-4 border-t border-slate-200 bg-white">
          {showSearch && (
            <div className="mb-3 pt-3">
              <SearchBar onSearch={handleSearch} />
            </div>
          )}
          <nav className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-slate-700 transition-colors ${
                location.pathname === '/' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-slate-700 transition-colors ${
                location.pathname === '/favorites' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-slate-50'
              }`}
            >
              Favorites
            </Link>
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-slate-700 transition-colors ${
                location.pathname === '/profile' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-slate-50'
              }`}
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
