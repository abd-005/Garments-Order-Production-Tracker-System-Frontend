import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import OrderDetailsModal from '../../Buyer/OrderDetailsModal'
import ConfirmModal from '../../Buyer/ConfirmModal'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'

const PendingOrderDataRow = ({ order, refetch }) => {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const axiosSecure = useAxiosSecure()

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/order/${id}/status`, { status })
    },
    onSuccess: (_, variables) => {
      const verb = variables.status === 'approved' ? 'approved' : 'rejected'
      toast.success(`Order ${verb}`)
      refetch?.()
    },
    onError: (err) => {
      console.error(err)
      toast.error('Failed to update order status')
    },
  })

  const handleConfirm = async () => {
    if (!confirmAction) return
    const status = confirmAction === 'approve' ? 'approved' : 'rejected'
    try {
      await updateStatusMutation.mutateAsync({ id: order._id, status })
    } catch (err) {
      // error handled in onError
    } finally {
      setConfirmOpen(false)
    }
  }

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 break-all">{order._id}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={order.manager?.image || '/avatar-placeholder.png'} alt={order.customer} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-gray-900">{order.customer}</p>
            </div>
          </div>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-3">
            <img src={order.image} alt={order.name} className="w-12 h-12 object-cover rounded" />
            <div>
              <p className="text-gray-900">{order.name}</p>
              <p className="text-xs text-gray-500">{order.category}</p>
            </div>
          </div>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900">{order.quantity}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900">
            {order.createdAt ? new Date(order.createdAt).toLocaleString() : new Date().toLocaleString()}
          </p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDetailsOpen(true)}
              className="px-3 py-1 bg-primary text-white rounded-md text-sm"
            >
              View
            </button>

            <button
              onClick={() => { setConfirmAction('approve'); setConfirmOpen(true) }}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm"
            >
              Approve
            </button>

            <button
              onClick={() => { setConfirmAction('reject'); setConfirmOpen(true) }}
              className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm"
            >
              Reject
            </button>
          </div>
        </td>
      </tr>

      <OrderDetailsModal isOpen={detailsOpen} closeModal={() => setDetailsOpen(false)} order={order} />

      <ConfirmModal
        isOpen={confirmOpen}
        closeModal={() => setConfirmOpen(false)}
        title={confirmAction === 'approve' ? 'Approve Order' : 'Reject Order'}
        description={confirmAction === 'approve' ? 'Approve this order and mark it as approved?' : 'Reject this order? This action can be recorded.'}
        onConfirm={handleConfirm}
        confirmLabel={confirmAction === 'approve' ? 'Yes, approve' : 'Yes, reject'}
      />
    </>
  )
}

export default PendingOrderDataRow
