import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="relative min-h-[60vh] max-h-[70vh] flex items-center">
      <div className="absolute inset-0 bg-linear-to-br from-white via-[#f9f7fc] to-white dark:from-base-200 dark:via-base-200 dark:to-base-300" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: '#4c4452' }}>
          Crafted garments, built for real life
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Discover premium tailoring with transparent pricing, fast delivery, and thoughtful design.
        </p>
        <div className="mt-6 flex gap-3">
          <button className="px-5 py-2 bg-primary text-white rounded-md" onClick={() => navigate('/explore')}>Explore products</button>
          <button className="px-5 py-2 border rounded-md" onClick={() => navigate('/contact')}>Contact us</button>
        </div>
        <div className="mt-10 text-sm text-gray-500">Scroll to see how it works ↓</div>
      </div>
    </section>
  )
}

export default Hero
