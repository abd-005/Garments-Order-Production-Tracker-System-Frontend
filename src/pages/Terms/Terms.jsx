import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using TailorFlow website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      title: '2. Use License',
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on TailorFlow for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      
      - Modifying or copying the materials
      - Using the materials for any commercial purpose or any public display
      - Attempting to decompile or reverse engineer any software contained on TailorFlow
      - Removing any copyright or other proprietary notations from the materials
      - Transferring the materials to another person or "mirroring" the materials on any other server`,
    },
    {
      title: '3. Disclaimer',
      content: `The materials on TailorFlow are provided on an 'as is' basis. TailorFlow makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`,
    },
    {
      title: '4. Limitations',
      content: `In no event shall TailorFlow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TailorFlow, even if TailorFlow or authorized representative has been notified orally or in writing of the possibility of such damage.`,
    },
    {
      title: '5. Accuracy of Materials',
      content: `The materials appearing on TailorFlow could include technical, typographical, or photographic errors. TailorFlow does not warrant that any of the materials on its website are accurate, complete, or current. TailorFlow may make changes to the materials contained on its website at any time without notice.`,
    },
    {
      title: '6. Materials and Links',
      content: `TailorFlow has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TailorFlow of the site. Use of any such linked website is at the user's own risk.`,
    },
    {
      title: '7. Modifications',
      content: `TailorFlow may revise these Terms and Conditions for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms and Conditions.`,
    },
    {
      title: '8. Governing Law',
      content: `These Terms and Conditions and any separate agreements we provide as part of our Services shall be governed by and construed in accordance with the laws of your jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`,
    },
    {
      title: '9. User Responsibilities',
      content: `You agree to use TailorFlow only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the website. Prohibited behavior includes harassment, causing alarm, threatening behavior, abusive language, and discrimination.`,
    },
    {
      title: '10. Intellectual Property Rights',
      content: `All content, features, and functionality of TailorFlow (including but not limited to all information, software, text, displays, images, video, and audio) and the design, selection, and arrangement thereof, are owned by TailorFlow, its licensors, or other providers of such material and are protected by copyright, trademark, and other intellectual property laws.`,
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-lg text-white/80">Last Updated: January 2026</p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            These Terms and Conditions ("Terms") govern your access to and use of the TailorFlow website, services, and products. By accessing or using TailorFlow, you agree to comply with and be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
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
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
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
              Questions About These Terms?
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@tailorflow.com</p>
              <p><strong>Phone:</strong> +1 (234) 567-890</p>
              <p><strong>Address:</strong> 123 Tailor Street, Fashion City, FC 12345</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
