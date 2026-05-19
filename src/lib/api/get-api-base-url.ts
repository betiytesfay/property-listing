/**
 * Browser requests use the Next.js rewrite proxy (`/api/v1` → backend) to avoid CORS.
 * Server-side calls (if any) can target the backend directly via env vars.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "/api/v1";
  }

  const backend =
    process.env.API_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:8000";

  return `${backend.replace(/\/$/, "")}/api/v1`;
}
