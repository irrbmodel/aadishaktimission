import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const Hero = ({ isLoaded }) => {
  const containerRef = useRef(null)
  const titleWordsRef = useRef([])
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const borderRef = useRef(null)

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      // 1. Title reveal animation (Slide up and rotate slightly from hidden mask)
      gsap.fromTo(titleWordsRef.current,
        { yPercent: 110, rotate: 1 },
        { 
          yPercent: 0, 
          rotate: 0,
          duration: 1.2, 
          stagger: 0.08, 
          ease: 'power4.out',
          delay: 0.2
        }
      )

      // 2. Image card reveal (scale up & fade in)
      gsap.fromTo(imageRef.current,
        { scale: 1.12, opacity: 0, rotate: 1 },
        { 
          scale: 1, 
          opacity: 1, 
          rotate: -0.5,
          duration: 1.4, 
          ease: 'power3.out',
          delay: 0.5
        }
      )

      // 3. Border decorative lines drawing
      gsap.fromTo(borderRef.current,
        { scaleX: 0, opacity: 0 },
        { 
          scaleX: 1, 
          opacity: 0.8,
          duration: 1.5, 
          ease: 'power3.inOut',
          delay: 0.4
        }
      )

      // 4. Parallax scroll effect on the hero image
      const img = imageRef.current?.querySelector('img')
      if (img) {
        gsap.to(img, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })
      }

      // 5. Parallax drift on text column
      if (textRef.current) {
        gsap.to(textRef.current, {
          yPercent: -15,
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
      className="relative w-full min-h-screen bg-brand-cream flex flex-col justify-center pt-32 pb-32 border-b border-brand-dark/5"
    >
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-red/5 top-[-10%] left-[-10%] opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Typographic Details */}
        <div ref={textRef} className="lg:col-span-7 xl:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left select-none w-full">
          {/* Section Header */}
          <div className="w-full flex flex-col items-center lg:items-start justify-center lg:justify-start border-b border-brand-dark/10 pb-4 mb-8">
            <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
              01 / Introduction
            </span>
            <span className="font-serif italic text-xs text-brand-grey mt-2">
              Our Mountain Movement
            </span>
          </div>

          {/* Large Title Reveal */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-brand-dark uppercase mb-6 flex flex-wrap justify-center lg:justify-start">
            {['Aadi', 'Shakti', 'Mission'].map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden pb-1 pr-3 lg:pr-4">
                <span 
                  ref={el => titleWordsRef.current[idx] = el}
                  className={`inline-block origin-left font-black ${
                    word === 'Shakti' ? 'text-brand-red font-serif italic' : ''
                  }`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Cultural Aipan Line Accents */}
          <div ref={borderRef} className="w-full max-w-lg h-[2px] bg-brand-dark/10 relative my-4 origin-left">
            <div className="absolute -top-1.5 left-1/2 lg:left-0 lg:translate-x-4 -translate-x-1/2 w-4 h-4 bg-brand-cream border border-brand-dark/20 rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
            </div>
          </div>

          <p className="font-sans text-xs md:text-sm text-brand-grey font-light leading-relaxed max-w-lg xl:max-w-xl my-4">
            Restoring equilibrium to Himalayan villages. Rooted in the high mountain valleys of Uttarakhand, we back grassroots women cooperatives, establish digital literacy hubs, and restore traditional Pahari craft lineages.
          </p>

          {/* Scroll Down Button */}
          <div className="mt-8 flex items-center gap-4 group cursor-pointer border border-brand-dark/10 px-6 py-3 rounded-full hover:bg-brand-dark transition-all duration-300">
            <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-brand-dark group-hover:text-brand-cream transition-colors">
              Explore the story
            </span>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-brand-dark group-hover:text-brand-cream transition-all duration-300">
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Large Visual Card */}
        <div className="lg:col-span-5 xl:col-span-4 w-full flex justify-center lg:justify-end mt-4 lg:mt-0">
          <div 
            ref={imageRef}
            className="relative aspect-4/5 lg:aspect-square w-full max-w-md lg:max-w-none rounded-[32px] overflow-hidden shadow-2xl border border-brand-dark/5 bg-brand-white flex items-center justify-center transform-gpu opacity-0"
          >
            {/* Shading Mask */}
            <div className="absolute inset-0 bg-brand-dark opacity-[0.08] z-10 pointer-events-none" />

            {/* Uttarakhand Children Smiling Picture */}
            <img 
              src="/images/children_smiling.jpeg" 
              alt="Uttarakhand Children Smiling" 
              className="w-full h-full object-cover scale-110 pointer-events-none"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
