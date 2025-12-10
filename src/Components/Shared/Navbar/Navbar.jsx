// src/components/Shared/Navbar/Navbar.jsx
import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import Logo from "../../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/img/User-Avatar.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  console.log(user)

  const linkBeforeLogin = (
    <>
      <li>
        <NavLink to="/">He</NavLink>
      </li>
      <li>
        <NavLink to="/all-products">All-Products</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li className="ml-10">
        <NavLink to="/auth/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/auth/register">Register</NavLink>
      </li>
    </>
  );

  const linkAfterLogin = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-products">All-Products</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li className="lg:ml-10 ml-2.5">
        <img
          className='rounded-full w-8 h-8 p-0'
          referrerPolicy='no-referrer'
          src={user && user.photoURL ? user.photoURL : avatarImg}
          
          alt='profile'
        />
      </li>
      <li>
        <div onClick={logOut} className="cursor-pointer">Logout</div>
      </li>
    </>
  );

  return (
    <div className="navbar flex justify-between items-center shadow-sm glass text-white px-2 md:px-5 lg:px-15 bg-primary/70">
      <div className="navbar-start">
        <Link to="/" className="flex gap-2 items-center">
          <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user ? linkAfterLogin : linkBeforeLogin}
        </ul>
      </div>
      <div className="navbar-end lg:hidden">
        <div onClick={() => setIsOpen(!isOpen)} className="p-2 cursor-pointer">
          <TiThMenu />
        </div>
        {isOpen && (
          <ul className="menu menu-sm dropdown-content bg-[#3e4653] rounded-box z-1 mt-3 w-40 p-2 shadow">
            {user ? linkAfterLogin : linkBeforeLogin}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
