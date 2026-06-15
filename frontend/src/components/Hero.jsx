import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const containerRef = useRef(null)
  const bannerRef = useRef(null)
  const titleContainerRef = useRef(null)
  const cardsRef = useRef([])
  const loaderRef = useRef(null)

  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // 1. Simulation of Loader Progress
  useEffect(() => {
    const progressVal = { val: 0 }
    const loaderTimeline = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true)
        // Slide out loader
        gsap.to(loaderRef.current, {
          y: '-100%',
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {
            if (loaderRef.current) {
              loaderRef.current.style.display = 'none'
            }
          }
        })
      }
    })

    loaderTimeline.to(progressVal, {
      val: 100,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => {
        setLoadingProgress(Math.floor(progressVal.val))
      }
    })
  }, [])

  // 2. GSAP ScrollTrigger for Parallax and Card Reveals
  useEffect(() => {
    if (!isLoaded) return

    const banner = bannerRef.current
    const container = containerRef.current
    const titleContainer = titleContainerRef.current

    // Set initial positions for cards to animate on scroll
    gsap.set(cardsRef.current, { y: 150, opacity: 0 })

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    })

    // Animate central banner expanding to screen fill
    mainTimeline.fromTo(banner, 
      {
        width: '55vw',
        height: '50vh',
        borderRadius: '32px',
        scale: 0.85
      },
      {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        scale: 1,
        ease: 'none'
      },
      0
    )

    // Animate Hero text opacity/translation
    mainTimeline.to(titleContainer, {
      opacity: 0,
      y: -50,
      ease: 'none'
    }, 0)

    // Reveal floating NGO project cards on scroll
    cardsRef.current.forEach((card, index) => {
      if (!card) return
      
      const xOffset = index % 2 === 0 ? -100 : 100
      mainTimeline.fromTo(card,
        {
          x: xOffset,
          y: 200,
          opacity: 0,
          scale: 0.9
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out'
        },
        index * 0.15 // staggered start
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [isLoaded])

  const pillars = [
    {
      title: 'Shakti Shiksha',
      subtitle: 'Primary Education',
      desc: 'Securing quality standard learning resources and scholarships for girls in underserved villages.',
      pos: 'top-1/4 left-8 md:left-16 lg:left-24'
    },
    {
      title: 'Arogya Shakti',
      subtitle: 'Healthcare Access',
      desc: 'Conducting rural diagnostic camps, sanitation workshops, and clean water filtration installs.',
      pos: 'top-[35%] right-8 md:right-16 lg:right-24'
    },
    {
      title: 'Swayam Shakti',
      subtitle: 'Self-Reliance & Skills',
      desc: 'Providing vocational training in local crafts and micro-capital entrepreneurship grants.',
      pos: 'bottom-[15%] left-8 md:left-16 lg:left-32'
    },
    {
      title: 'Prakriti Shakti',
      subtitle: 'Environmental Drives',
      desc: 'Sustaining communities with native afforestation drives and local solar energy grids.',
      pos: 'bottom-[20%] right-8 md:right-16 lg:right-32'
    }
  ]

  return (
    <div id="hero" className="relative w-full overflow-x-hidden">
      {/* 1. Preloader Overlay */}
      <div 
        ref={loaderRef}
        className="fixed inset-0 w-full h-full bg-brand-cream flex flex-col justify-center items-center z-9999"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="font-serif text-5xl md:text-7xl text-brand-dark tracking-tight animate-pulse">
            Aadi Shakti.
          </span>
          <div className="font-sans text-xs font-bold tracking-[0.2em] text-brand-grey uppercase">
            <span>LOADING PROGRESS</span>
            <span className="ml-2 font-display text-brand-red">{loadingProgress} %</span>
          </div>
        </div>
      </div>

      {/* 2. Main Page Header Spacer & Scroll Element */}
      <section 
        ref={containerRef}
        className="relative w-full h-screen bg-brand-cream flex flex-col justify-center items-center overflow-hidden border-b border-brand-dark/5"
      >
        {/* Sticky Background Title */}
        <div 
          ref={titleContainerRef}
          className="absolute z-10 flex flex-col items-center text-center select-none pointer-events-none"
        >
          <span className="font-serif text-[10vw] md:text-[8vw] text-brand-dark leading-[0.9] tracking-tight">
            Aadi Shakti.
          </span>
          <span className="font-sans text-xs md:text-sm font-bold tracking-[0.4em] text-brand-grey uppercase mt-2">
            empowering change from the roots
          </span>
        </div>

        {/* Central Expanding Banner Image */}
        <div 
          ref={bannerRef}
          className="relative z-0 overflow-hidden flex items-center justify-center cursor-pointer shadow-2xl"
          data-cursor="view"
        >
          {/* Overlay mask */}
          <div className="absolute inset-0 bg-brand-dark/20 z-10" />
          <img 
            src="/hero_cosmic_energy.png" 
            alt="NGO Activism" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scroll text indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 select-none pointer-events-none opacity-60">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-grey uppercase">
            SCROLL TO EXPLORE
          </span>
          <div className="w-px h-12 bg-brand-dark/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-brand-red animate-bounce" />
          </div>
        </div>

        {/* Floating Cards (Positioned absolutely over the screen grid) */}
        {pillars.map((item, idx) => (
          <div 
            key={item.title}
            ref={(el) => (cardsRef.current[idx] = el)}
            className={`absolute z-20 ${item.pos} hidden md:flex flex-col p-6 rounded-2xl bg-brand-white border border-brand-dark/5 shadow-xl max-w-[280px] group transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30`}
          >
            <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider">
              {item.subtitle}
            </span>
            <h3 className="font-serif text-lg text-brand-dark font-semibold mt-2 group-hover:text-brand-red transition-colors">
              {item.title}
            </h3>
            <p className="font-sans text-xs text-brand-grey/95 mt-2 leading-relaxed font-light">
              {item.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Hero
