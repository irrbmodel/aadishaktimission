import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Render 3D Push-Pin with drop shadow (Declared outside component scope to maintain stable element identity)
const PushPin = ({ color = '#dc2626' }) => (
  <div className="push-pin-item absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
    {/* Real drop shadow offset below the pin */}
    <div className="absolute w-7 h-7 bg-black/45 rounded-full blur-[3px] translate-x-3.5 translate-y-4" />
    {/* 3D SVG Pin Head & Needle */}
    <svg width="38" height="44" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`pin-head-${color.replace('#', '')}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="25%" stopColor={color} />
          <stop offset="100%" stopColor="#1a0000" />
        </radialGradient>
        <linearGradient id="pin-needle-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#999999" />
          <stop offset="50%" stopColor="#e5e5e5" />
          <stop offset="100%" stopColor="#666666" />
        </linearGradient>
      </defs>
      {/* Plastic push head shape */}
      <path 
        d="M 6,2 L 18,2 L 16,10 L 20,13 L 20,16 L 4,16 L 4,13 L 8,10 Z" 
        fill={`url(#pin-head-${color.replace('#', '')})`} 
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="0.5"
      />
      {/* Metal needle pinning the card */}
      <rect x="11.2" y="16" width="1.6" height="10" fill="url(#pin-needle-grad)" />
    </svg>
  </div>
)


// Interactive Program Polaroid Card Component with 3D Mouse Tilt Dynamics
const ProgramCard = ({ proj, onClick }) => {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Gentle 10-degree pivot tilt factor
    setTilt({
      x: (x / rect.width) * 10,
      y: (y / rect.height) * -10
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={() => onClick(proj)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ rotate: proj.initialRotate }}
      animate={{
        rotate: proj.initialRotate,
        x: proj.xOffset,
        y: proj.yOffset,
        rotateX: tilt.y,
        rotateY: tilt.x,
        boxShadow: "0 10px 24px rgba(0,0,0,0.22)"
      }}
      whileHover={{
        rotate: 0,
        scale: 1.03,
        boxShadow: "0 28px 56px rgba(0,0,0,0.45)",
        zIndex: 10
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22
      }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      className="bg-brand-white border border-brand-dark/5 rounded-[24px] p-6 pb-8 flex flex-col justify-start relative cursor-pointer select-none group border-fine transform-gpu"
      data-cursor="pointer"
    >
      {/* Push Pin */}
      <PushPin color={proj.pinColor} />
      
      {/* Needle hole */}
      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/60 shadow-[inset_0_1px_1px_rgba(0,0,0,0.7)] z-20" />

      {/* Title block */}
      <div className="flex justify-center mt-3 mb-4" style={{ transform: 'translateZ(20px)' }}>
        <div 
          className="bg-brand-dark text-brand-white font-display font-black uppercase tracking-wider px-4 py-2.5 text-sm shadow-md inline-block -rotate-1 select-none"
          style={{ transform: 'skewX(-4deg)' }}
        >
          {proj.headline}
        </div>
      </div>

      {/* Photo Frame */}
      <div className="relative aspect-4/3 w-full bg-brand-white border border-brand-dark/5 p-1.5 shadow-xs overflow-hidden rounded-lg" style={{ transform: 'translateZ(10px)' }}>
        <img 
          src={proj.image} 
          alt={proj.title} 
          className="w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-700 pointer-events-none"
        />
      </div>

      {/* Caption */}
      <div className="mt-5 text-center px-2 flex flex-col gap-2" style={{ transform: 'translateZ(15px)' }}>
        <span className="font-sans text-[10px] font-black tracking-widest text-brand-red uppercase">
          {proj.subtitle}
        </span>
        <p className="font-serif italic text-xs md:text-sm text-brand-grey font-light leading-relaxed max-w-[340px] mx-auto">
          &ldquo;{proj.desc}&rdquo;
        </p>
      </div>
    </motion.div>
  )
}

const PillarsHorizontal = ({ isLoaded }) => {
  const [selectedCard, setSelectedCard] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      const cards = containerRef.current.querySelectorAll('.program-card-item')
      
      // Initial hidden, rotated, and translated state for cards
      gsap.set(cards, { opacity: 0, y: 70, scale: 0.9, rotate: -2 })

      // Target pins inside cards - start above with large scale
      const pins = containerRef.current.querySelectorAll('.push-pin-item')
      gsap.set(pins, { y: -80, opacity: 0, scale: 1.6 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })

      // Stagger cards fade-in
      tl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: (i, target) => {
          // Keep the original rotation angle of the card
          return parseFloat(target.dataset.rotate || 0)
        },
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })

      // Stagger pins drop-in with bounce
      tl.to(pins, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.15,
        ease: 'bounce.out'
      }, '-=0.55')

    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  const pillarsData = [
    {
      id: 'learning-hub',
      title: 'Village Learning Hub',
      subtitle: 'Primary & Digital Literacy',
      image: '/images/villagelearning2.jpeg',
      impact: '500+ Rural Girls',
      initialRotate: -1.8,
      xOffset: -4,
      yOffset: -6,
      pinColor: '#dc2626', // Red pin
      headline: 'VILLAGE LEARNING HUB',
      desc: 'Establishing community learning spaces, libraries, and digital training labs to secure primary and digital literacy for rural children and girls.',
      background: 'Many rural villages lack basic educational infrastructure, books, and computers. Our learning hubs bridge this gap by bringing modern resources and dedicated educators directly to local neighborhoods.',
      goals: [
        'Set up 15 libraries with digital study labs',
        'Train 20+ village-level youth educators',
        'Increase digital literacy rates among girls by 60%'
      ]
    },
    {
      id: 'neighborhoods',
      title: 'Nurturing Our Neighborhoods',
      subtitle: 'Community Health & Well-being',
      image: '/images/relief_distribution.jpeg',
      impact: '1,200+ Beneficiaries',
      initialRotate: 1.2,
      xOffset: 4,
      yOffset: -2,
      pinColor: '#2563eb', // Blue pin
      headline: 'NURTURING NEIGHBORHOODS',
      desc: 'Uplifting local communities through regular health checkups, wellness camps, and clean water projects.',
      background: 'Preventative healthcare is often out of reach for marginalized communities. We provide direct support through neighborhood health camps, sanitary kit drives, and purified water stations.',
      goals: [
        'Host weekly health screenings in remote settlements',
        'Install 5 community water filtration units',
        'Conduct menstrual hygiene workshops & kit distributions'
      ]
    },
    {
      id: 'youth',
      title: 'Empowering Youth',
      subtitle: 'Skills & Autonomy',
      image: '/images/youth_group.jpeg',
      impact: '250+ Youth Trained',
      initialRotate: -0.8,
      xOffset: -5,
      yOffset: 3,
      pinColor: '#eab308', // Gold pin
      headline: 'EMPOWERING YOUTH',
      desc: 'Fostering leadership, micro-capital, and vocational craft training to empower local youth towards long-term self-reliance.',
      background: 'Youth unemployment in rural communities is high. By providing vocational training, business mentoring, and micro-grants, we help young people establish self-sustaining livelihoods.',
      goals: [
        'Set up skill training clinics (stitching, craft, IT)',
        'Award 10 micro-capital seed grants yearly',
        'Foster community cooperative startup groups'
      ]
    },
    {
      id: 'mother-earth',
      title: 'For Mother Earth',
      subtitle: 'Eco-Conservation & Forestry',
      image: '/images/ecology.jpeg',
      impact: '5,000+ Saplings',
      initialRotate: 1.8,
      xOffset: 5,
      yOffset: -4,
      pinColor: '#16a34a', // Green pin
      headline: 'FOR MOTHER EARTH',
      desc: 'Preserving our ecosystem through native afforestation drives, solar clinic power setups, and green space development.',
      background: 'Deforestation and carbon footprint expansion directly impact rural livelihoods. We lead community-driven forestry initiatives, plantation drives, and solar power upgrades for village schools.',
      goals: [
        'Plant 5,000+ native saplings (Neem, Banyan, etc.)',
        'Transition 4 local community clinics to solar energy',
        'Conduct rainwater harvesting training sessions'
      ]
    },
    {
      id: 'handloom-revival',
      title: 'Heritage & Handloom Revival',
      subtitle: 'Craft & Aipan Conservation',
      image: '/images/carousel6.jpeg',
      impact: '80+ Women Artisans',
      initialRotate: -1.4,
      xOffset: 3,
      yOffset: 5,
      pinColor: '#dc2626', // Red pin
      headline: 'HERITAGE & HANDLOOM',
      desc: 'Sustaining local Himalayan weaving and sacred Aipan folk arts through female cooperatives and market bridges.',
      background: 'Traditional Himalayan craft forms are dying as younger generations migrate. We establish design workshops, supply raw wool, and connect local women to urban design centers to revive Pahari handlooms.',
      goals: [
        'Sponsor 80+ active weavers with raw materials',
        'Establish a digital database for traditional patterns',
        'Setup 3 local handloom aggregation cooperatives'
      ]
    }
  ]

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    
    // Enable horizontal scrolling with vertical mouse wheel
    const onWheel = (e) => {
      // Only capture if it's primarily vertical scrolling (standard mouse wheel)
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atStart = container.scrollLeft === 0 && e.deltaY < 0
        const atEnd = container.scrollWidth - container.clientWidth <= container.scrollLeft + 1 && e.deltaY > 0
        
        // If not at the edges, translate vertical wheel to horizontal scroll and stop page scroll
        if (!atStart && !atEnd) {
          e.preventDefault()
          container.scrollLeft += e.deltaY
        }
      }
    }
    
    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <section 
      id="pillars" 
      ref={containerRef}
      className="relative w-full min-h-[120vh] bg-brand-cream border-b border-brand-dark/5 flex flex-col pt-32 pb-48 overflow-hidden"
    >
      {/* Hidden felt/noise filter definition for mud-texture overlay */}
      <svg className="absolute w-0 h-0 hidden" aria-hidden="true">
        <filter id="clay-texture-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1   0 0 0 0 0.2   0 0 0 0 0.15  0.07 0 0 0 0" />
          <feBlend mode="multiply" in="SourceGraphic" />
        </filter>
      </svg>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center py-6 md:py-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-6">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
            05 / Our Programs
          </span>
          <span className="font-serif italic text-xs text-brand-grey">
            Focus Areas
          </span>
        </div>

        {/* Section Header text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start mb-6 md:mb-8">
          <div className="lg:col-span-8 flex flex-col items-start gap-2">
            <h2 className="font-serif text-4xl md:text-6xl text-brand-dark tracking-tight uppercase leading-none">
              our programs
            </h2>
            <p className="font-sans text-xs md:text-sm text-brand-grey/90 leading-relaxed max-w-xl font-light">
              Explore the five key verticals of the Aadi Shakti Mission. Swipe horizontally, click on any card to slide open its portfolio folder.
            </p>
          </div>
        </div>

        {/* The Premium Terracotta Notice Board */}
        <div className="w-full bg-[#8B2617] border-8 md:border-12 border-[#382015] rounded-[32px] py-16 px-4 md:py-20 lg:py-24 md:px-8 shadow-[inset_0_5px_15px_rgba(0,0,0,0.65),0_25px_50px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col items-center justify-center min-h-[550px] md:min-h-[650px]">
          
          {/* Subtle noise texture simulating red clay mud plaster */}
          <div 
            className="absolute inset-0 opacity-45 pointer-events-none" 
            style={{ filter: 'url(#clay-texture-noise)', mixBlendMode: 'multiply' }} 
          />

          {/* Scattered Polaroid Cards Row (overlapping, scrollable) */}
          <div 
            ref={scrollContainerRef}
            className="flex flex-row gap-6 md:gap-8 w-full overflow-x-auto pb-6 pt-4 px-4 z-10 scrollbar-none relative"
          >
            {pillarsData.map((proj) => (
              <div 
                key={proj.id} 
                className="program-card-item origin-center w-[290px] md:w-[310px] shrink-0"
                data-rotate={proj.initialRotate}
              >
                <ProgramCard
                  proj={proj}
                  onClick={(p) => setSelectedCard(p)}
                />
              </div>
            ))}
          </div>

          {/* Animated Scroll Sideways Marker */}
          <div className="absolute bottom-4 right-6 md:bottom-8 md:right-10 flex items-center gap-2 z-20 pointer-events-none opacity-70">
            <span className="font-sans text-[9px] md:text-[10px] font-bold text-white/90 uppercase tracking-[0.2em] hidden sm:block">
              Scroll
            </span>
            <motion.div 
              animate={{ x: [0, 8, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <polyline points="14 6 20 12 14 18"></polyline>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Unified Portalled Slide-out Details Drawer (Glassmorphic Splitted Panel) */}
      {createPortal(
        <AnimatePresence>
          {selectedCard && (
            <div className="fixed inset-0 w-full h-full z-999999 flex items-center justify-end">
              
              {/* Blur Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCard(null)}
                className="absolute inset-0 bg-brand-dark/55 backdrop-blur-xs cursor-pointer"
              />

              {/* Drawer Container Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                className="bg-brand-dark/95 backdrop-blur-xl border-l border-brand-cream/10 w-full max-w-xl h-full shadow-2xl relative flex flex-col text-[#fdfbf7] p-8 md:p-12 overflow-y-auto"
              >
                {/* Close Button Header */}
                <div className="flex justify-between items-center w-full border-b border-brand-cream/10 pb-6 mb-8 select-none">
                  <div>
                    <span className="font-sans text-[9px] font-black uppercase tracking-[0.3em] text-[#0ea5e9]">
                      program portfolio
                    </span>
                    <h3 className="font-serif text-2xl uppercase tracking-tight font-bold mt-1">
                      {selectedCard.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedCard(null)}
                    className="font-sans text-[9px] uppercase tracking-widest font-extrabold cursor-pointer py-1.5 px-4 rounded-full border border-brand-cream/20 bg-transparent hover:bg-brand-cream/10 text-brand-cream transition-colors"
                  >
                    Close
                  </button>
                </div>

                {/* Polaroid Frame Inside Drawer */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-brand-cream/10 shadow-lg mb-8 select-none">
                  <img 
                    src={selectedCard.image} 
                    alt={selectedCard.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Accordion detail elements */}
                <div className="flex flex-col gap-8">
                  {/* Background Section */}
                  <div>
                    <h4 className="font-sans text-[10px] font-black text-[#0ea5e9] uppercase tracking-widest mb-3 select-none">
                      01 / PROJECT CONTEXT
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-brand-cream/80 leading-relaxed font-light">
                      {selectedCard.background}
                    </p>
                  </div>

                  {/* Divider line */}
                  <hr className="border-brand-cream/10" />

                  {/* Goals Section */}
                  <div>
                    <h4 className="font-sans text-[10px] font-black text-[#0ea5e9] uppercase tracking-widest mb-3 select-none">
                      02 / TARGET MILESTONES
                    </h4>
                    <ul className="space-y-3">
                      {selectedCard.goals.map((goal, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-brand-cream/80 font-light leading-snug">
                          <span className="text-[#0ea5e9] text-base mt-[-4px] select-none">•</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Divider line */}
                  <hr className="border-brand-cream/10" />

                  {/* Impact metrics footer */}
                  <div className="flex items-center justify-between w-full select-none pt-2">
                    <span className="font-sans text-[10px] font-black text-brand-cream/60 uppercase tracking-widest">
                      03 / ESTIMATED COMMUNITY IMPACT
                    </span>
                    <span className="text-lg md:text-xl font-bold text-[#fdfbf7] font-display border-b border-brand-cream/20 pb-0.5">
                      {selectedCard.impact}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}

export default PillarsHorizontal
