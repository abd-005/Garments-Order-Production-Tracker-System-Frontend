import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  { title: 'Choose Product', desc: 'Browse our curated collection and pick your favorite.' },
  { title: 'Customize & Book', desc: 'Provide measurements and preferences for a perfect fit.' },
  { title: 'Production', desc: 'Skilled artisans craft your order with care.' },
  { title: 'Delivery', desc: 'Track your order until it reaches your doorstep.' },
]

const HowItWorks = () => {
  return (
    <section>
      <div className='text-center mb-12 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-primary'>
            How It Works
          </h2>
          <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
            Simple steps from selection to delivery
          </p>
          <div className='w-16 h-1 bg-linear-to-r from-[#4c4452] to-[#dcd3e4] mx-auto mt-4'></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="bg-white rounded-2xl p-6 shadow"
          >
            <div className="w-12 h-12 rounded-full bg-secondary/50 text-primary flex items-center justify-center font-semibold mb-4">
              {i + 1}
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">{s.title}</h4>
            <p className="text-sm text-gray-600">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
