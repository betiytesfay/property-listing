'use client';

import { Order } from '../../types';
import StatusBadge from './StatusBadge';
import { Eye } from 'lucide-react';

interface OrderTableProps {
  orders: Order[];
  onView?: (id: string) => void;
}

export default function OrderTable({ orders, onView }: OrderTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Order ID</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Property</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Customer</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Amount</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Status</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Payment</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Date</th>
            {onView && <th className="text-left px-6 py-3 text-xs font-medium text-gray-500"></th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-mono text-gray-600">{order.id}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{order.propertyTitle}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.customerName}</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-800">${order.amount.toLocaleString()}</td>
              <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
              <td className="px-6 py-4"><StatusBadge status={order.paymentStatus === 'paid' ? 'completed' : 'processing'} /></td>
              <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
              {onView && (
                <td className="px-6 py-4">
                  <button onClick={() => onView(order.id)} className="p-1 rounded hover:bg-gray-100">
                    <Eye className="w-5 h-5 text-gray-400" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}