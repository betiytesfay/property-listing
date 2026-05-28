'use client';

import { useEffect } from 'react';
import { Home, Building, Users, ShoppingBag, Clock, TrendingUp, CheckCircle, Clock4, AlertCircle, type LucideIcon } from 'lucide-react';
import usePropertyStore from '@/src/store/adminPropertyStore';
import { useAdminCustomerStore } from '@/src/features/auth/store/adminCustomerStore';
import { useAdminOrderStore } from '@/src/features/auth/store/adminOrderStore';
import { useAdminStatsStore } from '@/src/features/auth/store/adminStatsStore';

type StatCardColor = 'blue' | 'green' | 'purple' | 'orange';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  color?: StatCardColor;
};

function StatCard({ title, value, icon: Icon, change, color = 'blue' }: StatCardProps) {
  const colors: Record<StatCardColor, { bg: string; icon: string }> = {
    blue: { bg: '#dbeafe', icon: '#1e40af' },
    green: { bg: '#dcfce7', icon: '#15803d' },
    purple: { bg: '#f3e8ff', icon: '#6b21a8' },
    orange: { bg: '#fed7aa', icon: '#f97316' },
  };
  const c = colors[color];
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="rounded p-2" style={{ backgroundColor: c.bg }}><Icon className="h-5 w-5" style={{ color: c.icon }} /></div>
        {change && <div className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>{change}</div>}
      </div>
      <p className="text-xs text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{typeof value === 'string' ? value : value.toLocaleString()}</p>
    </div>
  );
}

type StatusBadgeProps = {
  status: 'completed' | 'pending' | 'processing' | 'rejected' | string;
};

function StatusBadge({ status }: StatusBadgeProps) {
  const colors: Record<NonNullable<StatusBadgeProps['status']>, { bg: string; color: string }> = {
    completed: { bg: '#dcfce7', color: '#15803d' },
    pending: { bg: '#fef08a', color: '#92400e' },
    processing: { bg: '#dbeafe', color: '#1e40af' },
    rejected: { bg: '#fee2e2', color: '#991b1b' },
  };
  const c = colors[status as keyof typeof colors] || colors.pending;
  return <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: c.bg, color: c.color }}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

export default function AdminDashboardPage() {
  const { properties, fetchProperties, isLoading: propertiesLoading } = usePropertyStore();
  const { customers, fetchCustomers, isLoading: customersLoading } = useAdminCustomerStore();
  const { orders, fetchOrders, isLoading: ordersLoading } = useAdminOrderStore();
  const { stats, fetchStats, isLoading: statsLoading } = useAdminStatsStore();

  useEffect(() => {
    fetchProperties();
    fetchCustomers();
    fetchOrders();
    fetchStats();
  }, []);

  const isLoading = propertiesLoading || customersLoading || ordersLoading || statsLoading;
  if (isLoading) return <div className="flex items-center justify-center h-96"><div className="text-center"><div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-600 border-t-transparent" /><p className="mt-4 text-sm text-gray-500">Loading…</p></div></div>;

  const pending = properties.filter(p => p.adminStatus === 'pending').slice(0, 5);
  const recentCustomers = customers.slice(0, 4);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm md:text-base text-gray-600">Welcome back — here's your property overview</p>
      </div>

      <div className="px-4 md:px-6 lg:px-8 pb-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          <StatCard title="Properties" value={stats?.totalProperties ?? properties.length} icon={Home} change="+12%" color="blue" />
          <StatCard title="Available" value={properties.filter(p => p.status === 'available').length} icon={Building} color="green" />
          <StatCard title="Customers" value={stats?.totalCustomers ?? customers.length} icon={Users} change="+8%" color="purple" />
          <StatCard title="Orders" value={stats?.totalOrders ?? orders.length} icon={ShoppingBag} change="+15%" color="blue" />
          <StatCard title="Pending" value={stats?.pendingApprovals ?? pending.length} icon={Clock} color="orange" />
        </div>

        {/* Revenue Banner */}
        <div className="rounded-lg shadow-sm p-6 md:p-8 text-white overflow-hidden" style={{ backgroundColor: '#1e3a5f' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs md:text-sm font-medium uppercase tracking-wider opacity-90">Total Revenue</p>
              <p className="mt-2 text-3xl md:text-4xl font-bold">${((stats?.totalRevenue ?? 0) / 1_000_000).toFixed(1)}M</p>
              <div className="mt-3 flex items-center gap-1.5 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span style={{ color: '#f97316' }}>{stats?.revenueChange ?? '+23%'}</span>
                <span>this month</span>
              </div>
            </div>
            <div className="hidden md:flex items-end gap-1 h-20">
              {[30, 50, 40, 70, 55, 80, 65, 100].map((h, i) => <div key={i} className="w-1.5 rounded-t" style={{ height: `${h}%`, background: i === 7 ? 'rgba(249, 115, 22, 0.6)' : 'rgba(249, 115, 22, 0.2)' }} />)}
            </div>
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm md:text-base font-semibold text-gray-900">Pending Approvals</h2>
              <p className="text-xs text-gray-600 mt-1">Properties awaiting review</p>
            </div>
            <div className="divide-y divide-gray-100">
              {pending.length === 0 ? (
                <p className="px-6 py-8 text-center text-sm text-gray-500">No pending approvals</p>
              ) : (
                pending.map(p => (
                  <div key={p.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">{p.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{p.location}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-semibold" style={{ color: '#f97316' }}>${p.price.toLocaleString()}</span>
                      <StatusBadge status={p.adminStatus} />
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
              <a href="/admin/properties/pending" className="text-xs font-medium" style={{ color: '#f97316' }}>View all →</a>
            </div>
          </div>

          {/* Customers */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm md:text-base font-semibold text-gray-900">New Customers</h2>
              <p className="text-xs text-gray-600 mt-1">Recently joined</p>
            </div>
            <div className="divide-y divide-gray-100">
              {recentCustomers.map(c => (
                <div key={c.id} className="px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0" style={{ backgroundColor: '#f97316' }}>
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-600 truncate">{c.email}</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded whitespace-nowrap" style={{ backgroundColor: c.type === 'seller' ? '#fed7aa' : '#dbeafe', color: c.type === 'seller' ? '#92400e' : '#1e40af' }}>
                    {c.type}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
              <a href="/admin/customers" className="text-xs font-medium" style={{ color: '#f97316' }}>View all →</a>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm md:text-base font-semibold text-gray-900">Recent Orders</h2>
            <p className="text-xs text-gray-600 mt-1">Latest transactions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase hidden lg:table-cell">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-xs text-gray-600 font-mono">{o.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{o.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">{o.propertyTitle}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${o.amount.toLocaleString()}</td>
                    <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
            <a href="/admin/orders" className="text-xs font-medium" style={{ color: '#f97316' }}>View all →</a>
          </div>
        </div>
      </div>
    </div>
  );
}