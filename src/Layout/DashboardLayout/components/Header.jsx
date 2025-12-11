import React from 'react';
import { Menu } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import avatarImg from '../../../assets/img/User-Avatar.png';

const Header = ({ onMenuToggle }) => {
  const { user } = useAuth();
  console.log(user)

  return (
    <header className="sticky top-0 z-30 bg-primary/95 backdrop-blur-sm border-b border-primary/20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md hover:bg-primary/20 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={20} className="text-white" />
            </button>

            <h1 className="text-white text-lg font-semibold tracking-tight">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-primary/30">Welcome back</div>

            <button className="flex items-center gap-2 p-1 rounded-full hover:opacity-90 transition-opacity">
              <img
                className="rounded-full w-9 h-9 object-cover"
                referrerPolicy="no-referrer"
                src={user && user.photoURL ? user.photoURL : avatarImg}
                alt="profile"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
