import React from 'react'
import { useQuery } from '@tanstack/react-query'

import Container from '../../../../Components/Shared/Container'
import useAuth from '../../../../hooks/useAuth'
import ApprovedOrderRowData from './ApprovedOrderRowData'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'

const ApprovedOrders = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure();
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['approved-orders', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`${import.meta.env.VITE_API_URL}/approved-orders`)
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
            <h2 className="text-2xl font-semibold">Approved Orders</h2>
            <div className="text-sm text-gray-600">{orders.length} approved</div>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Order ID</th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">User</th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Product</th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Quantity</th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Approved Date</th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map(order => (
                    <ApprovedOrderRowData key={order._id} order={order} refetch={refetch} />
                  ))}
                </tbody>
              </table>

              {orders.length === 0 && (
                <div className="p-6 text-center text-gray-600">No approved orders yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ApprovedOrders
