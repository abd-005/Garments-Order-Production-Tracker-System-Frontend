import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import {
  Home,
  Package,
  Info,
  Mail,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  HelpCircle,
  Shield,
  FileText,
} from "lucide-react";

import Logo from "../../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/img/User-Avatar.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const applyTheme = (isDark) => {
    const html = document.documentElement;
    html.setAttribute("data-theme", isDark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    applyTheme(isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    applyTheme(newDarkMode);
  };

  const handleLogout = () => {
    logOut();
    setIsOpen(false);
  };

  return (
    <div className="navbar flex justify-between items-center shadow-lg text-white px-2 md:px-5 lg:px-8 sticky top-0 z-50 bg-primary/50 backdrop-blur-lg">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex gap-2 items-center">
          <Logo />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><NavLink to="/" className="hover:bg-primary/10 rounded-lg px-3 py-2">Home</NavLink></li>
          <li><NavLink to="/products" className="hover:bg-primary/10 rounded-lg px-3 py-2">All Products</NavLink></li>
          <li><NavLink to="/about" className="hover:bg-primary/10 rounded-lg px-3 py-2">About Us</NavLink></li>
          <li><NavLink to="/contact" className="hover:bg-primary/10 rounded-lg px-3 py-2">Contact</NavLink></li>

          {!user && (
            <>
              <li><NavLink to="/auth/login" className="hover:bg-primary/10 rounded-lg px-3 py-2">Login</NavLink></li>
              <li><NavLink to="/auth/register" className="hover:bg-primary/10 rounded-lg px-3 py-2">Register</NavLink></li>
            </>
          )}

{user && (
  <div className="relative ">
    {/* Avatar button */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      aria-haspopup="true"
      aria-expanded={isOpen}
      className="flex items-center gap-2 rounded-full border-2 border-gray-300  p-1 hover:ring-2 hover:ring-primary transition"
    >
      <img
        src={user.photoURL || avatarImg}
        alt={user.displayName || "Profile"}
        referrerPolicy="no-referrer"
        className="w-8 h-8 rounded-full object-cover"
      />
    </button>

    {/* Dropdown menu */}
    {isOpen && (
      <div
        className="absolute right-0 mt-2 w-56 bg-white dark:bg-primary rounded-xl shadow-lg border border-gray-200 dark:border-base-300 z-50"
        role="menu"
      >
        <div className="p-3 border-b border-gray-200 dark:border-base-300">
          <div className="font-semibold text-sm">{user.displayName}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
        <ul className="p-2 text-sm">
          <li>
            <NavLink
              to="/dashboard/profile"
              className="block px-3 py-2 rounded hover:bg-primary/10"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className="block px-3 py-2 rounded hover:bg-primary/10"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded hover:bg-red-50 text-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
)}

          <li>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg hover:bg-primary/10 transition"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      <div className="navbar-end lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          className="p-2 rounded-lg hover:bg-primary/10 transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isOpen && (
          <div className="fixed right-0 top-16 z-50 w-56 rounded-xl shadow-2xl transition-all duration-300 bg-secondary">
            <nav className="p-3 space-y-2">
              <NavLink to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary">
                <Home size={18} /><span className="text-sm font-medium">Home</span>
              </NavLink>
              <NavLink to="/products" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary">
                <Package size={18} /><span className="text-sm font-medium">All Products</span>
              </NavLink>
              <NavLink to="/about" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary">
                <Info size={18} /><span className="text-sm font-medium">About Us</span>
              </NavLink>
              <NavLink to="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary">
                <Mail size={18} /><span className="text-sm font-medium">Contact</span>
              </NavLink>

              <hr className="my-2 border-gray-300 opacity-30" />

              {!user && (
                <>
                  <NavLink to="/auth/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary">
                    <LogIn size={18} /><span className="text-sm font-medium">Login</span>
                  </NavLink>
                  <NavLink to="/auth/register" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary">
                    <UserPlus size={18} /><span className="text-sm font-medium">Register</span>
                  </NavLink>
                </>
              )}

              {user && (
                <>
                  <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary">
                    <LayoutDashboard size={18} /><span className="text-sm font-medium">Dashboard</span>
                  </NavLink>
                  <div className="flex items-center text-primary gap-3 px-4 py-3">
                    <img className="rounded-full w-6 h-6" referrerPolicy="no-referrer" src={user.photoURL || avatarImg} alt="profile" />
                    <span className="text-sm font-medium">{user.displayName || "Profile"}</span>
                  </div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 font-medium">
                    <LogOut size={18} /><span className="text-sm">Logout</span>
                  </button>
                </>
              )}

              <hr className="my-2 border-gray-300 opacity-30" />

              {/* Dark mode toggle in mobile menu */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-sm font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <hr className="my-2 border-gray-300 opacity-30" />

              <NavLink to="/help" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary">
                <HelpCircle size={18} /><span className="text-sm font-medium">Help & Support</span>
              </NavLink>
              <NavLink to="/privacy" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary">
                <Shield size={18} /><span className="text-sm font-medium">Privacy Policy</span>
              </NavLink>
              <NavLink to="/terms-conditions" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary">
                <FileText size={18} /><span className="text-sm font-medium">Terms & Conditions</span>
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
