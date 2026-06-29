const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const codespacesApiBaseUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`;

function getRuntimeApiBaseUrl() {
  if (codespaceName) {
    return codespacesApiBaseUrl;
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;

    if (hostname.endsWith('.app.github.dev')) {
      return `https://${hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev')}/api`;
    }
  }

  return 'http://localhost:8000/api';
}

export const apiBaseUrl = getRuntimeApiBaseUrl();

export function normalizeApiList(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
}

export async function fetchApiList(resource, codespacesEndpoint) {
  const resourceUrl = codespaceName && codespacesEndpoint
    ? codespacesEndpoint
    : `${apiBaseUrl}/${resource}/`;
  const response = await fetch(resourceUrl);

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeApiList(payload);
}
