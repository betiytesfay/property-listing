'use client';

import { Customer } from '../../types';
import { Mail, Phone, DollarSign } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Customer</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Contact</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Type</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Orders</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Total Spent</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange font-semibold">
                    {customer.name.charAt(0)}
                  </div>
                  <p className="text-sm font-medium text-gray-800">{customer.name}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-gray-600 flex items-center gap-1"><Mail className="w-3 h-3" /> {customer.email}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" /> {customer.phone}</p>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${customer.type === 'seller' ? 'bg-blue-50 text-blue-600' : customer.type === 'buyer' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'}`}>
                  {customer.type}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{customer.totalOrders}</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-800 flex items-center gap-1"><DollarSign className="w-3 h-3" /> {customer.totalSpent.toLocaleString()}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{new Date(customer.joinedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}