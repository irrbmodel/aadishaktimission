import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, Shield, Leaf } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Philosophy = ({ isLoaded }) => {
  const containerRef = useRef(null)
  const snapshotsContainerRef = useRef(null)
  const sliderRef = useRef(null)
  const [sliderIndex, setSliderIndex] = useState(0)

  const images = [
    { 
      src: '/images/book_bank.jpeg', 
      title: "A Book Bank by Aadhi Shakti Mission",
      desc: "Creating micro-libraries and study clusters across remote Himalayan hamlets, ensuring that every child has physical access to textbooks, reference materials, and digital learning tools."
    },
    { 
      src: '/images/sus2.jpeg', 
      title: "National Equality: Realizing Women's Rights",
      desc: "Supporting independent women cooperatives and providing them with vocational training, legal literacy, and micro-loans to help build community-led economic resilience."
    },
    { 
      src: '/images/outreach_walk.jpeg', 
      title: "Community Outreach Walk",
      desc: "Our teams travel on foot through rugged terrains to interact directly with isolated communities, identifying grassroot issues and delivering direct aid and welfare planning."
    },
    { 
      src: '/images/women_empowerment_class.jpeg', 
      title: "Nanhe Kadam, Badi Udaan",
      desc: "Empowering young girls through high-impact academic mentoring, computer classes, and personality development workshops that build confidence and self-reliance."
    },
    { 
      src: '/images/youth_group.jpeg', 
      title: "Youth Against Corruption",
      desc: "Mobilizing school and college students to advocate for transparent local administration, environmental conservation, and social welfare awareness campaigns."
    },
    { 
      src: '/images/carousel6.jpeg', 
      title: "Aadhi Shakti Mission Newsletter",
      desc: "Documenting and sharing stories of transformation, ecological milestones, and grassroots leadership directly from Uttarakhand's high mountain valleys."
    }
  ]

  const handlePrev = () => {
    setSliderIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSliderIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // 1. Snapshot slider transition effect
  useEffect(() => {
    if (!isLoaded) return

    const sliderImages = sliderRef.current?.querySelectorAll('.snapshot-img-item')
    if (!sliderImages || sliderImages.length === 0) return

    gsap.to(sliderImages, {
      opacity: 0,
      scale: 0.96,
      rotate: -1,
      duration: 0.5,
      ease: 'power2.inOut',
      overwrite: 'auto'
    })
    
    gsap.fromTo(sliderImages[sliderIndex],
      { opacity: 0, scale: 1.04, rotate: 1 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto'
      }
    )

    const textElements = snapshotsContainerRef.current?.querySelectorAll('.animate-snapshot-details')
    if (textElements && textElements.length > 0) {
      gsap.fromTo(textElements,
        { opacity: 0, y: 15, filter: 'blur(2px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          overwrite: 'auto'
        }
      )
    }
  }, [sliderIndex, isLoaded])

  // 2. Scroll reveal for the new premium Philosophy grid layout
  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      // Left side text slide-in
      gsap.fromTo('.philosophy-left-col',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Right side cards staggered fade-in
      gsap.fromTo('.philosophy-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.philosophy-cards-grid',
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <>
      {/* SECTION 1: Core Philosophy with Premium Layout */}
      <section 
        id="philosophy"
        ref={containerRef}
        className="relative w-full bg-brand-cream border-b border-brand-dark/5 pt-32 pb-48 px-6 md:px-12 overflow-hidden"
      >
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-12 md:px-24">
          <div className="w-px h-full bg-brand-dark/5" />
          <div className="w-px h-full bg-brand-dark/5" />
          <div className="w-px h-full bg-brand-dark/5 hidden md:block" />
        </div>

        {/* Subtle background blob */}
        <div className="absolute glowing-blob w-[400px] h-[400px] bg-brand-red/5 top-[15%] left-[5%] opacity-15 pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-16 select-none">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
            03 / About Us
          </span>
          <span className="font-serif italic text-xs text-brand-grey">
            Aadi Shakti Mission
          </span>
        </div>

        {/* Premium Split Layout Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Vision Header & Core Philosophy Intro */}
          <div className="philosophy-left-col lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32 select-none">
            {/* Decorative Aipan symbol */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
              <div className="w-4 h-4 border border-brand-red/35 rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
              </div>
              <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
            </div>

            <span className="font-sans text-[10px] font-black text-brand-red tracking-widest uppercase">
              Our Vision & Method
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-dark font-black uppercase tracking-tight leading-none">
              Transformative <br />Change
            </h2>
            <p className="font-sans text-sm sm:text-base text-brand-grey leading-relaxed font-light mt-2 max-w-md">
              Aadi Shakti Mission is a committed movement established to enhance and secure the social, economic, and ecological fabric of underserved communities. 
            </p>
            <p className="font-sans text-xs sm:text-sm text-brand-grey/85 leading-relaxed font-light max-w-md">
              Combining grassroots activism with professional methodologies, we build long-term local resilience that honors contextual integrity and fosters micro-independence.
            </p>
          </div>

          {/* Right Column: Interactive 3-Pillar Cards Grid */}
          <div className="philosophy-cards-grid lg:col-span-7 flex flex-col gap-6 w-full">
            {[
              {
                num: '01',
                title: 'Social Equity',
                icon: <Eye className="text-brand-red" size={24} />,
                desc: 'We organize independent women cooperatives, establish mentorship pathways for young girls, and build digital libraries to eliminate systemic literacy barriers across remote valleys.'
              },
              {
                num: '02',
                title: 'Economic Autonomy',
                icon: <Shield className="text-brand-red" size={24} />,
                desc: 'By establishing local handloom cooperative structures, supplying premium raw materials, and matching products to urban design centers, we secure sustainable wages for artisans.'
              },
              {
                num: '03',
                title: 'Ecological Harmony',
                icon: <Leaf className="text-brand-red" size={24} />,
                desc: 'We lead community native afforestation drives, rain-water harvesting study clusters, and solar clinic energy transitions to safeguard vulnerable Himalayan ecosystems.'
              }
            ].map((pillar) => (
              <div 
                key={pillar.num}
                className="philosophy-card group w-full bg-brand-white/60 hover:bg-brand-white border border-brand-dark/5 hover:border-brand-red/20 rounded-[24px] p-8 md:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(155,0,0,0.04)] transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8 items-start cursor-default"
              >
                {/* Visual Number Indicator */}
                <div className="font-display text-4xl font-black text-brand-red/35 select-none shrink-0 md:pt-1">
                  {pillar.num}
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {pillar.icon}
                    <h3 className="font-serif text-xl sm:text-2xl text-brand-dark font-bold uppercase tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-brand-grey leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
                
                {/* Decorative border highlight line */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-red/0 group-hover:bg-brand-red transition-colors duration-500" />
              </div>
            ))}
          </div>

        </div>

        {/* Section Footer */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center border-t border-brand-dark/5 mt-20 pt-4 text-[9px] font-bold text-brand-grey tracking-widest uppercase select-none">
          <span>Section 03</span>
          <span className="flex items-center gap-2">
            Scroll to explore snapshots
            <svg className="w-3 h-3 text-brand-red animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </div>
      </section>

      {/* SECTION 2: Active Snapshots Showcase */}
      <section
        id="philosophy-snapshots"
        ref={snapshotsContainerRef}
        className="relative w-full h-screen bg-brand-cream overflow-hidden border-b border-brand-dark/5 flex flex-col justify-between py-20 px-6 md:px-12"
      >
        {/* Grid lines background */}
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-12 md:px-24">
          <div className="w-px h-full bg-brand-dark/5" />
          <div className="w-px h-full bg-brand-dark/5" />
          <div className="w-px h-full bg-brand-dark/5 hidden md:block" />
        </div>

        {/* Glowing blob */}
        <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-red/5 bottom-[-10%] right-[-10%] opacity-20 pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-6 select-none">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
            04 / Active Snapshots
          </span>
          <span className="font-serif italic text-xs text-brand-grey">
            Impact in Uttarakhand
          </span>
        </div>

        {/* Grid layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-6 mb-auto">
          {/* Left Column: Descriptive text and controls */}
          <div className="lg:col-span-5 flex flex-col select-none justify-center">
            {/* Massive counter */}
            <div className="font-display text-6xl md:text-8xl font-black tracking-tighter text-brand-red/40 mb-2 select-none animate-snapshot-details">
              0{sliderIndex + 1} <span className="text-brand-dark/30 text-4xl font-light">/</span> <span className="text-brand-dark/50 text-5xl font-light">0{images.length}</span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-sans text-[9px] font-black tracking-[0.25em] text-brand-grey/60 uppercase block animate-snapshot-details">
                Active Snapshot Focus
              </span>
              <h4 className="font-serif text-3xl sm:text-4xl text-brand-dark tracking-tight leading-tight uppercase font-medium animate-snapshot-details">
                {images[sliderIndex].title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-brand-grey leading-relaxed max-w-md font-light animate-snapshot-details">
                {images[sliderIndex].desc}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-4 mt-8">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-brand-dark/15 hover:border-brand-red hover:bg-brand-red hover:text-brand-cream transition-all duration-300 flex items-center justify-center cursor-pointer group"
                data-cursor="pointer"
                aria-label="Previous Snapshot"
              >
                <svg className="w-4 h-4 stroke-2 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-brand-dark/15 hover:border-brand-red hover:bg-brand-red hover:text-brand-cream transition-all duration-300 flex items-center justify-center cursor-pointer group"
                data-cursor="pointer"
                aria-label="Next Snapshot"
              >
                <svg className="w-4 h-4 stroke-2 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Navigation progress dots */}
            <div className="flex gap-2 mt-8 items-center">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSliderIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === sliderIndex ? 'w-8 bg-brand-red' : 'w-2 bg-brand-dark/10 hover:bg-brand-dark/30'
                  }`}
                  aria-label={`Go to snapshot ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Frame mockup photograph container */}
          <div className="lg:col-span-7 flex justify-center items-center select-none w-full">
            <div className="relative w-full aspect-video sm:aspect-4/3 max-w-[620px] rounded-[32px] p-4 bg-brand-white shadow-[0_24px_50px_rgba(0,0,0,0.12)] border border-brand-dark/5 transform-gpu">
              <div className="absolute -inset-2 rounded-[36px] border border-brand-dark/5 pointer-events-none z-0 rotate-1 transform-gpu scale-102" />

              <div 
                ref={sliderRef}
                className="relative w-full h-full rounded-[20px] overflow-hidden border border-brand-dark/5 bg-brand-cream shadow-inner flex items-center justify-center cursor-pointer"
              >
                <div 
                  onClick={handlePrev} 
                  className="absolute left-0 top-0 w-1/2 h-full z-20 cursor-w-resize"
                  title="Previous image"
                />
                <div 
                  onClick={handleNext} 
                  className="absolute right-0 top-0 w-1/2 h-full z-20 cursor-e-resize"
                  title="Next image"
                />

                {images.map((img, idx) => (
                  <div 
                    key={img.src}
                    className={`snapshot-img-item absolute inset-0 w-full h-full ${
                      idx === sliderIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                    }`}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-brand-dark/25 to-transparent z-10 pointer-events-none" />
                    <img 
                      src={img.src} 
                      alt={img.title} 
                      className={`snapshot-img-${idx} w-full h-full object-cover pointer-events-none`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center border-t border-brand-dark/5 pt-4 text-[9px] font-bold text-brand-grey tracking-widest uppercase select-none">
          <span>Section 04</span>
          <span className="flex items-center gap-2">
            Scroll to explore Programs
            <svg className="w-3 h-3 text-brand-red animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </div>
      </section>
    </>
  )
}

export default Philosophy
