import type { Metadata } from "next";
import { AuthLayout } from "@/src/components/auth/auth-layout";
import { RegisterForm } from "@/src/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <AuthLayout variant="register">
      <RegisterForm />
    </AuthLayout>
  );
}
