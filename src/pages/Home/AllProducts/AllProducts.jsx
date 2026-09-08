import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Card from './Card'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import Container from '../../../components/Shared/Container'
import { Search, Sliders, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
    <div className='bg-background min-h-screen pb-12'>
      <Container>
        <div className='text-center py-12 sm:py-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-primary'>
            All Products
          </h2>
          <p className='text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Discover our curated collection of premium garments
          </p>
          <div className='w-16 h-1 bg-linear-to-r from-primary to-secondary mx-auto mt-4 rounded-full'></div>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3 z-10 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPage(1)
                }}
                className="bg-card pl-10"
              />
            </div>
            <Button
              variant="secondary"
              onClick={handleReset}
              className="h-10"
            >
              Reset
            </Button>
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
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
                <Input
                  type="number"
                  min="0"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newRange = [Number(e.target.value), priceRange[1]]
                    setPriceRange(newRange)
                    setPage(1)
                  }}
                  className="w-1/2 bg-card px-2"
                  placeholder="Min"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newRange = [priceRange[0], Number(e.target.value)]
                    setPriceRange(newRange)
                    setPage(1)
                  }}
                  className="w-1/2 bg-card px-2"
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
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
            <label className="text-sm text-muted-foreground">Per page</label>
            <select
              value={limit}
              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1) }}
              className="rounded-md border border-input bg-card px-2 py-1.5 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
          <div className="py-12 text-center text-muted-foreground">
            <p className="mb-4">No products found matching your criteria.</p>
            <Button onClick={handleReset}>Clear Filters</Button>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">Page {page} of {totalPages}</div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              First
            </Button>

            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Prev
            </Button>

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
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
            </Button>

            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              Last
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AllProducts
