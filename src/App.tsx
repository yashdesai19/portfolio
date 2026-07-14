import { Suspense, lazy, useState } from 'react'
import LoadingScreen from './sections/LoadingScreen'
import CustomCursor from './sections/CustomCursor'
import NameHero from './sections/NameHero'
import Navbar from './sections/Navbar'
import Marquee from './sections/Marquee'
import RoleHero from './sections/RoleHero'

const About = lazy(() => import('./sections/About'))
const Showcase = lazy(() => import('./sections/Showcase'))
const Contact = lazy(() => import('./sections/Contact'))
const Footer = lazy(() => import('./sections/Footer'))

function SectionFallback({ className = '' }: { className?: string }) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl rounded-3xl border border-white/5 bg-white/[0.02] ${className}`}
      aria-hidden="true"
    />
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      <CustomCursor />
      <div className={isLoading ? 'pointer-events-none' : undefined}>
        <main className="overflow-x-clip">
          <NameHero />
          <Navbar />
          <Marquee />
          <RoleHero />
          <Suspense fallback={<SectionFallback className="min-h-[28rem] px-6 py-24 md:px-10 lg:px-14" />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionFallback className="min-h-[36rem] px-6 py-24 md:px-10 lg:px-14" />}>
            <Showcase />
          </Suspense>
          <Suspense fallback={<SectionFallback className="min-h-[34rem] px-6 py-24 md:px-10 lg:px-14" />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<SectionFallback className="min-h-32 px-6 py-14 md:px-10 lg:px-14" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}
