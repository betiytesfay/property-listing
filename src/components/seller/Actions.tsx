interface ActionsProps {
  onClose: () => void;
  isEditMode: boolean;
}

export function Actions({ onClose, isEditMode }: ActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={onClose}
        className="rounded-md border px-4 py-2 text-sm"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="rounded-md bg-amber-500 px-4 py-2 text-sm text-white"
      >
        {isEditMode ? "Edit Property" : "Add Property"}
      </button>
    </div>
  );
}
