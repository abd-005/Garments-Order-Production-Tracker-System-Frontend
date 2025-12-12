import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

const MyOrders = () => {
//           const [searchParams] = useSearchParams()
//   const sessionId = searchParams.get('session_id')
//   console.log(sessionId)
//   useEffect(() => {
//     if (sessionId) {
//       axios.post(`${import.meta.env.VITE_API_URL}/my-orders`, {
//         sessionId,
//       })
//     }
//   }, [sessionId])
    return (
        <div>
            <h2 className="text-xl font-medium mb-3">MY ORDERS</h2>
        </div>
    );
};

export default MyOrders;