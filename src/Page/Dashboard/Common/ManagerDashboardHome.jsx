import React from 'react'
import { PieChart, Pie, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import Container from '../../../Components/Shared/Container'

const KPI = ({ title, value, hint }) => (
    <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold mt-2" text-primary>{value}</div>
        {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
)

const ProductionQueue = ({ items = [] }) => (
    <div className="bg-white rounded-2xl p-4 shadow border border-gray-100">
        <h3 className="font-semibold mb-3">Production Queue</h3>
        <div className="space-y-3">
            {items.map(i => (
                <div key={i.id} className="flex items-center justify-between">
                    <div>
                        <div className="font-medium">{i.product}</div>
                        <div className="text-xs text-gray-500">{i.stage}</div>
                    </div>
                    <div className="text-sm text-gray-600">{i.due}</div>
                </div>
            ))}
        </div>
    </div>
)

const RecentOrders = ({ orders = [] }) => (
    <div className="bg-white rounded-2xl p-4 shadow border border-gray-100">
        <h3 className="font-semibold mb-3">Recent Orders</h3>
        <div className="space-y-2 text-sm">
            {orders.map(o => (
                <div key={o._id} className="flex items-center justify-between border-t pt-2">
                    <div>
                        <div className="font-medium">{o.name}</div>
                        <div className="text-xs text-gray-500">{o.customer}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-medium">${o.price}</div>
                        <div className="text-xs text-gray-500">{o.status}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

const ManagerDashboardHome = () => {
    const kpi = {
        myProducts: 84,
        pendingOrders: 18,
        inProduction: 12,
        monthlyRevenue: 25480,
    }

    const productionQueue = [
        { id: 'q1', product: 'Tailored Coat', stage: 'Cutting', due: 'Dec 22' },
        { id: 'q2', product: 'Linen Shirt', stage: 'Sewing', due: 'Dec 23' },
        { id: 'q3', product: 'Summer Dress', stage: 'Finishing', due: 'Dec 24' },
    ]

    const recentOrders = [
        { _id: 'r1', name: 'Classic Shirt', customer: 'Ayesha R.', price: 49, status: 'Pending' },
        { _id: 'r2', name: 'Tailored Coat', customer: 'Rafi A.', price: 129, status: 'In Production' },
        { _id: 'r3', name: 'Linen Trousers', customer: 'Mina K.', price: 79, status: 'Ready' },
    ]

    const deliveryStats = [
        { status: 'Pending', count: 18 },
        { status: 'In Production', count: 12 },
        { status: 'Ready', count: 9 },
        { status: 'Shipped', count: 45 },
    ]

    const ordersByDay = [
        { day: 'Dec 14', count: 6 },
        { day: 'Dec 15', count: 9 },
        { day: 'Dec 16', count: 7 },
        { day: 'Dec 17', count: 11 },
        { day: 'Dec 18', count: 14 },
        { day: 'Dec 19', count: 8 },
    ]

    const pieData = deliveryStats.map(s => ({ name: s.status, value: s.count }))
    const barData = ordersByDay.map(d => ({ name: d.day, orders: d.count }))

    const noop = () => { }

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Manager Dashboard</h2>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPI title="My Products" value={kpi.myProducts} hint="Active listings" />
                <KPI title="Pending Orders" value={kpi.pendingOrders} hint="Needs scheduling" />
                <KPI title="In Production" value={kpi.inProduction} hint="On the floor" />
                <KPI title="Monthly Revenue" value={`$${kpi.monthlyRevenue.toLocaleString()}`} hint="This month" />
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <RecentOrders orders={recentOrders} />
                    <div className="bg-white rounded-2xl p-4 shadow border border-gray-100">
                        <h3 className="font-semibold mb-3">Orders by Day</h3>
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
                        <h3 className="font-semibold mb-3">Production Overview</h3>
                        <ProductionQueue items={productionQueue} />
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow border border-gray-100">
                        <h3 className="font-semibold mb-3">Delivery Status</h3>
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
                        <h3 className="font-semibold mb-3">Quick Actions</h3>
                        <div className="flex flex-col gap-3">
                            <button className="px-4 py-2 bg-primary text-white rounded">Create Production Batch</button>
                            <button className="px-4 py-2 border rounded" onClick={noop}>Assign to Team</button>
                            <button className="px-4 py-2 border rounded">Export Production Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ManagerDashboardHome
