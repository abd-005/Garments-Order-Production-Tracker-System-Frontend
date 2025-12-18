import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { Link, NavLink } from "react-router";
import { Home, Package, Info, Mail, LogIn, UserPlus, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

import "./Navbar.css";
import Logo from "../../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/img/User-Avatar.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    logOut();
    setIsOpen(false);
  };

  return (
    <div className="navbar flex justify-between items-center shadow-lg text-white px-2 md:px-5 lg:px-8 sticky top-0 z-50 bg-primary/50 backdrop-blur-lg">
      <div className="navbar-start">
        <Link to="/" className="flex gap-2 items-center">
          <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <NavLink to="/" className="hover:opacity-80 transition-opacity">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products" className="hover:opacity-80 transition-opacity">All Products</NavLink>
          </li>
          <li>
            <NavLink to="/about" className="hover:opacity-80 transition-opacity">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:opacity-80 transition-opacity">Contact</NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink to="/auth/login" className="hover:opacity-80 transition-opacity">Login</NavLink>
              </li>
              <li>
                <NavLink to="/auth/register" className="hover:opacity-80 transition-opacity">Register</NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink to="/dashboard" className="hover:opacity-80 transition-opacity">Dashboard</NavLink>
              </li>
              <li>
                <img
                  className='rounded-full w-8 h-8 p-0 cursor-pointer hover:opacity-80 transition-opacity'
                  referrerPolicy='no-referrer'
                  src={user && user.photoURL ? user.photoURL : avatarImg}
                  alt='profile'
                />
              </li>
              <li>
                <div onClick={handleLogout} className="cursor-pointer hover:opacity-80 transition-opacity">Logout</div>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end lg:hidden">
        <div onClick={() => setIsOpen(!isOpen)} className="p-2 cursor-pointer hover:opacity-80 transition-opacity">
          <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 w-full text-left hover:opacity-80 transition-opacity"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
        {isOpen && (
          <div className="fixed right-0 top-16 z-50 w-56 rounded-xl shadow-2xl transition-all duration-300 bg-secondary">
            <nav className="p-3 space-y-2">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:opacity-80 transition-opacity"
                style={{ color: '#4c4452' }}
              >
                <Home size={18} />
                <span className="text-sm font-medium">Home</span>
              </NavLink>

              <NavLink
                to="/products"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:opacity-80 transition-opacity"
                style={{ color: '#4c4452' }}
              >
                <Package size={18} />
                <span className="text-sm font-medium">All Products</span>
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:opacity-80 transition-opacity"
                style={{ color: '#4c4452' }}
              >
                <Info size={18} />
                <span className="text-sm font-medium">About Us</span>
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:opacity-80 transition-opacity"
                style={{ color: '#4c4452' }}
              >
                <Mail size={18} />
                <span className="text-sm font-medium">Contact</span>
              </NavLink>

              <hr className="my-2" style={{ borderColor: '#4c4452', opacity: 0.2 }} />

              {!user && (
                <>
                  <NavLink
                    to="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:opacity-80 transition-opacity"
                    style={{ color: '#4c4452' }}
                  >
                    <LogIn size={18} />
                    <span className="text-sm font-medium">Login</span>
                  </NavLink>

                  <NavLink
                    to="/auth/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:opacity-80 transition-opacity"
                    style={{ color: '#4c4452' }}
                  >
                    <UserPlus size={18} />
                    <span className="text-sm font-medium">Register</span>
                  </NavLink>
                </>
              )}

              {user && (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:opacity-80 transition-opacity"
                    style={{ color: '#4c4452' }}
                  >
                    <LayoutDashboard size={18} />
                    <span className="text-sm font-medium">Dashboard</span>
                  </NavLink>

                  <div className="flex items-center gap-3 px-4 py-3" style={{ color: '#4c4452' }}>
                    <img
                      className='rounded-full w-6 h-6 p-0'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                    />
                    <span className="text-sm font-medium">{user.displayName || 'Profile'}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:opacity-80 transition-opacity text-red-600 font-medium"
                  >
                    <LogOut size={18} />
                    <span className="text-sm">Logout</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
