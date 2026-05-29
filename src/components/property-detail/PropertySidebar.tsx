"use client";

import { useState } from "react";
import { Phone, CalendarDays, Share2, Calculator } from "lucide-react";
import { normaliseListingType, formatPrice } from "@/src/lib/api/property";
import type { PropertyResponse } from "@/src/lib/api/property";

interface Props {
  property: PropertyResponse;
}

const LOAN_TERMS = [10, 15, 20, 25];
const ANNUAL_RATE = 0.12;
const DOWN_PAYMENT_PCT = 0.2;

function calcMonthly(priceStr: string, years: number): number {
  const price = parseFloat(priceStr);
  if (isNaN(price)) return 0;
  const principal = price * (1 - DOWN_PAYMENT_PCT);
  const r = ANNUAL_RATE / 12;
  const n = years * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function formatETB(n: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(n);
}

export function PropertySidebar({ property }: Props) {
  const [loanYears, setLoanYears] = useState(20);
  const [copied, setCopied] = useState(false);

  const status = normaliseListingType(property.listing_type);
  const isRent = status === "rent";
  const monthly = !isRent ? calcMonthly(property.price, loanYears) : null;
  const downPayment = !isRent ? parseFloat(property.price) * DOWN_PAYMENT_PCT : null;

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-4">
      {/* Price + CTAs */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
        <div className="border-b border-stone-100 bg-stone-50/60 px-6 py-5">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400 font-sans">
            {isRent ? "Monthly Rent" : "Listing Price"}
          </p>
          <p className="font-serif text-3xl font-light text-stone-900">
            {formatPrice(property.price, property.listing_type)}
          </p>
          <p className="mt-0.5 text-xs text-stone-400 font-sans">
            {isRent ? "per month" : "Negotiable"}
          </p>
        </div>

        <div className="space-y-2.5 px-6 py-5">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3.5 text-sm font-bold text-white font-sans transition hover:bg-stone-800 active:scale-[0.98]">
            <Phone size={15} />
            Contact Owner
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3.5 text-sm font-bold text-amber-800 font-sans transition hover:bg-amber-100 active:scale-[0.98]">
            <CalendarDays size={15} />
            Book a Viewing
          </button>

          <button
            onClick={handleShare}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm font-semibold text-stone-600 font-sans transition hover:bg-stone-50 active:scale-[0.98]"
          >
            <Share2 size={15} />
            {copied ? "Link copied!" : "Share Listing"}
          </button>
        </div>
      </div>

      {/* Financing estimator — sale only */}
      {!isRent && monthly !== null && downPayment !== null && (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div className="flex items-center gap-2 border-b border-stone-100 px-6 py-4">
            <Calculator size={14} className="text-stone-400" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500 font-sans">
              Financing Estimator
            </h3>
          </div>

          <div className="space-y-4 px-6 py-5">
            <div className="flex items-center justify-between text-sm font-sans">
              <span className="text-stone-500">Down payment (20%)</span>
              <span className="font-semibold text-stone-800">{formatETB(downPayment)}</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-stone-400 font-sans">Loan term</p>
              <div className="grid grid-cols-4 gap-1.5">
                {LOAN_TERMS.map((y) => (
                  <button
                    key={y}
                    onClick={() => setLoanYears(y)}
                    className={`rounded-lg py-2 text-xs font-bold font-sans transition ${
                      loanYears === y
                        ? "bg-stone-900 text-white"
                        : "border border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {y}yr
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400 font-sans">
                Est. monthly payment
              </p>
              <p className="font-serif text-2xl text-stone-900">{formatETB(monthly)}</p>
              <p className="mt-1 text-[10px] text-stone-400 font-sans">
                At {(ANNUAL_RATE * 100).toFixed(0)}% annual rate · estimate only
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Listing meta */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white px-6 py-4 space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400 font-sans">
          Listing info
        </p>
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="text-stone-500">Reference</span>
          <span className="font-mono text-stone-700">{property.property_id.slice(0, 8).toUpperCase()}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="text-stone-500">Status</span>
          <span className={`font-semibold ${property.is_active ? "text-emerald-600" : "text-stone-400"}`}>
            {property.is_active ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="text-stone-500">Verified</span>
          <span className={`font-semibold ${property.listing_fee_paid ? "text-amber-600" : "text-stone-400"}`}>
            {property.listing_fee_paid ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
}
