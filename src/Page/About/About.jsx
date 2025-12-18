import React from 'react'
import Logo from '../../Components/Logo/Logo'

const About = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <header className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <Logo className="w-28 h-28" />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: '#4c4452' }}>
              We craft garments with purpose
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl">
              TailorFlow blends traditional tailoring with modern production practices to deliver
              beautifully made garments that last. We focus on fit, materials, and responsible
              manufacturing so every piece you buy is an investment.
            </p>
            <div className="mt-6">
              <a
                href="/products"
                className="inline-block px-5 py-2 bg-primary text-white rounded-md shadow"
              >
                View Products
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#4c4452' }}>Our Mission</h3>
            <p className="text-sm text-gray-600">
              To make premium, responsibly produced garments accessible through transparent pricing,
              thoughtful design, and exceptional craftsmanship.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#4c4452' }}>Our Process</h3>
            <p className="text-sm text-gray-600">
              We source durable fabrics, cut with precision, and hand-finish details. Each order
              goes through quality checks before shipping to ensure consistent results.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#4c4452' }}>Sustainability</h3>
            <p className="text-sm text-gray-600">
              We minimize waste, favor local suppliers, and choose low-impact materials whenever
              possible to reduce our environmental footprint.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#4c4452' }}>Our Story</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Founded by tailors and designers, we started with a simple idea: make clothes that fit
              real lives. Over the years we refined our craft, built a trusted supply chain, and
              partnered with local artisans to scale quality without losing soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
              <h4 className="text-xl font-semibold" style={{ color: '#4c4452' }}>10k+</h4>
              <p className="text-sm text-gray-600 mt-1">Happy customers</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
              <h4 className="text-xl font-semibold" style={{ color: '#4c4452' }}>500+</h4>
              <p className="text-sm text-gray-600 mt-1">Products crafted</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
              <h4 className="text-xl font-semibold" style={{ color: '#4c4452' }}>99%</h4>
              <p className="text-sm text-gray-600 mt-1">On-time delivery</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#4c4452' }}>Meet the Team</h3>
          <p className="text-gray-600 mb-6">A small team of designers, tailors, and product specialists focused on quality.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
              <div className="text-lg font-semibold">Amina Rahman</div>
              <div className="text-sm text-gray-500">Head of Design</div>
              <p className="text-sm text-gray-600 mt-3">Leads product direction and fit standards.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
              <div className="text-lg font-semibold">Karim Hossain</div>
              <div className="text-sm text-gray-500">Production Manager</div>
              <p className="text-sm text-gray-600 mt-3">Oversees manufacturing and quality control.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
              <div className="text-lg font-semibold">Sadia Noor</div>
              <div className="text-sm text-gray-500">Customer Experience</div>
              <p className="text-sm text-gray-600 mt-3">Ensures smooth communication and support.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
