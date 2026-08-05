import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import ProductCard from './ProductCard'
import axios from 'axios'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ProductsGrid = () => {
  const container = useRef(null)

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['home-products'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, { params: { limit: 6 } })
      const all = Array.isArray(res.data) ? res.data : (res.data.products || [])
      return all.filter(p => p?.showOnHome === true).slice(0, 6)
    },
    staleTime: 1000 * 60 * 2,
  })

  useGSAP(() => {
    gsap.fromTo(".product-item",
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      },
    )
  }, { scope: container })

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div className="text-center py-8 text-base-content/60">Failed to load products.</div>

  return (
    <section ref={container} className="relative overflow-hidden py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-200/50 via-transparent to-base-200/50" />
      <div className="absolute left-1/2 top-0 w-[600px] h-[600px] -translate-x-1/2 bg-primary/[0.02] rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-20 max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/60 backdrop-blur-sm px-5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            Featured Collection
          </div>

          <h2 className="text-4xl font-black tracking-tight lg:text-6xl text-base-content">
            Our Products
          </h2>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-base-content/50">
            Handpicked selection of premium garments crafted for your brand
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.length > 0
            ? data.map(product => (
                <div key={product._id} className="product-item">
                  <ProductCard product={product} />
                </div>
              ))
            : <div className="col-span-full text-center text-base-content/40 py-20">No featured products available.</div>
          }
        </div>
      </div>
    </section>
  )
}

export default ProductsGrid
