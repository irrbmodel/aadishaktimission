import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const JourneyTimeline = () => {
  const containerRef = useRef(null)
  const progressLineRef = useRef(null)
  const milestonesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the central vertical line scaling from top (0) to bottom (1)
      gsap.fromTo(progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            end: 'bottom 70%',
            scrub: true
          }
        }
      )

      // 2. Animate each milestone card when it comes into view
      milestonesRef.current.forEach((milestone) => {
        if (!milestone) return

        const isLeft = milestone.classList.contains('milestone-left')
        const xOffset = isLeft ? -100 : 100

        gsap.fromTo(milestone,
          { opacity: 0, x: xOffset, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: milestone,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
              toggleActions: 'play none none none'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const steps = [
    {
      year: '2021',
      title: 'Seeds of Intent',
      text: 'A volunteer group establishes emergency aid networks during critical public health crises, identifying systemic gaps in maternal care and primary education for young girls.'
    },
    {
      year: '2022',
      title: 'Genesis of Aadi Shakti',
      text: 'Formal foundation of the NGO. Inauguration of our first Shakti Shiksha Kendra in Uttar Pradesh, welcoming 35 girls into holistic education tracks.'
    },
    {
      year: '2023',
      title: 'Vanguard Health & Wellness',
      text: 'Launch of the Arogya Shakti wing. Deployment of mobile diagnostic clinics and maternal wellness camps across 15 remote rural settlements.'
    },
    {
      year: '2024',
      title: 'Swayam Skill Incubation',
      text: 'Establishment of standard vocational training labs. Empowered the first batch of 120 women in textile design, financial basics, and micro-business skills.'
    },
    {
      year: '2025',
      title: 'Ecological Canopy Expansion',
      text: 'Launch of Prakriti Shakti. Planted over 15,000 native trees and retrofitted 10 healthcare camps with independent, community-managed solar grids.'
    },
    {
      year: '2026',
      title: 'Digital Shakti Horizons',
      text: 'Introduction of internet literacy modules, coding bootcamps, and digital micro-capital grants, taking our direct community impact to over 100K+ souls.'
    }
  ]

  return (
    <section 
      id="journey"
      ref={containerRef}
      className="timeline-container relative w-full py-24 md:py-36 bg-brand-dark overflow-hidden border-b border-white/5"
    >
      {/* Dynamic BG Blob */}
      <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-purple bottom-[10%] left-[-10%] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Intro */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">
            Our Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-2">
            THE EVOLUTION OF CHANGE
          </h2>
          <p className="text-xs md:text-sm text-gray-400 max-w-md mt-4">
            A chronological look at how our small spark of action evolved into a cosmic wave of community empowerment.
          </p>
        </div>

        {/* Timeline Core */}
        <div className="relative mt-12">
          
          {/* Central Vertical Line (Background) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2" />
          
          {/* Glowing Animated Progress Line */}
          <div 
            ref={progressLineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-brand-orange via-brand-pink to-brand-purple -translate-x-1/2 origin-top transform scale-y-0 shadow-[0_0_10px_rgba(255,120,45,0.4)]"
          />

          {/* Timeline Milestones */}
          <div className="space-y-12 md:space-y-20 relative">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div 
                  key={step.year}
                  ref={(el) => (milestonesRef.current[idx] = el)}
                  className={`milestone-block flex flex-col md:flex-row items-stretch w-full ${
                    isEven 
                      ? 'md:flex-row-reverse milestone-right' 
                      : 'milestone-left'
                  }`}
                >
                  {/* Left Spacer / Card Column */}
                  <div className="w-full md:w-1/2 flex items-center justify-end px-4 md:px-12">
                    {/* Even indexes appear on right on desktop, odd indexes appear on left */}
                    {!isEven && (
                      <div 
                        className="w-full rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8 backdrop-blur-md glass-panel relative group hover:border-brand-orange/30 hover:-translate-y-1 transition-all duration-300"
                        data-cursor="pointer"
                      >
                        <div className="absolute top-4 right-6 text-3xl font-display font-black text-brand-orange/10 group-hover:text-brand-orange/20 transition-colors">
                          {step.year}
                        </div>
                        <span className="text-xs font-bold text-brand-orange tracking-widest uppercase">
                          {step.year}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-2 group-hover:text-brand-orange transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-400 font-light mt-4 leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Central Node Column */}
                  <div className="absolute left-4 md:left-1/2 flex items-center justify-center -translate-x-1/2 z-10 py-2">
                    <div className="w-6 h-6 rounded-full bg-brand-dark border-2 border-brand-orange flex items-center justify-center shadow-[0_0_10px_rgba(255,120,45,0.2)] hover:scale-125 transition-transform duration-300">
                      <div className="w-2 h-2 rounded-full bg-brand-pink" />
                    </div>
                  </div>

                  {/* Right Spacer / Card Column */}
                  <div className="w-full md:w-1/2 flex items-center justify-start px-4 md:px-12 mt-4 md:mt-0 pl-12 md:pl-12">
                    {isEven && (
                      <div 
                        className="w-full rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8 backdrop-blur-md glass-panel relative group hover:border-brand-pink/30 hover:-translate-y-1 transition-all duration-300"
                        data-cursor="pointer"
                      >
                        <div className="absolute top-4 right-6 text-3xl font-display font-black text-brand-pink/10 group-hover:text-brand-pink/20 transition-colors">
                          {step.year}
                        </div>
                        <span className="text-xs font-bold text-brand-pink tracking-widest uppercase">
                          {step.year}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-2 group-hover:text-brand-pink transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-400 font-light mt-4 leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    )}
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

export default JourneyTimeline
