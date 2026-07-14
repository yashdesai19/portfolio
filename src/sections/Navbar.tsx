import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'

const navLinks = [
  { label: 'Home', href: '#home', id: 'home' as const },
  { label: 'About', href: '#about', id: 'about' as const },
  { label: 'Showcase', href: '#showcase', id: 'showcase' as const },
  { label: 'Contact', href: '#contact', id: 'contact' as const },
]

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null)
  const scrolled = useScrolled()
  const activeSection = useActiveSection()
  const [time, setTime] = useState(() => formatTime(new Date()))
  const [menuOpen, setMenuOpen] = useState(false)
  const [navHeight, setNavHeight] = useState(0)

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()))
    const interval = window.setInterval(tick, 30_000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateNavHeight = () => {
      if (headerRef.current) {
        setNavHeight(headerRef.current.offsetHeight)
      }
    }

    updateNavHeight()
    window.addEventListener('resize', updateNavHeight)
    return () => window.removeEventListener('resize', updateNavHeight)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const handleChange = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-black/60 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a
            href="#home"
            className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70"
            aria-label="Go to home section"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-white/5 text-sm font-semibold text-foreground">
              Y
            </span>
            <span className="hidden text-sm font-medium tracking-wide text-foreground sm:inline">
              Yash
            </span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                  className={`relative rounded-sm text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70 ${
                    activeSection === link.id
                      ? 'text-foreground'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-accent-purple transition-transform duration-300 ${
                      activeSection === link.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <time
              className="hidden text-sm tabular-nums text-muted lg:block"
              dateTime={time}
            >
              {time}
            </time>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70 md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 z-40 transition-[opacity,transform] duration-300 ease-out md:hidden ${
          menuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
        style={{ top: navHeight }}
        aria-hidden={!menuOpen}
        {...(!menuOpen ? { inert: true } : {})}
      >
        <div
          className={`border-t border-white/10 transition-[background-color,backdrop-filter] duration-300 ${
            menuOpen ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent backdrop-blur-none'
          }`}
        >
          <ul className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                  className={`block rounded-sm border-b border-white/5 py-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70 ${
                    activeSection === link.id
                      ? 'text-accent-purple'
                      : 'text-foreground'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <time className="text-sm tabular-nums text-muted" dateTime={time}>
                {time}
              </time>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
