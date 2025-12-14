import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import RoleModal from './RoleModal'
import SuspendModal from './SuspendModal'

const UserRow = ({ userData, refetch }) => {
  const [roleOpen, setRoleOpen] = useState(false)
  const [suspendOpen, setSuspendOpen] = useState(false)

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) =>
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/role/${id}`, { role }),
    onSuccess: () => {
      toast.success('Role updated')
      refetch?.()
      setRoleOpen(false)
    },
    onError: () => toast.error('Failed to update role'),
  })

  const suspendMutation = useMutation({
    mutationFn: async ({ id, suspended, payload }) =>
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/suspend/${id}`, { suspended, ...payload }),
    onSuccess: () => {
      toast.success('User suspension updated')
      refetch?.()
      setSuspendOpen(false)
    },
    onError: () => toast.error('Failed to update suspension'),
  })

  const handleRoleSave = (newRole) => {
    updateRoleMutation.mutate({ id: userData._id, role: newRole })
  }

  const handleSuspend = (payload) => {
    // payload: { suspended: true/false, reason, feedback }
    suspendMutation.mutate({ id: userData._id, suspended: payload.suspended, payload })
  }

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={userData.image || '/avatar-placeholder.png'} alt={userData.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-gray-900 font-medium">{userData.name || '—'}</p>
            </div>
          </div>
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <p className="text-gray-900 break-all">{userData.email}</p>
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <span className="inline-flex items-center px-2 py-1 rounded text-sm bg-gray-100 text-gray-800">
            {userData.role || 'buyer'}
          </span>
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          {userData.suspended?.status ? (
            <div>
              <div className="text-sm text-red-600 font-medium">Suspended</div>
              <div className="text-xs text-gray-500 mt-1">By admin: {new Date(userData.suspended?.suspendedAt).toLocaleString()}</div>
            </div>
          ) : (
            <div className="text-sm text-green-600 font-medium">Active</div>
          )}
        </td>

        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRoleOpen(true)}
              className="px-3 py-1 bg-primary text-white rounded-md text-sm"
            >
              Update Role
            </button>

            <button
              onClick={() => setSuspendOpen(true)}
              className={`px-3 py-1 rounded-md text-sm ${userData.suspended?.status ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-700'}`}
            >
              {userData.suspended?.status ? 'Edit Suspension' : 'Suspend'}
            </button>
          </div>
        </td>
      </tr>

      <RoleModal
        isOpen={roleOpen}
        closeModal={() => setRoleOpen(false)}
        userData={userData}
        onSave={handleRoleSave}
      />

      <SuspendModal
        isOpen={suspendOpen}
        closeModal={() => setSuspendOpen(false)}
        userData={userData}
        onSave={handleSuspend}
      />
    </>
  )
}

export default UserRow
