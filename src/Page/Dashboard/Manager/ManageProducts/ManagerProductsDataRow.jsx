import React, { useState } from 'react'
import { Link } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ConfirmModal from '../../Buyer/ConfirmModal'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import UpdateProductModal from '../../Admin/AllAdminProducts/UpdateProductModal'

const ManagerProductsDataRow = ({ product, refetchProducts }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const axiosSecure = useAxiosSecure()

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/delete-product/${id}`),
    onSuccess: () => {
      toast.success('Product deleted')
      refetchProducts?.()
    },
    onError: () => {
      toast.error('Failed to delete product')
    },
  })

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(product._id)
      setConfirmOpen(false)
    } catch (err) {
      // handled by onError
    }
  }

  const { _id, images = [], title, price, paymentOption } = product || {}
  const img = Array.isArray(images) && images.length ? images[0] : ''

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="shrink-0">
              <img alt={title || 'product'} src={img} className="mx-auto object-cover rounded h-12 w-16" />
            </div>
          </div>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900">{title}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900">${price}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900">{paymentOption || 'Cash on Delivery'}</p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => setEditOpen(true)} className="px-3 py-1 bg-primary text-white rounded-md text-sm">
              Update
            </button>

            <button onClick={() => setConfirmOpen(true)} className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm">
              Delete
            </button>
          </div>
        </td>
      </tr>

      <ConfirmModal
        isOpen={confirmOpen}
        closeModal={() => setConfirmOpen(false)}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDelete}
        confirmLabel="Yes, delete"
      />

      <UpdateProductModal
        isOpen={editOpen}
        closeModal={() => setEditOpen(false)}
        product={product}
        onUpdated={() => refetchProducts?.()}
      />
    </>
  )
}

export default ManagerProductsDataRow
