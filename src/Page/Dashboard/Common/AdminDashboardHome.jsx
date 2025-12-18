import React from 'react'
import { PieChart, Pie, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const KPI = ({ title, value, hint }) => (
  <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-semibold mt-2" style={{ color: '#4c4452' }}>{value}</div>
    {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
  </div>
)

const RecentOrdersTable = ({ orders = [], onRefresh }) => (
  <div className="bg-white rounded-2xl p-4 shadow border border-gray-100">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold">Recent Orders</h3>
      <button onClick={onRefresh} className="text-sm px-3 py-1 border rounded">Refresh</button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500">
            <th className="py-2">Order</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Status</th>
            <th className="py-2">Tracking</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border-t">
              <td className="py-2">{order.name}</td>
              <td className="py-2">{order.customer}</td>
              <td className="py-2">${order.price}</td>
              <td className="py-2">{order.status}</td>
              <td className="py-2">{order.trackingId || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const AdminDashboardHome = () => {
  const kpi = {
    totalOrders: 1248,
    pending: 34,
    delivered: 1187,
    revenue: 98765.50,
  }

  const deliveryStats = [
    { status: 'Pending', count: 34 },
    { status: 'In Transit', count: 27 },
    { status: 'Out for Delivery', count: 12 },
    { status: 'Delivered', count: 1175 },
  ]

  const recentOrders = [
    { _id: 'o_1', name: 'Classic Shirt', customer: 'Ayesha R.', price: 49, status: 'Pending', trackingId: null },
    { _id: 'o_2', name: 'Tailored Coat', customer: 'Rafi A.', price: 129, status: 'In Transit', trackingId: 'PRCL-20251219-1A2B3C' },
    { _id: 'o_3', name: 'Linen Trousers', customer: 'Mina K.', price: 79, status: 'Delivered', trackingId: 'PRCL-20251218-4D5E6F' },
    { _id: 'o_4', name: 'Summer Dress', customer: 'Sadia N.', price: 69, status: 'Out for Delivery', trackingId: 'PRCL-20251219-7G8H9I' },
  ]

  const ordersByDay = [
    { day: '2025-12-14', count: 18 },
    { day: '2025-12-15', count: 22 },
    { day: '2025-12-16', count: 15 },
    { day: '2025-12-17', count: 28 },
    { day: '2025-12-18', count: 30 },
    { day: '2025-12-19', count: 12 },
  ]

  const pieData = deliveryStats.map(s => ({ name: s.status, value: s.count }))
  const barData = ordersByDay.map(d => ({ name: d.day, orders: d.count }))

  const noopRefresh = () => {}

  return (
      <div className="container mx-auto px-4 sm:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
            </div>

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPI title="Total Orders" value={kpi.totalOrders} hint="All time" />
          <KPI title="Pending Orders" value={kpi.pending} hint="Needs attention" />
          <KPI title="Delivered" value={kpi.delivered} hint="Completed deliveries" />
          <KPI title="Revenue" value={`$${kpi.revenue.toLocaleString()}`} hint="All time revenue" />
        </div>

        {/* Charts + recent orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <RecentOrdersTable orders={recentOrders} onRefresh={noopRefresh} />

            <div className="bg-white rounded-2xl p-4 shadow border border-gray-100">
              <h3 className="font-semibold mb-3">Orders by day</h3>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#4c4452" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 shadow border border-gray-100">
              <h3 className="font-semibold mb-3">Delivery status</h3>
              <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={80} label />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow border border-gray-100">
              <h3 className="font-semibold mb-3">Quick actions</h3>
              <div className="flex flex-col gap-3">
                <button className="px-4 py-2 bg-primary text-white rounded">Create product</button>
                <button className="px-4 py-2 border rounded" onClick={noopRefresh}>Refresh data</button>
                <button className="px-4 py-2 border rounded">Export CSV</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AdminDashboardHome
