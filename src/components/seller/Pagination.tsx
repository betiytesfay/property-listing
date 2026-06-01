type PaginationProps = {
  showing: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export default function Pagination({
  showing,
  total,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 px-6 py-4">
      <p className="text-sm text-slate-400">
        Showing {showing} of {total} listings
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
            canPrev
              ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
          }`}
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={!canNext}
          className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
            canNext
              ? "bg-slate-800 hover:bg-slate-700"
              : "cursor-not-allowed bg-slate-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
