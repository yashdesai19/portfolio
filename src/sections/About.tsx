import { motion } from 'framer-motion'
import IdCard from '../components/IdCard'

const paragraphs = [
  "I'm Yash Desai, a passionate Python Backend Developer with a strong interest in building scalable web applications and AI-powered solutions. I specialize in developing secure and high-performance backend systems using Python, FastAPI, SQLAlchemy, PostgreSQL, and REST APIs.",
  'I enjoy transforming ideas into real-world products by designing efficient APIs, optimizing databases, and solving complex technical challenges. Alongside backend development, I have experience working with React, JavaScript, Git, Docker, and Supabase, enabling me to collaborate effectively across the full development lifecycle.',
  'I have worked on projects such as Hireon, an AI-powered recruitment platform, and Gamebling, a live cricket platform featuring real-time data integration and secure authentication. These projects have strengthened my skills in backend architecture, authentication, database management, and performance optimization.',
  'I am a continuous learner who enjoys exploring new technologies, improving problem-solving abilities, and writing clean, maintainable code. My goal is to build impactful software that delivers excellent user experiences while following industry best practices.',
]

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 lg:px-14">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <a
          href="#home"
          className="mb-12 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Back
        </a>

        <div className="mb-10 flex justify-center">
          <IdCard size="sm" />
        </div>

        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          About Me
          <span className="typing-cursor text-accent-purple">|</span>
        </h2>

        <div className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm font-normal leading-relaxed text-muted md:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
