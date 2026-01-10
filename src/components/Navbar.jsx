import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  const showSearch = location.pathname === '/';

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-3 bg-white/80 backdrop-blur border-b border-slate-200/80 shadow-sm">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-lg font-semibold tracking-wide text-slate-900 hover:text-indigo-600 transition-colors"
        >
          Movies Hub
        </Link>
      </div>

      <div className="flex-1 flex justify-center max-w-xl">
        {showSearch && <SearchBar onSearch={handleSearch} />}
      </div>

      <nav className="flex items-center gap-3">
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
    </header>
  );
}

export default Navbar;
