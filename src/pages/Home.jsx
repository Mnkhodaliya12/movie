import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList.jsx';
import Categories from '../components/Categories.jsx';
import SkeletonCard from '../components/SkeletonCard.jsx';
import ErrorCard from '../components/ErrorCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useToast } from '../components/ToastContainer.jsx';
import { fetchMovies, searchMovies, fetchCategories } from '../services/moviesApi.js';
import { loadFavorites, saveFavorites, toggleFavorite } from '../services/favorites.js';

function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState(loadFavorites());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('Popular Movies');

  // Load movies (and handle search)
  useEffect(() => {
    let active = true;

    async function fetchData() {
      setLoading(true);
      setError('');

      try {
        if (query) {
          setTitle(`Search results for "${query}"`);
          const data = await searchMovies(query);
          if (!active) return;
          const list = Array.isArray(data) ? data : data.results || data.content || [];
          setMovies(list);
        } else {
          setTitle('Popular Movies');
          const data = await fetchMovies();
          if (!active) return;
          const list = Array.isArray(data) ? data : data.results || data.content || [];
          setMovies(list);
        }
      } catch (err) {
        if (!active) return;
        setError('Failed to load movies. Check your network or API key.');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, [query]);

  // Load categories from backend for homepage filters
  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        const data = await fetchCategories();
        if (!active) return;
        const list = Array.isArray(data) ? data : data.results || data.content || [];
        setCategories(list);
      } catch (err) {
        // For now just log; UI falls back to static categories component behavior
        console.error('Failed to load categories', err);
      }
    }

    loadCategories();

    return () => {
      active = false;
    };
  }, []);

  const { showToast } = useToast();

  const handleToggleFavorite = (movie) => {
    const wasFavorite = favorites.some((m) => m.id === movie.id);
    const updated = toggleFavorite(favorites, movie);
    setFavorites(updated);
    saveFavorites(updated);
    
    // Show toast notification
    if (wasFavorite) {
      showToast(`${movie.title} removed from favorites`, 'info', 2000);
    } else {
      showToast(`${movie.title} added to favorites`, 'success', 2000);
    }
  };

  // Filter movies by category if a category is selected (using category name)
  const selectedCategory = (searchParams.get('category') || 'all').toLowerCase();

  const filteredMovies = selectedCategory === 'all'
    ? movies
    : movies.filter((movie) => {
        const movieCategories = movie.categories || movie.genres;
        return movieCategories?.some((cat) => {
          const name = String(cat.name || '').toLowerCase();
          return name === selectedCategory;
        });
      });

  return (
    <div className="mt-8 md:mt-12 space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-700 px-6 py-8 shadow-lg md:px-10 md:py-10">
        <div className="relative z-10 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-indigo-200 ring-1 ring-white/15">
              Your personal movie universe
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Discover, search & favorite
              <span className="block text-indigo-200">the best movies online.</span>
            </h1>
            <p className="max-w-xl text-sm text-slate-200/80 sm:text-base">
              Browse trending titles, search by name, and build your own collection of favorites.
              All powered by live movie data.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-200/90 sm:text-sm">
              <div className="flex items-center gap-2 rounded-xl bg-black/20 px-3 py-2 ring-1 ring-white/10">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Real-time popular movies</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-black/10 px-3 py-2 ring-1 ring-white/10">
                <span className="h-2 w-2 rounded-full bg-indigo-300" />
                <span>Save what you love to Favorites</span>
              </div>
            </div>
          </div>

          <div className="hidden h-full md:block">
            <div className="mx-auto flex h-full max-w-xs flex-col justify-between rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-200/80">
                  Now browsing
                </p>
                <p className="mt-1 text-sm text-slate-50/90">
                  {title}
                </p>
              </div>
              <div className="mt-6 space-y-2 text-xs text-slate-200/80">
                <p className="flex items-center justify-between">
                  <span>Results</span>
                  <span className="rounded-full bg-black/30 px-2 py-0.5 text-[0.7rem] font-medium">
                    {filteredMovies.length}
                  </span>
                </p>
                <p className="text-[0.7rem] leading-relaxed text-slate-200/70">
                  Refine with search on the top bar or explore curated categories below.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-400/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-3rem] left-[-3rem] h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{title}</h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Filter by genre or mood to quickly jump into the kind of story you&apos;re in the mood for.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 sm:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[0.7rem] font-medium text-slate-700 ring-1 ring-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Showing {filteredMovies.length} titles
            </span>
          </div>
        </div>

        <Categories categories={categories} />

        {loading && (
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-center gap-2 text-sm text-slate-600">
              <LoadingSpinner size="sm" />
              <span>Loading movies...</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}
        
        {error && !loading && (
          <div className="mt-6">
            <ErrorCard
              message={error}
              onRetry={async () => {
                setError('');
                setLoading(true);
                try {
                  const currentQuery = query;
                  if (currentQuery) {
                    const data = await searchMovies(currentQuery);
                    const list = Array.isArray(data) ? data : data.results || data.content || [];
                    setMovies(list);
                  } else {
                    const data = await fetchMovies();
                    const list = Array.isArray(data) ? data : data.results || data.content || [];
                    setMovies(list);
                  }
                } catch (err) {
                  setError('Failed to load movies. Check your network or API key.');
                } finally {
                  setLoading(false);
                }
              }}
            />
          </div>
        )}

        {!loading && !error && filteredMovies.length > 0 && (
          <MovieList
            movies={filteredMovies}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {!loading && !error && filteredMovies.length === 0 && (
          <div className="mt-10">
            <EmptyState
              icon="🎬"
              title={query ? `No movies found for "${query}"` : 'No movies found'}
              message={
                query
                  ? 'Try adjusting your search terms or browse different categories.'
                  : 'Try selecting a different category or check back later for new releases.'
              }
              action={() => {
                window.location.href = '/';
              }}
              actionLabel="Browse All Movies"
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
