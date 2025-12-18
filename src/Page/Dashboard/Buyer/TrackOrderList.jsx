// ApprovedOrdersBuyer.jsx
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import Container from '../../../Components/Shared/Container'

const TrackOrderList = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['my-orders', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/my-orders?status=approved`)
      return res.data
    },
    enabled: !!user?.email,
  })
  const approved = useMemo(() => {
    if (!Array.isArray(orders)) return []
    return orders.filter(o => (o.status || '').toString().toLowerCase() === 'approved')
  }, [orders])

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Approved Orders</h2>
            <div className="text-sm text-gray-600">{approved.length} approved</div>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Order ID</th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Title</th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Product</th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Status</th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {approved.map(order => {
                    const id = order._id
                    const title = order.name || order.title || '—'
                    const productName = order.name || order.productName || '—'
                    const status = order.status || '—'
                    const img = order.image || (Array.isArray(order.images) && order.images[0]) || ''

                    return (
                      <tr key={id}>
                        <td className="px-5 py-5 border-b bg-white text-sm break-all">{id}</td>

                        <td className="px-5 py-5 border-b bg-white text-sm">
                          <p className="text-gray-900">{title}</p>
                        </td>

                        <td className="px-5 py-5 border-b bg-white text-sm">
                          <div className="flex items-center gap-3">
                            {img ? (
                              <img src={img} alt={productName} className="w-12 h-12 object-cover rounded" />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Image</div>
                            )}
                            <div>
                              <p className="text-gray-900">{productName}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 border-b bg-white text-sm">
                          <span className="inline-block px-2 py-1 text-xs rounded-md bg-green-100 text-green-800">{status}</span>
                        </td>

                        <td className="px-5 py-5 border-b bg-white text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/dashboard/track-order/${id}`)}
                              className="px-3 py-1 bg-primary text-white rounded-md text-sm"
                            >
                              Track
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {approved.length === 0 && (
                <div className="p-6 text-center text-gray-600">You have no approved orders yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default TrackOrderList
