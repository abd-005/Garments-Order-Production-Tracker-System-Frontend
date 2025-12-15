import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const ConfirmDeleteModal = ({ isOpen, closeModal, onConfirm }) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-30" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold text-gray-900 text-center">
            Delete Product
          </DialogTitle>

          <p className="text-sm text-gray-600 mt-3 text-center">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-md border"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default ConfirmDeleteModal
