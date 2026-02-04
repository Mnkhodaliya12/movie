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


export async function fetchMovies(page = 0, size = 20) {
  const params = new URLSearchParams();
  params.set('pageNumber', String(page + 1));
  params.set('pageSize', String(size));

  const res = await fetch(`${ADMIN_API_BASE_URL}/movies?${params.toString()}`, {
    method: 'GET',
  });
  return handleResponse(res);
}

export async function fetchMovieById(id) {
  const res = await fetch(`${ADMIN_API_BASE_URL}/movies/${id}`, {
    method: 'GET',
  });
  const body = await handleResponse(res);
  // Unwrap ResponseModel { message, status, statusCode, data } so callers get the movie.
  const movie = body && typeof body === 'object' && 'data' in body ? body.data : body;
  console.log('adminMovies.fetchMovieById body:', body);
  console.log('adminMovies.fetchMovieById movie:', movie);
  return movie;
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

export async function uploadMovieScreenshots(id, files) {
  const formData = new FormData();

  if (files && files.length > 0) {
    Array.from(files).forEach((file) => {
      formData.append('screenshots', file);
    });
  }

  const res = await fetch(`${ADMIN_API_BASE_URL}/movies/${id}/screenshots`, {
    method: 'POST',
    body: formData,
  });

  return handleResponse(res);
}
