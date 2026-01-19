const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const ADMIN_DEALS_BASE = `${API_BASE_URL}/admin/deals`;

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  const rawText = await response.text();

  if (!rawText) return null;

  if (contentType.includes('application/json')) {
    return JSON.parse(rawText);
  }

  return rawText;
}

export async function fetchDeals() {
  const res = await fetch(ADMIN_DEALS_BASE, {
    method: 'GET',
  });
  const body = await handleResponse(res);
  return body && typeof body === 'object' && 'data' in body ? body.data : body;
}
