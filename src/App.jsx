import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import MoviePage from './pages/MoviePage.jsx';
import Favorites from './pages/Favorites.jsx';
import Profile from './pages/Profile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminMovies from './pages/AdminMovies.jsx';
import AdminCategories from './pages/AdminCategories.jsx';
import AdminAddCategory from './pages/AdminAddCategory.jsx';
import AdminAddMovie from './pages/AdminAddMovie.jsx';
import AdminEditMovie from './pages/AdminEditMovie.jsx';
 

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {!isAdminRoute && <Navbar />}
      <main
        className={
          isAdminRoute
            ? 'flex-1'
            : 'flex-1 w-full px-5 pt-4 md:pt-6 pb-10'
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/movies" element={<AdminMovies />} />
          <Route path="/admin/movies/add" element={<AdminAddMovie />} />
          <Route path="/admin/movies/:id/edit" element={<AdminEditMovie />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/categories/add" element={<AdminAddCategory />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
