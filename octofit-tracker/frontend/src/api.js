export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const getApiUrl = (endpoint) => `${apiHost}/api/${endpoint}/`;

export const normalizeCollection = (payload, keys = []) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  for (const key of keys) {
    if (Array.isArray(payload[key])) {
      return payload[key];
    }
  }

  return [];
};

export const apiFetch = async (endpoint, keys = []) => {
  const url = getApiUrl(endpoint);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }
  const payload = await response.json();
  return normalizeCollection(payload, keys);
};
