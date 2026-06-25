import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import Container from '../../../Components/Shared/Container'
import CustomerOrderDataRow from './CustomerOrderDataRow'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const MyOrders = () => {
  const { user } = useAuth()
  const AxiosSecure = useAxiosSecure()


  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const result = await AxiosSecure(`${import.meta.env.VITE_API_URL}/my-orders`)
      return result.data
    },
    enabled: !!user?.email,
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">My Orders</h2>
            <div className="text-sm text-gray-600">{orders.length} orders</div>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Order ID</th>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Product</th>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Quantity</th>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Status</th>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Payment</th>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Actions</th>
                  </tr>
                </thead>
                  {orders.map(order => (
                    <CustomerOrderDataRow key={order._id} order={order} refetchOrders={refetch} />
                  ))}
              </table>
              {orders.length === 0 && (
                <div className="p-6 text-center text-gray-600">You have no orders yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default MyOrders
