import React, { useState } from 'react';
import './DashboardLayout.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="dashboard-container">
            <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            
            <div className="dashboard-body">
                <aside >
                    <Sidebar />
                </aside>
                
                <main className="content">
                    {children}
                </main>
            </div>
            
            <Footer />
        </div>
    );
};

export default DashboardLayout;