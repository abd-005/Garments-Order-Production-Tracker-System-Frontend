import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../../components/Shared/Footer/Footer';
import Navbar from '../../components/Shared/Navbar/Navbar';
import SmoothScroll from '../../providers/SmoothScroll';

const MainLayout = () => {
    return (
        <div id="smooth-wrapper">
            <Navbar />
            <SmoothScroll />
            <div id="smooth-content">
                <main className="pt-16">
                    <Outlet></Outlet>
                </main>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;