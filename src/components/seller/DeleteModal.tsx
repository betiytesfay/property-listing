"use client";

import { useState } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";

type Listing = {
  name: string;
  image?: string;
  location?: string;
  price?: string;
  status?: string;
};

type DeleteModalProps = {
  listing: Listing | null;
  onClose: () => void;
  onDelete: (listing: Listing) => void;
};

export function DeleteModal({ listing, onClose, onDelete }: DeleteModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!listing) return;
    setDeleting(true);
    await new Promise<void>((r) => setTimeout(r, 600));
    onDelete(listing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Delete listing
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <FiTrash2 size={20} />
          </div>

          <p className="text-sm font-semibold text-slate-800">
            Delete &quot;{listing?.name}&quot;?
          </p>

          <p className="mt-1 text-xs text-slate-500">
            This action cannot be undone.
          </p>

          {/* Preview */}
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-left">
            {listing?.image && (
              <img
                src={listing.image}
                alt={listing.name}
                className="h-10 w-10 rounded-lg object-cover"
              />
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">
                {listing?.name}
              </p>
              <p className="truncate text-xs text-slate-400">
                {listing?.location} · {listing?.price}
              </p>
            </div>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
              {listing?.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
