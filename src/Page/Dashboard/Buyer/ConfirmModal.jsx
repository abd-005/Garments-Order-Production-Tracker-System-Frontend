import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const ConfirmModal = ({ isOpen, closeModal, title, description, onConfirm, confirmLabel = 'Confirm' }) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-20" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold text-gray-900 text-center">{title}</DialogTitle>
          <div className="mt-4 text-sm text-gray-600">{description}</div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="px-4 py-2 rounded-md border text-gray-700">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-red-600 text-white">{confirmLabel}</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default ConfirmModal
