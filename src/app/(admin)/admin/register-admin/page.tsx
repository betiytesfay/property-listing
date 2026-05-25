import type { Metadata } from "next";
import { AdminRegisterForm } from "@/src/features/auth/components/admin-register-form";

export const metadata: Metadata = {
  title: "Register administrator | Habesha Property Hub",
  description: "Create a new administrator account for Habesha Property Hub.",
};

export default function RegisterAdminPage() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <AdminRegisterForm />
    </div>
  );
}
