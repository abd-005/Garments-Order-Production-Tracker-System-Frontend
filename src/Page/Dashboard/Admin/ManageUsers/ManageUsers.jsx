import React from 'react'
import { useQuery } from '@tanstack/react-query'
import UserRow from './UserRow'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'
import useAuth from '../../../../hooks/useAuth'

const ManageUsers = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`)
            console.log(res.data)
            return res.data
        },
        enabled: !!user,
    })

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Manage Users</h2>
                <div className="text-sm text-gray-600">{users.length} users</div>
            </div>

            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Name</th>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Email</th>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Role</th>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Status</th>
                                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <UserRow key={user._id} user={user} refetch={refetch} />
                            ))}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <div className="p-6 text-center text-gray-600">No users found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ManageUsers
