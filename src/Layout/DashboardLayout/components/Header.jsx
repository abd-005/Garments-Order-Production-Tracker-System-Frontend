import React from 'react'
import { User } from 'lucide-react'
import useAuth from '../../../hooks/useAuth';
import avatarImg from "../../../assets/img/User-Avatar.png";


const Header = () => {
    const { user } = useAuth();

    return (
        <header className="dashboard-header shadow-sm p-4 flex items-center justify-between" style={{ backgroundColor: '#4c4452' }}>
            <div className="flex items-center gap-4">
                
                <h1 className="text-xl font-semibold" style={{ color: '#fff' }}>Dashboard</h1>
            </div>

            <div className="flex items-center gap-3" style={{ color: '#dcd3e4' }}>
                <div className="hidden sm:block text-sm">Welcome back</div>
                <button className="p-1 rounded-full hover:opacity-80 transition-opacity" >
                    <img
                        className='rounded-full w-8 h-8 p-0'
                        referrerPolicy='no-referrer'
                        src={user && user.photoURL ? user.photoURL : avatarImg}

                        alt='profile'
                    />
                </button>
            </div>
        </header>
    )
}

export default Header
