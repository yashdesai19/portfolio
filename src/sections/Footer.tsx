import { ArrowUp } from 'lucide-react'
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'
import { SiGithub } from 'react-icons/si'
import { CONTACT_LINKS, openEmailClient } from '../lib/contact'
import { useShowBackToTop } from '../hooks/useShowBackToTop'

const socialLinks = [
  {
    label: 'GitHub',
    href: CONTACT_LINKS.github,
    external: true,
    Icon: SiGithub,
  },
  {
    label: 'LinkedIn',
    href: CONTACT_LINKS.linkedin,
    external: true,
    Icon: FaLinkedinIn,
  },
  {
    label: 'Instagram',
    href: CONTACT_LINKS.instagram,
    external: true,
    Icon: FaInstagram,
  },
  {
    label: 'Email',
    href: CONTACT_LINKS.gmail,
    external: true,
    onClick: openEmailClient,
    Icon: HiOutlineMail,
  },
]

export default function Footer() {
  const showBackToTop = useShowBackToTop()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="border-t border-white/10 px-6 py-14 md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <p className="text-[11px] tracking-[0.35em] text-muted">FOLLOW ME</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map(({ label, href, external, onClick, Icon }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                onClick={
                  onClick
                    ? (event) => {
                        event.preventDefault()
                        onClick()
                      }
                    : undefined
                }
                aria-label={label}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:rotate-6 hover:border-accent-purple hover:shadow-[0_0_22px_rgba(201,164,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70"
              >
                <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted">
            Copyright © 2026 All Rights Reserved | Built by Yash
          </p>
        </div>
      </footer>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/70 text-foreground backdrop-blur-md transition-[opacity,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent-purple hover:shadow-[0_0_20px_rgba(201,164,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70 ${
          showBackToTop
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </>
  )
}
