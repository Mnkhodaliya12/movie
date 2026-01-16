const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const ADMIN_API_BASE_URL = `${API_BASE_URL}/admin`;


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


export async function fetchMovies() {
  const res = await fetch(`${ADMIN_API_BASE_URL}/movies`, {
    method: 'GET',
  });
  return handleResponse(res);
}

export async function fetchMovieById(id) {
  const res = await fetch(`${ADMIN_API_BASE_URL}/movies/${id}`, {
    method: 'GET',
  });
  return handleResponse(res);
}

export async function createMovie(movieData, posterFile) {
  const formData = new FormData();
  formData.append(
    'movie',
    new Blob([JSON.stringify(movieData)], { type: 'application/json' }),
  );
  if (posterFile) {
    formData.append('poster', posterFile);
  }

  const res = await fetch(`${ADMIN_API_BASE_URL}/movies`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(res);
}

export async function deleteMovie(id) {
  const res = await fetch(`${ADMIN_API_BASE_URL}/movies/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}

export async function updateMovie(id, movieData, posterFile) {
  const formData = new FormData();
  formData.append(
    'movie',
    new Blob([JSON.stringify(movieData)], { type: 'application/json' }),
  );
  if (posterFile) {
    formData.append('poster', posterFile);
  }

  const res = await fetch(`${ADMIN_API_BASE_URL}/movies/${id}`, {
    method: 'PUT',
    body: formData,
  });
  return handleResponse(res);
}
