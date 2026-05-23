"use client";

import { useEffect, useState } from "react";
import { MailCheck } from "lucide-react";
import { useAuth } from "@/src/features/auth/hooks/use-auth";

const SUPPORT_EMAIL = "support@brokerbiddingplatform.com";

export default function SupportPage() {
  const { user } = useAuth();
  const [ticket, setTicket] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (user) {
      setTicket((current) => ({
        ...current,
        fullName: user.fullName || "",
        email: user.email,
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ticket.subject.trim() || !ticket.message.trim() || !ticket.email.trim()) {
      setStatus("error");
      return;
    }

    setIsSending(true);
    setStatus("idle");

    try {
      const subject = encodeURIComponent(ticket.subject.trim());
      const body = encodeURIComponent(
        `Name: ${ticket.fullName}
Email: ${ticket.email}
Phone: ${ticket.phone || "N/A"}

${ticket.message.trim()}`,
      );
      window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#002045]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#002045]">
          Help Desk
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">Priority Support</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Send a support request that includes your owner contact details. We&apos;ll route this directly to the operations team.
        </p>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <MailCheck className="h-5 w-5 text-slate-500" />
          <div>
            <h2 className="text-lg font-bold text-slate-900">Create a support message</h2>
            <p className="text-sm text-slate-500">Your message will prefill with your signed-in owner details and open in your mail client.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Full Name</label>
              <input
                type="text"
                value={ticket.fullName}
                onChange={(e) => setTicket((prev) => ({ ...prev, fullName: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#002045] focus:bg-white"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Email Address</label>
              <input
                type="email"
                value={ticket.email}
                onChange={(e) => setTicket((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#002045] focus:bg-white"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Phone</label>
              <input
                type="tel"
                value={ticket.phone}
                onChange={(e) => setTicket((prev) => ({ ...prev, phone: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#002045] focus:bg-white"
                placeholder="+251 91 123 4567"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Subject</label>
              <input
                type="text"
                value={ticket.subject}
                onChange={(e) => setTicket((prev) => ({ ...prev, subject: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#002045] focus:bg-white"
                placeholder="Describe your issue in one line"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Message</label>
            <textarea
              rows={6}
              value={ticket.message}
              onChange={(e) => setTicket((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Detail the issue you are facing, include property IDs, payment references, or anything that helps us respond faster."
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#002045] focus:bg-white resize-none"
              required
            />
          </div>

          {status === "success" && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
              Your support draft is ready. If your email client did not open automatically, use <strong>{SUPPORT_EMAIL}</strong>.
            </div>
          )}

          {status === "error" && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
              We could not open your mail client. Please copy the email address below and send your message manually.
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold">Support email</p>
            <p>{SUPPORT_EMAIL}</p>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="inline-flex items-center justify-center rounded-2xl bg-[#002045] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00152e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? "Opening mail client..." : "Contact support"}
          </button>
        </form>
      </section>
    </div>
  );
}
