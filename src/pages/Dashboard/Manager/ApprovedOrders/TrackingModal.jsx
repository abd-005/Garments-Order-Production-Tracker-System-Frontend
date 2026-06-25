import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import { useForm } from 'react-hook-form'

const TRACKING_STATUSES = [
  'Cutting Completed',
  'Sewing Started',
  'Finishing',
  'QC Checked',
  'Packed',
  'Shipped',
  'Out for Delivery',
]

const TrackingModal = ({ isOpen, closeModal, onSave, order }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      status: TRACKING_STATUSES[0],
      location: '',
      note: '',
      timestamp: new Date().toISOString(),
    },
  })

  const submit = (data) => {
    const entry = {
      status: data.status,
      location: data.location,
      note: data.note,
      timestamp: data.timestamp,
      addedBy: order.manager?.email || 'manager',
    }
    onSave(entry)
  }

  return (
    <Dialog open={isOpen} as="div" className="relative z-20" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold text-gray-900 text-center">Add Tracking Update</DialogTitle>

          <form onSubmit={handleSubmit(submit)} className="mt-4 space-y-3">
            <div>
              <label className="block text-sm text-gray-700">Status</label>
              <select {...register('status', { required: true })} className="w-full px-3 py-2 border rounded-md">
                {TRACKING_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700">Location</label>
              <input {...register('location')} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Note</label>
              <textarea {...register('note')} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Date / Time</label>
              <input type="datetime-local" {...register('timestamp', { required: true })} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md border">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white">Save</button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default TrackingModal
