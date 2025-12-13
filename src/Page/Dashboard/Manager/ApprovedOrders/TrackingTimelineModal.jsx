import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'

const TrackingTimelineModal = ({ isOpen, closeModal, order }) => {
  const tracking = Array.isArray(order.tracking) ? order.tracking : []

  const sorted = [...tracking].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  return (
    <Dialog open={isOpen} as="div" className="relative z-20" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold text-gray-900 text-center">Tracking Timeline</DialogTitle>

          <div className="mt-4 space-y-4">
            {sorted.length === 0 && <div className="text-sm text-gray-500">No tracking updates yet.</div>}

            <ol className="space-y-4">
              {sorted.map((t, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="w-2">
                    <div className="w-3 h-3 rounded-full bg-primary mt-2" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-800">{t.status}</div>
                      <div className="text-xs text-gray-500">{new Date(t.timestamp).toLocaleString()}</div>
                    </div>
                    {t.location && <div className="text-sm text-gray-600">Location: {t.location}</div>}
                    {t.note && <div className="text-sm text-gray-600 mt-1">Note: {t.note}</div>}
                    <div className="text-xs text-gray-400 mt-1">By: {t.addedBy || 'manager'}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={closeModal} className="px-4 py-2 rounded-md border text-gray-700">Close</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default TrackingTimelineModal
