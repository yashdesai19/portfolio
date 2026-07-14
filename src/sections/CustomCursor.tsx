import { useEffect, useRef, useState } from 'react'
import { useIsTouchDevice } from '../hooks/useIsTouchDevice'

export default function CustomCursor() {
  const isTouch = useIsTouchDevice()
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const isHoveringRef = useRef(false)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    cursor.style.opacity = '0'

    const updateCursor = (x: number, y: number, hovering: boolean) => {
      const scale = hovering ? 1 : 0.52
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const isInteractive = !!target?.closest(
        'button, a, input, textarea, select, [role="button"], [tabindex="0"], .cursor-hover'
      )

      if (!isInitialized.current) {
        isInitialized.current = true
        cursor.style.opacity = '1'
      }

      if (isInteractive !== isHoveringRef.current) {
        isHoveringRef.current = isInteractive
        setIsHovering(isInteractive)
      }

      updateCursor(e.clientX, e.clientY, isInteractive)
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      if (isInitialized.current) {
        cursor.style.opacity = '1'
      }
    }

    document.documentElement.style.cursor = 'none'

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[998] rounded-full border border-accent-purple mix-blend-difference will-change-transform transition-[transform,background-color,opacity,border-color] duration-150 ease-out"
      style={{
        width: 50,
        height: 50,
        backgroundColor: isHovering ? 'rgba(201, 164, 255, 0.25)' : 'transparent',
      }}
      aria-hidden
    />
  )
}
