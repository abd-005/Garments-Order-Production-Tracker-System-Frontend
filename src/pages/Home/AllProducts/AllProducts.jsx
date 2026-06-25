import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Card from './Card'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import Container from '../../../Components/Shared/Container'
import { Search, Sliders, ArrowUpDown } from 'lucide-react'

const AllProducts = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8) 
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState('newest')
  
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['products', page, limit, searchTerm, category, priceRange, sortBy],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: {
          page,
          limit,
          search: searchTerm,
          category: category || undefined,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sort: sortBy,
        },
      })
      return result.data
    },
    keepPreviousData: true,
  })

  const handleReset = () => {
    setSearchTerm('')
    setCategory('')
    setPriceRange([0, 10000])
    setSortBy('newest')
    setPage(1)
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div className="text-center py-8">Failed to load products.</div>

  const products = Array.isArray(data) ? data : data.products || []
  const total = data?.total ?? products.length
  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div className='bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 pb-12 min-h-screen'>
      <Container>
        <div className='text-center py-12 sm:py-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-primary dark:text-blue-300'>
            All Products
          </h2>
          <p className='text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Discover our curated collection of premium garments
          </p>
          <div className='w-16 h-1 bg-linear-to-r from-primary dark:from-blue-400 to-secondary dark:to-purple-400 mx-auto mt-4 rounded-full'></div>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPage(1)
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400"
              />
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors font-medium"
            >
              Reset
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Sliders size={16} className="inline mr-2" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setPage(1)
                }}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400"
              >
                <option value="">All Categories</option>
                <option value="shirts">Shirts</option>
                <option value="trousers">Trousers</option>
                <option value="dresses">Dresses</option>
                <option value="jackets">Jackets</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="0"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newRange = [Number(e.target.value), priceRange[1]]
                    setPriceRange(newRange)
                    setPage(1)
                  }}
                  className="w-1/2 px-2 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400"
                  placeholder="Min"
                />
                <span className="text-gray-600 dark:text-gray-400">-</span>
                <input
                  type="number"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newRange = [priceRange[0], Number(e.target.value)]
                    setPriceRange(newRange)
                    setPage(1)
                  }}
                  className="w-1/2 px-2 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <ArrowUpDown size={16} className="inline mr-2" />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setPage(1)
                }}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Info Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-medium text-gray-900 dark:text-gray-200">{Math.min((page - 1) * limit + 1, total)}</span>
            {' '}–{' '}
            <span className="font-medium text-gray-900 dark:text-gray-200">{Math.min(page * limit, total)}</span>
            {' '}of <span className="font-medium text-gray-900 dark:text-gray-200">{total}</span>
            {isFetching && <span className="ml-3 text-xs text-gray-500 dark:text-gray-500">Updating…</span>}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600 dark:text-gray-400">Per page</label>
            <select
              value={limit}
              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1) }}
              className="px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400"
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {products && products.length > 0 ? (
          <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-600">
            <p className="mb-4">No products found matching your criteria.</p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">Page {page} of {totalPages}</div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              First
            </button>

            <button
              type="button"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
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
                    className={`px-3 py-2 rounded-lg transition ${pageNum === page ? 'bg-primary dark:bg-blue-600 text-white' : 'border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
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
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              Next
            </button>

            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-50 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
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
