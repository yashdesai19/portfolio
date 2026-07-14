import { useEffect, useState } from 'react'

const SECTION_IDS = ['home', 'about', 'showcase', 'contact'] as const

export type SectionId = (typeof SECTION_IDS)[number]

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as SectionId)
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return activeSection
}
