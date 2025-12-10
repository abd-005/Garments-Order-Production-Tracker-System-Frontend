import React, { useState } from 'react';
import './DashboardLayout.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Outlet } from 'react-router';
import Container from '../../Components/Shared/Container';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="dashboard-container">
            <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

            <div className="dashboard-body">
                <aside >
                    <Sidebar />
                </aside>

                <Container>
                    <main>
                        <Outlet />
                    </main>
                </Container>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardLayout;