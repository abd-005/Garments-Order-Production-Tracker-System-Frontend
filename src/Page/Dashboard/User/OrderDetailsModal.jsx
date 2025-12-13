import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'

const OrderDetailsModal = ({ isOpen, closeModal, order }) => {
  const { _id, name, image, category, quantity, price, status, trackingId, manager, createdAt } = order || {}

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold text-gray-900 text-center">Order Details</DialogTitle>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <img src={image} alt={name} className="w-full h-40 object-cover rounded" />
            </div>

            <div className="col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{name}</h3>
                <div className="text-sm text-gray-500">{new Date(createdAt || Date.now()).toLocaleString()}</div>
              </div>

              <div className="text-sm text-gray-600">Category: {category}</div>
              <div className="text-sm text-gray-600">Quantity: {quantity}</div>
              <div className="text-sm text-gray-600">Unit Price: ${price}</div>
              <div className="text-sm text-gray-600">Status: <span className="font-medium">{status}</span></div>
              <div className="text-sm text-gray-600">Tracking ID: <span className="font-medium">{trackingId || 'N/A'}</span></div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-800">Tracking Timeline</h4>
                <ol className="mt-2 space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-gray-300 mt-2" />
                    <div>
                      <div className="font-medium">Order placed</div>
                      <div className="text-xs text-gray-500">We received your order.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`w-2 h-2 rounded-full mt-2 ${status === 'pending' ? 'bg-yellow-400' : 'bg-green-400'}`} />
                    <div>
                      <div className="font-medium">{status === 'pending' ? 'Processing' : 'Processed'}</div>
                      <div className="text-xs text-gray-500">Current status of your order.</div>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Manager: {manager?.name} ({manager?.email})
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="px-4 py-2 rounded-md border text-gray-700">Close</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default OrderDetailsModal
