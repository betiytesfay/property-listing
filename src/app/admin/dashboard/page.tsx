'use client';

import { Home, Users, ShoppingBag, Clock, DollarSign, TrendingUp } from 'lucide-react';
import StatCard from '../../../components/admin/StatCard';
import StatusBadge from '../../../components/admin/StatusBadge';
import { dashboardStats, properties, orders, customers } from '../../../data/dummyProperties';

export default function DashboardPage() {
  // Get recent pending properties
  const pendingProperties = properties.filter(p => p.adminStatus === 'pending').slice(0, 5);

  // Get recent customers
  const recentCustomers = customers.slice(0, 4);

  // Get recent orders
  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Welcome back, John! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="Total Properties"
          value={dashboardStats.totalProperties}
          icon={Home}
          change="+12%"
          changeType="up"
        />
        <StatCard
          title="Customers"
          value={dashboardStats.totalCustomers}
          icon={Users}
          change="+8%"
          changeType="up"
        />
        <StatCard
          title="Orders"
          value={dashboardStats.totalOrders}
          icon={ShoppingBag}
          change="+15%"
          changeType="up"
        />
        <StatCard
          title="Pending Approvals"
          value={dashboardStats.pendingApprovals}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Total Revenue"
          value={`$${(dashboardStats.totalRevenue / 1000).toFixed(0)}k`}
          icon={DollarSign}
          change="+23%"
          changeType="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects / Pending Approvals Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Pending Approvals</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Properties waiting for your review</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Project Title</th>
                  <th className="text-left px-6 py-3 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Department</th>
                  <th className="text-left px-6 py-3 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-primary)' }}>{property.title}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{property.sellerName}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={property.adminStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-gray-100">
            <a href="/admin/properties/pending" className="text-sm text-orange hover:underline">View all pending →</a>
          </div>
        </div>

        {/* New Customers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>New Customers</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Recently joined users</p>
          </div>
          <div className="divide-y divide-gray-100">
            {recentCustomers.map((customer) => (
              <div key={customer.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange font-semibold">
                  {customer.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{customer.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{customer.type}</p>
                </div>
                <button className="text-sm text-orange hover:underline">View</button>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t border-gray-100">
            <a href="/admin/customers" className="text-sm text-orange hover:underline">View all customers →</a>
          </div>
        </div>
      </div>

      {/* Income / Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-linear-to-r from-orange to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Total Income</p>
              <p className="text-3xl font-bold mt-1">${(dashboardStats.totalRevenue / 1000).toFixed(0)}k</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-white/80">
                <TrendingUp className="w-4 h-4" />
                <span className="text-white/80 text-sm">+23% this month</span>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Orders</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Latest transactions across all properties</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Order ID</th>
                    <th className="text-left px-6 py-3 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Property</th>
                    <th className="text-left px-6 py-3 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Amount</th>
                    <th className="text-left px-6 py-3 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>#{order.id}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-primary)' }}>{order.customerName}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{order.propertyTitle}</td>
                      <td className="px-6 py-4 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>${order.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-gray-100">
              <a href="/admin/orders" className="text-sm text-orange hover:underline">View all orders →</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}