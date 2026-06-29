import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, Shield, Leaf } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Philosophy = ({ isLoaded }) => {
  const containerRef = useRef(null)
  const snapshotsContainerRef = useRef(null)
  const sliderRef = useRef(null)

  const images = [
    { 
      src: '/images/book_bank.jpeg', 
      title: "A Book Bank by Aadhi Shakti Mission",
      desc: "Creating micro-libraries and study clusters across remote Himalayan hamlets, ensuring that every child has physical access to textbooks, reference materials, and digital learning tools.",
      tag: "Primary Education",
      metric: "15+ Village Hubs"
    },
    { 
      src: '/images/sus2.jpeg', 
      title: "National Equality: Realizing Women's Rights",
      desc: "Supporting independent women cooperatives and providing them with vocational training, legal literacy, and micro-loans to help build community-led economic resilience.",
      tag: "Social Equity",
      metric: "80+ Cooperatives"
    },
    { 
      src: '/images/outreach_walk.jpeg', 
      title: "Community Outreach Walk",
      desc: "Our teams travel on foot through rugged terrains to interact directly with isolated communities, identifying grassroot issues and delivering direct aid and welfare planning.",
      tag: "Outreach & Access",
      metric: "50+ Villages Covered"
    },
    { 
      src: '/images/women_empowerment_class.jpeg', 
      title: "Nanhe Kadam, Badi Udaan",
      desc: "Empowering young girls through high-impact academic mentoring, computer classes, and personality development workshops that build confidence and self-reliance.",
      tag: "Youth Mentoring",
      metric: "10k+ Girls Impacted"
    },
    { 
      src: '/images/youth_group.jpeg', 
      title: "Youth Against Corruption",
      desc: "Mobilizing school and college students to advocate for transparent local administration, environmental conservation, and social welfare awareness campaigns.",
      tag: "Advocacy & Action",
      metric: "250+ Leaders Trained"
    },
    { 
      src: '/images/carousel6.jpeg', 
      title: "Aadhi Shakti Mission Newsletter",
      desc: "Documenting and sharing stories of transformation, ecological milestones, and grassroots leadership directly from Uttarakhand's high mountain valleys.",
      tag: "Community Voice",
      metric: "Quarterly Narrative"
    }
  ]

  const renderP1 = () => {
    const text = "Aadi Shakti Mission is a committed movement established to enhance and secure the social, economic, and ecological fabric of underserved communities. Combining grassroots activism with professional methodologies, we spent years executing high-impact initiatives for rural transformation and human empowerment."
    const redWords = ["social,", "economic,", "ecological", "rural", "transformation", "human", "empowerment."]
    
    return text.split(' ').map((word, idx) => {
      const isRed = redWords.includes(word)
      return (
        <span 
          key={`p1-${idx}`} 
          className={`reveal-word-p1 inline-block mr-[0.25em] will-change-[transform,opacity,filter] ${isRed ? 'text-brand-red font-bold' : 'text-brand-dark font-light'}`}
          style={{ opacity: 0.08, transform: "translateY(16px)", filter: "blur(4px)" }}
        >
          {word}
        </span>
      )
    })
  }

  const renderP2 = () => {
    const text = "Evoking transformative change that honors contextual integrity."
    const redWords = ["transformative", "change"]
    
    return text.split(' ').map((word, idx) => {
      const isRed = redWords.includes(word)
      return (
        <span 
          key={`p2-${idx}`} 
          className={`reveal-word-p2 inline-block mr-[0.25em] will-change-[transform,opacity,filter] ${isRed ? 'text-brand-red font-bold' : 'text-brand-dark font-light'}`}
          style={{ opacity: 0.08, transform: "translateY(16px)", filter: "blur(4px)" }}
        >
          {word}
        </span>
      )
    })
  }

  // 1. Scroll reveal for the centered Philosophy text layout (Mist Reveal Effect)
  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      // Timeline for paragraph 1 and paragraph 2 word reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 1.2, // Smooth scrubbing
        }
      })

      // Stagger paragraph 1 words - smoothly fading in, sliding up and unblurring
      tl.to(".reveal-word-p1", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.015,
        ease: "power2.out"
      })

      // Stagger paragraph 2 words after paragraph 1 finishes
      tl.to(".reveal-word-p2", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.025,
        ease: "power2.out"
      }, "+=0.05")

      // Fade in the footer small text at the end
      tl.fromTo(".philosophy-footer-text",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "+=0.05"
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  // 2. GSAP ScrollTrigger for Horizontal Snapshots Section
  useEffect(() => {
    if (!isLoaded) return

    const scrollSection = snapshotsContainerRef.current
    const scrollContent = sliderRef.current

    if (!scrollSection || !scrollContent) return

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      if (!isDesktop) return

      // Pin snapshots section and scroll horizontal track
      const horizontalTween = gsap.to(scrollContent, {
        x: () => -(scrollContent.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: scrollSection,
          start: 'top top',
          end: () => `+=${scrollContent.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      })

      // Animate progress bar fill
      gsap.fromTo('.horizontal-progress-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: scrollSection,
            start: 'top top',
            end: () => `+=${scrollContent.scrollWidth - window.innerWidth}`,
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      )

      // Subtle horizontal details stagger animations linked to local cards scroll
      const cards = scrollContent.querySelectorAll('.horizontal-snapshot-card')
      cards.forEach(card => {
        const textElements = card.querySelectorAll('.animate-horizontal-details')
        gsap.fromTo(textElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: 'left 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

    }, scrollSection)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <>
      {/* SECTION 1: Core Philosophy / About Us Centered Editorial Layout */}
      <section 
        id="philosophy"
        ref={containerRef}
        className="relative w-full bg-brand-cream py-36 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden border-b border-brand-dark/5"
      >
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-12 md:px-24">
          <div className="w-px h-full bg-brand-dark/5" />
          <div className="w-px h-full bg-brand-dark/5" />
          <div className="w-px h-full bg-brand-dark/5 hidden md:block" />
        </div>

        {/* Ornament icon at top center */}
        <div className="flex flex-col items-center gap-2 mb-14 select-none relative z-10">
          <div className="w-2.5 h-2.5 bg-brand-red rotate-45 border border-brand-light-grey/60 flex items-center justify-center shadow-xs">
            <div className="w-1.5 h-1.5 bg-brand-cream rounded-full" />
          </div>
          <div className="w-px h-10 bg-linear-to-b from-brand-red/30 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-12 md:gap-14">
          
          {/* Paragraph 1 - Large Editorial Serif Reveal */}
          <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] leading-[1.45] text-brand-dark tracking-tight text-center max-w-5xl">
            {renderP1()}
          </p>

          {/* Paragraph 2 - Sub-headline Serif Reveal */}
          <p className="font-serif italic text-xl sm:text-2xl md:text-3.5xl text-brand-dark leading-relaxed tracking-tight text-center max-w-3xl">
            {renderP2()}
          </p>

          {/* Paragraph 3 - Small Sans-Serif Muted Footer */}
          <p className="philosophy-footer-text font-sans text-xs sm:text-sm text-brand-grey/60 leading-relaxed font-light text-center max-w-2xl mt-4 select-none">
            We believe standard local community interventions should prioritize durability, micro-independence, and self-reliance. Learn more about our mission below.
          </p>

        </div>
      </section>

      {/* SECTION 2: Active Snapshots Showcase (Horizontal Scroll - Full Viewport) */}
      <section
        id="philosophy-snapshots"
        ref={snapshotsContainerRef}
        className="relative w-full h-[620px] sm:h-[600px] lg:h-screen bg-brand-cream overflow-x-hidden lg:overflow-hidden border-b border-brand-dark/5 flex flex-col justify-between"
      >
        {/* Subtle background blob */}
        <div className="absolute glowing-blob w-[550px] h-[550px] bg-brand-red/5 bottom-[-10%] right-[-10%] opacity-20 pointer-events-none" />

        {/* Section Header (Fixed position overlay during pinning) */}
        <div className="absolute top-0 left-0 w-full pt-12 px-6 md:px-12 z-20 hidden lg:block">
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-brand-dark/10 pb-4 select-none">
            <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
              04 / Active Snapshots
            </span>
            <span className="font-serif italic text-xs text-brand-grey font-bold">
              Impact in Uttarakhand
            </span>
          </div>
        </div>

        {/* Horizontal Track (translates horizontally) */}
        <div 
          ref={sliderRef}
          className="flex flex-row flex-nowrap items-center w-full h-full z-10 transform-gpu overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scroll-smooth scrollbar-none lg:snap-none px-4 lg:px-0"
        >
          {images.map((img, idx) => (
            <div 
              key={img.src}
              className="horizontal-snapshot-card shrink-0 w-[90vw] lg:w-screen h-full flex items-center justify-center relative select-none snap-center mr-4 lg:mr-0"
            >
              {/* Inner layout container with padding to avoid overlapping headers/footers */}
              <div className="w-full max-w-7xl h-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center px-4 lg:px-16 pt-20 lg:pt-28 pb-10 lg:pb-24 relative overflow-hidden">
                
                {/* Massive backdrop index behind the content */}
                <div className="absolute left-4 bottom-2 font-display text-[10rem] lg:text-[24rem] font-black text-brand-grey/3 select-none pointer-events-none tracking-tighter leading-none z-0">
                  0{idx + 1}
                </div>

                {/* Left Column: Details */}
                <div className="lg:col-span-5 flex flex-col justify-center relative z-10 max-w-md lg:max-w-lg pt-4 lg:pt-0">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 animate-horizontal-details">
                      <div className="w-1.5 h-1.5 bg-brand-grey rounded-full animate-pulse" />
                      <span className="font-display text-[8px] font-black tracking-[0.25em] text-brand-grey/65 uppercase">
                        {img.tag}
                      </span>
                    </div>
                    <h4 className="font-display text-2xl sm:text-3xl lg:text-5xl text-brand-dark font-black uppercase tracking-tight leading-none animate-horizontal-details">
                      {img.title}
                    </h4>
                    <p className="font-sans text-[11px] sm:text-xs lg:text-sm text-brand-grey leading-relaxed font-light animate-horizontal-details">
                      {img.desc}
                    </p>
                  </div>

                  {/* Key metric badge */}
                  <div className="mt-4 lg:mt-8 flex items-center gap-3 animate-horizontal-details">
                    <div className="px-5 py-2.5 border border-brand-grey/15 bg-brand-light-grey/25 rounded-full font-display text-[10px] sm:text-xs font-bold text-brand-dark uppercase tracking-widest shadow-sm">
                      {img.metric}
                    </div>
                  </div>
                </div>

                {/* Right Column: Polaroid Image (Full Display) */}
                <div className="lg:col-span-7 flex justify-center items-center relative z-10 w-full pb-4 lg:pb-0">
                  <div className="snapshot-image-frame relative w-full aspect-video sm:aspect-4/3 max-w-[320px] sm:max-w-[400px] lg:max-w-[560px] rounded-[24px] lg:rounded-[36px] p-2.5 lg:p-4 bg-brand-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-brand-dark/5 transition-transform duration-700 ease-out transform group-hover:scale-[1.02]">
                    <div className="absolute -inset-1 rounded-[26px] lg:rounded-[38px] border border-brand-dark/5 pointer-events-none z-0 rotate-1 transform" />
                    <div className="relative w-full h-full rounded-[14px] lg:rounded-[22px] overflow-hidden border border-brand-dark/5 shadow-inner">
                      <div className="absolute inset-0 bg-linear-to-t from-brand-dark/25 to-transparent z-10 pointer-events-none" />
                      <img 
                        src={img.src} 
                        alt={img.title} 
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Section Progress Bar Footer (Fixed position overlay during pinning) */}
        <div className="absolute bottom-0 left-0 w-full pb-8 px-6 md:px-12 z-20 hidden lg:block">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 border-t border-brand-dark/5 pt-6">
            {/* Scroll indicators */}
            <div className="flex justify-between items-center text-[9px] font-bold text-brand-grey tracking-widest uppercase select-none">
              <span>01 — START</span>
              <span className="flex items-center gap-2">
                Keep scrolling to slide snapshots
                <svg className="w-3 h-3 text-brand-red animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
              <span>0{images.length} — END</span>
            </div>

            {/* Custom progress track */}
            <div className="w-full h-[3px] bg-brand-dark/5 rounded-full overflow-hidden relative">
              <div className="horizontal-progress-fill absolute inset-y-0 left-0 w-full bg-brand-red origin-left transform scale-x-0" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Philosophy
