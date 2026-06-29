import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const Hero = ({ isLoaded, onJoinNow }) => {
  const containerRef = useRef(null)
  const titleWordsRef = useRef([])
  const textRef = useRef(null)
  const welcomeRef = useRef(null)

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      // 1. Text column reveal animation (Slide up and fade in)
      gsap.fromTo(titleWordsRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 1.2, 
          stagger: 0.15, 
          ease: 'power3.out',
          delay: 0.2
        }
      )

      // 2. Welcome accent reveal (slide from left and fade in)
      gsap.fromTo(welcomeRef.current,
        { x: -20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          duration: 1.2, 
          ease: 'power3.out',
          delay: 0.5
        }
      )

      // 3. Parallax scroll effect on text column
      if (textRef.current) {
        gsap.to(textRef.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-[100vh] flex flex-col justify-end pb-28 sm:pb-36 md:pb-44 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      {/* Background Video */}
      <video
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 blur-[1px] scale-102 pointer-events-none"
      />

      {/* Dark Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30 z-10 pointer-events-none" />

      {/* Left-side welcome accent */}
      <div 
        ref={welcomeRef}
        className="absolute bottom-28 sm:bottom-36 md:bottom-44 left-6 sm:left-12 md:left-20 z-20 hidden md:flex items-center gap-4 select-none opacity-0"
      >
        <span className="w-8 h-px bg-brand-cream/40" />
        <span className="font-sans text-[10px] font-bold text-brand-cream/60 tracking-[0.25em] uppercase">
          Welcome
        </span>
      </div>

      {/* Content wrapper - aligned bottom-right */}
      <div 
        ref={textRef} 
        className="relative z-20 max-w-4xl ml-auto text-right select-none w-full flex flex-col items-end gap-6 sm:gap-8"
      >
        <div className="flex flex-col items-end gap-4 max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] leading-[1.05] tracking-tight text-brand-cream font-black uppercase">
            <span ref={el => titleWordsRef.current[0] = el} className="inline-block opacity-0">
              Aadi Shakti Mission
            </span>
          </h1>
          <p 
            ref={el => titleWordsRef.current[1] = el} 
            className="opacity-0 font-sans text-sm sm:text-base md:text-lg text-brand-cream/80 max-w-xl font-light leading-relaxed tracking-wide text-right"
          >
            Awakening Himalayan potential. One community, one cooperative, one craft at a time.
          </p>
        </div>

        {/* Action Button - aligned to the right */}
        <div 
          ref={el => titleWordsRef.current[2] = el}
          onClick={onJoinNow} 
          className="opacity-0 flex items-center gap-4 group cursor-pointer"
        >
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-cream group-hover:text-brand-cream/80 group-hover:underline transition-all duration-300">
            Join the Movement
          </span>
          <div className="w-12 h-12 bg-brand-red text-brand-cream border border-brand-red flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-cream group-hover:text-brand-red rounded-sm">
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
