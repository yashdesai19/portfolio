export const CONTACT_EMAIL = 'yashdesai494@gmail.com'

export const CONTACT_LINKS = {
  email: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Portfolio Inquiry')}`,
  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent('Portfolio Inquiry')}`,
  linkedin: 'https://www.linkedin.com/in/desaiyash494/',
  github: 'https://github.com/yashdesai19',
  instagram: 'https://www.instagram.com/yxshh._.patel?igsh=M24ydmNsYzlyNnBp',
} as const

export function openEmailClient() {
  const opened = window.open(CONTACT_LINKS.gmail, '_blank', 'noopener,noreferrer')
  if (!opened) {
    window.location.href = CONTACT_LINKS.email
  }
}
