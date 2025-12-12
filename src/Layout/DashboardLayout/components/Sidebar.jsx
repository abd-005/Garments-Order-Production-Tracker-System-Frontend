import React from 'react';
import { Link, useLocation } from 'react-router';
import {
  X,
  Users,
  ShoppingCart,
  LayoutDashboard,
  Home,
  SquarePlus,
  Store,
} from 'lucide-react';

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
  const location = useLocation();

  const adminRoutes = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/manage-users', label: 'Manage Users', icon: Users },
    { path: '/dashboard/add-product', label: 'Add Product', icon: SquarePlus },
    { path: '/dashboard/all-products', label: 'All Products', icon: Store },
    { path: '/dashboard/all-orders', label: 'All Orders', icon: ShoppingCart },
    { path: '/dashboard/my-orders', label: 'My Orders', icon: ShoppingCart },
  ];
  
  const isActive = (path) => location.pathname === path;

  return (
        <ul className="menu w-full grow">
          <X onClick={() => { setSidebarOpen(!sidebarOpen) }} className='ml-2 lg:hidden text-red-400'></X>
        <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 mb-10 mt-4 rounded-md transition-colors text-primary/80 hover:bg-primary/5`}
          >
            <Home size={18} />
            {sidebarOpen && <span className="text-sm font-medium">Back to Home</span>}
          </Link>
            {adminRoutes.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive(path)
                    ? 'bg-primary/10 border-l-4 border-primary/60 text-primary'
                    : 'text-primary/80 hover:bg-primary/5'
                }`}
              >
                <Icon size={18} />
                {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
              </Link>
            ))}
      </ul>

  );
};

export default Sidebar;
