import React from 'react'
import { Dialog } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'

const TimelineItem = ({ log }) => (
  <div className="mb-4">
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
      <div>
        <div className="text-sm font-medium">{log.status}</div>
        <div className="text-xs text-gray-500">{log.location || '—'}</div>
        <div className="text-sm">{log.note || ''}</div>
        <div className="text-xs text-gray-400 mt-1">{new Date(log.timestamp || log.createdAt).toLocaleString()}</div>
      </div>
    </div>
  </div>
)

const TrackingTimelineModal = ({ isOpen, closeModal, order }) => {
  const axiosSecure = useAxiosSecure()
  const orderId = order?._id

  const { data, isLoading } = useQuery({
    queryKey: ['order-tracking', orderId],
    queryFn: async () => {
      if (!orderId) return { logs: [] }
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/orders/${orderId}/tracking`)
      return res.data
    },
    enabled: !!orderId && isOpen,
  })

  const logs = (data?.logs || []).slice().sort((a, b) => new Date(a.timestamp || a.createdAt) - new Date(b.timestamp || b.createdAt))

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-20">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold text-gray-900 text-center">Tracking Timeline</Dialog.Title>

          <div className="mt-4 max-h-96 overflow-y-auto">
            {isLoading && <div className="p-4 text-center text-gray-500">Loading...</div>}

            {!isLoading && logs.length === 0 && (
              <div className="p-4 text-center text-gray-500">No tracking updates yet.</div>
            )}

            {!isLoading && logs.length > 0 && (
              <div className="space-y-2">
                {logs.map((log) => (
                  <TimelineItem key={log._id || `${log.timestamp}-${log.status}`} log={log} />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button onClick={closeModal} className="px-4 py-2 rounded border">Close</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default TrackingTimelineModal
