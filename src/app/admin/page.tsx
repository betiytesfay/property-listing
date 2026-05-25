'use client'

import { useEffect } from 'react'
import { Home, Building, DollarSign, Eye } from 'lucide-react'
import usePropertyStore from '../../store/adminPropertyStore'
import StatCard from '../../components/admin/StatCard'

export default function AdminDashboard() {
  const { properties, fetchProperties, isLoading } = usePropertyStore()

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  const stats = {
    total: properties.length,
    available: properties.filter((p) => p.status === 'available').length,
    sold: properties.filter((p) => p.status === 'sold').length,
    rented: properties.filter((p) => p.status === 'rented').length,
  }

  const totalValue = properties.reduce((sum, p) => sum + p.price, 0)

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Properties"
          value={stats.total}
          icon={Home}
          color="blue"
        />
        <StatCard
          title="Available"
          value={stats.available}
          icon={Building}
          color="blue"
        />
        <StatCard
          title="Sold/Rented"
          value={stats.sold + stats.rented}
          icon={DollarSign}
          color="orange"
        />
        <StatCard
          title="Total Value"
          value={`$${totalValue.toLocaleString()}`}
          icon={Eye}
          color="blue"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Properties</h2>
        <div className="space-y-3">
          {properties.slice(0, 5).map((property) => (
            <div
              key={property.id}
              className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{property.title}</p>
                <p className="text-sm text-gray-500">{property.location}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${property.price.toLocaleString()}</p>
                <p className={`text-sm ${property.status === 'available' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {property.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}