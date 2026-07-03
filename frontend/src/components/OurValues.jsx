import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, ShieldCheck, Users, Lightbulb, HeartHandshake, Leaf } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: 'Excellence',
    short: 'Pursuing the highest standards in learning, research, and service',
    blurb: 'We believe that excellence is not an act, but a habit. We continuously strive to elevate the quality of our educational and outreach programs to ensure lasting impact.',
    image: '/images/girls_studying.jpeg',
    icon: Award,
  },
  {
    title: 'Integrity',
    short: 'Upholding honesty, accountability, and ethical conduct',
    blurb: 'Every initiative is grounded in total transparency. We build trust with our communities through uncompromising ethical standards and accountable actions.',
    image: '/images/founder_podium.jpeg',
    icon: ShieldCheck,
  },
  {
    title: 'Inclusivity',
    short: 'Respecting diversity and ensuring equal opportunities',
    blurb: 'True empowerment reaches the margins. We consciously design our programs to bridge divides of gender, geography, and socio-economic status.',
    image: '/images/women_empowerment_class.jpeg',
    icon: Users,
  },
  {
    title: 'Innovation',
    short: 'Encouraging creativity and problem-solving',
    blurb: 'The unique challenges of the Himalayas require unique solutions. We foster creative problem solving to develop scalable and adaptable models of change.',
    image: '/images/villagelearning2.jpeg',
    icon: Lightbulb,
  },
  {
    title: 'Compassion',
    short: 'Promoting empathy, respect, and service to humanity',
    blurb: 'Empathy is our compass. We approach every community interaction with deep respect for local wisdom and a genuine desire to uplift and support.',
    image: '/images/compassion.jpeg',
    icon: HeartHandshake,
  },
  {
    title: 'Sustainability',
    short: 'Supporting responsible practices for future generations',
    blurb: 'Our interventions are designed to outlive us. We prioritize ecological balance and community-driven ownership to ensure long-term, self-sustaining progress.',
    image: '/images/sus2.jpeg',
    icon: Leaf,
  },
]

const OurValues = ({ isLoaded }) => {
  const sectionRef = useRef(null)
  const leftColumnRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!isLoaded || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Create scroll triggers for each text block
      const blocks = gsap.utils.toArray('.value-text-block')
      
      blocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        })
      })
      
      // Cleanup scroll triggers automatically in context
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <section
      id="our-values"
      ref={sectionRef}
      className="relative w-full bg-brand-cream border-b border-brand-dark/5"
    >
      {/* Background Decor */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-grey/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Standard Header */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-8 relative z-20">
        <div className="flex flex-col gap-4 border-b border-brand-dark/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-brand-red">
              05 / Our Values
            </span>
            <h2 className="mt-2 text-4xl font-display font-black uppercase tracking-tight text-brand-dark sm:text-5xl md:text-6xl max-w-3xl">
              The quiet principles behind every action
            </h2>
          </div>
          <p className="max-w-sm text-sm md:text-base leading-relaxed text-brand-grey/85 font-light pb-1">
            Each program is shaped by a deeply held ethic of care, dignity, and long-term community ownership.
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row pb-24 md:pb-32 z-20">
        
        {/* Left Column: Scrolling Typography */}
        <div 
          ref={leftColumnRef}
          className="w-full lg:w-1/2 lg:pr-6 xl:pr-10 pt-12 lg:pt-[20vh] pb-[10vh] lg:pb-[30vh] flex flex-col gap-[15vh] lg:gap-[35vh]"
        >
          {values.map((val, idx) => {
            const isActive = activeIndex === idx
            return (
              <div key={idx} className="value-text-block group relative">
                {/* Massive Title */}
                <h3 
                  className={`text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-black uppercase tracking-tighter transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive 
                      ? 'text-brand-dark translate-x-2 md:translate-x-4 scale-100' 
                      : 'text-transparent [-webkit-text-stroke:2.5px_rgba(1,62,55,0.25)] scale-[0.98]'
                  }`}
                >
                  {val.title}
                </h3>
                
                {/* Expanding Content */}
                <div 
                  className={`mt-8 flex flex-col gap-4 max-w-md transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive 
                      ? 'opacity-100 translate-y-0 translate-x-2 md:translate-x-4' 
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 bg-brand-red/10 text-brand-red rounded-full p-2.5 shrink-0 shadow-sm border border-brand-red/20">
                      <val.icon size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="block text-brand-dark font-black uppercase tracking-[0.2em] text-[11px] mb-1">
                        Core Tenet 0{idx + 1}
                      </span>
                      <span className="block text-brand-dark font-semibold leading-tight text-sm md:text-base">
                        {val.short}
                      </span>
                    </div>
                  </div>
                  <p className="text-brand-grey text-sm md:text-base leading-relaxed font-light pl-13">
                    {val.blurb}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Column: Sticky Image Gallery */}
        <div className="w-full lg:w-1/2 lg:pl-2 xl:pl-6 lg:h-screen lg:sticky lg:top-0 flex items-center justify-center pt-8 lg:pt-0 pointer-events-none">
          {/* Glass Image Container */}
          <div className="relative w-full aspect-4/5 lg:aspect-square lg:max-h-[75vh] rounded-3xl overflow-hidden bg-brand-dark/5 shadow-2xl border border-brand-dark/10">
            {values.map((val, idx) => {
              const isActive = activeIndex === idx
              return (
                <div 
                  key={idx} 
                  className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {/* Subtle Ken Burns Scale Effect */}
                  <img 
                    src={val.image} 
                    alt={val.title}
                    className={`w-full h-full object-cover transition-transform duration-[20s] ease-out origin-center ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`} 
                  />
                  
                  {/* Gradients for text legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
                  
                  {/* Premium Glassmorphism Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="w-8 h-px bg-brand-cream/50"></div>
                         <p className="text-brand-cream/90 text-[10px] uppercase tracking-[0.3em] font-bold">Value 0{idx + 1}</p>
                      </div>
                      <h4 className="text-brand-cream font-display font-black text-3xl md:text-4xl uppercase tracking-tight">
                        {val.title}
                      </h4>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

export default OurValues
