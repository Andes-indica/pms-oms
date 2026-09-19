const API_URL =
  import.meta.env.VITE_API_URL ??
  "http://127.0.0.1:3000";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    localStorage.getItem("accessToken");

  const headers = new Headers(
    options.headers,
  );

  headers.set(
    "Content-Type",
    "application/json",
  );

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...options,
      headers,
    },
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(
      body.error ??
        "Request failed",
    );
  }

  return body;
}