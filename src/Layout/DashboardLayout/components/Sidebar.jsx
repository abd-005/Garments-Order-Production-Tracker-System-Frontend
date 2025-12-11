import React from 'react';
import { Link, useLocation } from 'react-router';
import {
  X,
  Users,
  ShoppingCart,
  LayoutDashboard,
  Home,
  SquarePlus,
} from 'lucide-react';

const Sidebar = ({ isOpen = true }) => {
  const location = useLocation();

  const adminRoutes = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/manage-users', label: 'Manage Users', icon: Users },
    { path: '/dashboard/add-product', label: 'Add Product', icon: SquarePlus },
    { path: '/dashboard/all-products', label: 'All Products', icon: ShoppingCart },
    { path: '/dashboard/all-orders', label: 'All Orders', icon: ShoppingCart },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-16'
      } h-[calc(100vh-64px)] sm:h-screen transition-all duration-300 fixed sm:relative left-4 top-20 sm:top-0 z-40`}
    >
      <div
        className={`h-full flex flex-col justify-between rounded-2xl p-3 shadow-lg bg-secondary/80 backdrop-blur-md border border-secondary/20`}
      >
        <div>
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-white font-bold">
                TF
              </div>
              {isOpen && <div className="text-sm font-semibold">TailorFlow</div>}
            </div>
            <div className="sm:hidden">
              <button className="p-2 rounded hover:bg-primary/10">
                <X size={18} />
              </button>
            </div>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
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
                {isOpen && <span className="text-sm font-medium">{label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-4">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-primary/80 hover:bg-primary/5`}
          >
            <Home size={18} />
            {isOpen && <span className="text-sm font-medium">Back to Home</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
