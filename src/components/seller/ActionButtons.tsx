import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionButtons({
  onEdit,
  onDelete,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <button 
      title="edit"
        onClick={onEdit}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-500"
      >
        <FiEdit2 size={14} />
      </button>

      <button
      title="trash"
        onClick={onDelete}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500"
      >
        <FiTrash2 size={14} />
      </button>
    </div>
  );
}
