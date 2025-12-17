// src/Page/Dashboard/AllProducts/ProductRow.jsx
import React, { useState } from 'react'
import { Link } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import UpdateProductModal from './UpdateProductModal'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'

const ProductRow = ({ product, refetch }) => {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const AxiosSecure = useAxiosSecure()

  const toggleMutation = useMutation({
    mutationFn: async ({ id, payload }) => await AxiosSecure.patch(`${import.meta.env.VITE_API_URL}/update-product/${id}`, payload),
    onSuccess: () => {
      toast.success('Updated')
      refetch?.()
    },
    onError: () => toast.error('Failed to update'),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => await AxiosSecure.delete(`${import.meta.env.VITE_API_URL}/delete-product/${id}`),
    onSuccess: () => {
      toast.success('Product deleted')
      refetch?.()
      setDeleteOpen(false)
    },
    onError: () => toast.error('Failed to delete'),
  })

  const handleToggle = (e) => {
    toggleMutation.mutate({ id: product._id, payload: { showOnHome: e.target.checked } })
  }

  const handleDelete = () => deleteMutation.mutate(product._id)

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b bg-white text-sm">
          <img src={product.images?.[0]} alt={product.title} className="w-14 h-14 object-cover rounded" />
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">{product.title}</td>

        <td className="px-5 py-5 border-b bg-white text-sm">${product.price}</td>

        <td className="px-5 py-5 border-b bg-white text-sm">{product.category}</td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-2">
            <img src={product.manager?.image} className="w-8 h-8 rounded-full" />
            <span>{product.manager?.name}</span>
          </div>
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <input type="checkbox" checked={Boolean(product.showOnHome)} onChange={handleToggle} className="toggle toggle-primary" />
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setEditOpen(true)} className="px-3 py-1 bg-primary text-white rounded-md text-sm">Update</button>

            <button onClick={() => setDeleteOpen(true)} className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm">Delete</button>
          </div>
        </td>
      </tr>

      <ConfirmDeleteModal isOpen={deleteOpen} closeModal={() => setDeleteOpen(false)} onConfirm={handleDelete} />

      <UpdateProductModal
        isOpen={editOpen}
        closeModal={() => setEditOpen(false)}
        product={product}
        onUpdated={() => refetch?.()}
      />
    </>
  )
}

export default ProductRow
