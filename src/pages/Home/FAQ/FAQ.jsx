import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'How long does it take to create a custom garment?',
      answer: 'Typically, custom garments take 2-4 weeks depending on complexity and your chosen materials. Rush orders are available for an additional fee.',
    },
    {
      question: 'What materials do you use?',
      answer: 'We source premium fabrics including cotton, silk, linen, and sustainable blends. All materials are ethically sourced and meet international quality standards.',
    },
    {
      question: 'Can I make changes to my order?',
      answer: 'Yes, you can modify your order within 48 hours of placement. After that, changes may not be possible due to production schedules.',
    },
    {
      question: 'Do you offer alterations?',
      answer: 'Absolutely! We provide complimentary alterations within 30 days of delivery. Additional alterations are available at discounted rates.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days if items are unworn and in original condition. Custom orders are non-returnable unless there is a defect.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Log in to your dashboard and visit "Track Order" to monitor your production status, delivery timeline, and shipping information in real-time.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-left font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
