import React from 'react';
import Banner from './Banner/Banner';
import Choose from './Choose/Choose';

const Home = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-white via-[#f9f7fc] to-white">
            {/* Banner section */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <Banner />
            </div>

            {/* Choose section */}
            <div className="py-12 sm:py-16">
                <Choose />
            </div>
        </div>
    );
};

export default Home;
