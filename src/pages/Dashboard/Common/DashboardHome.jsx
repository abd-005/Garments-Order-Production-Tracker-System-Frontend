import React from 'react'
import AdminDashboardHome from './AdminDashboardHome'
import UserDashboardHome from './UserDashboardHome'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import ManagerDashboardHome from './ManagerDashboardHome'

const DashboardHome = () => {
  const [role, isRoleLoading] = useRole()
  console.log(role)

  if (isRoleLoading) return <LoadingSpinner />

  if (role === 'admin') return <AdminDashboardHome />
  if (role === 'manager') return <ManagerDashboardHome />
  return <UserDashboardHome />
}

export default DashboardHome
