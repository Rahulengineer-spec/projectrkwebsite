import { getCsrfToken } from "next-auth/react";

export async function fetchWithCsrf(url: string, options: RequestInit = {}) {
  const csrfToken = await getCsrfToken();
  
  const headers = {
    "Content-Type": "application/json",
    ...(csrfToken && { "X-CSRF-Token": csrfToken }),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
} 