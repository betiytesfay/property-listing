"use client";

import { Button } from "@/src/components/ui/Button";

export function SocialLoginButtons() {
  return (
    <section className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-auth-outline" />
        </div>
        <p className="relative mx-auto w-fit bg-auth-surface px-3 text-xs font-medium uppercase tracking-wider text-auth-on-surface-muted">
          Or continue with
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="social" onClick={() => undefined}>
          <GoogleIcon />
          Google
        </Button>
        <Button type="button" variant="social" onClick={() => undefined}>
          <AppleIcon />
          Apple
        </Button>
      </div>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05 1.88-3.51 1.9-1.46.02-1.93-.86-3.6-.86-1.67 0-2.19.84-3.57.88-1.38.04-2.43-.88-3.41-1.83C2.56 17.94 1.2 14.58 2.66 10.74c.73-1.72 2.04-2.98 3.7-3.01 1.43-.03 2.78.96 3.6.96.82 0 2.36-1.19 3.98-1.01.68.03 2.6.28 3.83 2.1-3.3 1.8-2.77 6.48.53 7.92-.65 1.7-1.52 3.38-3.25 5.58zM14.02 4.18c.66-.8 1.12-1.9.99-3.01-.96.04-2.12.64-2.8 1.44-.61.71-1.15 1.86-1.01 2.95 1.07.08 2.16-.55 2.82-1.38z" />
    </svg>
  );
}
