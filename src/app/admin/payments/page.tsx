'use client';

import { useState } from 'react';
import { orders, getPendingPayments } from '../../../data/dummyProperties';
import StatusBadge from '../../../components/admin/StatusBadge';
import { Search, DollarSign, CheckCircle, Clock } from 'lucide-react';

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const pendingPayments = getPendingPayments();
  const completedPayments = orders.filter(o => o.paymentStatus === 'paid');

  const handleMarkAsPaid = (id: string) => {
    alert(`Payment ${id} marked as paid!`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-sm text-gray-500">Track and manage payment transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-linear-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Pending Payments</p>
              <p className="text-3xl font-bold mt-1">{pendingPayments.length}</p>
              <p className="text-sm mt-2">Total: ${pendingPayments.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}</p>
            </div>
            <Clock className="w-12 h-12 text-white/50" />
          </div>
        </div>
        <div className="bg-linear-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Completed Payments</p>
              <p className="text-3xl font-bold mt-1">{completedPayments.length}</p>
              <p className="text-sm mt-2">Total: ${completedPayments.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}</p>
            </div>
            <DollarSign className="w-12 h-12 text-white/50" />
          </div>
        </div>
      </div>

      {/* Pending Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-yellow-50">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Clock className="w-5 h-5 text-yellow-600" /> Pending Payments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Order ID</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Property</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingPayments.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono">{order.id}</td>
                  <td className="px-6 py-4 text-sm">{order.propertyTitle}</td>
                  <td className="px-6 py-4 text-sm">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm font-semibold">${order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleMarkAsPaid(order.id)} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                      <CheckCircle className="w-4 h-4" /> Mark Paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Completed Payments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Completed Payments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Order ID</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Property</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {completedPayments.slice(0, 10).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono">{order.id}</td>
                  <td className="px-6 py-4 text-sm">{order.propertyTitle}</td>
                  <td className="px-6 py-4 text-sm font-semibold">${order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><StatusBadge status="completed" size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}