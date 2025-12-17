import { useState } from 'react'
import { Link } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import OrderDetailsModal from './OrderDetailsModal'
import ConfirmModal from './ConfirmModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const CustomerOrderDataRow = ({ order, refetchOrders }) => {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
    const AxiosSecure = useAxiosSecure()
  

  const cancelMutation = useMutation({
    mutationFn: async (orderId) => await AxiosSecure.patch(`${import.meta.env.VITE_API_URL}/orders/cancel/${orderId}`),
    onSuccess: () => {
      toast.success('Order cancelled')
      refetchOrders?.()
    },
    onError: () => {
      toast.error('Failed to cancel order')
    },
  })

  const handleCancel = async () => {
    await cancelMutation.mutateAsync(order._id)
    setConfirmOpen(false)
  }

  const { _id, image, name, category, price, quantity, status, transactionId } = order || {}

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 break-all">{_id}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-3">
            <img src={image} alt={name} className="w-12 h-12 object-cover rounded" />
            <div>
              <p className="text-gray-900">{name}</p>
              <p className="text-xs text-gray-500">{category}</p>
            </div>
          </div>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900">{quantity}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            status === 'approved' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900">${price}</p>
          <p className="text-xs text-gray-500 mt-1">Transaction ID: {transactionId}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDetailsOpen(true)}
              className="px-3 py-1 bg-primary text-white rounded-md text-sm"
            >
              View
            </button>

            {status === 'pending' && (
              <button
                onClick={() => setConfirmOpen(true)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm"
              >
                Cancel
              </button>
            )}

            <Link
              to={`/product/${order.productId}`}
              className="px-3 py-1 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              Product
            </Link>
            <Link
              to={`/dashboard/track-order/${_id}`}
              className="px-3 py-1 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              Track Order
            </Link>
          </div>
        </td>
      </tr>

      <OrderDetailsModal isOpen={detailsOpen} closeModal={() => setDetailsOpen(false)} order={order} />
      <ConfirmModal
        isOpen={confirmOpen}
        closeModal={() => setConfirmOpen(false)}
        title="Cancel Order"
        description="Are you sure you want to cancel this order? This action cannot be undone."
        onConfirm={handleCancel}
        confirmLabel="Yes, cancel"
      />
    </>
  )
}

export default CustomerOrderDataRow
