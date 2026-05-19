import type { Metadata } from "next";
import { AuthSplitLayout } from "@/src/components/auth/auth-split-layout";
import { ForgotPasswordForm } from "@/src/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password | Habesha Property Hub",
  description: "Reset your Habesha Property Hub seller account password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout variant="forgotPassword">
      <ForgotPasswordForm />
    </AuthSplitLayout>
  );
}
