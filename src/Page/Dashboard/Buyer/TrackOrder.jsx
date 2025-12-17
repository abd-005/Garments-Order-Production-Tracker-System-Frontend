import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const TrackOrder = () => {
  const { orderId } = useParams()
  const axiosSecure = useAxiosSecure()

  const { data: order = null, isLoading, isError } = useQuery({
    queryKey: ['track-order', orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/track-order/${orderId}`)
      return res.data
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 2,
  })

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div className="p-8">Failed to load tracking information.</div>
  if (!order) return <div className="p-8">Order not found.</div>

  // Ensure tracking array exists and is sorted chronologically
  const tracking = Array.isArray(order.tracking) ? order.tracking : []
  const sorted = [...tracking].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  const latest = sorted[sorted.length - 1]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Track Order</h2>
        <p className="text-sm text-gray-600 mt-1">Order ID: {orderId}</p>
        <div className="mt-3 text-sm text-gray-700">
          <div>Product: {order.name}</div>
          <div>Quantity: {order.quantity}</div>
          <div>Status: <span className="font-medium">{order.status}</span></div>
          <div>Tracking ID: {order.trackingId || '—'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Tracking Timeline</h3>

          {sorted.length === 0 ? (
            <p className="text-gray-500">No tracking updates yet.</p>
          ) : (
            <ul className="timeline timeline-vertical">
              {sorted.map((step, index) => {
                const isLatest = step === latest
                const isEven = index % 2 === 0
                const lineClass = isLatest ? 'bg-primary' : ''
                const iconClass = isLatest ? 'text-primary h-5 w-5' : 'h-5 w-5 text-gray-400'

                return (
                  <li key={index}>
                    {/* top hr for non-first items */}
                    {index !== 0 && <hr className={lineClass} />}

                    {/* Box: start or end depending on index parity */}
                    {isEven ? (
                      <div className="timeline-start timeline-box">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className={`font-medium ${isLatest ? 'text-primary' : 'text-gray-800'}`}>
                              {step.status}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(step.timestamp).toLocaleString()}
                            </div>
                            {step.location && (
                              <div className="text-xs text-gray-600 mt-1">Location: {step.location}</div>
                            )}
                            {step.note && (
                              <div className="text-xs text-gray-600 mt-1">Note: {step.note}</div>
                            )}
                          </div>
                        </div>

                        {Array.isArray(step.images) && step.images.length > 0 && (
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {step.images.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt={`step-${index}-img-${i}`}
                                className="w-full h-20 object-cover rounded border"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="timeline-end timeline-box">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className={`font-medium ${isLatest ? 'text-primary' : 'text-gray-800'}`}>
                              {step.status}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(step.timestamp).toLocaleString()}
                            </div>
                            {step.location && (
                              <div className="text-xs text-gray-600 mt-1">Location: {step.location}</div>
                            )}
                            {step.note && (
                              <div className="text-xs text-gray-600 mt-1">Note: {step.note}</div>
                            )}
                          </div>
                        </div>

                        {Array.isArray(step.images) && step.images.length > 0 && (
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {step.images.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt={`step-${index}-img-${i}`}
                                className="w-full h-20 object-cover rounded border"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Middle icon */}
                    <div className="timeline-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={iconClass}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    <hr className={isLatest ? 'bg-primary' : ''} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Map / Summary */}
        <aside className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Current Location</h3>

          <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
            Map placeholder — integrate Leaflet or Google Maps here and feed it the latest location
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium">Latest Update</h4>
            {latest ? (
              <div className="mt-2 text-sm text-gray-700">
                <div className="font-medium">{latest.status}</div>
                <div className="text-xs text-gray-500">{new Date(latest.timestamp).toLocaleString()}</div>
                {latest.location && <div className="text-xs text-gray-600 mt-1">Location: {latest.location}</div>}
                {latest.note && <div className="text-xs text-gray-600 mt-1">Note: {latest.note}</div>}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No updates yet.</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default TrackOrder
