import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Outlet } from 'react-router';
import Container from '../../Components/Shared/Container';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="grid grid-cols-12 pt-4">
        {/* Sidebar */}
        <aside
          className={`transform transition-all grid duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0 col-span-4' : '-translate-x-full sm:translate-x-0 col-span-2'
          } `}
        >
          <Sidebar isOpen={sidebarOpen} />
        </aside>

        {/* Main content */}
        <div className="grid col-span-8 ml-0 sm:ml-64 transform transition-all duration-300 ease-in-out">
          <Container>
            <main className="py-6">
              <Outlet />
            </main>
          </Container>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
