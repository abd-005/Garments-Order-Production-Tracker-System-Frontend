import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

const Ready = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-8 shadow flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <h3 className="text-2xl font-bold" text-primary>Ready to get measured?</h3>
          <p className="text-gray-600 mt-1">Book a product or request a custom fitting — we’ll guide you through.</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-5 py-2 bg-primary text-white rounded-md"
          >
            View Products
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-8 shadow grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
      >
        <div>
          <div className="text-3xl font-bold text-primary">10k+</div>
          <div className="text-sm text-gray-600">Happy customers</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary">500+</div>
          <div className="text-sm text-gray-600">Products crafted</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary">99%</div>
          <div className="text-sm text-gray-600">On-time delivery</div>
        </div>
      </motion.div>
    </div>
  )
}

export default Ready
