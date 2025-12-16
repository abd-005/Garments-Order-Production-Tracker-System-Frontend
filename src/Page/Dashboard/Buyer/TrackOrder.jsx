import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const TrackOrder = () => {
  const { orderId } = useParams()

  const { data: order, isLoading } = useQuery({
    queryKey: ['track-order', orderId],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${orderId}`)
      return res.data
    }
  })

  if (isLoading) return <LoadingSpinner />

  const tracking = Array.isArray(order.tracking) ? order.tracking : []
  const sorted = [...tracking].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  )

  const latestStep = sorted[sorted.length - 1]

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6">Track Order</h2>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Order Information</h3>
          <p className="text-sm text-gray-600 mt-1">Order ID: {order._id}</p>
          <p className="text-sm text-gray-600">Product: {order.name}</p>
          <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
          <p className="text-sm text-gray-600">Status: {order.status}</p>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Tracking Timeline</h3>

          {sorted.length === 0 && (
            <p className="text-gray-500 text-sm">No tracking updates yet.</p>
          )}

          <ol className="relative border-l border-gray-300 ml-4 space-y-6">
            {sorted.map((step, idx) => {
              const isLatest = step === latestStep

              return (
                <li key={idx} className="ml-6">
                  <div
                    className={`absolute w-3 h-3 rounded-full -left-1.5 border ${
                      isLatest
                        ? 'bg-primary border-primary'
                        : 'bg-gray-300 border-gray-300'
                    }`}
                  ></div>

                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-medium ${
                        isLatest ? 'text-primary' : 'text-gray-800'
                      }`}
                    >
                      {step.status}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {new Date(step.timestamp).toLocaleString()}
                    </span>
                  </div>

                  {step.location && (
                    <p className="text-sm text-gray-600 mt-1">
                      Location: {step.location}
                    </p>
                  )}

                  {step.note && (
                    <p className="text-sm text-gray-600 mt-1">
                      Note: {step.note}
                    </p>
                  )}

                  {step.image && (
                    <img
                      src={step.image}
                      alt="tracking"
                      className="w-32 h-32 object-cover rounded mt-2 border"
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </div>

        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Current Location</h3>

          <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
            Map integration placeholder
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackOrder
