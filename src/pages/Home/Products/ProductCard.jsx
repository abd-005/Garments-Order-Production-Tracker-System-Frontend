import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowUpRight, Heart } from 'lucide-react'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [liked, setLiked] = useState(false)
  const { _id, title, description, price, images, category } = product || {}

  return (
    <div className="group bg-base-100 border border-base-200/80 rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/25">
      {/* Image wrapper */}
      <div
        className="relative aspect-[4/5] overflow-hidden bg-base-200 cursor-pointer"
        onClick={() => navigate(`/product/${_id}`)}
      >
        {/* Skeleton */}
        {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-base-300" />}

        {images?.[0] ? (
          <img
            src={images[0]}
            alt={title}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-base-content/20 text-sm">No image</div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-base-100/90 to-transparent pointer-events-none" />

        {/* Heart button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setLiked(l => !l) }}
          className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 cursor-pointer"
        >
          <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-base-content/50'} />
        </button>

        {/* Category badge */}
        {category && (
          <span className="absolute top-4 left-4 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-base-content/70">
            {category}
          </span>
        )}

        {/* Quick view slide-up */}
        <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => navigate(`/product/${_id}`)}
            className="w-full rounded-xl bg-white/90 backdrop-blur-sm py-3 text-sm font-bold text-base-content shadow-lg transition-all hover:bg-white active:scale-[0.97] cursor-pointer"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-base font-bold text-base-content">{title || 'Untitled'}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-base-content/50">{description || 'No description'}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xl font-black text-primary">${price ?? '—'}</span>

          <button
            type="button"
            onClick={() => navigate(`/product/${_id}`)}
            className="flex size-10 items-center justify-center rounded-full bg-base-200/70 text-base-content/40 transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 active:scale-90 cursor-pointer"
          >
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
