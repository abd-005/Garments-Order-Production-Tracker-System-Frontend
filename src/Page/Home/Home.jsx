import React from 'react';
import Banner from './Banner/Banner';
import Choose from '../Choose/Choose';

const Home = () => {
    return (
        <div>
            {/* Banner section */}
            <div className='max-w-11/12 mx-auto px-2'>
            <Banner />

        </div>
            {/* Choose section */}
            <div>

            <Choose/>
            </div>
        </div>
    );
};

export default Home;
