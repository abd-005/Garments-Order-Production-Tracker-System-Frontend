import { Link } from 'react-router'

const Card = ({ product }) => {
  const { _id, title, images, quantity, category, price } = product || {}
  const imageSrc = images && images.length > 0 ? images[0] : ''

  return (
    <div className="col-span-1 group shadow-lg rounded-xl overflow-hidden border">
      <div className="flex flex-col h-full">
        <div className="relative aspect-square w-full overflow-hidden">
          <img
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            src={imageSrc}
            alt={title || 'product image'}
          />
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-lg font-semibold text-gray-900">{title}</div>
            <div className="text-sm text-gray-600 mt-1">
              Category: <span className="font-medium text-gray-800">{category}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Available: <span className="font-medium text-gray-800">{quantity}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-900">
              Price: <span className="text-primary font-bold">{price}$</span>
            </div>
            <Link
              to={`/product/${_id}`}
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white text-sm hover:bg-primary/60 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
