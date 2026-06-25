import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, place an order, or contact our support team. This includes your name, email address, phone number, shipping address, and payment information. We also automatically collect information about your device and browsing activity using cookies and similar technologies.`,
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to provide, maintain, and improve our services, process transactions, send administrative information, respond to inquiries, and comply with legal obligations. We may also use your information for marketing purposes if you have opted in to receive such communications.`,
    },
    {
      title: '3. Information Sharing',
      content: `We do not sell, trade, or share your personal information with third parties without your consent, except when necessary to fulfill our services (e.g., payment processors, shipping partners) or as required by law. All third parties are contractually obligated to maintain the confidentiality and security of your information.`,
    },
    {
      title: '4. Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.`,
    },
    {
      title: '5. Your Rights',
      content: `You have the right to access, update, or delete your personal information at any time by logging into your account or contacting us. You may also opt out of receiving marketing communications. In some jurisdictions, you have additional rights, such as the right to data portability and the right to lodge complaints with data protection authorities.`,
    },
    {
      title: '6. Cookies and Tracking',
      content: `We use cookies and similar technologies to enhance your browsing experience, understand how you use our website, and personalize content. You can control cookie settings through your browser preferences. Some cookies are essential for website functionality, while others are used for analytics and marketing.`,
    },
    {
      title: '7. Retention of Information',
      content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You can request deletion of your data at any time, subject to legal retention requirements.`,
    },
    {
      title: '8. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our service constitutes acceptance of the updated policy.`,
    },
  ];

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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-white/80">Last Updated: January 2026</p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Welcome to TailorFlow. We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-primary mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-secondary rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> privacy@tailorflow.com</p>
              <p><strong>Phone:</strong> +1 (234) 567-890</p>
              <p><strong>Address:</strong> 123 Tailor Street, Fashion City, FC 12345</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
