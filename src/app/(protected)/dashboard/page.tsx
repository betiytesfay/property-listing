"use client";

import Link from "next/link";
import { Building2, PlusCircle } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { useCurrentUser } from "@/src/features/auth/hooks/use-current-user";

export default function DashboardPage() {
  const { user } = useCurrentUser();

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Seller dashboard</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Welcome back{user?.fullName ? `, ${user.fullName}` : ""}
        </h1>
        <p className="max-w-2xl text-slate-600">
          Manage your property listings, track inquiries, and grow your presence on Habesha Property Hub.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Building2 className="h-8 w-8 text-amber-500" aria-hidden />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">Your listings</h2>
          <p className="mt-2 text-sm text-slate-500">View and manage properties you have published.</p>
          <Link
            href="/properties"
            className="mt-6 inline-flex rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Browse marketplace
          </Link>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <PlusCircle className="h-8 w-8 text-amber-500" aria-hidden />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">Add a listing</h2>
          <p className="mt-2 text-sm text-slate-500">List a new property for rent or sale.</p>
          <Button variant="gold" className="mt-6" disabled>
            Coming soon
          </Button>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
          <p className="text-sm font-medium text-slate-500">Signed in as</p>
          <p className="mt-2 font-semibold text-slate-900">{user?.email}</p>
          <p className="mt-1 text-sm text-slate-500">Role: {user?.role ?? "—"}</p>
        </article>
      </section>
    </div>
  );
}
