import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: '👥' },
    { label: 'Products Created', value: '5,000+', icon: '👔' },
    { label: 'On-Time Delivery', value: '99%', icon: '✓' },
    { label: 'Quality Standards', value: '100%', icon: '⭐' },
  ];

  return (
    <div className="py-12 sm:py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
          >
            Our Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Trusted by thousands of customers worldwide
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-colors"
            >
              <div className="text-3xl sm:text-4xl mb-3">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold mb-2">
                {stat.value}
              </div>
              <p className="text-white/70 text-sm sm:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
