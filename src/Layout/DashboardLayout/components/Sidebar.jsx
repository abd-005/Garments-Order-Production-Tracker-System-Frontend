import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X, Users, Package, ShoppingCart, LayoutDashboard, Home, SquarePlus } from 'lucide-react'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true)
    const location = useLocation()

    const adminRoutes = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/manage-users', label: 'Manage Users', icon: Users },
        { path: '/dashboard/add-product', label: 'Add Product', icon: SquarePlus },
        { path: '/dashboard/all-orders', label: 'All Products', icon: ShoppingCart },
        { path: '/dashboard/all-orders', label: 'All Orders', icon: ShoppingCart },
    ]

    const isActive = path => location.pathname === path

    return (
        <div className={`${isOpen ? 'w-64' : ''} transition-all duration-300 fixed left-0 top-18 z-40 bg-secondary glass flex flex-col rounded-2xl`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 w-full text-left hover:opacity-80 transition-opacity"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav className="mt-8 space-y-2 flex-1">
                {adminRoutes.map(({ path, label, icon: Icon }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`flex items-center gap-4 px-4 py-3 ${isActive(path)
                            ? 'border-l-4 opacity-100'
                            : 'opacity-75 hover:opacity-100'
                            }`}
                        style={isActive(path) ? { borderLeftColor: '#dcd3e4' } : {}}
                    >
                        <Icon size={18} />
                        {isOpen && <span className="text-sm font-medium">{label}</span>}
                    </Link>
                ))}
            </nav>

            <div className="p-4 space-y-2">
                <Link
                    to="/"
                    className={`flex items-center rounded transition-opacity opacity-75 hover:opacity-100 ${isOpen ? 'gap-4 px-4 py-3 justify-start' : 'justify-center py-3'}`}
                >
                    <Home size={18} />
                    {isOpen && <span className="text-sm font-medium">Back to Home</span>}
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
