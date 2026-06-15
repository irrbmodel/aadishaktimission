import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const JourneyTimeline = () => {
  const containerRef = useRef(null)
  const pinWrapRef = useRef(null)

  useEffect(() => {
    const pinWrap = pinWrapRef.current
    const container = containerRef.current
    if (!pinWrap || !container) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const totalWidth = pinWrap.scrollWidth - window.innerWidth
      
      const pinTrigger = gsap.to(pinWrap, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${pinWrap.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      })

      // Parallax effect on panel images
      const images = pinWrap.querySelectorAll('.panel-img')
      images.forEach(img => {
        gsap.fromTo(img,
          { scale: 1.15, xPercent: -8 },
          {
            scale: 1,
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              containerAnimation: pinTrigger,
              start: 'left right',
              end: 'right left',
              scrub: true,
            }
          }
        )
      })
    })

    return () => mm.revert()
  }, [])

  const concepts = [
    {
      title: 'compassion',
      tag: 'VALUES 01',
      desc: 'Empathy is not a passive sentiment. It is the primordial, cosmic spark of action and creation that transforms society from its very roots.',
      image: '/arogya_shakti.png',
      color: 'from-brand-red/10 to-transparent'
    },
    {
      title: 'autonomy',
      tag: 'VALUES 02',
      desc: 'Providing skills, micro-capital, and local entrepreneurship pathways to transform women into self-reliant change agents.',
      image: '/swayam_shakti.png',
      color: 'from-amber-600/10 to-transparent'
    },
    {
      title: 'equality',
      tag: 'VALUES 03',
      desc: 'Securing primary education resources and learning hubs for young girls in underserved villages to restore standard balance.',
      image: '/shakti_shiksha.png',
      color: 'from-blue-600/10 to-transparent'
    },
    {
      title: 'ecology',
      tag: 'VALUES 04',
      desc: 'Uplifting humanity means protecting our green home through afforestation drives and local clean solar energy networks.',
      image: '/prakriti_shakti.png',
      color: 'from-emerald-600/10 to-transparent'
    }
  ]

  return (
    <div 
      id="journey" 
      ref={containerRef}
      className="relative w-full bg-[#09090b] overflow-hidden md:h-screen flex flex-col justify-center border-b border-brand-dark/5"
    >
      {/* Dynamic light blob to accent the dark page */}
      <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-red/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 mix-blend-screen" />

      {/* Header (visible above horizontal carousel) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16 md:pt-0 md:absolute md:top-16 md:left-12 md:right-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 select-none">
        <div>
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-grey">
            THINGS THAT INSPIRE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-cream uppercase tracking-tight mt-2">
            our core concepts
          </h2>
        </div>
        <p className="font-sans text-xs md:text-sm text-brand-grey max-w-md font-light leading-relaxed">
          Through a comprehensive ecosystem approach, we address the intersectional roots of empowerment, social well-being, and ecological health.
        </p>
      </div>

      {/* Horizontal Carousel (or vertical list on mobile devices) */}
      <div 
        ref={pinWrapRef} 
        className="flex flex-col md:flex-row md:h-screen w-full md:w-[400vw] relative z-10 pt-16 pb-20 md:py-0"
      >
        {concepts.map((item, idx) => (
          <div 
            key={item.title}
            className="w-full md:w-screen h-auto md:h-full flex items-center justify-center px-6 md:px-12 py-10 md:py-0 shrink-0"
          >
            <div 
              className={`w-full max-w-6xl rounded-[32px] border border-white/5 p-6 md:p-12 bg-linear-to-br ${item.color} backdrop-blur-md flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 items-center`}
            >
              {/* Text column */}
              <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
                <span className="font-sans text-[10px] font-bold text-brand-red tracking-wider uppercase">
                  {item.tag}
                </span>
                <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-cream tracking-tight mt-4 uppercase">
                  {item.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-brand-grey leading-relaxed mt-6 font-light max-w-lg">
                  {item.desc}
                </p>
              </div>

              {/* Parallax Image column */}
              <div className="lg:col-span-5 w-full order-1 lg:order-2">
                <div 
                  className="w-full aspect-4/3 rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative"
                  data-cursor="view"
                >
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/50 to-transparent z-10 pointer-events-none" />
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="panel-img w-full h-full object-cover scale-110 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JourneyTimeline
