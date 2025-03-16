const BASE_URL = 'https://hakhel-c99c0466c9a2.herokuapp.com/hke/api/v1';

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function fetchApi(endpoint: string, options: FetchOptions = {}) {
  const { token, ...fetchOptions } = options;
  
  const headers = new Headers(options.headers);
  
  // Add auth token if provided
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  
  // Add default headers
  headers.append('Content-Type', 'application/json');

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API call failed');
  }

  return response.json();
} 