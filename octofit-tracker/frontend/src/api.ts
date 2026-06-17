export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const getApiUrl = (endpoint: string) => `${apiHost}/api/${endpoint}/`;

export const normalizeCollection = <T>(payload: unknown, keys: string[] = []): T[] => {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const record = payload as Record<string, unknown>;
  if (Array.isArray(record.data)) {
    return record.data as T[];
  }

  if (Array.isArray(record.items)) {
    return record.items as T[];
  }

  for (const key of keys) {
    if (Array.isArray(record[key])) {
      return record[key] as T[];
    }
  }

  return [];
};

export const apiFetch = async <T>(endpoint: string, keys: string[] = []): Promise<T[]> => {
  const url = getApiUrl(endpoint);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }

  const payload = await response.json();
  return normalizeCollection<T>(payload, keys);
};
