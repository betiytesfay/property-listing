'use client';

import { useState } from 'react';
import { orders, properties } from '@/lib/data';
import StatusBadge from '@/components/admin/StatusBadge';
import { Search, Eye } from 'lucide-react';

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o =>
    o.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.amount, 0);
  const completedOrders = filteredOrders.filter(o => o.status === 'completed').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-gray-500">Track and manage all property orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold">{filteredOrders.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Completed Orders</p>
          <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-orange">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 max-w-md">
        <Search className="w-5 h-5 text-gray-400" />
        <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="outline-none text-sm w-full" />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono">{order.id}</td>
                  <td className="px-6 py-4 text-sm">{order.propertyTitle}</td>
                  <td className="px-6 py-4 text-sm">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm font-semibold">${order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-4"><StatusBadge status={order.paymentStatus === 'paid' ? 'completed' : 'processing'} /></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><button className="p-1 rounded hover:bg-gray-100"><Eye className="w-5 h-5 text-gray-400" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}