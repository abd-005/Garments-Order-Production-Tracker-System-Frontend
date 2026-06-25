import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'

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