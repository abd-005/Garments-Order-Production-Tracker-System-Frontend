import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
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
import AnimatedNavLink from "./AnimatedNavLink";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuContainerRef = useRef(null);
  const slidingPillRef = useRef(null);

  // Synchronize and apply system theme tokens safely
  const applyTheme = (isDark) => {
    const html = document.documentElement;
    html.setAttribute("data-theme", isDark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    setIsDarkMode(isDark);
    applyTheme(isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    applyTheme(newDarkMode);
  };

  // 🌟 GSAP Master Sliding Engine Logic
  useGSAP(() => {
    // Locate the active NavLink child component within the desktop console
    const activeItem = menuContainerRef.current?.querySelector(".nav-item.active");
    
    if (activeItem && slidingPillRef.current) {
      const containerRect = menuContainerRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      // Compute the exact horizontal offset relative to the parent menu frame
      const targetLeft = itemRect.left - containerRect.left;
      const targetWidth = itemRect.width;

      // Animate the background slide pill to its correct width and position properties
      gsap.to(slidingPillRef.current, {
        x: targetLeft,
        width: targetWidth,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto"
      });
    } else if (slidingPillRef.current) {
      // Hide or shrink pill if no desktop nav item matches the route
      gsap.to(slidingPillRef.current, {
        width: 0,
        duration: 0.3
      });
    }
  }, [location.pathname, user]); // Recalculate positions immediately on path variations or user status state alterations

  const handleLogout = () => {
    logOut();
    setIsOpen(false);
  };

  return (
    <div className="navbar flex justify-between items-center px-4 md:px-8 py-3 sticky top-0 z-50 bg-base-100/70 backdrop-blur-md border-b border-base-300 transition-colors duration-300">
      
      {/* Brand Section */}
      <div className="navbar-start">
        <Link to="/" className="flex gap-2 items-center transition-transform hover:scale-102">
          <Logo />
        </Link>
      </div>

      {/* Desktop Navigation Console with Sliding Active Background Track */}
      <div className="navbar-center hidden lg:flex">
        <ul 
          ref={menuContainerRef}
          className="relative flex items-center gap-1 bg-base-200/40 p-1.5 rounded-xl border border-base-300/60"
        >
          {/* Master Sliding Bubble Element */}
          <div 
            ref={slidingPillRef}
            className="absolute top-1.5 bottom-1.5 left-0 bg-primary rounded-lg pointer-events-none z-0 shadow-sm"
            style={{ width: 0 }}
          />

          <AnimatedNavLink to="/">Home</AnimatedNavLink>
          <AnimatedNavLink to="/products">All Products</AnimatedNavLink>
          <AnimatedNavLink to="/about">About Us</AnimatedNavLink>
          <AnimatedNavLink to="/contact">Contact</AnimatedNavLink>

          {!user && (
            <>
              <div className="w-[1px] h-4 bg-base-300 mx-1 z-10 self-center" />
              <AnimatedNavLink to="/auth/login">Login</AnimatedNavLink>
              <AnimatedNavLink to="/auth/register">Register</AnimatedNavLink>
            </>
          )}
        </ul>
      </div>

      {/* Utilities Console */}
      <div className="navbar-end flex items-center gap-4">
        
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-xl text-base-content hover:bg-base-200 border border-transparent hover:border-base-300 transition-all duration-200"
        >
          {isDarkMode ? <Sun size={18} className="text-accent" /> : <Moon size={18} />}
        </button>

        {user && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 rounded-full border border-base-300 p-1 bg-base-200 hover:ring-2 hover:ring-accent transition duration-200"
            >
              <img
                src={user.photoURL || avatarImg}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-base-100 rounded-xl shadow-xl border border-base-300 z-50 p-1.5">
                <div className="p-3 border-b border-base-300 mb-1">
                  <div className="font-semibold text-sm text-base-content">{user.displayName}</div>
                  <div className="text-xs text-base-content/60 truncate">{user.email}</div>
                </div>
                <ul className="text-sm space-y-0.5">
                  <li>
                    <Link to="/dashboard/profile" className="flex px-3 py-2 rounded-lg text-base-content hover:bg-base-200" onClick={() => setIsOpen(false)}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="flex px-3 py-2 rounded-lg text-base-content hover:bg-base-200" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="pt-1 mt-1 border-t border-base-300">
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 font-medium">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl text-base-content hover:bg-base-200 lg:hidden border border-base-300 transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Dropdown Menu List */}
        {isOpen && (
          <div className="fixed right-4 top-16 z-50 w-64 rounded-xl shadow-2xl border border-base-300 bg-base-100 lg:hidden p-2">
            <nav className="space-y-0.5">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-base-content hover:bg-base-200">
                <Home size={16} /><span className="text-sm font-medium">Home</span>
              </Link>
              <Link to="/products" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-base-content hover:bg-base-200">
                <Package size={16} /><span className="text-sm font-medium">All Products</span>
              </Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-base-content hover:bg-base-200">
                <Info size={16} /><span className="text-sm font-medium">About Us</span>
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-base-content hover:bg-base-200">
                <Mail size={16} /><span className="text-sm font-medium">Contact</span>
              </Link>

              {!user && (
                <>
                  <div className="my-1.5 border-t border-base-300 mx-2" />
                  <Link to="/auth/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-base-content hover:bg-base-200">
                    <LogIn size={16} /><span className="text-sm font-medium">Login</span>
                  </Link>
                  <Link to="/auth/register" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-base-content hover:bg-base-200">
                    <UserPlus size={16} /><span className="text-sm font-medium">Register</span>
                  </Link>
                </>
              )}

              {user && (
                <>
                  <div className="my-1.5 border-t border-base-300 mx-2" />
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-base-content hover:bg-base-200">
                    <LayoutDashboard size={16} /><span className="text-sm font-medium">Dashboard</span>
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 font-medium">
                    <LogOut size={16} /><span className="text-sm">Logout</span>
                  </button>
                </>
              )}

              <div className="my-1.5 border-t border-base-300 mx-2" />

              <Link to="/help" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-base-content hover:bg-base-200/70">
                <HelpCircle size={16} /><span className="text-sm font-medium">Help & Support</span>
              </Link>
              <Link to="/privacy" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-base-content hover:bg-base-200/70">
                <Shield size={16} /><span className="text-sm font-medium">Privacy Policy</span>
              </Link>
              <Link to="/terms-conditions" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-base-content hover:bg-base-200/70">
                <FileText size={16} /><span className="text-sm font-medium">Terms & Conditions</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;