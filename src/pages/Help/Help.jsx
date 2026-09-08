import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
            >
              <Card className="gap-0 p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <item.icon className="mx-auto mb-3 size-8 text-primary" />
                <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
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
              >
                <Card className="gap-0 p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold text-primary">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-base-content/80">
                        <span className="size-1.5 shrink-0 rounded-full bg-primary"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="gap-0 p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-primary">Can't Find What You're Looking For?</h2>
            <p className="mb-6 text-muted-foreground">
              Contact our support team directly and we'll get back to you within 2 hours.
            </p>
            <form className="max-w-2xl space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  type="text"
                  placeholder="Your Name"
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <Textarea
                placeholder="Your Message"
                rows={6}
                required
              />
              <Button type="submit">
                Send Message
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
