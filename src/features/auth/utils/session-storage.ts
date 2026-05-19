import { STORAGE_KEYS } from "@/src/features/auth/constants/storage";

function getStorage(persistent: boolean): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return persistent ? window.localStorage : window.sessionStorage;
}

export function readRememberMe(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(STORAGE_KEYS.rememberMe) === "true";
}

export function setRememberMePreference(rememberMe: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  if (rememberMe) {
    window.localStorage.setItem(STORAGE_KEYS.rememberMe, "true");
  } else {
    window.localStorage.removeItem(STORAGE_KEYS.rememberMe);
  }
}

export function getTokenStorage(): Storage | null {
  return getStorage(readRememberMe());
}

export function saveTokens(
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean
): void {
  setRememberMePreference(rememberMe);
  const storage = getStorage(rememberMe);
  if (!storage) {
    return;
  }

  storage.setItem(STORAGE_KEYS.accessToken, accessToken);
  storage.setItem(STORAGE_KEYS.refreshToken, refreshToken);

  const other = rememberMe ? window.sessionStorage : window.localStorage;
  other.removeItem(STORAGE_KEYS.accessToken);
  other.removeItem(STORAGE_KEYS.refreshToken);
}

export function readTokens(): { accessToken: string | null; refreshToken: string | null } {
  const persistent = readRememberMe();
  const primary = getStorage(persistent);
  const secondary = getStorage(!persistent);

  const accessToken =
    primary?.getItem(STORAGE_KEYS.accessToken) ??
    secondary?.getItem(STORAGE_KEYS.accessToken) ??
    null;

  const refreshToken =
    primary?.getItem(STORAGE_KEYS.refreshToken) ??
    secondary?.getItem(STORAGE_KEYS.refreshToken) ??
    null;

  return { accessToken, refreshToken };
}

export function clearTokens(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEYS.accessToken);
  window.localStorage.removeItem(STORAGE_KEYS.refreshToken);
  window.sessionStorage.removeItem(STORAGE_KEYS.accessToken);
  window.sessionStorage.removeItem(STORAGE_KEYS.refreshToken);
  window.localStorage.removeItem(STORAGE_KEYS.rememberMe);
}
