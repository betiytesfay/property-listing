// Backup of the conflicting dashboard page. Moved to src/app/(admin)/admin/overview/page.tsx to resolve route conflict.
"use client";

import Link from "next/link";
import { ShieldCheck, UserPlus, Users } from "lucide-react";
import { ADMIN_ROUTES } from "@/src/features/auth/constants/routes";
import { useCurrentUser } from "@/src/features/auth/hooks/use-current-user";
import { isAdmin } from "@/src/features/auth/utils/roles";

export default function AdminDashboardPageBackup() {
  const { user } = useCurrentUser();

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Admin dashboard (Backup)</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Welcome{user?.fullName ? `, ${user.fullName}` : ""}
        </h1>
        <p className="max-w-2xl text-slate-600">
          Manage platform administrators and oversee Habesha Property Hub operations.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isAdmin(user?.role) ? (
          <Link
            href={ADMIN_ROUTES.registerAdmin}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md"
          >
            <UserPlus
              className="h-8 w-8 text-amber-500 transition group-hover:scale-105"
              aria-hidden
            />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">Register admin</h2>
            <p className="mt-2 text-sm text-slate-500">
              Add a new administrator account with full platform access.
            </p>
            <span className="mt-4 inline-flex text-sm font-semibold text-amber-600">
              Add admin →
            </span>
          </Link>
        ) : null}

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <ShieldCheck className="h-8 w-8 text-amber-500" aria-hidden />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">Platform security</h2>
          <p className="mt-2 text-sm text-slate-500">
            Admin routes are protected on the frontend. API authorization is enforced separately on the backend.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Users className="h-8 w-8 text-amber-500" aria-hidden />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">Signed in as</h2>
          <p className="mt-2 font-semibold text-slate-900">{user?.email}</p>
          <p className="mt-1 text-sm text-slate-500">Role: {user?.role ?? "—"}</p>
        </article>
      </section>
    </div>
  );
}
