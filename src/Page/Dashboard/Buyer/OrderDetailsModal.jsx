import React from 'react'
import { Dialog } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const OrderDetailsModal = ({ isOpen, closeModal, order }) => {
  const axiosSecure = useAxiosSecure()
  const orderId = order?._id

  const { data, isLoading, isError } = useQuery({
    queryKey: ['order-tracking', orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/orders/${orderId}/tracking`)
      // backend may return { logs } or an array
      return res.data
    },
    enabled: !!orderId && isOpen,
    staleTime: 1000 * 60 * 2,
  })

  // normalize logs
  const logs = Array.isArray(data)
    ? data
    : Array.isArray(data?.logs)
    ? data.logs
    : Array.isArray(order?.tracking)
    ? order.tracking
    : []

  const sorted = [...logs].sort((a, b) => new Date(a.timestamp || a.createdAt) - new Date(b.timestamp || b.createdAt))
  const latest = sorted[sorted.length - 1]

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold text-gray-900 text-center">Order Details</Dialog.Title>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <img src={order?.image} alt={order?.name} className="w-full h-40 object-cover rounded" />
            </div>

            <div className="col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{order?.name}</h3>
                <div className="text-sm text-gray-500">{new Date(order?.createdAt || Date.now()).toLocaleString()}</div>
              </div>

              <div className="text-sm text-gray-600">Category: {order?.category}</div>
              <div className="text-sm text-gray-600">Quantity: {order?.quantity}</div>
              <div className="text-sm text-gray-600">Unit Price: ${order?.price}</div>
              <div className="text-sm text-gray-600">Status: <span className="font-medium">{order?.status}</span></div>
              <div className="text-sm text-gray-600">Tracking ID: <span className="font-medium">{order?.trackingId || 'N/A'}</span></div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-800">Tracking Timeline</h4>

            <div className="mt-3 bg-gray-50 rounded p-4 max-h-64 overflow-y-auto">
              {isLoading && <LoadingSpinner />}

              {!isLoading && sorted.length === 0 && (
                <div className="text-sm text-gray-500">No tracking updates yet.</div>
              )}

              {!isLoading && sorted.length > 0 && (
                <ol className="space-y-4">
                  {sorted.map((step, idx) => {
                    const isLatest = step === latest
                    return (
                      <li key={step._id || `${idx}-${step.timestamp || step.createdAt}`} className="flex gap-3">
                        <div className="flex-shrink-0">
                          <span className={`inline-block w-3 h-3 rounded-full mt-2 ${isLatest ? 'bg-primary' : 'bg-gray-300'}`} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className={`font-medium ${isLatest ? 'text-primary' : 'text-gray-800'}`}>{step.status}</div>
                            <div className="text-xs text-gray-400">{new Date(step.timestamp || step.createdAt).toLocaleString()}</div>
                          </div>

                          {step.location && <div className="text-xs text-gray-600 mt-1">Location: {step.location}</div>}
                          {step.note && <div className="text-xs text-gray-600 mt-1">Note: {step.note}</div>}

                          {Array.isArray(step.images) && step.images.length > 0 && (
                            <div className="mt-2 grid grid-cols-3 gap-2">
                              {step.images.map((img, i) => (
                                <img key={i} src={img} alt={`track-${idx}-${i}`} className="w-full h-20 object-cover rounded border" />
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              )}
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Manager: {order?.manager?.name} ({order?.manager?.email})
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="px-4 py-2 rounded-md border text-gray-700">Close</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default OrderDetailsModal
