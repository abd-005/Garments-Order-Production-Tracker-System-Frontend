import React from 'react';
import { Menu } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import avatarImg from '../../../assets/img/User-Avatar.png';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className='w-full'>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-lg font-semibold tracking-tight">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-secondary/90">Welcome back</div>

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