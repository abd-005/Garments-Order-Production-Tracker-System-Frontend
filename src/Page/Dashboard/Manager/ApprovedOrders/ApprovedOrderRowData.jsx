import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import TrackingModal from './TrackingModal'
import TrackingTimelineModal from './TrackingTimelineModal'
import ConfirmModal from '../../User/ConfirmModal'

const ApprovedOrderRowData = ({ order, refetch }) => {
  const [addOpen, setAddOpen] = useState(false)
  const [timelineOpen, setTimelineOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const addTrackingMutation = useMutation({
    mutationFn: async ({ orderId, entry }) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/orders/${orderId}/tracking`, entry),
    onSuccess: () => {
      toast.success('Tracking update added')
      refetch?.()
    },
    onError: () => toast.error('Failed to add tracking'),
  })

  const handleAddTracking = async (entry) => {
    await addTrackingMutation.mutateAsync({ orderId: order._id, entry })
    setAddOpen(false)
  }

  const { _id, customer, name, image, quantity, approvedAt } = order || {}

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b bg-white text-sm break-all">{_id}</td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={order.manager?.image || '/avatar-placeholder.png'} alt={customer} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-gray-900">{customer}</p>
            </div>
          </div>
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-3">
            <img src={image} alt={name} className="w-12 h-12 object-cover rounded" />
            <div>
              <p className="text-gray-900">{name}</p>
            </div>
          </div>
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">{quantity}</td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <p className="text-gray-900">{approvedAt ? new Date(approvedAt).toLocaleString() : '—'}</p>
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => setTimelineOpen(true)} className="px-3 py-1 bg-primary text-white rounded-md text-sm">View Tracking</button>

            <button onClick={() => setAddOpen(true)} className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">Add Tracking</button>

            <button onClick={() => setConfirmOpen(true)} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm">Mark Delivered</button>
          </div>
        </td>
      </tr>

      <TrackingModal
        isOpen={addOpen}
        closeModal={() => setAddOpen(false)}
        onSave={handleAddTracking}
        order={order}
      />

      <TrackingTimelineModal
        isOpen={timelineOpen}
        closeModal={() => setTimelineOpen(false)}
        order={order}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        closeModal={() => setConfirmOpen(false)}
        title="Mark Delivered"
        description="Mark this order as delivered? This will set final tracking status to 'Out for Delivery' and close the order."
        onConfirm={async () => {
          try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${order._id}/tracking`, {
              status: 'Out for Delivery',
              note: 'Marked delivered by manager',
              location: 'N/A',
              timestamp: new Date().toISOString(),
            })
            await axios.patch(`${import.meta.env.VITE_API_URL}/orders/close/${order._id}`)
            toast.success('Order marked delivered')
            refetch?.()
            setConfirmOpen(false)
          } catch (err) {
            console.log(err)
            toast.error('Failed to mark delivered')
          }
        }}
        confirmLabel="Yes, mark delivered"
      />
    </>
  )
}

export default ApprovedOrderRowData
