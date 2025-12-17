import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router'
import {
  X,
  Users,
  ShoppingCart,
  LayoutDashboard,
  Home,
  SquarePlus,
  Store,
  Package,
  ClipboardList,
  ListChecks,
  CheckCircle,
  User,
  MapPin,
} from 'lucide-react'
import useRole from '../../../hooks/useRole'
import useStatus from '../../../hooks/useStatus'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth()
  const location = useLocation()
  const [role, isRoleLoading] = useRole()
  const [status, isStatusLoading] = useStatus()

  const routes = useMemo(() => {
    if (!user || isRoleLoading || isStatusLoading) return []

    // Admin routes
    if (role === 'admin' && status !== 'pending') {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/manage-users', label: 'Manage Users', icon: Users },
        { path: '/dashboard/all-products', label: 'All Products', icon: Store },
        { path: '/dashboard/all-orders', label: 'All Orders', icon: ClipboardList },
      ]
    }

    // Manager routes 
    if (role === 'manager' && status !== 'pending') {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/add-product', label: 'Add Product', icon: SquarePlus },
        { path: '/dashboard/manage-products', label: 'Manage Products', icon: Package },
        { path: '/dashboard/pending-orders', label: 'Pending Orders', icon: ListChecks },
        { path: '/dashboard/approved-orders', label: 'Approved Orders', icon: CheckCircle },
        { path: '/dashboard/profile', label: 'My Profile', icon: User },
      ]
    }

    // Buyer routes
    if (role === 'buyer' && status !== 'pending') {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/my-orders', label: 'My Orders', icon: ShoppingCart },
        { path: '/dashboard/track-order/:orderId', label: 'Track Order', icon: MapPin },
        { path: '/dashboard/profile', label: 'My Profile', icon: User },
      ]
    }

    return []
  }, [role, status, user, isRoleLoading, isStatusLoading])

  const isActive = (path) => location.pathname === path
  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <ul className="menu w-full grow">
      <X onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-2 lg:hidden text-red-400" />
      <Link
        to="/"
        className="flex items-center gap-3 px-3 py-2 mb-10 mt-4 rounded-md transition-colors text-primary/80 hover:bg-primary/5"
      >
        <Home size={18} />
        {sidebarOpen && <span className="text-sm font-medium">Back to Home</span>}
      </Link>

      {routes.map(({ path, label, icon: Icon }) => (
        <li key={path}>
          <Link
            to={path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive(path)
                ? 'bg-primary/10 border-l-4 border-primary/60 text-primary'
                : 'text-primary/80 hover:bg-primary/5'
              }`}
          >
            <Icon size={18} />
            {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Sidebar
