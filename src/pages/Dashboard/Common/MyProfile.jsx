import React from 'react'
import { FiLogOut, FiEdit, FiKey } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/img/User-Avatar.png'
import useRole from '../../../hooks/useRole'
import useStatus from '../../../hooks/useStatus'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const MyProfile = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()
    const [role, isRoleLoading] = useRole();
    const [status, isStatusLoading] = useStatus();
    const axiosSecure = useAxiosSecure()

    console.log(user)
    const { data: profileData, isLoading: profileLoading } = useQuery({
      queryKey: ['user', user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/user`)
        return res.data?.user || res.data
      },
      enabled: !!user?.email,
      staleTime: 1000 * 60 * 2,
    })

    const handleLogout = async () => {
        await logOut()
        navigate('/auth/login')
    }

    if (isRoleLoading || isStatusLoading || profileLoading) return <LoadingSpinner />

    const suspended = profileData?.suspended || null

    return (
        <div className="flex justify-center items-center py-10">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl overflow-hidden">
            </div>
            {/* Profile Content */}
            <div className="mt-16 px-6 pb-8 text-center">

                {/* Profile Image */}
                <div className="flex items-center justify-center">
                    <img
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt="profile"
                        className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                    />
                </div>
                <div className='flex items-center justify-center my-3'>
                    {/* Role Badge */}
                    <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-xs font-medium">
                        {role}
                    </span>

                    {/* Status Badge */}
                    <span className={status === "pending" && `inline-block bg-warning text-white px-4 py-1 rounded-full text-xs font-medium ml-3`}>
                        {status === "pending" && `Status: ${status}`}
                    </span>

                    {/* Suspended Badge */}
                    {suspended?.status && (
                      <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-xs font-medium ml-3">
                        Suspended
                      </span>
                    )}
                </div>

                {/* Name + Email */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                    <div className="bg-secondary p-4 rounded-lg border">
                        <p className="text-xs text-gray-500">Full Name</p>
                        <p className="text-gray-800 font-semibold">{user?.displayName}</p>
                    </div>

                    <div className="bg-secondary p-4 rounded-lg border">
                        <p className="text-xs text-gray-500">Email Address</p>
                        <p className="text-gray-800 font-semibold">{user?.email}</p>
                    </div>
                </div>

                {/* Suspended feedback */}
                {suspended?.status && (
                  <div className="mt-6 bg-red-50 border border-red-100 rounded-lg p-4 text-left max-w-2xl mx-auto">
                    <h4 className="text-sm font-semibold text-red-700">Suspension details</h4>
                    <div className="mt-2 text-sm text-gray-700">
                      <div>
                        <span className="font-medium">Reason:</span>
                        <span className="ml-2">{suspended.reason || 'Not provided'}</span>
                      </div>

                      <div className="mt-2">
                        <span className="font-medium">Feedback:</span>
                        <div className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">
                          {suspended.feedback || 'No additional feedback provided.'}
                        </div>
                      </div>

                      {suspended.suspendedAt && (
                        <div className="mt-2 text-xs text-gray-500">Suspended at: {new Date(suspended.suspendedAt).toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition">
                        <FiEdit /> Update Profile
                    </button>

                    <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition">
                        <FiKey /> Change Password
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        <FiLogOut /> Logout
                    </button>

                </div>
            </div>
        </div>
    )
}

export default MyProfile
