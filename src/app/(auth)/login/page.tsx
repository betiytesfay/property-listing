import type { Metadata } from "next";
import { AuthSplitLayout } from "@/src/components/auth/auth-split-layout";
import { LoginForm } from "@/src/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in | Habesha Property Hub",
  description: "Sign in to your seller account on Habesha Property Hub.",
};

export default function LoginPage() {
  return (
    <AuthSplitLayout variant="login">
      <LoginForm />
    </AuthSplitLayout>
  );
}
