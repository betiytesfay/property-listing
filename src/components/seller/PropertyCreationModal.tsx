"use client";

import { X } from "lucide-react";
import { PropertyCreationForm } from "./PropertyCreationForm";

interface PropertyCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PropertyCreationModal({ isOpen, onClose }: PropertyCreationModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Viewport Layer */}
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Locked Structural Header */}
          <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl font-bold text-[#002045]">List New Property</h2>
              <p className="text-xs text-slate-500 mt-0.5">Step-by-step marketplace builder</p>
            </div>
            <button
                title="Close Modal"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Core Scroll Window Context */}
          <div className="p-8 overflow-y-auto flex-1 bg-slate-50/50">
            <PropertyCreationForm onClose={onClose} />
          </div>
        </div>
      </div>
    </>
  );
}