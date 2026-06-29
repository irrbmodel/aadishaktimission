import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Philosophy = ({ isLoaded }) => {
  const containerRef = useRef(null)
  const snapshotsContainerRef = useRef(null)
  const paragraphRef = useRef(null)
  const sliderRef = useRef(null)
  const subHeadingRef = useRef(null)
  const descTextRef = useRef(null)

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


  // 2. Custom GSAP Slider Transition
  const handlePrev = () => {
    setSliderIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSliderIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

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

    // Animate details text
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

  // Scroll reveal for the Philosophy text
  useEffect(() => {
    if (!isLoaded || !paragraphRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(paragraphRef.current,
        { opacity: 0.1, y: 20, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'top top',
            scrub: 0.5
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <>
      {/* SECTION 1: Core Philosophy */}
      <section 
        id="philosophy"
        ref={containerRef}
        className="relative w-full min-h-[150vh] bg-brand-cream border-b border-brand-dark/5 flex flex-col justify-between pt-32 pb-48 px-6 md:px-12"
      >
        {/* Subtle background lines/grid */}
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-12 md:px-24">
          <div className="w-px h-full bg-brand-cream/5" />
          <div className="w-px h-full bg-brand-cream/5" />
          <div className="w-px h-full bg-brand-cream/5 hidden md:block" />
        </div>

        {/* Subtle background blob */}
        <div className="absolute glowing-blob w-[400px] h-[400px] bg-brand-red/5 top-[20%] left-[5%] opacity-15" />

        {/* Section Header */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-6">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
            03 / Core Philosophy
          </span>
          <span className="font-serif italic text-xs text-brand-grey">
            Aadi Shakti Mission
          </span>
        </div>

        {/* Center Editorial Text Block */}
        <div className="sticky top-32 z-20 w-full max-w-4xl mx-auto text-center flex flex-col gap-6 md:gap-8 mt-4 mb-24">
          {/* Decorative Aipan icon */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
            <div className="w-4 h-4 border border-brand-red/35 rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
            </div>
            <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
          </div>

          <div className="w-full">
            <p ref={paragraphRef} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.35] tracking-tight text-[#1C1C1C]">
              <span className="font-bold text-brand-red">Aadi Shakti Mission</span> is a committed movement established to enhance and secure the <span className="font-bold text-brand-red">social, economic, and ecological</span> fabric of underserved communities. Combining grassroots activism with professional methodologies, we spent years executing high-impact initiatives for <span className="font-bold text-brand-red">rural transformation</span> and <span className="font-bold text-brand-red">human empowerment</span>.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 mt-4 max-w-2xl mx-auto">
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-dark leading-tight">
              Evoking <span className="font-sans font-black italic text-brand-red">transformative change</span> that honors contextual integrity.
            </h3>
            
            <p className="font-sans text-xs md:text-sm text-brand-grey leading-relaxed max-w-lg font-light mt-2">
              We believe standard local community interventions should prioritize durability, micro-independence, and self-reliance. Learn more about our mission below.
            </p>
          </div>
        </div>

        {/* Section Footer */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center border-t border-brand-dark/5 pt-4 text-[9px] font-bold text-brand-grey tracking-widest uppercase">
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
        {/* Subtle background lines/grid */}
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-12 md:px-24">
          <div className="w-px h-full bg-brand-cream/5" />
          <div className="w-px h-full bg-brand-cream/5" />
          <div className="w-px h-full bg-brand-cream/5 hidden md:block" />
        </div>

        {/* Glowing blob */}
        <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-red/5 bottom-[-10%] right-[-10%] opacity-20 pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-6">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
            04 / Active Snapshots
          </span>
          <span className="font-serif italic text-xs text-brand-grey">
            Impact in Uttarakhand
          </span>
        </div>

        {/* Grid layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-6 mb-auto">
          {/* Left Column: Descriptive text and luxury controls */}
          <div className="lg:col-span-5 flex flex-col select-none justify-center">
            {/* Massive numbers layout */}
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

            {/* Luxury Navigation Buttons */}
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

            {/* Horizontal progress dots */}
            <div className="flex gap-2 mt-8 items-center">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSliderIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === sliderIndex ? 'w-8 bg-brand-red' : 'w-2 bg-brand-cream/10 hover:bg-brand-cream/30'
                  }`}
                  aria-label={`Go to snapshot ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Large Premium framed image display */}
          <div className="lg:col-span-7 flex justify-center items-center select-none w-full">
            <div className="relative w-full aspect-video sm:aspect-4/3 max-w-[620px] rounded-[32px] p-4 bg-brand-white shadow-[0_24px_50px_rgba(0,0,0,0.12)] border border-brand-dark/5 transform-gpu">
              {/* Decorative offset border frame behind photograph */}
              <div className="absolute -inset-2 rounded-[36px] border border-brand-dark/5 pointer-events-none z-0 rotate-1 transform-gpu scale-102" />

              {/* Viewport for images */}
              <div 
                ref={sliderRef}
                className="relative w-full h-full rounded-[20px] overflow-hidden border border-brand-dark/5 bg-brand-cream shadow-inner flex items-center justify-center cursor-pointer"
              >
                {/* Left/Right clickable regions for image */}
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

                {/* Slider Images */}
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
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center border-t border-brand-dark/5 pt-4 text-[9px] font-bold text-brand-grey tracking-widest uppercase">
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
