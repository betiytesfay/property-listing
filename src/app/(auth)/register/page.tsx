import type { Metadata } from "next";
import { AuthSplitLayout } from "@/src/components/auth/auth-split-layout";
import { RegisterForm } from "@/src/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create seller account | HabeshaHub",
  description: "Register as a property seller on HabeshaHub.",
};

export default function RegisterPage() {
  return (
    <AuthSplitLayout variant="register">
      <RegisterForm />
    </AuthSplitLayout>
  );
}
