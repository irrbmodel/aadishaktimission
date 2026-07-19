import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Himalayan Peaks Outline SVG component (Nanda Devi & Trishul silhouette)
const MountainPeaks = React.forwardRef(({ className, path1Ref, path2Ref }, ref) => (
  <div 
    ref={ref}
    className={`absolute inset-0 z-10 pointer-events-none flex items-end justify-center overflow-hidden opacity-0 ${className}`}
  >
    {/* Soft ambient gradient light */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-80 bg-linear-to-t from-black/40 via-brand-dark/20 to-transparent blur-2xl pointer-events-none" />
    
    <svg 
      className="w-full h-full text-white/20 max-w-7xl mx-auto" 
      viewBox="0 0 1200 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Front mountain line */}
      <path 
        ref={path1Ref}
        d="M -50,400 L 150,220 L 280,310 L 480,120 L 600,240 L 850,70 L 1050,220 L 1250,400" 
        stroke="currentColor" 
        strokeWidth="1.75" 
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
        strokeWidth="1.2" 
        strokeDasharray="1500"
        strokeDashoffset="1500"
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.6"
      />
      {/* Peak accents */}
      <path d="M 480,120 L 490,160 M 480,120 L 465,150" stroke="currentColor" strokeWidth="1.2" />
      <path d="M 850,70 L 865,115 M 850,70 L 835,110" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  </div>
))

// Sacred Geometry Aipan Corner Ornament
const AipanCorner = ({ className = "" }) => (
  <div className={`absolute w-5 h-5 flex items-center justify-center select-none ${className}`}>
    <div className="w-4 h-4 bg-white/20 border border-amber-300/40 rotate-45 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110">
      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
    </div>
  </div>
)

const PolaroidParallax = ({ isLoaded }) => {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const bgImgRef = useRef(null)
  const cardsColRef = useRef(null)
  const mountainsRef = useRef(null)
  const mountainPath1Ref = useRef(null)
  const mountainPath2Ref = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isLoaded || isMobile) return

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches

      if (isDesktop) {
        // Master Pinned Scroll Timeline (Full-bleed photo experience)
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.2}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.15, // Fast, responsive scrubbing without input lag
            invalidateOnRefresh: true
          }
        })

        // ─── STAGE 1: ENTRANCE (0% to 35%) ───
        masterTl
          // Background Photo Scale
          .fromTo(bgImgRef.current,
            { scale: 1.1 },
            { scale: 1, ease: 'none', duration: 0.35 },
            0
          )
          // Header Entrance
          .fromTo(headerRef.current, 
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.out', duration: 0.3 }, 
            0.05
          )
          // Cards Column Entrance from bottom
          .fromTo(cardsColRef.current?.children || [],
            { y: 45, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, ease: 'power2.out', duration: 0.3 },
            0.1
          )
          // Mountains Fade In & Draw Lines
          .to(mountainsRef.current, { opacity: 0.4, ease: 'none', duration: 0.3 }, 0.05)
          .to(mountainPath1Ref.current, { strokeDashoffset: 0, ease: 'none', duration: 0.4 }, 0.05)
          .to(mountainPath2Ref.current, { strokeDashoffset: 0, ease: 'none', duration: 0.4 }, 0.05)

        // ─── STAGE 2: PINNED FOCUS (35% to 65%) ───
        masterTl.to(bgImgRef.current, { scale: 1.04, ease: 'none', duration: 0.3 }, 0.35)
        masterTl.to(cardsColRef.current, { y: -8, duration: 0.3, ease: 'none' }, 0.35)

        // ─── STAGE 3: CLEAN EXIT (65% to 100%) ───
        masterTl.to(headerRef.current, {
          y: -40,
          opacity: 0,
          ease: 'power2.in',
          duration: 0.3
        }, 0.65)

        masterTl.to(cardsColRef.current, {
          y: -40,
          opacity: 0,
          ease: 'power2.in',
          duration: 0.35
        }, 0.65)

        masterTl.to(bgImgRef.current, {
          opacity: 0.4,
          ease: 'power2.in',
          duration: 0.35
        }, 0.65)

        masterTl.to(mountainsRef.current, {
          opacity: 0,
          duration: 0.25
        }, 0.7)

      } else {
        // Mobile entrance
        gsap.set(mountainsRef.current, { opacity: 0.3 })
        gsap.set(mountainPath1Ref.current, { strokeDashoffset: 0 })
        gsap.set(mountainPath2Ref.current, { strokeDashoffset: 0 })

        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8,
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
          }
        )
      }

    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded, isMobile])

  if (isMobile) {
    return (
      <div id="polaroid-transition" ref={containerRef} className="relative w-full min-h-screen bg-brand-dark z-10 px-5 py-16 overflow-hidden flex flex-col justify-center">
        {/* Full Bleed Background Photo for Mobile */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/images/village_women_uttarakhand.png" 
            alt="Uttarakhand Village Women" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/60 to-black/90" />
        </div>

        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col gap-6">
          {/* Mobile Header */}
          <div ref={headerRef} className="flex flex-col gap-3 text-center items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">
                02 / OUR COMMUNITY & PHILOSOPHY
              </span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              OUR <span className="text-red-500">COMMITMENT</span>
            </h2>
            <p className="font-sans text-xs text-white/80 leading-relaxed max-w-sm">
              Rooted in the high mountain valleys of Uttarakhand — empowering individuals, building self-reliant communities, and fostering positive social change.
            </p>
          </div>

          {/* 3 Mobile Translucent Cards */}
          <div className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="p-5 rounded-2xl bg-black/65 backdrop-blur-xs border border-white/15 shadow-xl flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 font-mono text-xs font-bold flex items-center justify-center border border-amber-400/30">01</span>
                <h3 className="font-serif font-bold text-base text-white">Community Empowerment</h3>
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
                We believe true progress begins with empowered individuals working together for the common good — fostering knowledge, values, and social responsibility.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl bg-black/65 backdrop-blur-xs border border-white/15 shadow-xl flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 font-mono text-xs font-bold flex items-center justify-center border border-red-500/30">02</span>
                <h3 className="font-serif font-bold text-base text-white">Pahari Heritage & Craft Hubs</h3>
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
                Backing local women-led cooperatives, setting up digital literacy hubs, and conserving Pahari craft traditions to build absolute self-reliance.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-2xl bg-brand-dark/90 backdrop-blur-xs text-white shadow-2xl flex flex-col gap-2 relative overflow-hidden border border-emerald-500/30">
              <AipanCorner className="-top-2 -right-2 opacity-80" />
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-400/20 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center border border-emerald-400/30">03</span>
                <h3 className="font-serif font-bold text-base text-amber-300">The Power of Aadi Shakti</h3>
              </div>
              <p className="font-serif text-xs text-white/95 leading-relaxed font-light italic">
                "Aadi Shakti is the energy within us all — the primordial power to learn, lead, serve, and transform society."
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="polaroid-transition" ref={containerRef} className="relative w-full h-screen bg-black z-10 flex flex-col justify-between overflow-hidden py-10 lg:py-14 select-none">
      
      {/* FULL-BLEED BACKGROUND PHOTO WITH HARDWARE-ACCELERATED SCALE */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden transform-gpu will-change-transform">
        <img 
          ref={bgImgRef}
          src="/images/village_women_uttarakhand.png" 
          alt="Uttarakhand Village Women" 
          className="w-full h-full object-cover scale-105 transform-gpu will-change-transform"
        />
        {/* High Performance Pre-rendered Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-black/80 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-transparent to-black/65 z-10 pointer-events-none" />
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-2xl pointer-events-none z-10" />
        <div className="absolute bottom-1/4 right-1/5 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-2xl pointer-events-none z-10" />
      </div>

      {/* Himalayan Mountain peak outline SVG */}
      <MountainPeaks 
        ref={mountainsRef} 
        className="polaroid-mountains z-15"
        path1Ref={mountainPath1Ref}
        path2Ref={mountainPath2Ref}
      />

      {/* ── TOP SECTION HEADER ── */}
      <div ref={headerRef} className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-20 flex flex-col items-center text-center gap-3 transform-gpu will-change-transform">
        <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-xs shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-display text-[11px] font-extrabold uppercase tracking-[0.35em] text-white/90">
            02 / OUR COMMUNITY & PHILOSOPHY
          </span>
        </div>

        <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none mt-1 drop-shadow-md">
          OUR <span className="text-red-500">COMMITMENT</span>
        </h2>
        
        <p className="font-sans text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed font-light drop-shadow-xs">
          Rooted in the high mountain valleys of Uttarakhand — empowering individuals, building self-reliant communities, and fostering positive social change.
        </p>
      </div>

      {/* ── MAIN EDITORIAL CARDS GRID (HIGH-PERFORMANCE COMPOSITED OVERLAY) ── */}
      <div 
        ref={cardsColRef} 
        className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 my-auto transform-gpu will-change-transform"
      >
        
        {/* High Performance Translucent Card 1 */}
        <div className="p-6 sm:p-7 rounded-3xl bg-black/65 backdrop-blur-xs border border-white/15 shadow-2xl relative group transition-all duration-300 hover:bg-black/80 hover:border-white/30 hover:-translate-y-1 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-serif font-black text-base border border-amber-400/30 shadow-xs">
              01
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-amber-300/90 bg-amber-950/70 px-2.5 py-1 rounded-full border border-amber-500/30">Leadership</span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
              Empowering Potential & Leadership
            </h3>
            <p className="font-sans text-xs text-white/85 leading-relaxed font-light">
              True progress begins with empowered individuals. By fostering knowledge, values, innovation, and social responsibility, we inspire every person to contribute to a just, compassionate, and sustainable world.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60 font-sans font-medium">
            <span>Community Capacity</span>
            <span className="text-amber-300 font-mono">100% Grassroots</span>
          </div>
        </div>

        {/* High Performance Translucent Card 2 */}
        <div className="p-6 sm:p-7 rounded-3xl bg-black/65 backdrop-blur-xs border border-white/15 shadow-2xl relative group transition-all duration-300 hover:bg-black/80 hover:border-white/30 hover:-translate-y-1 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-serif font-black text-base border border-red-500/30 shadow-xs">
              02
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-red-300/90 bg-red-950/70 px-2.5 py-1 rounded-full border border-red-500/30">Garhwal & Kumaon</span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
              Self-Reliance & Pahari Heritage
            </h3>
            <p className="font-sans text-xs text-white/85 leading-relaxed font-light">
              Rooted in Uttarakhand, we support women-led cooperatives, establish digital literacy hubs, and conserve Pahari craft traditions to build models of absolute self-reliance.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60 font-sans font-medium">
            <span>Women Cooperatives</span>
            <span className="text-red-400 font-mono">50+ Hubs</span>
          </div>
        </div>

        {/* High Performance Translucent Card 3 */}
        <div className="p-6 sm:p-7 rounded-3xl bg-brand-dark/90 backdrop-blur-xs text-white shadow-2xl relative overflow-hidden group transition-all duration-300 hover:bg-brand-dark hover:-translate-y-1 border border-emerald-500/40 flex flex-col justify-between">
          {/* Aipan Corner Accents */}
          <AipanCorner className="-top-2 -right-2" />
          <AipanCorner className="-bottom-2 -left-2" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-serif font-black text-base border border-emerald-400/30 shadow-xs">
              03
            </span>
            <span className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
              CORE MOTTO
            </span>
          </div>

          <div className="flex flex-col gap-2 relative z-10">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
              The Power of Aadi Shakti
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-amber-100/90 leading-relaxed font-light">
              "Aadi Shakti is the energy within us all — the primordial power to learn, lead, serve, and transform society."
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-[10px] text-emerald-300/80 font-sans font-medium relative z-10">
            <span>Primordial Energy</span>
            <span className="font-mono text-amber-300">Shakti Philosophy</span>
          </div>
        </div>

      </div>

      {/* Scroll cue hint */}
      <div className="relative z-20 flex flex-col items-center gap-1 opacity-60 text-white mb-2">
        <span className="font-display text-[9px] uppercase tracking-[0.25em]">Scroll to explore mission</span>
        <div className="w-px h-5 bg-linear-to-b from-white to-transparent" />
      </div>

    </div>
  )
}

export default PolaroidParallax
