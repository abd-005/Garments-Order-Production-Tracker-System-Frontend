import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'
import UserRow from './UserRow'
import { useEffect } from 'react'

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [searchText, setSearchText] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

    const [roleFilter, setRoleFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [page, setPage] = useState(1)
    const limit = 20

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText)
            setPage(1)
        }, 500)

        return () => clearTimeout(handler)
    }, [searchText])

    const { data, isLoading, refetch, } = useQuery({
        queryKey: ['users', debouncedSearch, roleFilter, statusFilter, page],
        queryFn: async () => {
            const params = { page, limit }
            if (debouncedSearch) params.searchText = debouncedSearch
            if (roleFilter) params.role = roleFilter
            if (statusFilter) params.status = statusFilter

            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/users`, { params })
            return res.data
        },
        placeholderData: (previousData) => previousData,
    })

    if (isLoading) return <LoadingSpinner />

    const users = data?.users || []
    const total = data?.total || 0
    const totalPages = Math.ceil(total / limit)

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Manage Users</h2>
                <div className="text-sm text-gray-600">{total} users</div>
            </div>

            <div className="mb-4 flex flex-col md:flex-row gap-3 items-start md:items-center">
                <input
                    value={searchText}
                    onChange={(e) => { setSearchText(e.target.value); setPage(1) }}
                    placeholder="Search by name or email"
                    className="px-3 py-2 border rounded-md w-full md:w-64"
                />

                <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1) }} className="px-3 py-2 border rounded-md">
                    <option value="">All roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="buyer">Buyer</option>
                </select>

                <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }} className="px-3 py-2 border rounded-md">
                    <option value="">All status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                </select>

                <button onClick={() => { setSearchText(''); setRoleFilter(''); setStatusFilter(''); setPage(1); refetch() }} className="px-3 py-2 border rounded-md">
                    Reset
                </button>
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
                            {users.map(u => <UserRow key={u._id} user={u} refetch={refetch} />)}
                        </tbody>
                    </table>

                    {users.length === 0 && <div className="p-6 text-center text-gray-600">No users found.</div>}
                </div>
            </div>

            {/* pagination */}
            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">Page {page} of {totalPages || 1}</div>
                <div className="flex gap-2">
                    <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                    <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    )
}

export default ManageUsers
