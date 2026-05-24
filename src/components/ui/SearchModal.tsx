"use client";

import { X } from "lucide-react";
import { SearchBar } from "./SearchBar";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 shadow-xl">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="pb-6 px-6">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}