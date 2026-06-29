import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Himalayan Peaks Outline SVG component (Nanda Devi & Trishul silhouette)
const MountainPeaks = React.forwardRef(({ className, path1Ref, path2Ref }, ref) => (
  <div 
    ref={ref}
    className={`absolute inset-0 z-0 pointer-events-none flex items-end justify-center overflow-hidden opacity-0 ${className}`}
  >
    <svg 
      className="w-full h-full text-brand-dark/15 max-w-7xl mx-auto" 
      viewBox="0 0 1200 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Front mountain line */}
      <path 
        ref={path1Ref}
        d="M -50,400 L 150,220 L 280,310 L 480,120 L 600,240 L 850,70 L 1050,220 L 1250,400" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeDasharray="1800"
        strokeDashoffset="1800"
      />
      {/* Background dashed mountain line */}
      <path 
        ref={path2Ref}
        d="M 50,400 L 220,250 L 380,350 L 590,170 L 720,280 L 960,110 L 1150,400" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeDasharray="1500"
        strokeDashoffset="1500"
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Peak accents */}
      <path d="M 480,120 L 490,160 M 480,120 L 465,150" stroke="currentColor" strokeWidth="1" />
      <path d="M 850,70 L 865,115 M 850,70 L 835,110" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
))

const PolaroidParallax = ({ isLoaded }) => {
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const mountainsRef = useRef(null)
  const overlayRef = useRef(null)
  const mountainPath1Ref = useRef(null)
  const mountainPath2Ref = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches

      if (isDesktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.5}`,
            pin: true,
            pinSpacing: true,
            scrub: 1.5,
            invalidateOnRefresh: true
          }
        })

        // Animate card size from centered polaroid to full bleed
        tl.to(cardRef.current, {
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          borderRadius: '0px',
          ease: 'none',
          duration: 1
        }, 0)

        // Fade in mountain outlines behind the card
        tl.to(mountainsRef.current, {
          opacity: 0.35,
          ease: 'none',
          duration: 0.7
        }, 0)

        // Tracing strokes dynamically linked to scroll position
        tl.to(mountainPath1Ref.current, {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 0.8
        }, 0)

        tl.to(mountainPath2Ref.current, {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 0.8
        }, 0)

        // Darken image overlay mask to support typography contrast
        tl.to(overlayRef.current, {
          opacity: 0.75,
          ease: 'none',
          duration: 0.85
        }, 0.15)

        // Fade in and slide up text only after background is fully zoomed in
        tl.fromTo(textRef.current, 
          { opacity: 0, y: 30, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            ease: 'power2.out',
            duration: 0.5 
          }, 
          1.0
        )
      } else {
        // Mobile-optimized simple reveal (no pinning or layout resizing)
        gsap.set(overlayRef.current, { opacity: 0.7 })
        gsap.set(mountainsRef.current, { opacity: 0.25 })
        gsap.set(mountainPath1Ref.current, { strokeDashoffset: 0 })
        gsap.set(mountainPath2Ref.current, { strokeDashoffset: 0 })

        gsap.fromTo(textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <div id="polaroid-transition" ref={containerRef} className="relative w-full h-screen bg-brand-cream z-10">

      {/* Viewport content wrapper */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">

        {/* Himalayan Mountain peak outlines */}
        <MountainPeaks 
          ref={mountainsRef} 
          path1Ref={mountainPath1Ref}
          path2Ref={mountainPath2Ref}
        />

        {/* Central Expanding Polaroid Image Card */}
        <div
          ref={cardRef}
          className="absolute inset-0 w-full h-full rounded-none md:relative md:w-[90vw] md:h-[60vh] md:max-w-[620px] md:max-h-[460px] md:rounded-[24px] overflow-hidden shadow-2xl z-10 border border-brand-dark/5 bg-brand-white flex items-center justify-center transform-gpu"
        >
          {/* Picture shadow mask overlay */}
          <div 
            ref={overlayRef}
            className="absolute inset-0 bg-brand-dark opacity-[0.15] z-10 pointer-events-none" 
          />

          {/* Centered Photograph of Village Women */}
          <img 
            src="/images/village_women_uttarakhand.png" 
            alt="Uttarakhand Village Women" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sticky Center Content - Animates to full opacity when card is fully zoomed in */}
        <div 
          ref={textRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none max-w-5xl mx-auto px-6 text-center transform-gpu opacity-0"
        >
          <h2 className="font-serif font-black text-[7vw] sm:text-[6vw] md:text-[4.5vw] text-brand-cream leading-[1.1] tracking-tight uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] mb-4 md:mb-6 max-w-3xl">
            Our Commitment
          </h2>
          <p className="font-sans text-[3.5vw] sm:text-[2.6vw] md:text-[1.5vw] lg:text-[1.25vw] text-brand-white/95 leading-relaxed font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-2xl px-4 md:px-0">
            We do not believe in fleeting shadows or temporary fixes. Our commitment is to sow seeds of quiet resilience in the soil of every community we join. We pledge to listen to the silent needs of the grassroots, weaving education, health, and independence into a legacy that stands long after we are gone nurturing growth that belongs entirely to the people.
          </p>
        </div>

        {/* Section Header */}
        <div className="absolute top-0 left-0 w-full px-6 md:px-12 pt-16 z-30 pointer-events-none">
          <div className="w-full max-w-7xl mx-auto flex items-center border-b border-brand-cream/20 pb-4">
            <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
              02 / Our Community
            </span>
          </div>
        </div>

        {/* Minimal Typographic wood-carved framed introduction (positioned at bottom) */}
        <div 
          className="absolute inset-x-0 bottom-6 md:bottom-10 z-30 flex justify-center p-4 pointer-events-none md:opacity-0"
        >
          <div className="border-2 border-double border-brand-cream/80 py-4 px-6 md:py-6 md:px-8 max-w-xl bg-brand-cream/50 backdrop-blur-xs rounded-xl relative shadow-2xl flex flex-col items-center text-center text-brand-dark pointer-events-auto">
            
            {/* Traditional diamond Aipan corner accents */}
            <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-brand-cream border border-brand-dark rotate-45 flex items-center justify-center select-none shadow-xs">
              <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-brand-cream border border-brand-dark rotate-45 flex items-center justify-center select-none shadow-xs">
              <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
            </div>
            <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-brand-cream border border-brand-dark rotate-45 flex items-center justify-center select-none shadow-xs">
              <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-brand-cream border border-brand-dark rotate-45 flex items-center justify-center select-none shadow-xs">
              <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
            </div>

            {/* Content */}
            <p className="font-sans text-[11px] md:text-xs text-brand-dark/90 leading-relaxed font-light select-none max-w-md mt-4">
              Aadi Shakti Mission is rooted in the high mountain valleys of Uttarakhand. By backing local women cooperatives, setting up digital literacy hubs, and conserving Pahari craft traditions, we build models of absolute self-reliance for village communities.
            </p>

            {/* Scroll Indicator */}
            <div className="mt-4 flex flex-col items-center gap-1 select-none animate-bounce">
              <span className="font-sans text-[7px] font-bold tracking-wider text-brand-dark/70 uppercase">
                Keep scrolling to explore our philosophy
              </span>
              <svg className="w-3.5 h-3.5 text-brand-dark/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default PolaroidParallax
