const STORAGE_KEY = 'movies_hub_favorites_v1';

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load favorites', e);
    return [];
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to save favorites', e);
  }
}

export function toggleFavorite(currentFavorites, movie) {
  const exists = currentFavorites.some((m) => m.id === movie.id);
  if (exists) {
    return currentFavorites.filter((m) => m.id !== movie.id);
  }
  return [...currentFavorites, movie];
}
