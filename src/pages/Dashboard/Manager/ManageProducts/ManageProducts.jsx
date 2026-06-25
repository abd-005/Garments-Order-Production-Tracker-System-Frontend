import React, { useState, useMemo } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../../hooks/useAuth'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'
import Container from '../../../../Components/Shared/Container'
import ManagerProductsDataRow from './ManagerProductsDataRow'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'

const ManageProducts = () => {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
    const axiosSecure = useAxiosSecure();


  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['manager-products', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`${import.meta.env.VITE_API_URL}/manage-products`)
      return res.data
    },
    enabled: !!user?.email,
  })

  const filtered = useMemo(() => {
    if (!query) return products
    const q = query.toLowerCase().trim()
    return products.filter(p => {
      const name = (p.title || p.name || '').toString().toLowerCase()
      const category = (p.category || '').toString().toLowerCase()
      return name.includes(q) || category.includes(q)
    })
  }, [products, query])

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Manage Products</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or category"
                className="px-3 py-2 border rounded-md text-sm w-64"
              />
            </div>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Image</th>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Name</th>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Price</th>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Payment Mode</th>
                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(product => (
                    <ManagerProductsDataRow key={product._id} product={product} refetchProducts={refetch} />
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="p-6 text-center text-gray-600">No products found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ManageProducts
