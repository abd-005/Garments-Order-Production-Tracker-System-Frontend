import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const sample = [
  { id: 1, name: 'Ayesha', text: 'Amazing craftsmanship — fits perfectly!', rating: 5 },
  { id: 2, name: 'Rafi', text: 'Great communication and fast delivery.', rating: 5 },
  { id: 3, name: 'Mina', text: 'Quality materials and excellent finish.', rating: 5 },
]

const Feedback = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % sample.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section>
      <div className='text-center mb-12 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-primary'>
            Customer Feedback
          </h2>
          <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
            Real words from real customers
          </p>
          <div className='w-16 h-1 bg-linear-to-r from-[#4c4452] to-[#dcd3e4] mx-auto mt-4'></div>
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          key={sample[index].id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-2xl shadow p-6 text-center"
        >
          <div className="text-lg text-gray-800 font-medium">{sample[index].text}</div>
          <div className="mt-4 text-sm text-gray-500">— {sample[index].name}</div>
        </motion.div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {sample.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feedback
