import { motion } from 'framer-motion'
import { useState } from 'react'

type IdCardProps = {
  className?: string
  size?: 'sm' | 'md'
  photoSrc?: string
}

const lanyardTags = [
  { label: 'YASH', rotation: -8 },
  { label: 'YASH', rotation: 4 },
  { label: 'YASH', rotation: -5 },
]

const sizeStyles = {
  sm: {
    card: 'max-w-[160px] rounded-xl p-3',
    photo: 'rounded-lg',
    name: 'text-xl',
    tag: 'px-1.5 py-px text-[7px]',
    clip: 'h-2 w-6',
    gap: 'gap-0.5',
  },
  md: {
    card: 'max-w-[220px] rounded-2xl p-4',
    photo: 'rounded-xl',
    name: 'text-2xl',
    tag: 'px-2 py-0.5 text-[9px]',
    clip: 'h-3 w-8',
    gap: 'gap-1',
  },
}

export default function IdCard({
  className = '',
  size = 'md',
  photoSrc = '/card-photo.png',
}: IdCardProps) {
  const styles = sizeStyles[size]
  const [photoLoaded, setPhotoLoaded] = useState(false)
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPlaceholder = !photoLoaded || photoFailed

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: 'top center' }}
    >
      <div className={`mb-1 flex flex-col items-center ${styles.gap}`}>
        {lanyardTags.map((tag, index) => (
          <span
            key={index}
            className={`rounded-sm border border-white/20 bg-zinc-900 font-semibold tracking-[0.2em] text-foreground/80 shadow-sm ${styles.tag}`}
            style={{ transform: `rotate(${tag.rotation}deg)` }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div
        className={`mb-2 rounded-sm border border-zinc-400 bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-inner ${styles.clip}`}
        aria-hidden
      />

      <div className={`w-full bg-white shadow-lg shadow-black/40 ${styles.card}`}>
        <div
          className={`relative aspect-square w-full overflow-hidden bg-zinc-100 ${styles.photo}`}
        >
          <img
            src={photoSrc}
            alt="Photo of Yash"
            className={`h-full w-full object-cover object-[center_18%] transition-opacity duration-500 ${
              photoLoaded && !photoFailed ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => {
              setPhotoLoaded(true)
              setPhotoFailed(false)
            }}
            onError={() => {
              setPhotoFailed(true)
              setPhotoLoaded(false)
            }}
          />

          {showPlaceholder ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Photo
              </span>
            </div>
          ) : null}
        </div>

        <p className={`mt-2 text-center font-handwriting text-zinc-800 ${styles.name}`}>
          Yash
        </p>
      </div>
    </motion.div>
  )
}
