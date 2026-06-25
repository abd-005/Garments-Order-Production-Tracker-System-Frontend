import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import ProductCard from './ProductCard'

const ProductsGrid = () => {
  const axiosSecure = useAxiosSecure()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['home-products'],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/products`, { params: { limit: 6 } })
      const all = Array.isArray(res.data) ? res.data : (res.data.products || [])
      const homeProducts = all.filter(p => p?.showOnHome === true).slice(0, 6)
      return homeProducts
    },
    staleTime: 1000 * 60 * 2,
  })

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div className="text-center py-8">Failed to load products.</div>

  return (
    <section>
      <div className='text-center mb-12 sm:mb-16'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-primary'>
          Our Products
        </h2>
        <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
          Handpicked selection
        </p>
        <div className='w-16 h-1 bg-linear-to-r from-[#4c4452] to-[#dcd3e4] mx-auto mt-4'></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0
          ? data.map(product => <ProductCard key={product._id} product={product} />)
          : <div className="col-span-full text-center text-gray-600">No featured products available.</div>
        }
      </div>
    </section>
  )
}

export default ProductsGrid
