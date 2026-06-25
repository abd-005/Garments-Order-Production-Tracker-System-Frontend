import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, Clock } from 'lucide-react';

const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-primary text-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Help & Support</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We're here to help. Find answers to your questions or contact our support team.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: MessageCircle, title: 'Chat Support', desc: 'Live chat available 24/7' },
            { icon: Mail, title: 'Email Support', desc: 'support@tailorflow.com' },
            { icon: Phone, title: 'Call Us', desc: '+1 (234) 567-890' },
            { icon: Clock, title: 'Response Time', desc: 'Under 2 hours' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Help Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Getting Started',
                items: [
                  'Creating an account',
                  'Setting up your profile',
                  'How to place an order',
                  'Payment methods',
                ],
              },
              {
                title: 'Orders & Delivery',
                items: [
                  'Tracking your order',
                  'Estimated delivery times',
                  'Shipping locations',
                  'International orders',
                ],
              },
              {
                title: 'Returns & Exchanges',
                items: [
                  'Return policy',
                  'How to return items',
                  'Exchange process',
                  'Refund status',
                ],
              },
              {
                title: 'Account & Security',
                items: [
                  'Resetting your password',
                  'Two-factor authentication',
                  'Data privacy',
                  'Account deletion',
                ],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-gray-600 mb-6">
            Contact our support team directly and we'll get back to you within 2 hours.
          </p>
          <form className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
