import React from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'

const RoleModal = ({ isOpen, closeModal, userData, onSave }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: { role: userData?.role || 'user' },
    })

    const submit = (data) => {
        onSave(data.role)
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-30" onClose={closeModal}>
            <div className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
                    <DialogTitle className="text-lg font-semibold text-gray-900">Update Role</DialogTitle>

                    <form onSubmit={handleSubmit(submit)} className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700">Role</label>
                            <select {...register('role')} className="w-full px-3 py-2 border rounded-md">
                                <option value="buyer">Buyer</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select>
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

export default RoleModal
