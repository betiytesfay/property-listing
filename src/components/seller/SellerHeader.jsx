"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import AddNewPropertyModal from "./AddNewPropertyModal";

function SellerHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-gray-900">
          Seller Dashboard
        </h2>

        <p className="text-xs tracking-wide capitalize text-gray-700">
          Welcome back, Abebe, here&apos;s what&apos;s happening with your
          properties
        </p>
      </div>

      <button
        className="rounded-md bg-amber-300 px-3 py-2 text-sm"
        onClick={handleClick}
      >
        + Add new property
      </button>
      {isOpen &&
        createPortal(
          <AddNewPropertyModal onClose={() => setIsOpen(false)} />,
          document.body,
        )}
    </div>
  );
}

export default SellerHeader;
