import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthSplitLayout } from "@/src/components/auth/auth-split-layout";
import { ResetPasswordForm } from "@/src/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password | Habesha Property Hub",
  description: "Set a new password for your Habesha Property Hub account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthSplitLayout variant="forgotPassword">
      <Suspense
        fallback={
          <div className="h-48 w-full max-w-md animate-pulse rounded-2xl bg-auth-surface-muted" />
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthSplitLayout>
  );
}
