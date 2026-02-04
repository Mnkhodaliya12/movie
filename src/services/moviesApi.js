
// movies-hub/src/services/moviesApi.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE = `${API_BASE_URL}/api`;

// For demonstration purposes, we use hardcoded dummy data.
// In a real application, these functions would make actual API calls.


async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}
   
export async function fetchMovies(page = 0, size = 20) {
  const params = new URLSearchParams();
  params.set('pageNumber', String(page + 1));
  params.set('pageSize', String(size));

  const res = await fetch(`${API_BASE}/movies?${params.toString()}`, {
    method: 'GET',
  });
  const body = await handleResponse(res);
  return body;
}

export async function fetchMovieById(id) {
  const res = await fetch(`${API_BASE}/movies/${id}`, {
    method: 'GET',
  });
  const body = await handleResponse(res);
  return body && typeof body === 'object' && 'data' in body ? body.data : body;
}
export async function searchMovies(query) {
  const res = await fetch(`${API_BASE}/movies/search?query=${encodeURIComponent(query)}`, {
    method: 'GET',
  });
  const body = await handleResponse(res);
  return body && typeof body === 'object' && 'data' in body ? body.data : body;
}


export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'GET',
  });
  const body = await handleResponse(res);
  return body && typeof body === 'object' && 'data' in body ? body.data : body;
}
