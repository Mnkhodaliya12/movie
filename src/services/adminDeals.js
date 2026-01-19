const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const ADMIN_API_BASE_URL = `${API_BASE_URL}/admin/deals`;

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  const contentType = response.headers.get('content-type') || '';
  // Some endpoints (like DELETE) may return 204 No Content or an empty body.
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const rawText = await response.text();

  if (!rawText) {
    return null;
  }

  if (contentType.includes('application/json')) {
    return JSON.parse(rawText);
  }

  return rawText;
}

export async function fetchDeals() {
  const res = await fetch(ADMIN_API_BASE_URL, {
    method: 'GET',
  });
  return handleResponse(res);
}

export async function createDeal(dealData) {
  const res = await fetch(ADMIN_API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dealData),
  });
  return handleResponse(res);
}

export async function deleteDeal(id) {
  const res = await fetch(`${ADMIN_API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
