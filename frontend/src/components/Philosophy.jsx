import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flame } from './Icons'

gsap.registerPlugin(ScrollTrigger)

const Philosophy = () => {
  const sectionRef = useRef(null)
  const paragraphRef = useRef(null)
  const iconRef = useRef(null)

  const philosophyText = 
    "Shakti is not a passive symbol. It is the primordial, cosmic spark of action, creation, and transformation that resides within every human being. When we nurture this energy—through quality education, healthcare, self-reliance, and environmental respect—we do not just assist. We ignite an eternal flame that transforms society from its very roots."

  useEffect(() => {
    const words = paragraphRef.current.querySelectorAll('.reveal-word')
    
    // Animate the words text-reveal on scroll
    gsap.fromTo(words,
      { color: 'rgba(255, 255, 255, 0.12)', textShadow: '0 0 0px rgba(255, 120, 45, 0)' },
      {
        color: 'rgba(255, 255, 255, 0.98)',
        textShadow: '0 0 8px rgba(255, 120, 45, 0.1)',
        stagger: 0.1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 0.5,
        }
      }
    )

    // Spin/pulsate the center Shakti flame icon on scroll
    gsap.fromTo(iconRef.current,
      { rotate: 0, scale: 0.8, opacity: 0.3 },
      {
        rotate: 360,
        scale: 1.2,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          end: 'bottom top',
          scrub: true
        }
      }
    )
  }, [])

  return (
    <section 
      id="philosophy"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-36 bg-brand-dark flex flex-col items-center justify-center overflow-hidden border-y border-white/5"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="glowing-blob w-[400px] h-[400px] bg-brand-pink top-[30%] left-[10%] opacity-15" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Core Icon */}
        <div 
          ref={iconRef}
          className="w-16 h-16 rounded-full bg-linear-to-tr from-brand-orange to-brand-pink flex items-center justify-center text-white mb-10 shadow-lg shadow-brand-orange/20"
        >
          <Flame className="w-8 h-8 fill-white/10" />
        </div>

        {/* Section Tag */}
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-6 block">
          Our Guiding Philosophy
        </span>

        {/* Splitting the text by words and wrapping in Spans */}
        <p 
          ref={paragraphRef}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-tight tracking-tight text-white/10 max-w-4xl"
        >
          {philosophyText.split(' ').map((word, index) => (
            <span 
              key={index} 
              className="reveal-word inline-block mr-3 select-none"
            >
              {word}
            </span>
          ))}
        </p>

        {/* Underline decorative graphic */}
        <div className="w-24 h-0.5 bg-linear-to-r from-transparent via-brand-orange to-transparent mt-12 opacity-60" />
      </div>
    </section>
  )
}

export default Philosophy
