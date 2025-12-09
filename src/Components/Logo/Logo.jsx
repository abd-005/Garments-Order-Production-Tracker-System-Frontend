import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img src={logo} alt="Logo" className='w-9' />
      <h1 className="text-3xl font-semibold text-white -ms-2">
        <span className="text-primary">Tailor</span>Flow
      </h1>
    </div>
  );
};

export default Logo;
