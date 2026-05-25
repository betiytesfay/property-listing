"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import apiClient from "@/src/lib/api/client";

interface HealthResponse {
  status: string;
  database: string;
  detail?: string;
}

export function DatabaseStatusBanner() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkHealth() {
      try {
        const { data } = await apiClient.get<HealthResponse>("/health");
        if (cancelled) {
          return;
        }

        if (data.database !== "connected") {
          
        } else {
          setMessage(null);
        }
      } catch {
        if (!cancelled) {
          setMessage("Service temporarily unavailable. Please try again later.");
        }
      }
    }

    void checkHealth();
    const interval = window.setInterval(() => void checkHealth(), 15000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950"
    >
      <div className="mx-auto flex max-w-3xl items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
        <p>{message}</p>
      </div>
    </div>
  );
}
