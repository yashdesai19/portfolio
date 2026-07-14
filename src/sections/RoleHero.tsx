import { useState } from 'react'
import { Star } from 'lucide-react'
import IdCard from '../components/IdCard'

const techStack = [
  'Python',
  'FastAPI',
  'SQLAlchemy',
  'PostgreSQL',
  'Docker',
  'Redis',
  'Supabase',
]

export default function RoleHero() {
  const [showCard, setShowCard] = useState(false)

  return (
    <section className="px-6 py-24 md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
            <Star size={12} className="text-accent-teal" fill="currentColor" />
            <span className="text-[11px] font-medium tracking-[0.15em] text-foreground">
              AVAILABLE FOR WORK
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" aria-hidden />
          </div>

          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-foreground">Backend</span>
            <span className="block text-muted">Developer</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Building scalable APIs, databases, and server-side systems with clean
            architecture. Turning ideas into reliable, production-ready backends.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/90"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#showcase"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-end">
          <button
            type="button"
            onClick={() => setShowCard((open) => !open)}
            className="mb-6 rounded-full border border-accent-rose px-5 py-2 text-xs font-medium tracking-[0.2em] text-accent-rose transition-colors hover:bg-accent-rose/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-rose/70"
            aria-expanded={showCard}
            aria-controls="role-id-card"
            aria-label={showCard ? 'Hide ID card' : 'Show ID card'}
          >
            {showCard ? 'HIDE CARD' : 'SHOW CARD'}
          </button>

          <div
            id="role-id-card"
            className="w-full max-w-[260px] overflow-hidden id-card-transition"
            style={{
              maxHeight: showCard ? '420px' : '0px',
              opacity: showCard ? 1 : 0,
              pointerEvents: showCard ? 'auto' : 'none',
            }}
          >
            <IdCard className="mx-auto lg:mr-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
