import React from 'react'
import ContactForm from './ContactForm'
import Logo from '../../Components/Logo/Logo'

const Contact = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <header className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <Logo className="w-24 h-24" />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              Get in touch
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl">
              Questions, custom orders, or wholesale inquiries — we’re here to help. Use the form
              below or reach us directly via email or phone.
            </p>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-primary">Contact Information</h3>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <div className="font-medium">Email</div>
                <div className="text-gray-600">support@tailorflow.example</div>
              </div>

              <div>
                <div className="font-medium">Phone</div>
                <div className="text-gray-600">+880 1X-XXXX-XXXX</div>
              </div>

              <div>
                <div className="font-medium">Address</div>
                <div className="text-gray-600">House 12, Road 8, Gulshan, Dhaka, Bangladesh</div>
              </div>

              <div>
                <div className="font-medium">Business hours</div>
                <div className="text-gray-600">Mon–Fri 9:00–18:00 (BST)</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Follow us</h4>
              <div className="flex gap-3">
                <a href="#" className="text-primary underline">Instagram</a>
                <a href="#" className="text-primary underline">Facebook</a>
                <a href="#" className="text-primary underline">LinkedIn</a>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-primary">Visit our studio</h3>
          <p className="text-gray-600 mt-2">We welcome visits by appointment. Please contact us to schedule a fitting.</p>
        </div>
      </section>

    </main>
  )
}

export default Contact
