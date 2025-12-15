import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import OrderRow from './OrderRow'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import useRole from '../../../../hooks/useRole'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'

const AllOrders = () => {
    const [role] = useRole()
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const AxiosSecure = useAxiosSecure()


    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['all-orders'],
        queryFn: async () => {
            const res = await AxiosSecure(`${import.meta.env.VITE_API_URL}/all-orders`)
            return res.data
        },
        enabled: role === 'admin',
    })

    if (isLoading) return <LoadingSpinner />

    // Filter by status
    const filteredOrders = orders.filter(order => {
        const matchesStatus = filter === 'all' || order.status === filter
        const matchesSearch =
            order._id.toLowerCase().includes(search.toLowerCase()) ||
            order.customer.toLowerCase().includes(search.toLowerCase()) ||
            order.name.toLowerCase().includes(search.toLowerCase())

        return matchesStatus && matchesSearch
    })

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">All Orders</h2>
                <div className="text-sm text-gray-600">{filteredOrders.length} results</div>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by Order ID, User, Product..."
                    className="px-4 py-2 border rounded-md w-full md:w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="px-4 py-2 border rounded-md"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Order ID</th>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">User</th>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Product</th>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Quantity</th>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Status</th>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredOrders.map(order => (
                                <OrderRow key={order._id} order={order} />
                            ))}
                        </tbody>
                    </table>

                    {filteredOrders.length === 0 && (
                        <div className="p-6 text-center text-gray-600">No orders found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllOrders
