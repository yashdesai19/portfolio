import { useEffect, useState } from 'react'
import { Code2, Globe, User } from 'lucide-react'

const URL_TEXT = 'yashdesai19.vercel.app'
const HIDE_DELAY_MS = 2800
const FADE_DURATION_MS = 600
const PROGRESS_DURATION_MS = 2400
const TYPING_INTERVAL_MS = 80

const icons = [
  { Icon: Code2, label: 'Code' },
  { Icon: User, label: 'Profile' },
  { Icon: Globe, label: 'Web' },
]

type LoadingScreenProps = {
  onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [typedText, setTypedText] = useState('')
  const [phase, setPhase] = useState<'visible' | 'fading' | 'hidden'>('visible')

  useEffect(() => {
    let charIndex = 0
    const typingTimer = window.setInterval(() => {
      charIndex += 1
      setTypedText(URL_TEXT.slice(0, charIndex))
      if (charIndex >= URL_TEXT.length) {
        window.clearInterval(typingTimer)
      }
    }, TYPING_INTERVAL_MS)

    const hideTimer = window.setTimeout(() => {
      setPhase('fading')
    }, HIDE_DELAY_MS)

    const completeTimer = window.setTimeout(() => {
      setPhase('hidden')
      onComplete?.()
    }, HIDE_DELAY_MS + FADE_DURATION_MS)

    return () => {
      window.clearInterval(typingTimer)
      window.clearTimeout(hideTimer)
      window.clearTimeout(completeTimer)
    }
  }, [onComplete])

  if (phase === 'hidden') return null

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-background transition-opacity duration-[600ms] ease-out"
      style={{
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
      aria-hidden={phase === 'fading'}
      aria-label="Loading"
    >
      <div className="flex w-full max-w-lg flex-col items-center px-6 text-center">
        <div className="mb-10 flex items-center gap-4">
          {icons.map(({ Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              disabled
              tabIndex={-1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-foreground opacity-90"
            >
              <Icon size={16} strokeWidth={1.75} />
            </button>
          ))}
        </div>

        <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
          Welcome to my
          <br />
          Portfolio Website
        </h1>

        <p className="mt-4 text-sm text-muted sm:text-base">
          Creating Websites That Feel Alive.
        </p>

        <div className="mt-8 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-sm text-foreground/90 sm:text-base">
          <span>{typedText}</span>
          <span className="animate-blink text-accent-purple">|</span>
        </div>

        <div className="mt-10 h-px w-48 overflow-hidden rounded-full bg-white/10 sm:w-56">
          <div
            className="h-full origin-left rounded-full bg-accent-purple"
            style={{
              animation: `loading-progress ${PROGRESS_DURATION_MS}ms ease-out forwards`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loading-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  )
}
