import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, ShieldCheck, Users, Lightbulb, HeartHandshake, Leaf } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: 'Excellence',
    short: 'Pursuing the highest standards in learning, research, and service',
    blurb: 'Pursuing the highest standards in learning, research, and service.',
    image: '/images/girls_studying.jpeg',
    icon: Award,
  },
  {
    title: 'Integrity',
    short: 'Upholding honesty, accountability, and ethical conduct',
    blurb: 'Upholding honesty, accountability, and ethical conduct.',
    image: '/images/founder_podium.jpeg',
    icon: ShieldCheck,
  },
  {
    title: 'Inclusivity',
    short: 'Respecting diversity and ensuring equal opportunities',
    blurb: 'Respecting diversity and ensuring equal opportunities for all.',
    image: '/images/women_empowerment_class.jpeg',
    icon: Users,
  },
  {
    title: 'Innovation',
    short: 'Encouraging creativity and problem-solving',
    blurb: 'Encouraging creativity and problem-solving for societal advancement.',
    image: '/images/villagelearning2.jpeg',
    icon: Lightbulb,
  },
  {
    title: 'Compassion',
    short: 'Promoting empathy, respect, and service to humanity',
    blurb: 'Promoting empathy, respect, and service to humanity.',
    image: '/images/compassion.jpeg',
    icon: HeartHandshake,
  },
  {
    title: 'Sustainability',
    short: 'Supporting responsible practices for future generations',
    blurb: 'Supporting responsible practices for the well-being of present and future generations.',
    image: '/images/sus2.jpeg',
    icon: Leaf,
  },
]


const OurValues = ({ isLoaded }) => {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!isLoaded || !sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.value-card')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoaded])

  useEffect(() => {
    if (!isLoaded || !sectionRef.current) return

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isDesktop) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 0.35,
      onUpdate: (self) => {
        const rawIndex = self.progress * (values.length - 1)
        const nextIndex = Math.round(rawIndex)
        setActiveIndex(Math.min(values.length - 1, Math.max(0, nextIndex)))
      },
    })

    return () => trigger.kill()
  }, [isLoaded])

  const activeValue = values[activeIndex]
  const ActiveIcon = activeValue.icon

  return (
    <section
      id="our-values"
      ref={sectionRef}
      className="relative w-full overflow-hidden border-b border-brand-dark/5 bg-brand-cream px-6 py-24 md:px-12 lg:py-32"
    >
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-8 md:px-16">
        <div className="h-full w-px bg-brand-dark/5" />
        <div className="h-full w-px bg-brand-dark/5" />
        <div className="hidden h-full w-px bg-brand-dark/5 md:block" />
      </div>
      <div className="absolute bottom-[-10%] right-[-8%] h-80 w-80 rounded-full bg-brand-dark/5 blur-[120px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-3 border-b border-brand-dark/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-brand-red">
              05 / Our Values
            </span>
            <h2 className="mt-2 text-3xl font-display font-black uppercase tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
              The quiet principles behind every action
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-brand-grey/85">
            Each program is shaped by a deeply held ethic of care, dignity, and long-term community ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="value-card min-h-[200px] lg:min-h-[220px] rounded-[28px] border border-brand-dark/10 bg-white/70 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.04)] backdrop-blur-sm">
              <div className="mb-4 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <ActiveIcon size={16} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red/80">
                Guiding principle
              </p>
              <h3 className="mt-2 text-2xl font-display font-black uppercase tracking-tight text-brand-dark">
                {activeValue.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-grey/80 min-h-[3rem] sm:min-h-[3.5rem]">
                {activeValue.blurb}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {values.map((value, index) => {
                const Icon = value.icon
                const isActive = index === activeIndex

                return (
                  <button
                    key={value.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`value-card flex w-full items-start gap-4 rounded-[22px] border px-5 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-brand-red/20 bg-brand-dark text-brand-cream shadow-[0_14px_30px_rgba(1,62,55,0.16)]'
                        : 'border-brand-dark/10 bg-brand-white/70 text-brand-dark hover:border-brand-red/20 hover:bg-brand-white'
                    }`}
                  >
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isActive ? 'bg-brand-cream/15 text-brand-cream' : 'bg-brand-red/10 text-brand-red'}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">
                        Value {index + 1}
                      </div>
                      <div className="mt-1 text-sm font-semibold uppercase tracking-[0.16em]">
                        {value.title}
                      </div>
                      <div className={`mt-1 text-sm leading-relaxed ${isActive ? 'text-brand-cream/80' : 'text-brand-grey/70'}`}>
                        {value.short}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-4xl border border-brand-dark/10 bg-white/70 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
                {values.map((value, index) => (
                  <img
                    key={value.image}
                    src={value.image}
                    alt={value.title}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                      index === activeIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/70 via-brand-dark/15 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-cream/80">
                      Our ethos in motion
                    </div>
                    <h3 className="mt-2 text-2xl font-display font-black uppercase tracking-tight text-brand-cream sm:text-3xl">
                      {activeValue.title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-brand-cream/25 bg-brand-cream/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-cream backdrop-blur-sm">
                    {activeIndex + 1}/{values.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurValues
