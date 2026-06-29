import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, HeartHandshake, Leaf, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: 'Compassion',
    short: 'Care that reaches people first',
    blurb: 'We listen deeply, meet communities where they are, and respond with practical dignity before asking for anything in return.',
    image: '/images/compassion.jpeg',
    icon: HeartHandshake,
  },
  {
    title: 'Equity',
    short: 'Opportunities shaped by local need',
    blurb: 'Our work centers women, children, and rural households that are often left out of formal support systems and policy conversations.',
    image: '/images/equality.jpeg',
    icon: ShieldCheck,
  },
  {
    title: 'Ecology',
    short: 'Restoration rooted in place',
    blurb: 'We treat environmental care as a lived practice—through forest stewardship, water awareness, and community-led restoration.',
    image: '/images/ecology.jpeg',
    icon: Leaf,
  },
  {
    title: 'Purpose',
    short: 'Meaningful action, not performative charity',
    blurb: 'Every initiative is built to create long-term agency, confidence, and self-reliance rather than short-lived relief alone.',
    image: '/images/maa2.jpeg',
    icon: Compass,
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
      end: 'bottom bottom',
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
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
              The quiet principles behind every action
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-brand-grey/85">
            Each program is shaped by a deeply held ethic of care, dignity, and long-term community ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="value-card rounded-[28px] border border-brand-dark/10 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.04)] backdrop-blur-sm">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <ActiveIcon size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red/80">
                Guiding principle
              </p>
              <h3 className="mt-3 text-2xl font-semibold uppercase tracking-tight text-brand-dark">
                {activeValue.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-grey/80">
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
                <img
                  key={activeValue.image}
                  src={activeValue.image}
                  alt={activeValue.title}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/70 via-brand-dark/15 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-cream/80">
                      Our ethos in motion
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold uppercase tracking-tight text-brand-cream sm:text-3xl">
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
