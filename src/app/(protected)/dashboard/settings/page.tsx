"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Lock, ShieldAlert, User2, Loader2, CheckCircle2, X, KeyRound } from "lucide-react";
import { useAuth } from "@/src/features/auth/hooks/use-auth";
import { useAuthStore } from "@/src/features/auth/store/auth-store";
import { saveUserProfile } from "@/src/features/auth/utils/user-profile";
import { forgotPassword } from "@/src/lib/api/user";

const OWNER_CONTACT_KEY = "hp_owner_contact";

interface OwnerProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

function readOwnerContact(): { phoneNumber: string } {
  if (typeof window === "undefined") {
    return { phoneNumber: "" };
  }

  try {
    const raw = window.localStorage.getItem(OWNER_CONTACT_KEY);
    if (!raw) return { phoneNumber: "" };
    const parsed = JSON.parse(raw) as { phoneNumber?: string };
    return { phoneNumber: parsed.phoneNumber ?? "" };
  } catch {
    return { phoneNumber: "" };
  }
}

function saveOwnerContact(phoneNumber: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(OWNER_CONTACT_KEY, JSON.stringify({ phoneNumber }));
}

export default function SettingsPage() {
  const { user, logout, setSession } = useAuth();
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const [profile, setProfile] = useState<OwnerProfile>({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "OWNER",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const contact = readOwnerContact();
    setProfile({
      fullName: user.fullName ?? "",
      email: user.email,
      phoneNumber: contact.phoneNumber ?? "",
      role: user.role,
    });
  }, [user]);

  const resetPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      return forgotPassword(email);
    },
    onSuccess: () => {
      setIsResetModalOpen(false);
      setFeedback({ type: "success", message: "Password reset email has been sent to your registered account." });
    },
    onError: (error: any) => {
      setFeedback({
        type: "error",
        message:
          typeof error?.message === "string"
            ? error.message
            : "Unable to send reset email. Please verify your account email and try again.",
      });
    },
  });

  const handleSaveProfile = async () => {
    if (!user) {
      setFeedback({ type: "error", message: "Unable to save profile when you are not signed in." });
      return;
    }

    const updatedUser = {
      ...user,
      fullName: profile.fullName.trim() || user.fullName || "",
    };

    saveUserProfile({ fullName: updatedUser.fullName });
    saveOwnerContact(profile.phoneNumber.trim());

    if (accessToken && refreshToken) {
      setSession(
        {
          user: updatedUser,
          accessToken,
          refreshToken,
        },
        typeof window !== "undefined" && window.localStorage.getItem("hp_remember_me") === "true",
      );
    }

    setFeedback({ type: "success", message: "Profile information has been updated locally." });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user) {
      const contact = readOwnerContact();
      setProfile({
        fullName: user.fullName ?? "",
        email: user.email,
        phoneNumber: contact.phoneNumber ?? "",
        role: user.role,
      });
    }
  };

  return (
    <div className="space-y-6 relative">
      {feedback && (
        <div
          className={`fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg transition ${
            feedback.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 text-white"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#002045]">Account settings</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Owner profile & security</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage your seller account details, trigger password recovery, and safely sign out when you are done.
            </p>
          </div>
          <div className="rounded-full border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-slate-700">
            {user?.role === "ADMIN" ? "Admin account" : "Owner account"}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <User2 className="h-5 w-5 text-slate-500" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">Profile Information</h2>
                <p className="text-sm text-slate-500">Your current owner identity and contact details.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(event) => setProfile((prev) => ({ ...prev, fullName: event.target.value }))}
                  disabled={!isEditing}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#002045] focus:bg-white disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email address</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none disabled:cursor-not-allowed"
                />
                <p className="mt-2 text-xs text-slate-500">Email is managed by your authentication session.</p>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone number</label>
                <input
                  type="tel"
                  value={profile.phoneNumber}
                  onChange={(event) => setProfile((prev) => ({ ...prev, phoneNumber: event.target.value }))}
                  disabled={!isEditing}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#002045] focus:bg-white disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Account role</label>
                <p className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {profile.role}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-slate-500">
                Keep your seller profile current so support and payment contacts always match your active account.
              </p>
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="rounded-2xl bg-[#002045] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00152e]"
                    >
                      Save changes
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="rounded-2xl bg-[#002045] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00152e]"
                  >
                    Edit profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Lock className="h-5 w-5 text-slate-500" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">Password & Security</h2>
                <p className="text-sm text-slate-500">Send a secure reset link to your seller email instantly.</p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <p>
                Use this to request a password reset email for the account currently signed in with <strong>{profile.email || "your registered email"}</strong>.
              </p>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Reset password</p>
                <p className="mt-2 text-sm text-slate-600">A reset token will be sent to your email, then use it to configure a new password.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              disabled={!profile.email}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#002045] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00152e] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <KeyRound className="h-4 w-4" />
              Request password reset
            </button>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-slate-500" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">Session controls</h2>
                <p className="text-sm text-slate-500">Sign out when you finish your seller work or switch accounts.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => logout()}
              className="mt-6 w-full rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              Log out
            </button>
          </div>
        </aside>
      </section>

      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4 py-8">
          <div className="w-full max-w-lg overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Request Password Reset</h3>
                <p className="mt-1 text-sm text-slate-500">
                  A reset link will be sent to your registered email address to update your password securely.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm text-slate-700">Email address</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{profile.email || "Not available"}</p>
              </div>

              <button
                type="button"
                onClick={() => resetPasswordMutation.mutate(profile.email)}
                disabled={resetPasswordMutation.isPending || !profile.email}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#002045] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00152e] disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {resetPasswordMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                Send reset link
              </button>
              <p className="text-sm text-slate-500">
                If you don&apos;t receive an email within a few minutes, check your spam folder or contact support.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
