import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Check if device supports hover interactions to optimize mobile scrolling
const isHoverDevice = typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false

// Render 3D Push-Pin with drop shadow (Declared outside component scope to maintain stable element identity)
const PushPin = ({ color = '#dc2626' }) => (
  <div className="push-pin-item absolute -top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center">
    {/* Real drop shadow offset below the pin */}
    <div className="absolute w-7 h-7 bg-brand-cream/45 rounded-full blur-[3px] translate-x-3.5 translate-y-4" />
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


// Interactive Program Polaroid Card Component with 3D Mouse Tilt Dynamics (Optimized via Framer Motion Values)
const ProgramCard = ({ proj, onClick }) => {
  const cardRef = useRef(null)

  // Motion values to animate directly on the GPU without triggering React state changes/re-renders
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Map mouse coordinates to smooth spring rotations
  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 220, damping: 22 })
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 22 })

  const handleMouseMove = (e) => {
    if (!isHoverDevice) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    // Normalized client coordinates (-0.5 to 0.5)
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    if (!isHoverDevice) return
    mouseX.set(0)
    mouseY.set(0)
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
        boxShadow: "0 10px 24px rgba(0,0,0,0.22)"
      }}
      whileHover={isHoverDevice ? {
        rotate: 0,
        scale: 1.03,
        boxShadow: "0 28px 56px rgba(0,0,0,0.45)",
        zIndex: 10
      } : {}}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22
      }}
      style={{ 
        transformStyle: 'preserve-3d', 
        perspective: '1000px',
        rotateX: isHoverDevice ? rotateXSpring : 0,
        rotateY: isHoverDevice ? rotateYSpring : 0
      }}
      className="bg-brand-white border border-brand-dark/5 rounded-[24px] p-6 pb-8 flex flex-col justify-start relative cursor-pointer select-none group border-fine transform-gpu"
      data-cursor="pointer"
    >
      {/* Push Pin */}
      <PushPin color={proj.pinColor} />
      
      {/* Needle hole */}
      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-cream/60 shadow-[inset_0_1px_1px_rgba(0,0,0,0.7)] z-20" />

      {/* Title block */}
      <div className="flex justify-center mt-3 mb-4" style={{ transform: 'translateZ(20px)' }}>
        <div 
          className="bg-brand-cream text-brand-white font-display font-black uppercase tracking-wider px-4 py-2.5 text-sm shadow-md inline-block -rotate-1 select-none"
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
          className="w-full h-full object-cover scale-105 md:scale-100 md:group-hover:scale-[1.02] transition-transform duration-700 pointer-events-none"
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

      // Target pins inside cards - start slightly above so they don't clip in the scroll container
      const pins = containerRef.current.querySelectorAll('.push-pin-item')
      gsap.set(pins, { y: -30, opacity: 0, scale: 1.3 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
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
      id: 'education',
      title: 'Education & Capacity Building',
      subtitle: 'Excellence & Learning',
      image: '/images/villagelearning2.jpeg',
      impact: 'Academic Excellence',
      initialRotate: -1.8,
      xOffset: -4,
      yOffset: -6,
      pinColor: '#dc2626',
      headline: 'EDUCATION & CAPACITY',
      desc: 'Providing opportunities for academic excellence, professional development, digital literacy, and lifelong learning.',
      background: 'We believe that education is the foundation of individual and societal progress. By focusing on academic excellence, we aim to provide opportunities that foster professional development, digital literacy, and a passion for lifelong learning in all individuals.',
      goals: [
        'Promote academic excellence at all levels',
        'Facilitate professional development and skill acquisition',
        'Ensure widespread digital literacy',
        'Encourage and support lifelong learning initiatives'
      ]
    },
    {
      id: 'leadership',
      title: 'Leadership Development',
      subtitle: 'Confident & Ethical',
      image: '/images/relief_distribution.jpeg',
      impact: 'Nurturing Leaders',
      initialRotate: 1.2,
      xOffset: 4,
      yOffset: -2,
      pinColor: '#2563eb',
      headline: 'LEADERSHIP DEVELOPMENT',
      desc: 'Nurturing confident, ethical, and socially responsible leaders capable of addressing local and global challenges.',
      background: 'The world needs leaders who are not only capable but also ethical and socially responsible. Our leadership programs are designed to nurture confident individuals who are prepared to face both local and global challenges with integrity and vision.',
      goals: [
        'Nurture confident and visionary leaders',
        'Instill strong ethical values and practices',
        'Foster social responsibility and civic engagement',
        'Equip leaders to address complex global challenges'
      ]
    },
    {
      id: 'research',
      title: 'Research & Innovation',
      subtitle: 'Technology & Solutions',
      image: '/images/youth_group.jpeg',
      impact: 'Sustainable Development',
      initialRotate: -0.8,
      xOffset: -5,
      yOffset: 3,
      pinColor: '#eab308',
      headline: 'RESEARCH & INNOVATION',
      desc: 'Encouraging interdisciplinary research, innovation, entrepreneurship, and technology-driven solutions for sustainable development.',
      background: 'Innovation and research are key to driving sustainable development. By encouraging interdisciplinary approaches, we foster an environment where entrepreneurship and technology-driven solutions can thrive, addressing the most pressing challenges of our time.',
      goals: [
        'Encourage interdisciplinary research initiatives',
        'Foster a culture of innovation and entrepreneurship',
        'Develop technology-driven solutions for real-world problems',
        'Promote practices that lead to sustainable development'
      ]
    },
    {
      id: 'community',
      title: 'Community Engagement',
      subtitle: 'Outreach & Inclusion',
      image: '/images/ecology.jpeg',
      impact: 'Social Inclusion',
      initialRotate: 1.8,
      xOffset: 5,
      yOffset: -4,
      pinColor: '#16a34a',
      headline: 'COMMUNITY ENGAGEMENT',
      desc: 'Promoting volunteerism, outreach programmes, legal literacy, health awareness, environmental conservation, and social inclusion.',
      background: 'A strong community is built on active engagement and inclusion. We are dedicated to promoting volunteerism and outreach programs that raise awareness on legal literacy, health, and environmental conservation, ensuring that every individual feels included and valued.',
      goals: [
        'Promote active volunteerism and community service',
        'Organize impactful outreach programmes',
        'Increase legal literacy and health awareness',
        'Drive environmental conservation and social inclusion'
      ]
    },
    {
      id: 'skill',
      title: 'Skill Development & Entrepreneurship',
      subtitle: 'Enhancing Employability',
      image: '/images/carousel6.jpeg',
      impact: 'Career Readiness',
      initialRotate: -1.4,
      xOffset: 3,
      yOffset: 5,
      pinColor: '#9333ea',
      headline: 'SKILL DEVELOPMENT',
      desc: 'Enhancing employability through vocational training, entrepreneurship development, financial literacy, and career readiness.',
      background: 'Empowering individuals with the right skills is essential for economic independence. Through vocational training, entrepreneurship development, and financial literacy programs, we enhance employability and ensure our community members are career-ready.',
      goals: [
        'Provide comprehensive vocational training',
        'Support entrepreneurship development',
        'Improve financial literacy across the community',
        'Enhance overall career readiness and employability'
      ]
    },
    {
      id: 'health',
      title: 'Health, Wellness & Sustainability',
      subtitle: 'Well-being & Stewardship',
      image: '/images/villagelearning2.jpeg',
      impact: 'Sustainable Living',
      initialRotate: 1.5,
      xOffset: -2,
      yOffset: 4,
      pinColor: '#0ea5e9',
      headline: 'HEALTH & SUSTAINABILITY',
      desc: 'Supporting physical and mental well-being while promoting environmental stewardship and sustainable living.',
      background: 'True well-being encompasses both physical and mental health, as well as the health of our environment. We are committed to supporting holistic wellness while simultaneously promoting environmental stewardship and practices that lead to sustainable living.',
      goals: [
        'Support physical and mental well-being programs',
        'Promote environmental stewardship',
        'Encourage sustainable living practices',
        'Create a healthier environment for future generations'
      ]
    }
  ]

  const scrollContainerRef = useRef(null)

  const handleScrollClick = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.clientWidth > 768 ? 342 : 314
      const maxScroll = container.scrollWidth - container.clientWidth
      
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
      } else {
        container.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <section 
      id="pillars" 
      ref={containerRef}
      className="relative w-full min-h-[120vh] bg-brand-cream border-b border-brand-dark/5 flex flex-col pt-32 pb-48 overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center py-6 md:py-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-6">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-brand-red/80">
            05 / Our Programs
          </span>
          <span className="font-serif italic text-xs text-brand-grey">
            Focus Areas
          </span>
        </div>

        {/* Section Header text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start mb-6 md:mb-8">
          <div className="lg:col-span-8 flex flex-col items-start gap-2 -translate-x-1 md:-translate-x-2">
            <h2 className="font-serif text-4xl md:text-6xl text-brand-dark tracking-tight uppercase leading-none">
              our programs
            </h2>
            <p className="font-sans text-xs md:text-sm text-brand-grey/90 leading-relaxed max-w-xl font-light">
              Explore the five key verticals of the Aadi Shakti Mission. Swipe horizontally, click on any card to slide open its portfolio folder.
            </p>
          </div>
        </div>

        {/* The Premium Terracotta Notice Board */}
        <div className="pillars-board w-full bg-[#8B2617] border-8 md:border-12 border-[#382015] rounded-[32px] pt-8 pb-12 px-4 md:px-8 shadow-[inset_0_5px_15px_rgba(0,0,0,0.65),0_25px_50px_rgba(0,0,0,0.3)] relative overflow-visible flex flex-col items-center justify-start min-h-[550px] md:min-h-[650px]">
          
          {/* Scattered Polaroid Cards Row (overlapping, scrollable) */}
          <div 
            ref={scrollContainerRef}
            className="flex flex-row gap-6 md:gap-8 w-full overflow-x-auto px-8 z-10 scrollbar-none relative pt-[120px] pb-[120px] mt-[-100px] mb-[-100px]"
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
          <div 
            onClick={handleScrollClick}
            className="absolute bottom-4 right-6 md:bottom-8 md:right-10 flex items-center gap-2 z-20 pointer-events-auto cursor-pointer opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 transition-all duration-300 select-none"
            data-cursor="pointer"
          >
            <span className="font-sans text-[9px] md:text-[10px] font-bold text-brand-dark/90 uppercase tracking-[0.2em] hidden sm:block">
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
                className="absolute inset-0 bg-brand-cream/55 backdrop-blur-xs cursor-pointer"
              />

              {/* Drawer Container Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                className="bg-brand-cream/95 backdrop-blur-xl border-l border-brand-dark/10 w-full max-w-xl h-full shadow-2xl relative flex flex-col text-brand-dark p-8 md:p-12 overflow-y-auto"
              >
                {/* Close Button Header */}
                <div className="flex justify-between items-center w-full border-b border-brand-dark/10 pb-6 mb-8 select-none">
                  <div>
                    <span className="font-sans text-[9px] font-black uppercase tracking-[0.3em] text-brand-red/80">
                      program portfolio
                    </span>
                    <h3 className="font-serif text-2xl uppercase tracking-tight font-bold mt-1">
                      {selectedCard.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedCard(null)}
                    className="font-sans text-[9px] uppercase tracking-widest font-extrabold cursor-pointer py-1.5 px-4 rounded-full border border-brand-dark/20 bg-transparent hover:bg-brand-dark/10 text-brand-dark transition-colors"
                  >
                    Close
                  </button>
                </div>

                {/* Polaroid Frame Inside Drawer */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-brand-dark/10 shadow-lg mb-8 select-none">
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
                    <h4 className="font-sans text-[10px] font-black text-brand-red/80 uppercase tracking-widest mb-3 select-none">
                      01 / PROJECT CONTEXT
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-brand-dark/80 leading-relaxed font-light">
                      {selectedCard.background}
                    </p>
                  </div>

                  {/* Divider line */}
                  <hr className="border-brand-cream/10" />

                  {/* Goals Section */}
                  <div>
                    <h4 className="font-sans text-[10px] font-black text-brand-red/80 uppercase tracking-widest mb-3 select-none">
                      02 / TARGET MILESTONES
                    </h4>
                    <ul className="space-y-3">
                      {selectedCard.goals.map((goal, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-brand-dark/80 font-light leading-snug">
                          <span className="text-brand-red/80 text-base mt-[-4px] select-none">•</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Divider line */}
                  <hr className="border-brand-cream/10" />

                  {/* Impact metrics footer */}
                  <div className="flex items-center justify-between w-full select-none pt-2">
                    <span className="font-sans text-[10px] font-black text-brand-dark/60 uppercase tracking-widest">
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
