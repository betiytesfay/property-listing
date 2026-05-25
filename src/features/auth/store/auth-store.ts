"use client";

import { create } from "zustand";
import { authService } from "@/src/features/auth/services/auth.service";
import type { AuthSession, AuthState, AuthUser, TokenResponse } from "@/src/features/auth/types/auth.types";
import { clearAuthCookie, setAuthCookie } from "@/src/features/auth/utils/cookies";
import { isTokenExpired, userFromAccessToken } from "@/src/features/auth/utils/jwt";
import {
  clearTokens,
  readTokens,
  saveTokens,
} from "@/src/features/auth/utils/session-storage";
import {
  clearUserProfile,
  readUserProfile,
  saveUserProfile,
} from "@/src/features/auth/utils/user-profile";

interface AuthActions {
  setSession: (session: AuthSession, rememberMe?: boolean) => void;
  clearSession: () => void;
  restoreSession: () => Promise<void>;
  refreshSession: () => Promise<string | null>;
  logout: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

function buildSession(tokens: TokenResponse, rememberMe = false): AuthSession | null {
  const user = userFromAccessToken(tokens.access_token);
  if (!user) {
    return null;
  }

  return {
    user,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
  };
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isHydrated: false,
  isLoading: false,

  setLoading: (isLoading) => set({ isLoading }),

  setSession: (session, rememberMe = false) => {
    saveTokens(session.accessToken, session.refreshToken, rememberMe);
    setAuthCookie(rememberMe);

    if (session.user.fullName) {
      saveUserProfile({ fullName: session.user.fullName });
    }

    set({
      user: session.user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  clearSession: () => {
    clearTokens();
    clearAuthCookie();
    clearUserProfile();

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  restoreSession: async () => {
    set({ isLoading: true });

    try {
      const { accessToken, refreshToken } = readTokens();

      if (!accessToken || !refreshToken) {
        get().clearSession();
        return;
      }

      if (!isTokenExpired(accessToken)) {
        const user = userFromAccessToken(accessToken);
        if (user) {
          const profile = readUserProfile();
          set({
            user: profile?.fullName ? { ...user, fullName: profile.fullName } : user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
          });
          return;
        }
      }

      await get().refreshSession();
    } finally {
      set({ isHydrated: true, isLoading: false });
    }
  },

  refreshSession: async () => {
    const { refreshToken } = get();
    const tokenToUse = refreshToken ?? readTokens().refreshToken;

    if (!tokenToUse) {
      get().clearSession();
      return null;
    }

    try {
      const tokens = await authService.refresh({ refresh_token: tokenToUse });
      const session = buildSession(tokens);
      if (!session) {
        get().clearSession();
        return null;
      }

      const rememberMe = typeof window !== "undefined" && window.localStorage.getItem("hp_remember_me") === "true";
      get().setSession(session, rememberMe);
      return tokens.access_token;
    } catch {
      get().clearSession();
      return null;
    }
  },

  logout: async () => {
    const refreshToken = get().refreshToken ?? readTokens().refreshToken;

    if (refreshToken) {
      try {
        await authService.logout({ refresh_token: refreshToken });
      } catch {
        // Clear local session even if server logout fails
      }
    }

    get().clearSession();
  },
}));
