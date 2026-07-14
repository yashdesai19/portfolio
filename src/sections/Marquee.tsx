const TICKER_TEXT = 'BACKEND · DEVELOPER · '

export default function Marquee() {
  const content = TICKER_TEXT.repeat(8)

  return (
    <section className="marquee-strip border-y border-white/10 py-3" aria-hidden>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max">
          <span className="marquee-content shrink-0 px-2 text-xs tracking-[0.35em] text-muted uppercase">
            {content}
          </span>
          <span className="marquee-content shrink-0 px-2 text-xs tracking-[0.35em] text-muted uppercase">
            {content}
          </span>
        </div>
      </div>
    </section>
  )
}
