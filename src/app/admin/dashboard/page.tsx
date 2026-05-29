'use client';

import { useEffect } from 'react';
import { Home, Building, Clock, Users, ShoppingBag, TrendingUp } from 'lucide-react';

import StatCard from '@/src/components/admin/StatCard';
import StatusBadge from '@/src/components/admin/StatusBadge';

import usePropertyStore from '@/src/store/adminPropertyStore';
import { useAdminCustomerStore } from '@/src/features/auth/store/adminCustomerStore';
import { useAdminOrderStore } from '@/src/features/auth/store/adminOrderStore';
import { useAdminStatsStore } from '@/src/features/auth/store/adminStatsStore';

export default function AdminDashboardPage() {
  const { properties = [], fetchProperties, isLoading: propertiesLoading } = usePropertyStore();
  const { customers = [], fetchCustomers, isLoading: customersLoading } = useAdminCustomerStore();
  const { orders = [], fetchOrders, isLoading: ordersLoading } = useAdminOrderStore();
  const { stats, fetchStats, isLoading: statsLoading } = useAdminStatsStore();

  useEffect(() => {
    fetchProperties();
    fetchCustomers();
    fetchOrders();
    fetchStats();
  }, [fetchProperties, fetchCustomers, fetchOrders, fetchStats]);

  const isLoading =
    propertiesLoading || customersLoading || ordersLoading || statsLoading;

  const pendingProperties = (properties || [])
    .filter(p => p.adminStatus === 'pending')
    .slice(0, 5);

  const recentCustomers = (customers || []).slice(0, 4);
  const recentOrders = (orders || []).slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-amber-600 border-t-transparent mx-auto" />
          <p className="mt-4 text-sm text-gray-500">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, Admin — here’s what’s happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Total properties" value={stats?.totalProperties ?? properties.length} icon={Home} />
        <StatCard title="Available" value={properties.filter(p => p.status === 'available').length} icon={Building} />
        <StatCard title="Customers" value={stats?.totalCustomers ?? customers.length} icon={Users} />
        <StatCard title="Orders" value={stats?.totalOrders ?? orders.length} icon={ShoppingBag} />
        <StatCard title="Pending" value={stats?.pendingApprovals ?? pendingProperties.length} icon={Clock} />
      </div>

      {/* Revenue */}
      <div className="rounded-xl px-6 py-8 flex items-center justify-between shadow-lg bg-[#1e3a5f]">
        <div>
          <p className="text-xs uppercase text-gray-300">Total revenue</p>
          <p className="mt-2 text-4xl font-bold text-white">
            ${((stats?.totalRevenue ?? 0) / 1_000_000).toFixed(1)}M
          </p>
          <div className="mt-3 text-sm text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-orange-400">{stats?.revenueChange ?? '+0%'}</span>
          </div>
        </div>
      </div>

      {/* Pending + Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pending */}
        <div className="bg-white border rounded-xl p-4">
          <h2 className="font-semibold">Pending approvals</h2>

          <div className="mt-3 space-y-3">
            {pendingProperties.length === 0 ? (
              <p className="text-sm text-gray-500">No pending approvals</p>
            ) : (
              pendingProperties.map(p => (
                <div key={p.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-gray-500">{p.location}</p>
                  </div>
                  <StatusBadge status={p.adminStatus} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white border rounded-xl p-4">
          <h2 className="font-semibold">New customers</h2>

          <div className="mt-3 space-y-3">
            {recentCustomers.map(c => (
              <div key={c.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.email}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-gray-100">
                  {c.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="bg-white border rounded-xl p-4">
        <h2 className="font-semibold">Recent orders</h2>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {recentOrders.map(o => (
                <tr key={o.id} className="border-t">
                  <td className="py-2">{o.customerName}</td>
                  <td>{o.propertyTitle}</td>
                  <td>${o.amount}</td>
                  <td>
                    <StatusBadge status={o.status} />
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