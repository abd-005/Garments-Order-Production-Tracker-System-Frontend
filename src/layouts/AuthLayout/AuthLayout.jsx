import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../Components/Shared/Navbar/Navbar'
import Footer from '../../Components/Shared/Footer/Footer'

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <main className=''>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AuthLayout