import type { Metadata } from "next";
import { AuthSplitLayout } from "@/src/components/auth/auth-split-layout";
import { AdminRegisterForm } from "@/src/features/auth/components/admin-register-form";

export const metadata: Metadata = {
  title: "Register administrator | HabeshaHub",
  description: "Create a new administrator account for HabeshaHub.",
};

export default function RegisterAdminPage() {
  return (
    <AuthSplitLayout variant="adminRegister">
      <AdminRegisterForm />
    </AuthSplitLayout>
  );
}