import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../../hooks/useAuth'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'
import Container from '../../../../Components/Shared/Container'
import PendingOrderDataRow from './PendingOrderDataRow'


const PendingOrders = () => {
  const { user } = useAuth()

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['pending orders', user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/pending-orders`)
      return res.data
    },
    enabled: !!user?.email,
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Pending Orders</h2>
            <div className="text-sm text-gray-600">{orders.length} pending</div>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Order ID</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">User</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Product</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Quantity</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Order Date</th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Actions</th>
                  </tr>
                </thead>

                  {orders.map(order => (
                    <PendingOrderDataRow key={order._id} order={order} refetch={refetch} />
                  ))}
              </table>

              {orders.length === 0 && (
                <div className="p-6 text-center text-gray-600">No pending orders.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default PendingOrders