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
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          Movies Hub
        </Link>
      </div>
      <div className="navbar-center">{showSearch && <SearchBar onSearch={handleSearch} />}</div>
      <nav className="navbar-right">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
