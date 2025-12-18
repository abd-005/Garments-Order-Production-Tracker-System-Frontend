import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Card from './Card'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import Container from '../../../Components/Shared/Container'

const AllProducts = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6) 
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['products', page, limit],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: { page, limit },
      })
      return result.data
    },
    keepPreviousData: true,
  })

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div className="text-center py-8">Failed to load products.</div>

  const products = Array.isArray(data) ? data : data.products || []
  const total = data?.total ?? products.length
  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div className='bg-secondary/30 pb-12'>
      <Container>
        <div className='text-center py-12 sm:py-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-primary'>
            All Products
          </h2>
          <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
            Where sophistication meets substance
          </p>
          <div className='w-16 h-1 bg-linear-to-r from-[#4c4452] to-[#dcd3e4] mx-auto mt-4'></div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{Math.min((page - 1) * limit + 1, total)}</span>
            {' '}–{' '}
            <span className="font-medium">{Math.min(page * limit, total)}</span>
            {' '}of <span className="font-medium">{total}</span>
            {isFetching && <span className="ml-3 text-xs text-gray-500">Updating…</span>}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Per page</label>
            <select
              value={limit}
              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1) }}
              className="px-2 py-1 border rounded"
            >
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {products && products.length > 0 ? (
          <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map(product => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-600">No products found.</div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              First
            </button>

            <button
              type="button"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {/* simple page numbers (show up to 5 centered) */}
            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                // center pages around current page
                const half = Math.floor(5 / 2)
                let start = Math.max(1, page - half)
                if (start + 4 > totalPages) start = Math.max(1, totalPages - 4)
                const pageNum = start + i
                if (pageNum > totalPages) return null
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded ${pageNum === page ? 'bg-primary text-white' : 'border'}`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>

            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Last
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AllProducts
