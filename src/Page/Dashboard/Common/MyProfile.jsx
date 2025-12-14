import React from 'react'
import { FiLogOut, FiEdit, FiKey } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/img/User-Avatar.png'
import useRole from '../../../hooks/useRole'
import useStatus from '../../../hooks/useStatus'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const MyProfile = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()
    const [role, isRoleLoading] = useRole();
    const [status, isStatusLoading] = useStatus();
    const handleLogout = async () => {
        await logOut()
        navigate('/auth/login')
    }
    if(isRoleLoading) return <LoadingSpinner />

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
                    {/* Name + Email */}
                </div>
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
