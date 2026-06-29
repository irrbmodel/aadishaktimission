import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SingleStat = ({ targetValue, label, suffix = '', prefix = '' }) => {
  const [value, setValue] = useState(0)
  const elementRef = useRef(null)

  useEffect(() => {
    const target = { val: 0 }
    
    const anim = gsap.to(target, {
      val: targetValue,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        setValue(Math.floor(target.val))
      }
    })

    return () => anim.kill()
  }, [targetValue])

  return (
    <div 
      ref={elementRef}
      className="flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl glass-panel border border-white/5 relative overflow-hidden group select-none hover:border-brand-orange/20 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-linear-to-t from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Dynamic Count */}
      <span className="font-display font-black text-5xl sm:text-6xl md:text-7xl bg-linear-to-r from-white via-orange-100 to-brand-orange bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500">
        {prefix}{value.toLocaleString()}{suffix}
      </span>
      
      {/* Label */}
      <span className="text-xs font-bold tracking-[0.2em] text-brand-dark/50 group-hover:text-brand-dark mt-4 uppercase text-center transition-colors">
        {label}
      </span>
    </div>
  )
}

const StatsCounter = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // Animate section background to a deep dark crimson-violet hue on scroll
    const bgAnim = gsap.to(containerRef.current, {
      backgroundColor: '#16081c', // glowing dark crimson violet
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'center 40%',
        scrub: true
      }
    })

    return () => bgAnim.kill()
  }, [])

  const statistics = [
    { targetValue: 100000, label: 'Lives Directly Empowered', suffix: '+' },
    { targetValue: 250, label: 'Villages Transformed', suffix: '+' },
    { targetValue: 50, label: 'Medical Camps Organized', suffix: '+' },
    { targetValue: 20000, label: 'Tree Saplings Nurtured', suffix: '+' }
  ]

  return (
    <section 
      id="stats"
      ref={containerRef}
      className="stats-container relative w-full py-24 md:py-36 bg-brand-cream transition-colors duration-700 overflow-hidden border-b border-white/5"
    >
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-[450px] h-[450px] bg-brand-pink top-[-10%] right-[-10%] opacity-15" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">
            Our Scale of Action
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-dark uppercase mt-2">
            SHAKTI IN NUMBERS
          </h2>
          <p className="text-xs md:text-sm text-gray-400 max-w-md mt-4">
            Every digit represents a life re-centered, a family secured, or a part of nature restored.
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat) => (
            <SingleStat 
              key={stat.label}
              targetValue={stat.targetValue}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsCounter
