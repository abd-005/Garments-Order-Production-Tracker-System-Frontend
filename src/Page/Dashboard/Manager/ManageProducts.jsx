import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const ManageProducts = () => {
    const { user } = useAuth();
    const { data: manageProducts = [], isLoading } = useQuery({
        queryKey: ['manageProducts', user?.email],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/manage-products/${user?.email}`)
            return result.data
        }
    })
    console.log(manageProducts)
    if (isLoading) return <LoadingSpinner />
    return (
        <div>
            ManageProducts
        </div>
    );
};

export default ManageProducts;