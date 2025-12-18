import React from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { _id, title, description, price, images } = product || {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-2xl shadow p-4 hover:shadow-2xl transition"
    >
      <div className="h-44 w-full rounded overflow-hidden mb-4 bg-gray-100 flex items-center justify-center">
        {images?.[0] ? (
          <img src={images[0]} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title || 'Untitled'}</h3>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description || 'No description'}</p>

      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-gray-900">${price ?? '—'}</div>
        <button
          type="button"
          onClick={() => navigate(`/product/${_id}`)}
          className="px-3 py-1 bg-primary text-white rounded-md text-sm"
        >
          View Details
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard
