// src/pages/Contact/ContactForm.jsx
import React, { useState } from 'react'

/*
  Production ready notes
  - The component accepts an optional `onSubmit` prop to send data to your API.
  - By default it logs the payload to console. Replace with fetch/axios to your endpoint.
  - Add server-side validation and spam protection (reCAPTCHA or honeypot) before going live.
*/

const ContactForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ loading: false, error: null, success: null })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return 'Please enter a valid email'
    if (!form.message.trim() || form.message.trim().length < 10) return 'Message must be at least 10 characters'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setStatus({ loading: false, error: err, success: null })
      return
    }

    setStatus({ loading: true, error: null, success: null })
    const payload = { ...form, createdAt: new Date().toISOString() }

    try {
      if (typeof onSubmit === 'function') {
        await onSubmit(payload)
      } else {
        // default behavior: log to console
        // replace this with axios/fetch to your contact endpoint
        // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
        console.log('Contact payload', payload)
      }
      setStatus({ loading: false, error: null, success: 'Message sent. We will reply within 1–2 business days.' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, error: 'Failed to send message. Try again later.', success: null })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow border border-gray-100">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {status.error && <div className="text-sm text-red-600">{status.error}</div>}
        {status.success && <div className="text-sm text-green-600">{status.success}</div>}

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">We respect your privacy. We will never share your details.</div>
          <button
            type="submit"
            disabled={status.loading}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            {status.loading ? 'Sending…' : 'Send Message'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default ContactForm
