import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { ApiError } from "@/src/lib/api/errors";
import { getApiBaseUrl } from "@/src/lib/api/get-api-base-url";

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

type TokenGetter = () => string | null;
type RefreshHandler = () => Promise<string | null>;
type UnauthorizedHandler = () => void;

let getAccessToken: TokenGetter = () => null;
let refreshAccessToken: RefreshHandler = async () => null;
let onUnauthorized: UnauthorizedHandler = () => undefined;

let refreshPromise: Promise<string | null> | null = null;

export function configureApiClient(options: {
  getAccessToken: TokenGetter;
  refreshAccessToken: RefreshHandler;
  onUnauthorized: UnauthorizedHandler;
}): void {
  getAccessToken = options.getAccessToken;
  refreshAccessToken = options.refreshAccessToken;
  onUnauthorized = options.onUnauthorized;
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ detail?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/register") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newToken = await refreshPromise;

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      }

      onUnauthorized();
    }

    const status = error.response?.status ?? 500;
    const message =
      typeof error.response?.data?.detail === "string"
        ? error.response.data.detail
        : error.message;

    return Promise.reject(new ApiError(status, message, error.response?.data));
  }
);

export default apiClient;
