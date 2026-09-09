import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

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
  
        console.log('Contact payload', payload)
      }
      setStatus({ loading: false, error: null, success: 'Message sent. We will reply within 1–2 business days.' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, error: 'Failed to send message. Try again later.', success: null })
    }
  }

  return (
    <Card className="gap-0 rounded-2xl border-0 p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <Label className="text-base-content/80">Name</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 h-11 rounded-md"
            required
          />
        </div>

        <div>
          <Label className="text-base-content/80">Email</Label>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 h-11 rounded-md"
            required
          />
        </div>

        <div>
          <Label className="text-base-content/80">Subject</Label>
          <Input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="mt-1 h-11 rounded-md"
          />
        </div>

        <div>
          <Label className="text-base-content/80">Message</Label>
          <Textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            className="mt-1 min-h-32 rounded-md"
            required
          />
        </div>

        {status.error && <div className="text-sm text-red-600">{status.error}</div>}
        {status.success && <div className="text-sm text-green-600">{status.success}</div>}

        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-base-content/50">We respect your privacy. We will never share your details.</div>
          <Button
            type="submit"
            disabled={status.loading}
            className="shrink-0"
          >
            {status.loading ? 'Sending…' : 'Send Message'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default ContactForm
