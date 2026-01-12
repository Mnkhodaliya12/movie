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

export async function fetchCategories() {
  const res = await fetch(`${ADMIN_API_BASE_URL}/categories`, {
    method: 'GET',
  });
  return handleResponse(res);
}

export async function createCategory(category) {
  const res = await fetch(`${ADMIN_API_BASE_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  return handleResponse(res);
}

export async function deleteCategory(id) {
  const res = await fetch(`${ADMIN_API_BASE_URL}/categories/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}

export async function updateCategory(id, category) {
  const res = await fetch(`${ADMIN_API_BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  return handleResponse(res);
}
