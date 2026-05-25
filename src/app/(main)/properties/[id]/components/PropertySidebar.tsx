"use client";
import { useState } from "react";
import { MdCall, MdCalendarMonth, MdShare, MdCalculate } from "react-icons/md";

type Props = {
  price: number;
  status: "rent" | "sell";
  agent: { name: string; avatar: string; isVerified: boolean };
};

export default function PropertySidebar({ price, status, agent }: Props) {
  const [downPercent, setDownPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(20);

  const downPayment = (price * downPercent) / 100;
  const loanAmount = price - downPayment;
  const monthlyRate = 0.08 / 12;
  const months = loanTerm * 12;
  const monthlyPayment =
    loanAmount > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
      : 0;

  const formatETB = (value: number) => `ETB ${value.toLocaleString()}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-[#c4c6cf] space-y-8 sticky top-24">
      {/* Price */}
      <div>
        <span className="text-[12px] leading-[16px] font-semibold uppercase tracking-widest text-[#43474e] mb-1 block">
          Listing Price
        </span>
        <div className="flex items-baseline gap-2">
          <h2 className="text-[32px] leading-[40px] font-semibold text-[#002045]">
            {formatETB(price)}
          </h2>
          <span className="text-[16px] leading-[24px] font-normal text-[#43474e]">
            Negotiable
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-[#002045] text-white py-4 rounded-lg font-bold text-[14px] leading-[20px] tracking-[0.01em] flex items-center justify-center gap-2 hover:bg-[#1a365d] transition-colors">
          <MdCall className="text-[20px]" />
          Contact Owner
        </button>
        <button className="w-full bg-[#735c00] text-[#002045] py-4 rounded-lg font-bold text-[14px] leading-[20px] tracking-[0.01em] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <MdCalendarMonth className="text-[20px]" />
          Book Viewing
        </button>
        <button className="w-full border border-[#002045] text-[#002045] py-4 rounded-lg font-bold text-[14px] leading-[20px] tracking-[0.01em] flex items-center justify-center gap-2 hover:bg-[#f3f4f5] transition-colors">
          <MdShare className="text-[20px]" />
          Share Listing
        </button>
      </div>

      <hr className="border-[#c4c6cf]" />

      {/* Financing Estimator */}
      <div className="space-y-4">
        <h4 className="text-[14px] leading-[20px] font-medium text-[#002045] flex items-center gap-2 uppercase tracking-wide">
          <MdCalculate className="text-[20px]" />
          Financing Estimator
        </h4>
        <div className="space-y-4">
          <div>
            <label className="text-[12px] leading-[16px] font-semibold block mb-1 text-[#43474e]">
              Down Payment ({downPercent}%)
            </label>
            <div className="p-3 bg-[#f3f4f5] rounded border border-[#c4c6cf] text-[16px] leading-[24px] font-normal text-[#191c1d]">
              {formatETB(downPayment)}
            </div>
          </div>
          <div>
            <label className="text-[12px] leading-[16px] font-semibold block mb-1 text-[#43474e]">
              Loan Term
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full p-3 bg-white rounded border border-[#c4c6cf] text-[16px] leading-[24px] font-normal text-[#191c1d]"
            >
              <option value={15}>15 Years</option>
              <option value={20}>20 Years</option>
              <option value={25}>25 Years</option>
            </select>
          </div>
          <div className="p-4 bg-[#735c00]/10 rounded-lg border border-[#735c00]/20">
            <span className="text-[12px] leading-[16px] font-semibold block text-[#735c00] uppercase">
              Estimated Monthly
            </span>
            <span className="text-[24px] leading-[32px] font-semibold text-[#002045]">
              {formatETB(Math.round(monthlyPayment))}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-[#c4c6cf]" />

      {/* Agent */}
      <div className="flex items-center gap-3 p-4 bg-[#f3f4f5] rounded-lg">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-[14px] leading-[20px] font-bold text-[#002045]">
            {agent.name}
          </div>
          <div className="text-[12px] leading-[16px] font-semibold text-[#43474e]">
            {agent.isVerified ? "✅ Verified Premier Agent" : "Licensed Agent"}
          </div>
        </div>
      </div>
    </div>
  );
}