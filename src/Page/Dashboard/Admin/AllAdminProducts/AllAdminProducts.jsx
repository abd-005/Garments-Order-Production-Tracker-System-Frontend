import React, { useMemo, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import ProductRow from './ProductRow'
import useAuth from '../../../../hooks/useAuth'
import useRole from '../../../../hooks/useRole'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'

const AllAdminProducts = () => {
  const { user } = useAuth()
  const [role] = useRole()
  const axiosSecure = useAxiosSecure()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [search, setSearch] = useState('')

  const { data: allProducts = [], isLoading, refetch } = useQuery({
    queryKey: ['all-products', role],
    queryFn: async () => {
      const res = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/all-products`)
      return Array.isArray(res.data) ? res.data : res.data.products || []
    },
    enabled: role === 'admin',
    staleTime: 1000 * 60 * 2,
    keepPreviousData: true,
  })

  const filtered = useMemo(() => {
    if (!search) return allProducts
    const q = String(search).trim().toLowerCase()
    return allProducts.filter(
      (p) =>
        String(p.title || p.name || '').toLowerCase().includes(q) ||
        String(p.category || '').toLowerCase().includes(q)
    )
  }, [allProducts, search])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / limit))

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
    if (page < 1 && totalPages > 0) {
      setPage(1)
    }
    
  }, [totalPages]) 

  if (isLoading) return <LoadingSpinner />

  // slice for current page
  const start = (page - 1) * limit
  const pageItems = filtered.slice(start, start + limit)

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">All Products</h2>
        <div className="text-sm text-gray-600">{total} products</div>
      </div>

      {/* Controls */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by name or category"
            className="px-3 py-2 border rounded-md w-full sm:w-64"
          />
          <button
            type="button"
            onClick={() => { setSearch(''); setPage(1) }}
            className="px-3 py-2 border rounded-md"
          >
            Reset
          </button>
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
              {pageItems.map(product => (
                <ProductRow key={product._id} product={product} refetch={refetch} />
              ))}
            </tbody>
          </table>

          {pageItems.length === 0 && (
            <div className="p-6 text-center text-gray-600">No products found.</div>
          )}
        </div>
      </div>

      {/* pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {(() => {
              const windowSize = 5
              const half = Math.floor(windowSize / 2)
              let startPage = Math.max(1, page - half)
              if (startPage + windowSize - 1 > totalPages) startPage = Math.max(1, totalPages - windowSize + 1)
              return Array.from({ length: Math.min(windowSize, totalPages) }).map((_, i) => {
                const pageNum = startPage + i
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded ${pageNum === page ? 'bg-primary text-white' : 'border'}`}
                  >
                    {pageNum}
                  </button>
                )
              })
            })()}
          </div>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllAdminProducts
