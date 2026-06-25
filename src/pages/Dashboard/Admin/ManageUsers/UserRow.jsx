import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import RoleModal from './RoleModal'
import SuspendModal from './SuspendModal'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'

const UserRow = ({ user, refetch }) => {
  const [roleOpen, setRoleOpen] = useState(false)
  const [suspendOpen, setSuspendOpen] = useState(false)
  const axiosSecure = useAxiosSecure()

  const updateRoleMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      return await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/update-role`, { email, role })
    },
    onSuccess: () => {
      toast.success('Role updated')
      refetch?.()
      setRoleOpen(false)
    },
    onError: () => toast.error('Failed to update role'),
  })

  const suspendMutation = useMutation({
    mutationFn: async ({ email, suspended, reason, feedback }) => {
      return await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/suspend-user`, {
        email,
        suspended,
        suspendedAt: suspended ? new Date().toISOString() : null,
        reason,
        feedback,
      })
    },
    onSuccess: () => {
      toast.success('User suspension updated')
      refetch?.()
      setSuspendOpen(false)
    },
    onError: () => toast.error('Failed to update suspension'),
  })

  const handleRoleSave = (newRole) => {
    if (!user?.email) return toast.error('User email not available')
    updateRoleMutation.mutate({ email: user.email, role: newRole })
  }

  const handleSuspendSave = ({ suspended, reason, feedback }) => {
    if (!user?.email) return toast.error('User email not available')
    suspendMutation.mutate({ email: user.email, suspended, reason, feedback })
  }

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={user.image || '/avatar-placeholder.png'} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-gray-900 font-medium">{user.name || '—'}</p>
            </div>
          </div>
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <p className="text-gray-900 break-all">{user.email}</p>
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <span className="inline-flex items-center px-2 py-1 rounded text-sm bg-gray-100 text-gray-800">
            {user.role || 'user'}
          </span>
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          {user.suspended?.status ? (
            <div>
              <div className="text-sm text-red-600 font-medium">Suspended</div>
              <div className="text-xs text-gray-500 mt-1">By admin: {user.suspended?.suspendedAt ? new Date(user.suspended.suspendedAt).toLocaleString() : '—'}</div>
            </div>
          ) : (
            <div className="text-sm text-green-600 font-medium">Active</div>
          )}
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => setRoleOpen(true)} className="px-3 py-1 bg-primary text-white rounded-md text-sm">Update Role</button>

            <button onClick={() => setSuspendOpen(true)} className={`px-3 py-1 rounded-md text-sm ${user.suspended?.status ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-700'}`}>
              {user.suspended?.status ? 'Edit Suspension' : 'Suspend'}
            </button>
          </div>
        </td>
      </tr>

      <RoleModal isOpen={roleOpen} closeModal={() => setRoleOpen(false)} user={user} onSave={handleRoleSave} />
      <SuspendModal isOpen={suspendOpen} closeModal={() => setSuspendOpen(false)} user={user} onSave={handleSuspendSave} />
    </>
  )
}

export default UserRow
