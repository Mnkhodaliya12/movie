import { useEffect, useState } from 'react';
import { loadFavorites } from '../services/favorites.js';

const mockUser = {
  name: 'Movie Lover',
  username: 'movielover01',
  email: 'you@example.com',
  location: 'Earth',
  joined: 'Jan 2024',
  bio: 'Curating the best movies to watch next. Loves sci-fi, thrillers, and anything with a great soundtrack.',
  favoriteGenres: ['Action', 'Sci‑Fi', 'Thriller', 'Drama'],
};

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function Profile() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const favoritesCount = favorites.length;

  return (
    <div className="w-full py-6 pr-4 md:pr-10 space-y-8">
      {/* Top profile hero */}
      <section className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-700 px-6 py-8 text-slate-50 shadow-lg md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 text-2xl font-semibold shadow-md md:h-20 md:w-20">
            {getInitials(mockUser.name)}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {mockUser.name}
            </h1>
            <p className="text-sm text-indigo-100">@{mockUser.username}</p>
            <p className="mt-1 max-w-xl text-sm text-slate-200/80">
              {mockUser.bio}
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-200/90">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/20 px-3 py-1 ring-1 ring-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {mockUser.location}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/10 px-3 py-1 ring-1 ring-white/10">
                Joined {mockUser.joined}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm md:text-base md:max-w-sm">
          <div className="rounded-2xl bg-black/20 px-4 py-3 ring-1 ring-white/15">
            <p className="text-xs uppercase tracking-wide text-slate-200/80">Favorites</p>
            <p className="mt-1 text-2xl font-semibold">{favoritesCount}</p>
            <p className="text-xs text-slate-200/80">Movies you&apos;ve saved</p>
          </div>
          <div className="rounded-2xl bg-black/10 px-4 py-3 ring-1 ring-white/10">
            <p className="text-xs uppercase tracking-wide text-slate-200/80">Account type</p>
            <p className="mt-1 text-sm font-medium">Guest</p>
            <p className="text-xs text-slate-200/80">No sign in required</p>
          </div>
        </div>
      </section>

      {/* Details + preferences */}
      <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">Profile details</h2>
          </div>
          <dl className="grid gap-3 text-xs text-slate-600 sm:text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-slate-700">Full name</dt>
              <dd className="mt-0.5 text-slate-600">{mockUser.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">Email</dt>
              <dd className="mt-0.5 text-slate-600">{mockUser.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">Username</dt>
              <dd className="mt-0.5 text-slate-600">@{mockUser.username}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">Location</dt>
              <dd className="mt-0.5 text-slate-600">{mockUser.location}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">Preferences</h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            We use these to help you quickly find the genres you enjoy most.
          </p>
          <div className="flex flex-wrap gap-2">
            {mockUser.favoriteGenres.map((genre) => (
              <span
                key={genre}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                {genre}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Favorites list */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">Favorite movies</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[0.7rem] font-medium text-slate-700 ring-1 ring-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {favoritesCount} saved
          </span>
        </div>
        <p className="text-xs text-slate-500 sm:text-sm">
          These are the movies you&apos;ve favorited while browsing. Clearing your browser data will reset this list.
        </p>

        {favoritesCount === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            You haven&apos;t added any favorites yet. Browse movies on the home page and tap the favorite button to build your collection.
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {favorites.map((movie) => (
              <li key={movie.id} className="flex items-center gap-4 px-4 py-3">
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="h-16 w-11 rounded-md object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{movie.title}</p>
                  <p className="text-xs text-slate-500">
                    {movie.release_date || 'Unknown year'}
                    {movie.vote_average && ` • ⭐ ${movie.vote_average.toFixed(1)}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Profile;
