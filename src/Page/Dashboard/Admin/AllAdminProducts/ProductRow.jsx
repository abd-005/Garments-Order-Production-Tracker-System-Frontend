import React, { useState } from 'react'
import { Link } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import ConfirmDeleteModal from './ConfirmDeleteModal'

const ProductRow = ({ product, refetch }) => {
  const [deleteOpen, setDeleteOpen] = useState(false)

  const toggleHomeMutation = useMutation({
    mutationFn: async ({ id, value }) =>
      await axios.patch(`${import.meta.env.VITE_API_URL}/product/show-home/${id}`, { showOnHome: value }),
    onSuccess: () => {
      toast.success('Updated Home Page visibility')
      refetch?.()
    },
    onError: () => toast.error('Failed to update'),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axios.delete(`${import.meta.env.VITE_API_URL}/product/${id}`),
    onSuccess: () => {
      toast.success('Product deleted')
      refetch?.()
      setDeleteOpen(false)
    },
    onError: () => toast.error('Failed to delete'),
  })

  const handleToggle = (e) => {
    toggleHomeMutation.mutate({ id: product._id, value: e.target.checked })
  }

  const handleDelete = () => {
    deleteMutation.mutate(product._id)
  }

  return (
    <>
      <tr>
        {/* Image */}
        <td className="px-5 py-5 border-b bg-white text-sm">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-14 h-14 object-cover rounded"
          />
        </td>

        {/* Name */}
        <td className="px-5 py-5 border-b bg-white text-sm">
          {product.title}
        </td>

        {/* Price */}
        <td className="px-5 py-5 border-b bg-white text-sm">
          ${product.price}
        </td>

        {/* Category */}
        <td className="px-5 py-5 border-b bg-white text-sm">
          {product.category}
        </td>

        {/* Created By */}
        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-2">
            <img
              src={product.manager?.image}
              className="w-8 h-8 rounded-full"
            />
            <span>{product.manager?.name}</span>
          </div>
        </td>

        {/* Show on Home */}
        <td className="px-5 py-5 border-b bg-white text-sm">
          <input
            type="checkbox"
            checked={product.showOnHome}
            onChange={handleToggle}
            className="toggle toggle-primary"
          />
        </td>

        {/* Actions */}
        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-3">
            <Link
              to={`/dashboard/update-product/${product._id}`}
              className="px-3 py-1 bg-primary text-white rounded-md text-sm"
            >
              Update
            </Link>

            <button
              onClick={() => setDeleteOpen(true)}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      <ConfirmDeleteModal
        isOpen={deleteOpen}
        closeModal={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  )
}

export default ProductRow
