'use client';

import Link from "next/link";
import { Building2, PlusCircle, LogIn } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { useCurrentUser } from "@/src/features/auth/hooks/use-current-user";

export default function DashboardPage() {
  const { user, isAuthenticated } = useCurrentUser();

  // Show login prompt if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-amber-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Welcome Back</h1>
          <p className="text-slate-600 mb-8">
            Please sign in to access your seller dashboard and manage your property listings.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-amber-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-amber-700 transition-all duration-200"
          >
            Sign In to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Show dashboard for authenticated users
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                Seller Dashboard
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">
                Welcome back{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ""}!
              </h1>
              <p className="text-slate-600 mt-2 max-w-2xl">
                Manage your property listings, track inquiries, and grow your presence on Habesha Property Hub.
              </p>
            </div>
            <div className="shrink-0">
              <div className="bg-amber-50 rounded-xl px-4 py-2 text-center">
                <p className="text-xs text-amber-700">Account Status</p>
                <p className="text-sm font-semibold text-amber-800">Active Seller</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <p className="text-sm font-medium text-slate-500">Total Listings</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">0</p>
            <p className="text-xs text-slate-500 mt-2">+0 this month</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <p className="text-sm font-medium text-slate-500">Active Listings</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">0</p>
            <p className="text-xs text-slate-500 mt-2">0 pending review</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <p className="text-sm font-medium text-slate-500">Total Views</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">0</p>
            <p className="text-xs text-slate-500 mt-2">This week</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <p className="text-sm font-medium text-slate-500">Inquiries</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">0</p>
            <p className="text-xs text-slate-500 mt-2">Unread: 0</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Your Listings Card */}
          <div className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="bg-amber-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                <Building2 className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Your Listings</h3>
              <p className="text-slate-600 text-sm mb-4">
                View and manage all your property listings in one place.
              </p>
              <Link
                href="/properties"
                className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
              >
                Browse your listings
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Add Listing Card */}
          <div className="group bg-linear-to-br from-amber-50 to-white rounded-xl shadow-sm border border-amber-200 overflow-hidden hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="bg-amber-600 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <PlusCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Add a Listing</h3>
              <p className="text-slate-600 text-sm mb-4">
                List a new property for rent or sale. Reach thousands of potential buyers.
              </p>
              <Button
                variant="gold"
                className="mt-2 w-full"
                disabled
              >
                Coming Soon
              </Button>
            </div>
          </div>

          {/* Account Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Account Information</p>
                <div className="mt-3 space-y-2">
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm font-medium text-slate-900">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Full Name</p>
                    <p className="text-sm font-medium text-slate-900">{user?.fullName || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Role</p>
                    <p className="text-sm font-medium text-slate-900 capitalize">{user?.role || '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h4 className="font-semibold text-slate-900 mb-2">💡 Pro Tip</h4>
          <p className="text-sm text-slate-600">
            Add high-quality photos and detailed descriptions to make your property listings stand out.
            Properties with professional photos get 3x more views!
          </p>
        </div>
      </div>
    </div>
  );
}