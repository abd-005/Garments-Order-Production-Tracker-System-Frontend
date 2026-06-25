import React from 'react';
import Container from '../../../Components/Shared/Container';

const UserDashboardHome = () => {
    return (
       <Container>
            <div className=''>
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
            <p className="text-gray-600">Use the sidebar to navigate between sections.</p>
        </div>
        </Container>
    );
};

export default UserDashboardHome;