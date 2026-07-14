import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import {
  SiDocker,
  SiFastapi,
  SiGithub,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiSqlalchemy,
  SiSupabase,
} from 'react-icons/si'

type TabId = 'projects' | 'certificates' | 'tech'

// Set to true when you want the Certificates tab back.
const SHOW_CERTIFICATES = false

const tabs: { id: TabId; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  ...(SHOW_CERTIFICATES ? [{ id: 'certificates' as const, label: 'Certificates' }] : []),
  { id: 'tech', label: 'Tech Stack' },
]

const projects = [
  {
    title: 'Hireon',
    description:
      'AI-powered recruitment platform with smart candidate screening and role matching.',
    tags: ['Python', 'FastAPI', 'PostgreSQL'],
    thumbnail: '/projects/hireon-thumbnail.png',
    liveUrl: 'https://hirreon.com/',
  },
  {
    title: 'Gamebling',
    description:
      'Live cricket platform with real-time data integration, color trading, and secure authentication.',
    tags: ['Python', 'FastAPI', 'Redis'],
    thumbnail: '/projects/gamebling-thumbnail.png',
    liveUrl: 'https://gamebling-seven.vercel.app/',
  },
]

const certificates = [
  { name: 'Machine Learning Specialization', issuer: 'Coursera', year: '2024' },
  { name: 'Full Stack Web Development', issuer: 'Udemy', year: '2023' },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
  { name: 'Deep Learning Foundations', issuer: 'DeepLearning.AI', year: '2025' },
]

const technologies = [
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
  { name: 'SQLAlchemy', Icon: SiSqlalchemy, color: '#D71F00' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'Redis', Icon: SiRedis, color: '#DC382D' },
  { name: 'Supabase', Icon: SiSupabase, color: '#3ECF8E' },
  { name: 'GitHub', Icon: SiGithub, color: '#FFFFFF' },
]

const panelVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay, ease: 'easeOut' as const },
  }),
}

function ProjectsPanel() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project, index) => (
        <motion.article
          key={project.title}
          className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-purple/50 hover:shadow-[0_0_24px_rgba(201,164,255,0.15)]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={index * 0.1}
        >
          <div className="mb-4 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
            <img
              src={project.thumbnail}
              alt={`${project.title} project preview`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent-teal hover:text-accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/70"
            >
              Live Demo
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

function CertificatesPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {certificates.map((cert, index) => (
        <motion.article
          key={cert.name}
          className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-rose/50 hover:shadow-[0_0_24px_rgba(224,168,184,0.15)]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={index * 0.1}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-rose/30 bg-accent-rose/10 text-accent-rose">
            <Award size={20} />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{cert.name}</h3>
            <p className="mt-1 text-sm text-muted">
              {cert.issuer} · {cert.year}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

function TechStackPanel() {
  return (
    <div>
      <p className="mb-8 text-center text-[11px] tracking-[0.3em] text-muted">
        {technologies.length} TECHNOLOGIES · DAILY STACK
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-5 text-center"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            custom={index * 0.06}
            whileHover={{
              y: -4,
              borderColor: tech.color,
              boxShadow: `0px 0px 20px ${tech.color}33`,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
          >
            <tech.Icon size={28} style={{ color: tech.color }} aria-hidden />
            <span className="text-xs text-foreground/90">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Showcase() {
  const [activeTab, setActiveTab] = useState<TabId>('projects')

  return (
    <section id="showcase" className="px-6 py-24 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-white/20 sm:w-20" aria-hidden />
          <span className="text-[11px] tracking-[0.35em] text-muted">SHOWCASE</span>
          <span className="h-px w-12 bg-white/20 sm:w-20" aria-hidden />
        </div>

        <h2 className="showcase-heading-gradient text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Portfolio Showcase
        </h2>

        <div className="mx-auto mt-10 flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70 ${
                activeTab === tab.id
                  ? 'bg-foreground text-background'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {activeTab === 'projects' && <ProjectsPanel />}
              {SHOW_CERTIFICATES && activeTab === 'certificates' && <CertificatesPanel />}
              {activeTab === 'tech' && <TechStackPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
