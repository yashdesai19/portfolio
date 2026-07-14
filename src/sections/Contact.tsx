import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import FloatingField from '../components/FloatingField'
import { CONTACT_LINKS, openEmailClient } from '../lib/contact'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.subject.trim()) {
    errors.subject = 'Subject is required'
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters'
  }

  return errors
}

function buildWhatsAppMessage(values: FormValues) {
  return `Hello, I'm ${values.name.trim()}.

Email: ${values.email.trim()}
Subject: ${values.subject.trim()}

${values.message.trim()}`
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
    if (status === 'success') {
      setStatus('idle')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSubmitError('')

    if (Object.keys(nextErrors).length > 0) return

    if (!WHATSAPP_NUMBER) {
      setStatus('error')
      setSubmitError('WhatsApp number is not configured yet. Add VITE_WHATSAPP_NUMBER to .env.local.')
      return
    }

    setStatus('loading')

    const message = buildWhatsAppMessage(values)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    window.setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      setStatus('success')
      setValues(initialValues)
    }, 350)
  }

  return (
    <section id="contact" className="px-6 py-24 md:px-10 lg:px-14">
      <motion.div
        className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Have an idea, project, or collaboration in mind? Let's build something
            great together.
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={CONTACT_LINKS.gmail}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                event.preventDefault()
                openEmailClient()
              }}
              aria-label="Send email to yashdesai494@gmail.com"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-purple hover:shadow-[0_0_24px_rgba(201,164,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70"
            >
              <Mail size={20} />
            </a>
            <a
              href={
                WHATSAPP_NUMBER
                  ? `https://wa.me/${WHATSAPP_NUMBER}`
                  : 'https://wa.me/'
              }
              target="_blank"
              rel="noreferrer"
              aria-label="Open WhatsApp"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-teal hover:shadow-[0_0_24px_rgba(125,211,192,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/70"
            >
              <FaWhatsapp size={20} />
            </a>
            <a
              href={CONTACT_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Open LinkedIn"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-rose hover:shadow-[0_0_24px_rgba(224,168,184,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-rose/70"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href={CONTACT_LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Instagram"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-purple hover:shadow-[0_0_24px_rgba(201,164,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
          <div className="mb-2 flex items-center gap-3">
            <h3 className="text-xl font-semibold text-foreground">Send Message</h3>
            <span className="rounded-full border border-accent-purple/30 bg-accent-purple/10 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.2em] text-accent-purple">
              DIRECT
            </span>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-muted">
            Your message opens directly in WhatsApp — no spam, just real conversation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FloatingField
              id="contact-name"
              label="Name"
              name="name"
              value={values.name}
              onChange={(event) => handleChange('name', event.target.value)}
              error={errors.name}
              autoComplete="name"
            />

            <FloatingField
              id="contact-email"
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={(event) => handleChange('email', event.target.value)}
              error={errors.email}
              autoComplete="email"
            />

            <FloatingField
              id="contact-subject"
              label="Subject"
              name="subject"
              value={values.subject}
              onChange={(event) => handleChange('subject', event.target.value)}
              error={errors.subject}
            />

            <FloatingField
              id="contact-message"
              label="Message"
              name="message"
              multiline
              value={values.message}
              onChange={(event) => handleChange('message', event.target.value)}
              error={errors.message}
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-foreground px-5 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <AnimatePresence mode="wait">
                {status === 'loading' ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Loader2 size={16} className="animate-spin" />
                    Opening WhatsApp...
                  </motion.span>
                ) : status === 'success' ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center gap-2 text-emerald-400 font-semibold"
                  >
                    <CheckCircle2 size={16} />
                    WhatsApp Opened!
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {status === 'success' ? (
              <motion.div
                role="status"
                className="flex items-center gap-2 rounded-xl border border-accent-teal/30 bg-accent-teal/10 px-4 py-3 text-sm text-accent-teal"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <CheckCircle2 size={18} />
                WhatsApp opened. Tap send to deliver your message.
              </motion.div>
            ) : null}

            {status === 'error' && submitError ? (
              <p className="text-sm text-accent-rose">{submitError}</p>
            ) : null}

            <div className="flex items-center gap-2 pt-1 text-xs text-muted">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-teal" />
              </span>
              Usually replies within a few hours
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
