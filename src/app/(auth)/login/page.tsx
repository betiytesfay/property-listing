import type { Metadata } from "next";
import { AuthLayout } from "@/src/components/auth/auth-layout";
import { LoginForm } from "@/src/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <AuthLayout variant="login">
      <LoginForm />
    </AuthLayout>
  );
}
