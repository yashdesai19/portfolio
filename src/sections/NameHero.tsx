import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const TAGLINE_LINES = ['Creating Websites', 'That Feel Alive.']

export default function NameHero() {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [heroFailed, setHeroFailed] = useState(false)
  const [nameRevealed, setNameRevealed] = useState(false)

  const showHeroPlaceholder = !heroLoaded || heroFailed

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden>
        <img
          src="/hero-coding.png"
          alt=""
          className={`h-full w-full object-cover object-[center_35%] transition-opacity duration-700 ${
            heroLoaded && !heroFailed ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => {
            setHeroLoaded(true)
            setHeroFailed(false)
          }}
          onError={() => {
            setHeroFailed(true)
            setHeroLoaded(false)
          }}
        />

        {showHeroPlaceholder ? (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />
        ) : null}

        <div className="hero-image-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-6 pb-16 pt-20 md:px-10 md:pb-24 md:pt-24 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:pt-24">
        <div
          className={`name-reveal mt-4 w-fit md:mt-8 lg:mt-0 ${
            nameRevealed ? 'name-reveal-active' : ''
          }`}
          onMouseEnter={() => setNameRevealed(true)}
          onMouseLeave={() => setNameRevealed(false)}
          onTouchStart={() => setNameRevealed(true)}
          onTouchEnd={() => setNameRevealed(false)}
          onTouchCancel={() => setNameRevealed(false)}
        >
          <div className="relative">
            <h1
              className="name-hero-gradient text-[clamp(4rem,14vw,14rem)] font-bold leading-[0.88] tracking-tight"
              aria-label="YASH"
            >
              YASH
            </h1>
            <h1
              className="name-shine text-[clamp(4rem,14vw,14rem)] font-bold leading-[0.88] tracking-tight"
              aria-hidden="true"
            >
              YASH
            </h1>
          </div>

          <div className="name-reveal-shade name-reveal-shade-top" aria-hidden />
          <div className="name-reveal-shade name-reveal-shade-bottom" aria-hidden />
        </div>

        <div className="mt-10 lg:mt-0 lg:text-right">
          <p className="hero-tagline">
            {TAGLINE_LINES.map((line) => (
              <span key={line} className="hero-tagline-line block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="relative z-10 px-6 pb-16 md:absolute md:inset-x-10 md:bottom-24 md:px-0 lg:inset-x-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xs text-xs leading-relaxed text-muted sm:text-sm">
            Building scalable APIs, databases, and production-ready backend systems.
          </p>

          <a
            href="#showcase"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-medium tracking-[0.2em] text-foreground backdrop-blur-sm transition-colors hover:border-accent-purple hover:bg-accent-purple/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70"
          >
            PORTFOLIO
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] tracking-[0.35em] text-muted">SCROLL</span>
        <span className="scroll-line block h-10 w-px bg-gradient-to-b from-white/60 to-transparent" aria-hidden />
      </div>
    </section>
  )
}
