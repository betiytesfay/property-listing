const PROFILE_KEY = "hp_user_profile";

interface StoredUserProfile {
  fullName?: string;
}

export function saveUserProfile(profile: StoredUserProfile): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function readUserProfile(): StoredUserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(PROFILE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredUserProfile;
  } catch {
    return null;
  }
}

export function clearUserProfile(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(PROFILE_KEY);
}
