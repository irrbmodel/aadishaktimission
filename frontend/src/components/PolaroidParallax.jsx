import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Himalayan Peaks Outline SVG component (Nanda Devi & Trishul silhouette)
const MountainPeaks = React.forwardRef(({ className, path1Ref, path2Ref }, ref) => (
  <div 
    ref={ref}
    className={`absolute inset-0 z-0 pointer-events-none flex items-end justify-center overflow-hidden opacity-0 ${className}`}
  >
    {/* Soft ambient gradient light */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-80 bg-linear-to-t from-brand-dark/15 via-[#dc2626]/5 to-transparent blur-3xl pointer-events-none" />
    
    <svg 
      className="w-full h-full text-brand-dark/25 max-w-7xl mx-auto" 
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
    <div className="w-4 h-4 bg-brand-cream border border-brand-dark/30 rotate-45 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110">
      <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full shadow-[0_0_5px_rgba(220,38,38,0.6)]" />
    </div>
  </div>
)

const PolaroidParallax = ({ isLoaded }) => {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const photoCardRef = useRef(null)
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
        // Master Pinned Scroll Timeline (Entrance -> Hold & Trace -> Clean Exit)
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.5}`, // Extended duration for complete 3-stage story
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        })

        // ─── STAGE 1: ENTRANCE & MOUNTAIN TRACING (0% to 30%) ───
        masterTl
          // Header Entrance
          .fromTo(headerRef.current, 
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.out', duration: 0.25 }, 
            0
          )
          // Photo Card Entrance from left with 3D rotation
          .fromTo(photoCardRef.current,
            { x: -140, opacity: 0, rotateY: -15, rotateZ: -5, scale: 0.9 },
            { x: 0, opacity: 1, rotateY: 0, rotateZ: -1.5, scale: 1, ease: 'power2.out', duration: 0.3 },
            0.05
          )
          // Cards Column Entrance from right with staggered 3D tilt
          .fromTo(cardsColRef.current?.children || [],
            { x: 120, opacity: 0, y: 30, rotateX: 10 },
            { x: 0, opacity: 1, y: 0, rotateX: 0, stagger: 0.08, ease: 'power2.out', duration: 0.3 },
            0.1
          )
          // Mountains Fade In & Draw Lines
          .to(mountainsRef.current, { opacity: 0.5, ease: 'none', duration: 0.3 }, 0)
          .to(mountainPath1Ref.current, { strokeDashoffset: 0, ease: 'none', duration: 0.4 }, 0)
          .to(mountainPath2Ref.current, { strokeDashoffset: 0, ease: 'none', duration: 0.4 }, 0)

        // ─── STAGE 2: PINNED FOCUS & PARALLAX DRIFT (30% to 65%) ───
        const innerImg = photoCardRef.current?.querySelector('img')
        if (innerImg) {
          masterTl.to(innerImg, { scale: 1.1, yPercent: -5, ease: 'none', duration: 0.35 }, 0.3)
        }
        masterTl.to(photoCardRef.current, { y: -15, rotateZ: 0, duration: 0.35, ease: 'none' }, 0.3)

        // ─── STAGE 3: CLEAN SMOOTH EXIT ANIMATION (65% to 100%) ───
        // 1. Header glides up and out
        masterTl.to(headerRef.current, {
          y: -80,
          opacity: 0,
          scale: 0.96,
          ease: 'power2.in',
          duration: 0.3
        }, 0.65)

        // 2. Photo Showcase Card glides out smoothly to the Left
        masterTl.to(photoCardRef.current, {
          xPercent: -60,
          rotateY: -15,
          scale: 0.85,
          opacity: 0,
          ease: 'power2.in',
          duration: 0.35
        }, 0.65)

        // 3. Right Commitment Cards glide out smoothly to the Right
        masterTl.to(cardsColRef.current, {
          xPercent: 60,
          rotateY: 15,
          scale: 0.85,
          opacity: 0,
          ease: 'power2.in',
          duration: 0.35
        }, 0.65)

        // 4. Mountains fade away softly
        masterTl.to(mountainsRef.current, {
          opacity: 0,
          duration: 0.25
        }, 0.7)

      } else {
        // Mobile entrance & exit triggers
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
      <div id="polaroid-transition" ref={containerRef} className="relative w-full bg-brand-cream z-10 px-5 py-16 border-b border-brand-dark/10 overflow-hidden">
        {/* Mobile Section Header */}
        <div ref={headerRef} className="w-full max-w-xl mx-auto flex flex-col gap-3 mb-8 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/5 border border-brand-dark/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-brand-dark">
              02 / OUR COMMUNITY & PHILOSOPHY
            </span>
          </div>
          <h2 className="font-serif font-black text-3xl text-brand-dark uppercase tracking-tight">
            OUR <span className="text-[#dc2626]">COMMITMENT</span>
          </h2>
          <p className="font-sans text-xs text-brand-dark/75 leading-relaxed max-w-sm">
            Empowering individuals, conserving Himalayan traditions, and building models of village self-reliance.
          </p>
        </div>

        {/* Central Gallery Showcase Card */}
        <div className="w-full max-w-xl mx-auto rounded-[24px] overflow-hidden shadow-2xl border border-brand-dark/10 bg-white p-3 mb-6">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-brand-dark/5">
            <img 
              src="/images/village_women_uttarakhand.png" 
              alt="Uttarakhand Village Women" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-sans px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/15">
              <span className="font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                High Valley Cooperatives
              </span>
              <span className="text-emerald-300 font-mono text-[9px] uppercase tracking-wider">Uttarakhand</span>
            </div>
          </div>
        </div>

        {/* 3 Commitment Pillar Cards on Mobile */}
        <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
          
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-white border border-brand-dark/10 shadow-md flex flex-col gap-2 relative">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-dark/10 text-brand-dark font-mono text-xs font-bold flex items-center justify-center">01</span>
              <h3 className="font-serif font-bold text-base text-brand-dark">Community Empowerment</h3>
            </div>
            <p className="font-sans text-xs text-brand-dark/80 leading-relaxed font-light">
              We believe true progress begins with empowered individuals working together for the common good — fostering knowledge, values, and social responsibility.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-white border border-brand-dark/10 shadow-md flex flex-col gap-2 relative">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#dc2626]/10 text-[#dc2626] font-mono text-xs font-bold flex items-center justify-center">02</span>
              <h3 className="font-serif font-bold text-base text-brand-dark">Pahari Heritage & Craft Hubs</h3>
            </div>
            <p className="font-sans text-xs text-brand-dark/80 leading-relaxed font-light">
              Backing local women-led cooperatives, setting up digital literacy hubs, and conserving Pahari craft traditions to build absolute self-reliance.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-brand-dark text-white shadow-xl flex flex-col gap-2 relative overflow-hidden group">
            <AipanCorner className="-top-2 -right-2 opacity-80" />
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/15 text-white font-mono text-xs font-bold flex items-center justify-center">03</span>
              <h3 className="font-serif font-bold text-base text-amber-200">The Power of Aadi Shakti</h3>
            </div>
            <p className="font-sans text-xs text-white/90 leading-relaxed font-light italic">
              "Aadi Shakti is the energy within us all — the primordial power to learn, lead, serve, and transform society."
            </p>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div id="polaroid-transition" ref={containerRef} className="relative w-full h-screen bg-brand-cream z-10 flex flex-col justify-between overflow-hidden border-b border-brand-dark/10 py-10 lg:py-14">
      
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-brand-dark/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-[450px] h-[450px] bg-[#dc2626]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Himalayan Mountain peak outline SVG */}
      <MountainPeaks 
        ref={mountainsRef} 
        className="polaroid-mountains"
        path1Ref={mountainPath1Ref}
        path2Ref={mountainPath2Ref}
      />

      {/* ── TOP SECTION HEADER ── */}
      <div ref={headerRef} className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-20 flex flex-col items-center text-center gap-2">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-dark/5 border border-brand-dark/15 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.35em] text-brand-dark">
            02 / OUR COMMUNITY & PHILOSOPHY
          </span>
        </div>

        <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-brand-dark uppercase tracking-tight leading-none mt-1">
          OUR <span className="text-[#dc2626]">COMMITMENT</span>
        </h2>
        
        <p className="font-sans text-xs sm:text-sm text-brand-dark/75 max-w-xl leading-relaxed font-light">
          Rooted in the high mountain valleys of Uttarakhand — empowering individuals, building self-reliant communities, and fostering positive social change.
        </p>
      </div>

      {/* ── MAIN EDITORIAL SPLIT GRID (2-COLUMN SHOWCASE) ── */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-20 my-auto">
        
        {/* LEFT COLUMN: Hero Photo Showcase & Stats Plaque */}
        <div 
          ref={photoCardRef} 
          className="lg:col-span-6 flex flex-col items-center justify-center w-full transform-gpu"
        >
          <div className="relative p-4 pb-5 bg-white shadow-[0_30px_70px_-15px_rgba(1,62,55,0.2)] border border-brand-dark/10 rounded-[30px] max-w-[500px] w-full select-none group transition-all duration-500 hover:shadow-[0_45px_90px_-15px_rgba(1,62,55,0.28)]">
            
            {/* Top Eyelet Accent */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
              <div className="w-3 h-3 rounded-full border border-brand-dark/40 bg-brand-cream shadow-inner flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-brand-dark/50" />
              </div>
            </div>
            
            {/* Image Container */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-brand-dark/10 shadow-inner">
              <img 
                src="/images/village_women_uttarakhand.png" 
                alt="Uttarakhand Village Women" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-90" />

              {/* Location Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-sans font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Uttarakhand Himalayas
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 px-4 py-2.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-serif font-bold text-white">Village Women Cooperatives</p>
                  <p className="text-[10px] text-white/70 font-sans">Garhwal & Kumaon Mountain Regions</p>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-amber-300 bg-amber-950/70 px-2 py-1 rounded border border-amber-500/30">Impact Hub</span>
              </div>
            </div>
            
            {/* Stats strip below photo */}
            <div className="mt-4 px-2 grid grid-cols-3 gap-2 text-center border-t border-brand-dark/10 pt-3">
              <div>
                <p className="font-serif font-black text-lg text-brand-dark">100%</p>
                <p className="font-sans text-[10px] text-brand-dark/65 uppercase tracking-wider font-semibold">Community Led</p>
              </div>
              <div className="border-x border-brand-dark/10 px-1">
                <p className="font-serif font-black text-lg text-[#dc2626]">50+</p>
                <p className="font-sans text-[10px] text-brand-dark/65 uppercase tracking-wider font-semibold">Village Hubs</p>
              </div>
              <div>
                <p className="font-serif font-black text-lg text-amber-800">Pahari</p>
                <p className="font-sans text-[10px] text-brand-dark/65 uppercase tracking-wider font-semibold">Craft Models</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3 Interactive Commitment Cards */}
        <div 
          ref={cardsColRef} 
          className="lg:col-span-6 flex flex-col gap-4 max-w-xl w-full transform-gpu"
        >
          
          {/* Card 1: Community Empowerment */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-brand-dark/10 shadow-lg relative group transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-dark/10 text-brand-dark flex items-center justify-center shrink-0 font-serif font-black text-base border border-brand-dark/20 shadow-xs">
                01
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif font-bold text-base sm:text-lg text-brand-dark tracking-tight">
                  Empowering Potential & Leadership
                </h3>
                <p className="font-sans text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-light">
                  True progress begins with empowered individuals. By fostering knowledge, values, innovation, and social responsibility, we inspire every person to contribute to a just, compassionate, and sustainable world.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Pahari Heritage & Cooperatives */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-brand-dark/10 shadow-lg relative group transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#dc2626]/10 text-[#dc2626] flex items-center justify-center shrink-0 font-serif font-black text-base border border-[#dc2626]/20 shadow-xs">
                02
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif font-bold text-base sm:text-lg text-brand-dark tracking-tight">
                  Self-Reliance & Pahari Heritage
                </h3>
                <p className="font-sans text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-light">
                  Rooted in Kumaon & Garhwal, we support women-led cooperatives, establish digital literacy hubs, and conserve Pahari craft traditions to build models of absolute self-reliance.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Sacred Energy (Aadi Shakti Motto) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-brand-dark text-white shadow-xl relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-brand-dark/40">
            {/* Aipan Corner Accents */}
            <AipanCorner className="-top-2 -right-2" />
            <AipanCorner className="-bottom-2 -left-2" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/15 text-amber-300 flex items-center justify-center shrink-0 font-serif font-black text-base border border-white/20 shadow-xs">
                03
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300">
                  THE PRIMORDIAL SOURCE
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white tracking-tight">
                  Aadi Shakti Core Motto
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                  "Aadi Shakti is the energy within us all — the power to learn, lead, serve, and transform society."
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Scroll cue hint */}
      <div className="relative z-20 flex flex-col items-center gap-1 opacity-50 text-brand-dark mb-2">
        <span className="font-display text-[9px] uppercase tracking-[0.25em]">Scroll to explore mission</span>
        <div className="w-px h-5 bg-linear-to-b from-brand-dark to-transparent" />
      </div>

    </div>
  )
}

export default PolaroidParallax
