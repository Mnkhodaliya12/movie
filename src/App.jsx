import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import MoviePage from './pages/MoviePage.jsx';
import Favorites from './pages/Favorites.jsx';
 

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
            : 'flex-1 w-full pt-4 pb-10 px-5 '
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<Favorites />} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
