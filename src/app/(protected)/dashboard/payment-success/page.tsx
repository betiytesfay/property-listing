"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Receipt,
  Sparkles,
  Loader2,
  XCircle
} from "lucide-react";
import { apiClient } from "@/src/lib/api/client";

interface PaymentStatusResponse {
  id: string;
  property_id: string;
  tx_ref: string;
  amount: string;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const propertyId = searchParams?.get("property_id");
  const txRef = searchParams?.get("trx_ref") || searchParams?.get("tx_ref");

  const [paymentData, setPaymentData] = useState<PaymentStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    async function verifyPaymentOnMount() {
      if (!propertyId && !txRef) {
        setError("Missing valid property reference identifier or transaction reference.");
        setIsLoading(false);
        setAnimate(true);
        return;
      }

      try {
        setIsLoading(true);
        const endpoint = propertyId
          ? `/api/v1/payments/properties/${propertyId}/payment-status`
          : `/api/v1/payments/tx-ref/${txRef}/payment-status`;

        const response = await apiClient.get<PaymentStatusResponse>(endpoint);
        setPaymentData(response.data);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.detail || "Verification lookup failed.");
      } finally {
        setIsLoading(false);
        setAnimate(true);
      }
    }

    verifyPaymentOnMount();
  }, [propertyId, txRef]);


  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4">
        <Loader2 className="h-10 w-10 text-[#002045] animate-spin" />
        <p className="mt-4 text-sm font-semibold text-slate-500 tracking-wide animate-pulse">
          Validating Chapa Settlement Parameters...
        </p>
      </div>
    );
  }

  // ===============================
  // Error / Missing ID State
  // ===============================
  if (error || !paymentData) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 antialiased text-slate-800">
        <div className="w-full max-w-md bg-white rounded-[32px] border border-red-200 p-8 text-center shadow-xl">
          <div className="mx-auto rounded-full bg-red-50 p-4 text-red-600 border border-red-100 w-fit">
            <XCircle className="h-10 w-10" />
          </div>
          <h1 className="mt-5 text-xl font-bold text-slate-900 tracking-tight">Status Verification Failed</h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">{error || "Could not read status data."}</p>
          <div className="mt-6 flex flex-col gap-2">
            <Link href="/dashboard" className="w-full inline-flex items-center justify-center rounded-xl bg-[#002045] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1a365d] transition">
              Back to Dashboard Workspace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main Verified UI Render
  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 antialiased text-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className={`w-full max-w-xl bg-white rounded-[32px] border border-slate-200/80 p-6 sm:p-10 shadow-xl transition-all duration-700 transform ${
        animate ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
      }`}>
        
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping opacity-75 duration-1000" />
            <div className="relative rounded-full bg-emerald-50 p-5 text-emerald-600 border border-emerald-100 shadow-inner">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <div className="absolute -bottom-1 -right-1 rounded-full bg-[#002045] p-1.5 text-white shadow-sm border-2 border-white">
              <Sparkles className="h-3 w-3" />
            </div>
          </div>

          {/* Dynamically display status variant badge from server */}
          <span className={`mt-6 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border ${
            paymentData.status === "SUCCESS" || paymentData.status === "PENDING"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-amber-50 text-amber-700 border-amber-100"
          }`}>
            Status: {paymentData.status}
          </span>
          
          <h1 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Payment Handshake Processed
          </h1>
          
          <p className="mt-2.5 max-w-md text-sm text-slate-500 leading-relaxed">
            Your initialization instance lookup returned successfully. System configuration states are reflecting live gateway data parameters.
          </p>
        </div>

        {/* Live Hydrated Data Rows from your api payload */}
        <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 space-y-3.5">
          <div className="flex items-center justify-between text-xs border-b border-slate-200/60 pb-3">
            <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Receipt className="h-3.5 w-3.5" /> Core Gateway Receipt
            </span>
            <span className="font-mono text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-md">
              {paymentData.tx_ref}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Associated Asset Context</span>
            <span className="font-mono text-slate-900 text-xs max-w-[200px] truncate bg-slate-100 px-2 py-0.5 rounded">
              {paymentData.property_id}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm pt-1">
            <span className="text-slate-500 font-medium">Settled Amount</span>
            <span className="font-black text-slate-900">
              {paymentData.currency} {Number(paymentData.amount).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm pt-1">
            <span className="text-slate-500 font-medium">Gateway Protocol</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg flex items-center gap-1 text-xs">
              <ShieldCheck className="h-3 w-3" /> Chapa API Relay
            </span>
          </div>
        </div>

        {/* Primary Action Redirects */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/dashboard"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#002045] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#1a365d] transition shadow-md shadow-[#002045]/10"
          >
            Go to Dashboard Overview
            <ArrowRight className="h-4 w-4" />
          </Link>
          
          <Link
            href="/dashboard/listings"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Manage Listings
          </Link>
        </div>
      </div>
    </div>
  );
}