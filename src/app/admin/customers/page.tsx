'use client';

import { useEffect } from 'react';
import { Mail, Phone, Calendar, DollarSign, Home, Users } from 'lucide-react';
import { useAdminCustomerStore } from '@/src/features/auth/store/adminCustomerStore';
import StatusBadge from '@/src/components/admin/StatusBadge';

export default function AdminCustomersPage() {
  const { customers, fetchCustomers, isLoading } = useAdminCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1">Manage all registered customers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Buyers</p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.filter(c => c.type === 'buyer' || c.type === 'both').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sellers</p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.filter(c => c.type === 'seller' || c.type === 'both').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Customers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Contact</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Type</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Joined</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Properties</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-semibold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${customer.type === 'buyer' ? 'bg-blue-100 text-blue-700' :
                        customer.type === 'seller' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                      }`}>
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" />
                      {new Date(customer.joinedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {customer.propertiesCount}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ${customer.totalSpent.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}