const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!apiBaseUrl) {
  throw new Error("Missing VITE_API_BASE_URL in environment variables")
}

export const API_BASE_URL = `${apiBaseUrl}/api`
