import React from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'

const SuspendModal = ({ isOpen, closeModal, userData, onSave }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      suspended: userData?.suspended?.status || false,
      reason: userData?.suspended?.reason || '',
      feedback: userData?.suspended?.feedback || '',
    },
  })

  const submit = (data) => {
    // data.suspended is string if coming from form; ensure boolean
    const payload = {
      suspended: data.suspended === true || data.suspended === 'true' || data.suspended === true,
      reason: data.reason,
      feedback: data.feedback,
    }
    onSave(payload)
  }

  return (
    <Dialog open={isOpen} as="div" className="relative z-30" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold text-gray-900">Suspend User</DialogTitle>

          <form onSubmit={handleSubmit(submit)} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Action</label>
              <select {...register('suspended')} className="w-full px-3 py-2 border rounded-md">
                <option value={true}>Suspend</option>
                <option value={false}>Unsuspend</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700">Suspend Reason</label>
              <input {...register('reason')} className="w-full px-3 py-2 border rounded-md" placeholder="Short reason" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Admin Feedback (detailed)</label>
              <textarea {...register('feedback')} className="w-full px-3 py-2 border rounded-md" placeholder="Why this user is suspended" />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md border">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-md bg-red-600 text-white">Save</button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default SuspendModal
