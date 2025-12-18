import React from 'react'
import Banner from './Banner/Banner'
import Choose from './Choose/Choose'
import ProductsGrid from './Products/ProductsGrid'
import HowItWorks from './HowItWorks/HowItWorks'
import Feedback from './Feedback/Feedback'
import Ready from './Ready/Ready'

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#f9f7fc] to-white">
      {/* Banner section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Banner />
      </div>

      {/* Choose section */}
      <div className="py-12 sm:py-16">
        <Choose />
      </div>

      {/* Our Products */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductsGrid />
        </div>
      </div>

      {/* How it works */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HowItWorks />
        </div>
      </div>

      {/* Feed Back */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Feedback />
        </div>
      </div>

      {/* Ready sections */}
      <div className="py-12 sm:py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Ready />
        </div>
      </div>
    </div>
  )
}

export default Home
