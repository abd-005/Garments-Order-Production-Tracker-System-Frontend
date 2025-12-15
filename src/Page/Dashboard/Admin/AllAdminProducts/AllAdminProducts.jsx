import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import ProductRow from './ProductRow'
import useAuth from '../../../../hooks/useAuth'
import useRole from '../../../../hooks/useRole'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'

const AllAdminProducts = () => {
  const { user } = useAuth()
  const [role] = useRole()
  const AxiosSecure = useAxiosSecure()

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      const res = await AxiosSecure(`${import.meta.env.VITE_API_URL}/products`)
      return res.data
    },
    enabled: role === 'admin',
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">All Products</h2>
        <div className="text-sm text-gray-600">{products.length} products</div>
      </div>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Image</th>
                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Product Name</th>
                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Price</th>
                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Category</th>
                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Created By</th>
                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Show on Home</th>
                <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map(product => (
                <ProductRow key={product._id} product={product} refetch={refetch} />
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="p-6 text-center text-gray-600">No products found.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllAdminProducts
