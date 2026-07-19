import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Lightbulb, Award, Briefcase, Leaf, Scale, Users, HeartHandshake } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const missionItems = [
  {
    title: "Holistic Education",
    text: "Promote holistic education and lifelong learning for academic excellence and capacity building.",
    narrative: "Every journey begins with knowledge. We believe that true education extends beyond the classroom — nurturing curiosity, critical thinking, and the courage to keep learning.",
    icon: BookOpen,
    tag: "Pillar 01",
    chapter: "I",
  },
  {
    title: "Research & Innovation",
    text: "Encourage innovation, creativity, and interdisciplinary research for societal development.",
    narrative: "Breakthroughs happen at the intersection of disciplines. We cultivate spaces where bold ideas meet rigorous inquiry — and turn research into real-world impact.",
    icon: Lightbulb,
    tag: "Pillar 02",
    chapter: "II",
  },
  {
    title: "Leadership & Ethics",
    text: "Develop leadership qualities, strong ethical values, and responsible citizenship.",
    narrative: "The world needs leaders who lead with conscience. We shape individuals who hold themselves accountable to their communities and to a higher moral standard.",
    icon: Award,
    tag: "Pillar 03",
    chapter: "III",
  },
  {
    title: "Skill Development",
    text: "Strengthen practical skills, entrepreneurship, financial literacy, and employability.",
    narrative: "Potential without opportunity stagnates. We bridge the gap by equipping people with practical tools — entrepreneurial mindsets and the financial fluency to build futures.",
    icon: Briefcase,
    tag: "Pillar 04",
    chapter: "IV",
  },
  {
    title: "Health & Well-being",
    text: "Promote community health, physical and mental well-being, and environmental sustainability.",
    narrative: "A thriving society starts with thriving people. We champion holistic wellness — tending to the mind, body, and the environment we all share.",
    icon: Leaf,
    tag: "Pillar 05",
    chapter: "V",
  },
  {
    title: "Dignity & Justice",
    text: "Foster constitutional values, human dignity, social justice, and equality.",
    narrative: "No progress is real unless it is equal. We stand for the inalienable dignity of every person, and work to dismantle the structures that limit human potential.",
    icon: Scale,
    tag: "Pillar 06",
    chapter: "VI",
  },
  {
    title: "Community Outreach",
    text: "Encourage volunteerism, direct community outreach, and active nation-building.",
    narrative: "Change is not handed down — it grows from within communities. We ignite the spirit of service, turning compassion into collective action.",
    icon: Users,
    tag: "Pillar 07",
    chapter: "VII",
  },
  {
    title: "Strategic Partnerships",
    text: "Build collaborations between academia, industry, government, and civil society.",
    narrative: "No mission this large can be achieved alone. We weave together academia, industry, and governance into a unified force for systemic transformation.",
    icon: HeartHandshake,
    tag: "Pillar 08",
    chapter: "VIII",
  }
]

/* ─────────────────────────────────────────
   PREMIUM LIGHT STORY CARD
───────────────────────────────────────── */
const StoryCard = ({ item, idx, Icon }) => {
  const accent = '#0ea5e9'

  return (
    <div className="vm-card group relative w-full max-w-[420px] xl:max-w-[460px]">

      {/* Layered shadow system — creates depth without dark bg */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        }}
      />
      {/* Hover: deeper layered shadow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        style={{
          boxShadow: `0 8px 24px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.05), 0 2px 6px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`,
        }}
      />

      {/* Main card surface */}
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        {/* Top accent gradient stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${accent}cc 30%, ${accent} 50%, ${accent}cc 70%, transparent 100%)` }}
        />

        {/* Subtle inner paper texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {/* Hover tint wash (very soft blue at top) */}
        <div
          className="absolute top-0 left-0 right-0 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${accent}06, transparent)` }}
        />

        <div className="p-7 sm:p-8 relative z-10">

          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              {/* Chapter roman badge */}
              <span
                className="font-display font-black text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 rounded-full"
                style={{
                  color: accent,
                  background: `${accent}12`,
                  border: `1px solid ${accent}30`,
                  boxShadow: `0 2px 8px ${accent}18`,
                }}
              >
                {item.chapter}
              </span>
              <span className="font-display text-[9px] font-bold uppercase tracking-[0.28em] text-brand-dark/30">
                {item.tag}
              </span>
            </div>

            {/* Icon badge */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:rotate-3"
              style={{
                background: `linear-gradient(135deg, ${accent}18, ${accent}0a)`,
                border: `1px solid ${accent}22`,
                boxShadow: `0 2px 8px ${accent}14`,
              }}
            >
              <Icon size={16} style={{ color: accent, strokeWidth: 2.2 }} />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-[1.45rem] sm:text-[1.6rem] text-brand-dark font-light tracking-tight mb-2.5 leading-[1.2] transition-colors duration-300 group-hover:text-brand-red">
            {item.title}
          </h3>

          {/* Thin rule */}
          <div
            className="w-8 h-px mb-5 transition-all duration-500 group-hover:w-14"
            style={{ background: `linear-gradient(90deg, ${accent}, ${accent}30)` }}
          />

          {/* Narrative body */}
          <p className="font-sans text-[13px] text-brand-dark/55 leading-[1.85] font-light mb-5">
            {item.narrative}
          </p>

          {/* Blockquote mission text */}
          <div
            className="relative pl-4 py-1"
            style={{ borderLeft: `2px solid ${accent}45` }}
          >
            <p className="font-serif text-[13.5px] text-brand-dark/70 leading-[1.7] italic">
              {item.text}
            </p>
          </div>

          {/* Card footer */}
          <div className="mt-6 pt-5 border-t border-brand-dark/[0.05] flex items-center justify-between">
            {/* Progress dots */}
            <div className="flex gap-1.5 items-center">
              {[20, 12, 6].map((w, i) => (
                <div
                  key={i}
                  className="h-[2px] rounded-full transition-all duration-500"
                  style={{
                    width: `${w}px`,
                    background: i === 0 ? accent : `${accent}${i === 1 ? '50' : '28'}`,
                  }}
                />
              ))}
            </div>
            {/* Ghost number */}
            <span
              className="font-display font-black leading-none select-none transition-opacity duration-300 group-hover:opacity-100"
              style={{
                fontSize: '2.8rem',
                color: `${accent}18`,
                letterSpacing: '-0.02em',
              }}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Bottom glow edge (visible on hover) */}
        <div
          className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const VisionMission = ({ isLoaded }) => {
  const containerRef          = useRef(null)
  const visionRef             = useRef(null)
  const missionRef            = useRef(null)
  const lineTrackRef          = useRef(null)
  const lineProgressRef       = useRef(null)
  const mobileLineProgressRef = useRef(null)
  const nodeRefs              = useRef([])

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {

      /* ── Vision reveal ── */
      const visionEl = visionRef.current
      if (visionEl) {
        const badge    = visionEl.querySelector('.vm-badge')
        const words    = visionEl.querySelectorAll('.vm-heading-word')
        const dividers = visionEl.querySelectorAll('.vm-divider')
        const quote    = visionEl.querySelector('.vm-quote')

        const tl = gsap.timeline({
          scrollTrigger: { trigger: visionEl, start: 'top 75%', toggleActions: 'play none none reverse' }
        })
        tl.fromTo(badge,    { opacity: 0, y: 14, scale: 0.9 }, { opacity: 1, y: 0, scale: 1,  duration: 0.5,  ease: 'back.out(1.7)' })
          .fromTo(words,    { opacity: 0, y: 40 },              { opacity: 1, y: 0,            duration: 0.65, ease: 'power3.out', stagger: 0.12 }, '-=0.25')
          .fromTo(dividers, { scaleX: 0 },                      { scaleX: 1,                   duration: 0.5,  ease: 'power2.out', stagger: 0.08 }, '-=0.35')
          .fromTo(quote,    { opacity: 0, y: 22 },              { opacity: 1, y: 0,            duration: 0.65, ease: 'power2.out' }, '-=0.3')
      }

      /* ── Timeline ink line draw (scrub) ── */
      if (lineProgressRef.current && lineTrackRef.current) {
        const path = lineProgressRef.current
        const length = path.getTotalLength ? path.getTotalLength() : 2400

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length
        })

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: lineTrackRef.current,
            start: 'top 50%',
            end: 'bottom 70%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          }
        })
      }

      if (mobileLineProgressRef.current && lineTrackRef.current) {
        const mPath = mobileLineProgressRef.current
        const mLength = mPath.getTotalLength ? mPath.getTotalLength() : 2400

        gsap.set(mPath, {
          strokeDasharray: mLength,
          strokeDashoffset: mLength
        })

        gsap.to(mPath, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: lineTrackRef.current,
            start: 'top 50%',
            end: 'bottom 70%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          }
        })
      }

      /* ── Per-node story reveals ── */
      nodeRefs.current.forEach((node, idx) => {
        if (!node) return
        const isRight = idx % 2 === 0

        const card        = node.querySelector('.vm-card')
        const dot         = node.querySelector('.vm-dot')
        const connector   = node.querySelector('.vm-connector')
        const chapterEl   = node.querySelector('.vm-chapter-label')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          }
        })

        tl.fromTo(dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' }
        )

        if (connector) {
          tl.fromTo(connector,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.4, ease: 'expo.out' },
            '-=0.25'
          )
        }

        if (chapterEl) {
          tl.fromTo(chapterEl,
            { opacity: 0, x: isRight ? 12 : -12 },
            { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.2'
          )
        }

        tl.fromTo(card,
          { opacity: 0, x: isRight ? -40 : 40 },
          { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' },
          '-=0.3'
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <section
      id="vision-mission"
      ref={containerRef}
      className="relative z-20 w-full bg-brand-cream overflow-hidden py-28 md:py-36"
    >

      {/* Decorative blobs */}
      <div className="absolute glowing-blob w-[600px] h-[600px] bg-brand-red/8 top-[-5%] right-[-15%] opacity-20 pointer-events-none" />
      <div className="absolute glowing-blob w-[400px] h-[400px] bg-brand-dark/5 bottom-[10%] left-[-10%] opacity-15 pointer-events-none" style={{ animationDelay: '12s' }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: `linear-gradient(var(--color-brand-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-dark) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">

        {/* Section label */}
        <div className="flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-20 md:mb-28">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-brand-skyblue">
            03 / Vision &amp; Mission
          </span>
          <span className="font-serif italic text-xs text-brand-grey font-bold">Our Purpose</span>
        </div>

        {/* ══ VISION ══ */}
        <div ref={visionRef} className="relative mb-28 md:mb-44">
          <span
            className="absolute -top-6 left-0 font-display font-black uppercase leading-none text-brand-dark/[0.04] select-none pointer-events-none tracking-tighter"
            style={{ fontSize: 'clamp(3rem,8vw,7rem)' }}
            aria-hidden="true"
          >VISION</span>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span className="vm-badge inline-flex items-center gap-2 bg-brand-red/10 text-brand-red font-display text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                Our Vision
              </span>
              <h2 className="font-serif text-brand-dark leading-[1.08] tracking-tight" style={{ fontSize: 'clamp(2.4rem,5.2vw,4.5rem)' }}>
                <span className="vm-heading-word block">To Inspire</span>
                <span className="vm-heading-word block text-brand-red">&amp; Empower</span>
                <span className="vm-heading-word block">Every Soul</span>
              </h2>
              <div className="mt-8 flex items-center gap-3">
                <div className="vm-divider h-[3.5px] w-12 bg-brand-red origin-left rounded-full" />
                <div className="vm-divider h-[3.5px] w-6 bg-brand-red/40 origin-left rounded-full" />
                <div className="vm-divider h-[3.5px] w-3 bg-brand-red/20 origin-left rounded-full" />
              </div>
            </div>

            <div className="vm-quote relative">
              <div className="relative bg-white/80 backdrop-blur-sm border border-brand-dark/8 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(1,62,55,0.06)]">
                <div className="absolute top-0 left-8 right-8 h-[4px] bg-gradient-to-r from-brand-red/60 via-brand-red to-brand-red/60 rounded-full" />
                <span className="absolute -top-5 -left-2 font-serif font-black text-8xl text-brand-red/15 leading-none select-none" aria-hidden="true">"</span>
                <p className="font-serif text-xl md:text-2xl text-brand-dark leading-[1.6] font-light relative z-10 mt-2">
                  To build an inclusive, empowered, and sustainable society by unlocking the inherent potential of every individual and fostering leadership, innovation, and social responsibility.
                </p>
                <span className="absolute -bottom-8 -right-1 font-serif font-black text-8xl text-brand-red/15 leading-none select-none" aria-hidden="true">"</span>
                <div className="mt-8 pt-6 border-t border-brand-dark/8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center">
                    <span className="text-brand-red font-display font-black text-[10px]">AM</span>
                  </div>
                  <span className="font-display text-[11px] font-bold uppercase tracking-widest text-brand-grey">
                    Aadishakti Mission
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ MISSION TIMELINE ══ */}
        <div ref={missionRef}>

          {/* Mission header */}
          <div className="text-center mb-16 md:mb-24">
            <span className="inline-flex items-center gap-2 bg-brand-dark/[0.04] border border-brand-dark/[0.07] text-brand-dark font-display text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-skyblue" />
              Our Mission
            </span>
            <h2 className="font-serif text-brand-dark leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>
              Eight Pillars of<span className="text-brand-red"> Change</span>
            </h2>
            <p className="font-sans text-sm text-brand-dark/45 mt-5 max-w-lg mx-auto leading-[1.9]">
              A story of transformation told through eight commitments — each one a chapter in our ongoing journey to build a better world.
            </p>

            {/* Scroll cue */}
            <div className="mt-8 flex flex-col items-center gap-2 opacity-35">
              <span className="font-display text-[9px] uppercase tracking-[0.3em] text-brand-dark">Scroll to read</span>
              <div className="w-[2px] h-9 bg-gradient-to-b from-brand-dark to-transparent rounded-full" />
            </div>
          </div>

          {/* Timeline track */}
          <div className="relative" ref={lineTrackRef}>

            {/* Curvy Wave Spine (desktop) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-32 lg:w-48 hidden lg:block pointer-events-none z-0">
              <svg 
                viewBox="0 0 100 800" 
                preserveAspectRatio="none" 
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient id="vm-curvy-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
                    <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="vm-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Background translucent curvy track */}
                <path 
                  d="M 50,0 C 85,30 85,70 50,100 C 15,130 15,170 50,200 C 85,230 85,270 50,300 C 15,330 15,370 50,400 C 85,430 85,470 50,500 C 15,530 15,570 50,600 C 85,630 85,670 50,700 C 15,730 15,770 50,800"
                  fill="none"
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Animated progress curvy path */}
                <path 
                  ref={lineProgressRef}
                  d="M 50,0 C 85,30 85,70 50,100 C 15,130 15,170 50,200 C 85,230 85,270 50,300 C 15,330 15,370 50,400 C 85,430 85,470 50,500 C 15,530 15,570 50,600 C 85,630 85,670 50,700 C 15,730 15,770 50,800"
                  fill="none"
                  stroke="url(#vm-curvy-grad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#vm-glow-filter)"
                />
              </svg>
            </div>

            {/* Curvy Wave Rail (mobile) */}
            <div className="absolute left-3 top-4 bottom-4 w-8 lg:hidden pointer-events-none z-0">
              <svg viewBox="0 0 30 800" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <path 
                  d="M 15,0 C 30,50 0,100 15,150 C 30,200 0,250 15,300 C 30,350 0,400 15,450 C 30,500 0,550 15,600 C 30,650 0,700 15,750 C 30,780 15,800 15,800"
                  fill="none"
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path 
                  ref={mobileLineProgressRef}
                  d="M 15,0 C 30,50 0,100 15,150 C 30,200 0,250 15,300 C 30,350 0,400 15,450 C 30,500 0,550 15,600 C 30,650 0,700 15,750 C 30,780 15,800 15,800"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Nodes */}
            <div className="flex flex-col">
              {missionItems.map((item, idx) => {
                const Icon    = item.icon
                const isRight = idx % 2 === 0

                return (
                  <div
                    key={idx}
                    ref={el => { nodeRefs.current[idx] = el }}
                    className="relative flex items-center py-8 lg:py-12"
                  >

                    {/* ─── DESKTOP ─── */}

                    {/* Left side */}
                    <div className="hidden lg:flex flex-1 justify-end pr-16">
                      {isRight
                        ? <StoryCard item={item} idx={idx} Icon={Icon} />
                        : (
                          <div className="vm-chapter-label flex flex-col items-end gap-1 opacity-0">
                            <span className="font-display font-black leading-none text-brand-dark/[0.06] select-none" style={{ fontSize: 'clamp(3rem,5vw,5rem)' }}>
                              {item.chapter}
                            </span>
                            <span className="font-display text-[9px] font-bold uppercase tracking-[0.3em] text-brand-dark/25">
                              {item.tag}
                            </span>
                          </div>
                        )
                      }
                    </div>

                    {/* Center dot */}
                    <div
                      className="vm-dot hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10 shrink-0 items-center justify-center"
                      style={{
                        width: '46px', height: '46px',
                        borderRadius: '50%',
                        background: '#FAF9F6',
                        border: '3px solid #0ea5e9',
                        boxShadow: '0 0 0 6px rgba(14,165,233,0.15), 0 4px 18px rgba(14,165,233,0.3), 0 1px 3px rgba(0,0,0,0.08)',
                        transform: 'translateX(-50%) scale(0)',
                        opacity: 0,
                      }}
                    >
                      <Icon size={16} style={{ color: '#0ea5e9', strokeWidth: 2.5 }} />
                    </div>

                    {/* Connector - Made Thicker (3px) */}
                    <div
                      className="vm-connector hidden lg:block absolute z-[5] rounded-full"
                      style={{
                        height: '3px',
                        width: '60px',
                        background: isRight
                          ? 'linear-gradient(90deg, rgba(14,165,233,0.8), rgba(14,165,233,0.15))'
                          : 'linear-gradient(90deg, rgba(14,165,233,0.15), rgba(14,165,233,0.8))',
                        ...(isRight
                          ? { left: 'calc(50% + 23px)', transformOrigin: 'left', transform: 'scaleX(0)' }
                          : { right: 'calc(50% + 23px)', transformOrigin: 'right', transform: 'scaleX(0)' }),
                      }}
                    />

                    {/* Right side */}
                    <div className="hidden lg:flex flex-1 justify-start pl-16">
                      {!isRight
                        ? <StoryCard item={item} idx={idx} Icon={Icon} />
                        : (
                          <div className="vm-chapter-label flex flex-col items-start gap-1 opacity-0">
                            <span className="font-display font-black leading-none text-brand-dark/[0.06] select-none" style={{ fontSize: 'clamp(3rem,5vw,5rem)' }}>
                              {item.chapter}
                            </span>
                            <span className="font-display text-[9px] font-bold uppercase tracking-[0.3em] text-brand-dark/25">
                              {item.tag}
                            </span>
                          </div>
                        )
                      }
                    </div>

                    {/* ─── MOBILE ─── */}
                    <div className="flex lg:hidden w-full pl-12 pr-1">
                      <div
                        className="vm-dot absolute left-5 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                        style={{
                          width: '38px', height: '38px',
                          borderRadius: '50%',
                          background: '#FAF9F6',
                          border: '2.5px solid #0ea5e9',
                          boxShadow: '0 0 0 5px rgba(14,165,233,0.15), 0 2px 10px rgba(14,165,233,0.2)',
                          transform: 'translate(-50%, -50%) scale(0)',
                          opacity: 0,
                        }}
                      >
                        <Icon size={13} style={{ color: '#0ea5e9', strokeWidth: 2.5 }} />
                      </div>
                      <StoryCard item={item} idx={idx} Icon={Icon} />
                    </div>

                  </div>
                )
              })}
            </div>

            {/* End cap dot */}
            <div className="hidden lg:flex justify-center mt-2">
              <div
                style={{
                  width: '14px', height: '14px',
                  borderRadius: '50%',
                  background: '#0ea5e9',
                  boxShadow: '0 0 0 6px rgba(14,165,233,0.18), 0 0 22px rgba(14,165,233,0.4)',
                }}
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default VisionMission
