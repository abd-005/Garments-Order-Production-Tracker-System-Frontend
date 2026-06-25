import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../../Components/Shared/Footer/Footer';
import Navbar from '../../Components/Shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;