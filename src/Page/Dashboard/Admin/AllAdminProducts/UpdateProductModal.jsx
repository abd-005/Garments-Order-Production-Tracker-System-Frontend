import React, { useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'

const UpdateProductModal = ({ isOpen, closeModal, product, onUpdated }) => {
  const axiosSecure = useAxiosSecure()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
      moq: '',
      images: '',
      demoVideo: '',
      paymentOption: '',
      showOnHome: false,
    },
  })

  useEffect(() => {
    if (product) {
      reset({
        title: product.title || '',
        description: product.description || '',
        category: product.category || '',
        price: product.price ?? '',
        quantity: product.quantity ?? '',
        moq: product.moq ?? '',
        images: Array.isArray(product.images) ? product.images.join(', ') : product.images || '',
        demoVideo: product.demoVideo || '',
        paymentOption: product.paymentOption || '',
        showOnHome: Boolean(product.showOnHome),
      })
    }
  }, [product, reset])

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) =>
      await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/update-product/${id}`, payload),
    onSuccess: (data) => {
      toast.success('Product updated')
      onUpdated?.(data?.data?.product || data?.data || null)
      closeModal()
    },
    onError: (err) => {
      console.error(err)
      toast.error('Failed to update product')
    },
  })

  const onSubmit = (values) => {
    // build payload only with provided fields
    const payload = {}
    if (values.title) payload.title = values.title.trim()
    if (values.description) payload.description = values.description.trim()
    if (values.category) payload.category = values.category
    if (values.price !== '') payload.price = Number(values.price)
    if (values.quantity !== '') payload.quantity = Number(values.quantity)
    if (values.moq !== '') payload.moq = Number(values.moq)
    if (values.images !== '') {
      // accept comma separated URLs
      payload.images = values.images.split(',').map(s => s.trim()).filter(Boolean)
    }
    if (values.demoVideo !== '') payload.demoVideo = values.demoVideo.trim()
    if (values.paymentOption) payload.paymentOption = values.paymentOption
    payload.showOnHome = Boolean(values.showOnHome)

    if (Object.keys(payload).length === 0) {
      toast.error('No changes to save')
      return
    }

    updateMutation.mutate({ id: product._id, payload })
  }

  return (
    <Dialog open={isOpen} as="div" className="relative z-40" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold">Update Product</DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                {...register('title')}
                className="mt-1 w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                className="mt-1 w-full px-3 py-2 border rounded h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input {...register('category')} className="mt-1 w-full px-3 py-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" step="0.01" {...register('price')} className="mt-1 w-full px-3 py-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input type="number" {...register('quantity')} className="mt-1 w-full px-3 py-2 border rounded" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">MOQ</label>
                <input type="number" {...register('moq')} className="mt-1 w-full px-3 py-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Option</label>
                <select {...register('paymentOption')} className="mt-1 w-full px-3 py-2 border rounded">
                  <option value="">Select</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="PayFirst">PayFirst</option>
                </select>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <input id="showOnHome" type="checkbox" {...register('showOnHome')} className="h-4 w-4" />
                <label htmlFor="showOnHome" className="text-sm text-gray-700">Show on Home</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Images (comma separated URLs)</label>
              <input {...register('images')} className="mt-1 w-full px-3 py-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Demo Video URL</label>
              <input {...register('demoVideo')} className="mt-1 w-full px-3 py-2 border rounded" />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded border">Cancel</button>
              <button type="submit" disabled={isSubmitting || updateMutation.isLoading} className="px-4 py-2 rounded bg-primary text-white">
                {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default UpdateProductModal
