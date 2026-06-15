import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Flame, Shield, Users } from './Icons'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    // 1. Text slide-up word-by-word reveal
    const words = titleRef.current.querySelectorAll('.word')
    gsap.fromTo(words, 
      { y: '120%', rotate: 4 },
      { 
        y: '0%', 
        rotate: 0,
        duration: 1.4, 
        stagger: 0.08, 
        ease: 'power4.out' 
      }
    )

    // 2. Fade in subtitle
    gsap.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power3.out' }
    )

    // 3. Scale-up CTA elements
    gsap.fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
    )

    // 4. Staggered reveal for floating info cards
    gsap.fromTo(cardsRef.current,
      { scale: 0.8, opacity: 0, y: 50 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        delay: 1, 
        stagger: 0.15, 
        ease: 'back.out(1.4)' 
      }
    )

    // 5. Parallax effect on the background image during scroll
    gsap.to('.hero-bg-img', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // 6. Interactive parallax movement for floating cards based on cursor
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const moveX = (clientX - centerX) / centerX
      const moveY = (clientY - centerY) / centerY

      // Drift floating objects slightly in opposite directions
      gsap.to('.drift-left', { x: moveX * -30, y: moveY * -30, duration: 1, ease: 'power2.out' })
      gsap.to('.drift-right', { x: moveX * 30, y: moveY * 30, duration: 1, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleScrollDown = (e) => {
    e.preventDefault()
    const philosophySec = document.getElementById('philosophy')
    if (philosophySec) {
      philosophySec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={containerRef}
      className="hero-section relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-32 pb-16 bg-brand-dark"
    >
      {/* Dynamic Background Mesh Grid */}
      <div className="absolute inset-0 z-0">
        {/* Parallax Cosmic Background Image */}
        <div 
          className="hero-bg-img absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 opacity-40 brightness-75 mix-blend-lighten"
          style={{ backgroundImage: "url('/hero_cosmic_energy.png')" }}
        />
        
        {/* Glow Spheres */}
        <div className="glowing-blob w-[500px] h-[500px] bg-brand-purple top-[-10%] left-[-10%]" />
        <div className="glowing-blob w-[450px] h-[450px] bg-brand-orange bottom-[20%] right-[-10%] [animation-delay:-5s]" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Typographic Title Area */}
          <div className="lg:col-span-8 flex flex-col items-start select-none">
            {/* Tagline Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 hover:border-brand-orange/40 transition-colors duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-200">
                The Primordial Cosmic Energy
              </span>
            </div>

            {/* Oversized Dynamic Headings */}
            <h1 
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tight text-white mb-6 uppercase"
            >
              <span className="block overflow-hidden pb-1">
                <span className="word inline-block origin-bottom-left">IGNITING</span>
              </span>
              <span className="block overflow-hidden pb-1 text-transparent bg-clip-text bg-linear-to-r from-brand-orange via-brand-pink to-brand-purple">
                <span className="word inline-block origin-bottom-left">SHAKTI WITHIN</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="word inline-block origin-bottom-left">EVERY SOUL</span>
              </span>
            </h1>

            {/* Sub-text description */}
            <p 
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl text-gray-300/80 max-w-xl font-light mb-8 leading-relaxed"
            >
              Aadi Shakti Mission is a movement dedicated to female empowerment, holistic healthcare, children education, and ecological rejuvenation. Together, we evoke true cosmic strength.
            </p>

            {/* CTA Container */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
              <a
                href="#contribute"
                className="px-8 py-4 rounded-full text-xs font-black tracking-widest bg-brand-orange hover:bg-brand-pink text-brand-dark hover:text-white transition-all duration-300 shadow-xl shadow-brand-orange/20 hover:scale-105 active:scale-95"
                data-cursor="donate"
              >
                SUPPORT OUR MISSION
              </a>
              <a
                href="#pillars"
                className="px-8 py-4 rounded-full text-xs font-black tracking-widest border border-white/20 hover:border-white/50 text-white bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
                data-cursor="pointer"
              >
                OUR INITIATIVES
              </a>
            </div>
          </div>

          {/* Interactive Floating Info Cards */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-6 relative">
            
            {/* Card 1: Empower */}
            <div 
              ref={(el) => (cardsRef.current[0] = el)}
              className="drift-left glass-panel p-6 rounded-2xl flex gap-4 max-w-xs self-start transform hover:translate-x-2 transition-transform duration-300 cursor-pointer"
              data-cursor="pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Shakti Power</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Uplifting women with leadership, legal rights, and financial capabilities.</p>
              </div>
            </div>

            {/* Card 2: Safe */}
            <div 
              ref={(el) => (cardsRef.current[1] = el)}
              className="drift-right glass-panel p-6 rounded-2xl flex gap-4 max-w-xs self-end transform hover:-translate-x-2 transition-transform duration-300 cursor-pointer border-brand-pink/20"
              data-cursor="pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-pink/20 flex items-center justify-center text-brand-pink shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Safe Spaces</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Creating community centers that secure mental health and physical wellness.</p>
              </div>
            </div>

            {/* Card 3: Community */}
            <div 
              ref={(el) => (cardsRef.current[2] = el)}
              className="drift-left glass-panel p-6 rounded-2xl flex gap-4 max-w-xs self-start transform hover:translate-x-2 transition-transform duration-300 cursor-pointer border-brand-purple/20"
              data-cursor="pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">100K+ Impacted</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Creating sustainable transformations across rural districts.</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Footer / Scroll down indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex flex-col text-[10px] tracking-widest text-white/40">
            <span>AADI SHAKTI MISSION NGO</span>
            <span>ESTD. 2024 / INDIA</span>
          </div>
        </div>

        <a 
          href="#philosophy" 
          onClick={handleScrollDown}
          className="flex items-center gap-2 text-white/50 hover:text-brand-orange transition-colors group cursor-pointer"
          data-cursor="pointer"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Scroll to Philosophy</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-orange group-hover:translate-y-1 transition-all">
            <ArrowDown className="w-4 h-4 text-white group-hover:text-brand-orange transition-colors" />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero
