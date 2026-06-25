import { Link } from 'react-router'
import { Star, ShoppingCart } from 'lucide-react'

const Card = ({ product }) => {
  const { _id, title, images, quantity, category, price, rating = 4.5, reviews = 12 } = product || {}
  const imageSrc = images && images.length > 0 ? images[0] : ''

  const inStock = quantity > 0

  return (
    <div className="col-span-1 group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl dark:hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-slate-900">
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
        <img
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          src={imageSrc}
          alt={title || 'product image'}
          loading="lazy"
        />
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* Header Info */}
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-2 uppercase tracking-widest">
            {category}
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 line-clamp-2 mb-3">
            {title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {Array(5).fill(0).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">({reviews})</span>
          </div>

          {/* Stock Status */}
          <div className="text-xs">
            {inStock ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ In Stock ({quantity})</span>
            ) : (
              <span className="text-red-600 dark:text-red-400 font-semibold">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Price & Button */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-primary dark:text-blue-300">${price}</span>
          </div>
          
          <div className="flex gap-2">
            <Link
              to={`/product/${_id}`}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                inStock
                  ? 'bg-primary dark:bg-blue-600 text-white hover:bg-primary/90 dark:hover:bg-blue-700 shadow-sm hover:shadow-md'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
              onClick={(e) => !inStock && e.preventDefault()}
            >
              <ShoppingCart size={16} />
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
