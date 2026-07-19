import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const JourneyTimeline = ({ isLoaded, onOpenProgram }) => {
  const containerRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)

  const concepts = [
    {
      title: 'Education & Capacity Building',
      tag: 'PROGRAM 01',
      number: '01 / 06',
      subtitle: 'Excellence & Learning',
      impact: 'Academic Excellence',
      desc: 'Providing opportunities for academic excellence, professional development, digital literacy, and lifelong learning.',
      image: '/images/villagelearning2.jpeg',
      color: 'from-brand-red/5 via-brand-red/1 to-transparent'
    },
    {
      title: 'Leadership Development',
      tag: 'PROGRAM 02',
      number: '02 / 06',
      subtitle: 'Confident & Ethical',
      impact: 'Nurturing Leaders',
      desc: 'Nurturing confident, ethical, and socially responsible leaders capable of addressing local and global challenges.',
      image: '/images/relief_distribution.jpeg',
      color: 'from-black/5 via-black/1 to-transparent'
    },
    {
      title: 'Research & Innovation',
      tag: 'PROGRAM 03',
      number: '03 / 06',
      subtitle: 'Technology & Solutions',
      impact: 'Sustainable Development',
      desc: 'Encouraging interdisciplinary research, innovation, entrepreneurship, and technology-driven solutions for sustainable development.',
      image: '/images/youth_group.jpeg',
      color: 'from-amber-600/5 via-amber-600/1 to-transparent'
    },
    {
      title: 'Community Engagement',
      tag: 'PROGRAM 04',
      number: '04 / 06',
      subtitle: 'Outreach & Inclusion',
      impact: 'Social Inclusion',
      desc: 'Promoting volunteerism, outreach programmes, legal literacy, health awareness, environmental conservation, and social inclusion.',
      image: '/images/ecology.jpeg',
      color: 'from-emerald-600/5 via-emerald-600/1 to-transparent'
    },
    {
      title: 'Skill Development & Entrepreneurship',
      tag: 'PROGRAM 05',
      number: '05 / 06',
      subtitle: 'Enhancing Employability',
      impact: 'Career Readiness',
      desc: 'Enhancing employability through vocational training, entrepreneurship development, financial literacy, and career readiness.',
      image: '/images/carousel6.jpeg',
      color: 'from-purple-600/5 via-purple-600/1 to-transparent'
    },
    {
      title: 'Health, Wellness & Sustainability',
      tag: 'PROGRAM 06',
      number: '06 / 06',
      subtitle: 'Well-being & Stewardship',
      impact: 'Sustainable Living',
      desc: 'Supporting physical and mental well-being while promoting environmental stewardship and sustainable living.',
      image: '/images/villagelearning2.jpeg',
      color: 'from-black/5 via-black/1 to-transparent'
    }
  ]

  useEffect(() => {
    if (!isLoaded) return

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        // Use GSAP Pinning instead of CSS sticky to avoid parent overflow issues
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftColRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        // Initialize images: first image visible, rest hidden
        gsap.set('.program-img', { opacity: 0, scale: 0.95 })
        gsap.set('.program-img-0', { opacity: 1, scale: 1 })

        const textSections = gsap.utils.toArray('.program-text-section')
        
        // Premium Crossfade Transition for images based on scrolling text blocks
        for (let i = 1; i < textSections.length; i++) {
          gsap.fromTo(`.program-img-${i}`, 
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: textSections[i],
                start: 'top 70%',
                end: 'top 30%',
                scrub: true,
                invalidateOnRefresh: true
              }
            }
          )
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <div 
      id="journey" 
      ref={containerRef}
      className="relative w-full bg-brand-cream border-b border-brand-dark/5 z-20"
    >
      <div className="flex flex-col md:flex-row w-full relative">
        {/* Left Side - Pinned Images (Full Screen Bleed) */}
        <div 
          ref={leftColRef}
          className="w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden hidden md:block relative z-10"
        >
           {concepts.map((item, idx) => (
             <div 
               key={`img-${idx}`}
               className={`program-img program-img-${idx} absolute inset-0 w-full h-full flex items-center justify-center p-6 lg:p-10 xl:p-12`}
               style={{ zIndex: idx }}
             >
               <div className="relative w-full h-full max-h-[85vh] rounded-[24px] lg:rounded-[36px] overflow-hidden border border-brand-dark/5 bg-brand-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                 <img 
                   src={item.image} 
                   alt={item.title} 
                   className="w-full h-full object-cover"
                 />
                 {/* Dark visual vignette/overlay for cinematic contrast */}
                 <div className="absolute inset-0 bg-brand-dark/10 pointer-events-none" />
               </div>
             </div>
           ))}
        </div>

        {/* Right Side - Scrolling Text */}
        <div 
          ref={rightColRef}
          className="w-full md:w-1/2 flex flex-col z-20 md:py-12 md:pl-12 lg:pl-16 pr-6 md:pr-16 lg:pr-32"
        >
          {/* Header */}
          <div className="pl-6 md:pl-10 pr-6 md:pr-12 pt-24 pb-16 flex flex-col justify-center border-b border-brand-dark/10 mb-16 max-w-2xl w-full">
            <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-brand-skyblue">
              04 / Focus Areas
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-dark uppercase tracking-tight mt-4 leading-none font-black">
              our programs
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-brand-dark/70 max-w-xl font-normal leading-relaxed mt-6">
              Through a comprehensive ecosystem approach, we address the intersectional roots of empowerment, social well-being, and ecological health.
            </p>
          </div>

          {/* Program sections */}
          <div className="flex flex-col gap-24 md:gap-32 pb-24 md:pb-48">
            {concepts.map((item, idx) => (
               <div 
                 key={item.title}
                 className="program-text-section pl-6 md:pl-10 pr-6 md:pr-12 flex flex-col justify-center relative w-full min-h-[60vh] md:min-h-[80vh]"
               >
                  {/* Mobile Image inline */}
                  <div className="w-full aspect-square rounded-[24px] overflow-hidden shadow-lg border border-brand-dark/5 mb-8 md:hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-12 gap-4 md:gap-6 max-w-2xl w-full">
                    {/* Left Column: Number / Deco */}
                    <div className="col-span-2 md:col-span-3 flex flex-col items-start pt-1.5 select-none">
                      <span className="font-serif text-5xl md:text-7xl font-black text-brand-skyblue/80 tracking-tighter leading-none">
                        {item.number.split(' ')[0]}
                      </span>
                      <div className="h-[2px] w-12 bg-brand-skyblue mt-4 hidden md:block" />
                    </div>

                    {/* Right Column: Details */}
                    <div className="col-span-10 md:col-span-9 flex flex-col items-start">
                      <span className="font-sans text-xs md:text-sm font-black text-brand-skyblue tracking-[0.25em] uppercase border-b-2 border-brand-skyblue/30 pb-1 mb-5">
                        {item.tag}
                      </span>
                      
                      <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-dark tracking-tight uppercase leading-tight font-black mb-3">
                        {item.title}
                      </h3>

                      <span className="font-sans text-xs sm:text-sm font-extrabold text-brand-dark/75 uppercase tracking-widest mb-6">
                        {item.subtitle}
                      </span>
                      
                      <p className="font-sans text-sm sm:text-base md:text-lg text-brand-dark leading-relaxed font-normal mb-8 max-w-xl">
                        {item.desc}
                      </p>

                      {/* Premium Accent Metric Pill */}
                      <div className="flex items-center gap-3 py-2.5 px-5 bg-brand-cream border border-brand-dark/10 shadow-xs rounded-full mb-8">
                        <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                        <span className="font-sans text-xs font-black uppercase tracking-wider text-brand-dark">
                          Impact: {item.impact}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => onOpenProgram && onOpenProgram(item.title)}
                        className="flex items-center gap-3 font-sans text-xs sm:text-sm font-black text-brand-dark uppercase tracking-widest hover:text-brand-red transition-all duration-300 group cursor-pointer"
                      >
                        <span className="w-12 h-[2px] bg-brand-dark group-hover:bg-brand-red group-hover:w-18 transition-all duration-300" />
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                          Explore Program
                        </span>
                      </button>
                    </div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JourneyTimeline


