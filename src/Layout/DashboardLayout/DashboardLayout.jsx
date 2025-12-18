import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router'
import Sidebar from './components/Sidebar'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-primary/50 backdrop-blur-lg items-center justify-between">
          <label onClick={() => { setSidebarOpen(!sidebarOpen) }} htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost hover:btn-primary hover:opacity-80 text-white">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <Header className='flex-1' />
        </nav>
        {/* Page content here */}
        <div className="min-h-screen mt-5">
          <Outlet />
        </div>
        <Footer />
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-secondary/40 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <Sidebar
            sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
