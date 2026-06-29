import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const JourneyTimeline = ({ isLoaded, onOpenProgram }) => {
  const containerRef = useRef(null)

  const concepts = [
    {
      title: 'Village Learning Hub',
      tag: 'PROGRAM 01',
      number: '01 / 05',
      subtitle: 'Primary & Digital Literacy',
      impact: '500+ Rural Girls',
      desc: 'Establishing community learning spaces, libraries, and digital training labs to secure primary and digital literacy for rural children and girls.',
      image: '/images/villagelearning2.jpeg',
      color: 'from-brand-red/5 via-brand-red/1 to-transparent'
    },
    {
      title: 'Nurturing Our Neighborhoods',
      tag: 'PROGRAM 02',
      number: '02 / 05',
      subtitle: 'Community Health & Well-being',
      impact: '1,200+ Beneficiaries',
      desc: 'Uplifting local communities through regular health checkups, wellness camps, and clean water projects.',
      image: '/images/relief_distribution.jpeg',
      color: 'from-blue-600/5 via-blue-600/1 to-transparent'
    },
    {
      title: 'Empowering Youth',
      tag: 'PROGRAM 03',
      number: '03 / 05',
      subtitle: 'Skills & Autonomy',
      impact: '250+ Youth Trained',
      desc: 'Fostering leadership, micro-capital, and vocational craft training to empower local youth towards long-term self-reliance.',
      image: '/images/youth_group.jpeg',
      color: 'from-amber-600/5 via-amber-600/1 to-transparent'
    },
    {
      title: 'For Mother Earth',
      tag: 'PROGRAM 04',
      number: '04 / 05',
      subtitle: 'Eco-Conservation & Forestry',
      impact: '5,000+ Saplings',
      desc: 'Preserving our ecosystem through native afforestation drives, solar clinic power setups, and green space development.',
      image: '/images/ecology.jpeg',
      color: 'from-emerald-600/5 via-emerald-600/1 to-transparent'
    },
    {
      title: 'Heritage & Handloom Revival',
      tag: 'PROGRAM 05',
      number: '05 / 05',
      subtitle: 'Craft & Aipan Conservation',
      impact: '80+ Women Artisans',
      desc: 'Sustaining local Himalayan weaving and sacred Aipan folk arts through female cooperatives and market bridges.',
      image: '/images/carousel6.jpeg',
      color: 'from-brand-red/5 via-brand-red/1 to-transparent'
    }
  ]

  useEffect(() => {
    if (!isLoaded) return

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        // Initialize images: first image visible, rest hidden
        gsap.set('.program-img', { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set('.program-img-0', { clipPath: 'inset(0% 0% 0% 0%)' })

        const textSections = gsap.utils.toArray('.program-text-section')
        
        // Scrub curtain raiser transition for images 1-4 mapped to scroll progress of text blocks 1-4
        for (let i = 1; i < textSections.length; i++) {
          gsap.fromTo(`.program-img-${i}`, 
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: textSections[i],
                start: 'top 85%',
                end: 'top 35%',
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
      className="relative w-full bg-brand-cream border-b border-brand-dark/5"
    >
      <div className="flex flex-col md:flex-row w-full relative">
        {/* Left Side - Sticky Images (Full Screen Bleed) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky md:top-0 overflow-hidden hidden md:block relative z-10">
           {concepts.map((item, idx) => (
             <div 
               key={`img-${idx}`}
               className={`program-img program-img-${idx} absolute inset-0 w-full h-full`}
               style={{ 
                 zIndex: idx,
                 clipPath: idx === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)'
               }}
             >
               <img 
                 src={item.image} 
                 alt={item.title} 
                 className="w-full h-full object-cover"
               />
               {/* Dark visual vignette/overlay for cinematic contrast */}
               <div className="absolute inset-0 bg-brand-dark/10 pointer-events-none" />
             </div>
           ))}
        </div>

        {/* Right Side - Scrolling Text */}
        <div className="w-full md:w-1/2 flex flex-col z-20 md:py-12 md:pl-8 lg:pl-12 pr-6 md:pr-16 lg:pr-32">
          {/* Header */}
          <div className="pl-6 md:pl-8 pr-6 md:pr-12 pt-24 pb-16 flex flex-col justify-center border-b border-brand-dark/10 mb-16 max-w-2xl w-full">
            <span className="font-sans text-xs md:text-sm font-black uppercase tracking-[0.3em] text-brand-dark/50">
              Focus Areas
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-dark uppercase tracking-tight mt-4 leading-none font-bold">
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
                 className="program-text-section pl-6 md:pl-8 pr-6 md:pr-12 flex flex-col justify-center relative w-full min-h-[60vh] md:min-h-[80vh]"
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
                      <span className="font-serif text-5xl md:text-7xl font-black text-brand-dark/25 tracking-tighter leading-none">
                        {item.number.split(' ')[0]}
                      </span>
                      <div className="h-[2px] w-12 bg-brand-red/45 mt-4 hidden md:block" />
                    </div>

                    {/* Right Column: Details */}
                    <div className="col-span-10 md:col-span-9 flex flex-col items-start">
                      <span className="font-sans text-xs md:text-sm font-black text-brand-red tracking-[0.25em] uppercase border-b-2 border-brand-red/30 pb-1 mb-5">
                        {item.tag}
                      </span>
                      
                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-dark tracking-tight uppercase leading-tight font-bold mb-3">
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

