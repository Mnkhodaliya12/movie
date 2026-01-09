import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import MoviePage from './pages/MoviePage.jsx';
import Favorites from './pages/Favorites.jsx';
import AdminLayout from './layout/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminMovies from './pages/admin/AdminMovies.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import EditMovie from './pages/admin/EditMovie.jsx';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? 'app-main app-main-admin' : 'app-main'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="movies" element={<AdminMovies />} />
            <Route path="movies/:id" element={<EditMovie />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
