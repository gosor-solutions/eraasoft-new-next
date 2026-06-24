export const BASE_URL = "https://panel.eraasoft.com/api";

/**
 * Reusable fetch helper with authentication support.
 * @param {string} endpoint - The API path (e.g. '/free-courses') or full URL.
 * @param {Object} options - Request options (method, headers, body, token).
 */
export const fetchWithAuth = async (endpoint, options = {}) => {
  const { token, ...restOptions } = options;
  const activeToken = token || (typeof window !== "undefined" ? localStorage.getItem("client_token") : null);

  const headers = {
    "Accept": "application/json",
    ...restOptions.headers,
  };

  if (activeToken) {
    headers["Authorization"] = `Bearer ${activeToken}`;
  }

  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    ...restOptions,
    headers,
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};
