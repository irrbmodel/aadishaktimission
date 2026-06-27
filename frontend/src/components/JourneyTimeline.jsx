import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const JourneyTimeline = ({ isLoaded }) => {
  const containerRef = useRef(null)
  const pinWrapRef = useRef(null)

  useEffect(() => {
    if (!isLoaded) return

    let ctx;
    const timer = setTimeout(() => {
      const pinWrap = pinWrapRef.current
      const container = containerRef.current
      if (!pinWrap || !container) return

      ctx = gsap.context(() => {
        const getScrollDistance = () => pinWrap.scrollWidth - window.innerWidth
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          }
        })

        // Animate the horizontal translate of the wrapper
        tl.to(pinWrap, {
          x: () => -getScrollDistance(),
          ease: 'none'
        }, 0)

        // Sync progress bar animation
        const progressBar = container.querySelector('.timeline-progress-bar')
        if (progressBar) {
          tl.to(progressBar, {
            width: '100%',
            ease: 'none'
          }, 0)
        }

        // Parallax effect on panel images
        const images = pinWrap.querySelectorAll('.panel-img')
        images.forEach(img => {
          gsap.fromTo(img,
            { scale: 1.15, xPercent: -10 },
            {
              scale: 1.02,
              xPercent: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentNode,
                containerAnimation: tl,
                start: 'left right',
                end: 'right left',
                scrub: true,
              }
            }
          )
        })

        // Premium text stagger parallax as panels slide into view
        const panels = pinWrap.querySelectorAll('.concept-panel')
        panels.forEach(panel => {
          const textWrapper = panel.querySelector('.text-wrapper')
          if (textWrapper) {
            gsap.fromTo(textWrapper,
              { opacity: 0.4, y: 30, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: 'power1.out',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tl,
                  start: 'left 85%',
                  end: 'left 40%',
                  scrub: true,
                }
              }
            )
          }
        })
      }, container)

      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [isLoaded])

  const concepts = [
    {
      title: 'compassion',
      tag: 'VALUES 01',
      number: '01 / 04',
      desc: 'Empathy is not a passive sentiment. It is the primordial, cosmic spark of action and creation that transforms society from its very roots.',
      image: '/images/compassion.jpeg',
      color: 'from-brand-red/5 via-brand-red/1 to-transparent'
    },
    {
      title: 'autonomy',
      tag: 'VALUES 02',
      number: '02 / 04',
      desc: 'Providing skills, micro-capital, and local entrepreneurship pathways to transform women into self-reliant change agents.',
      image: '/images/women_empowerment_class.jpeg',
      color: 'from-amber-600/5 via-amber-600/1 to-transparent'
    },
    {
      title: 'equality',
      tag: 'VALUES 03',
      number: '03 / 04',
      desc: 'Securing primary education resources and learning hubs for young girls in underserved villages to restore standard balance.',
      image: '/images/equality.jpeg',
      color: 'from-blue-600/5 via-blue-600/1 to-transparent'
    },
    {
      title: 'ecology',
      tag: 'VALUES 04',
      number: '04 / 04',
      desc: 'Uplifting humanity means protecting our green home through afforestation drives and local clean solar energy networks.',
      image: '/images/ecology.jpeg',
      color: 'from-emerald-600/5 via-emerald-600/1 to-transparent'
    }
  ]

  return (
    <div 
      id="journey" 
      ref={containerRef}
      className="relative w-full bg-brand-cream overflow-hidden h-screen flex flex-col justify-center border-b border-brand-dark/5"
    >
      {/* Dynamic light blob to accent the page */}
      <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-red/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none" />

      {/* Header (visible above horizontal carousel) */}
      <div className="absolute top-20 sm:top-24 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-4 select-none">
        <div>
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-grey">
            THINGS THAT INSPIRE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-brand-dark uppercase tracking-tight mt-1 sm:mt-2">
            our core concepts
          </h2>
        </div>
        <p className="font-sans text-[11px] sm:text-xs md:text-sm text-brand-grey max-w-md font-light leading-relaxed">
          Through a comprehensive ecosystem approach, we address the intersectional roots of empowerment, social well-being, and ecological health.
        </p>
      </div>

      {/* Horizontal Carousel */}
      <div 
        ref={pinWrapRef} 
        className="flex flex-row h-screen w-[400vw] relative z-10 will-change-transform transform-gpu"
      >
        {concepts.map((item, idx) => (
          <div 
            key={item.title}
            className="concept-panel w-screen h-full flex items-center justify-center px-6 sm:px-10 md:px-16 pt-40 sm:pt-44 pb-12 shrink-0"
          >
            <div 
              className={`w-full max-w-6xl rounded-[32px] border border-brand-dark/5 p-6 sm:p-10 md:p-14 bg-linear-to-br ${item.color} bg-brand-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(155,0,0,0.06)] hover:border-brand-red/15 transition-all duration-700 flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-14 items-center relative overflow-hidden`}
            >
              {/* Fractional counter in corner */}
              <div className="absolute top-8 right-8 z-20 select-none">
                <span className="font-display text-[10px] font-bold text-brand-grey/40 tracking-[0.2em]">
                  {item.number}
                </span>
              </div>

              {/* Text column */}
              <div className="text-wrapper lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
                <span className="font-sans text-[9px] font-black text-brand-red tracking-[0.25em] uppercase border-b border-brand-red/20 pb-1.5">
                  {item.tag}
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl lg:text-8xl text-brand-dark tracking-tighter mt-4 md:mt-6 uppercase leading-none font-black">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm md:text-base text-brand-grey/80 leading-relaxed mt-5 md:mt-8 font-light max-w-xl">
                  {item.desc}
                </p>
              </div>

              {/* Image column */}
              <div className="image-wrapper lg:col-span-5 w-full order-1 lg:order-2">
                <div 
                  className="w-full aspect-video lg:aspect-4/3 rounded-2xl overflow-hidden border border-brand-dark/5 shadow-2xl relative bg-brand-cream"
                  data-cursor="view"
                >
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/30 via-transparent to-transparent z-10 pointer-events-none" />
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="panel-img w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sleek horizontal timeline progress bar */}
      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 h-[2px] bg-brand-dark/5 z-20 rounded-full overflow-hidden">
        <div className="timeline-progress-bar h-full bg-brand-red w-0" />
      </div>
    </div>

  )
}

export default JourneyTimeline
