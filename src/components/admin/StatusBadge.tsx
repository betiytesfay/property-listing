interface StatusBadgeProps {
  status: 'approved' | 'pending' | 'rejected' | 'sold' | 'completed' | 'processing' | 'paid' | 'cancelled';
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusConfig = {
    approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
    pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
    sold: { color: 'bg-blue-100 text-blue-800', label: 'Sold' },
    completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
    processing: { color: 'bg-purple-100 text-purple-800', label: 'Processing' },
    paid: { color: 'bg-green-100 text-green-800', label: 'Paid' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex rounded-full font-medium ${sizeClasses[size]} ${config.color}`}>
      {config.label}
    </span>
  );
}