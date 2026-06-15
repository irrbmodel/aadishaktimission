import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Activity, Cpu, TreePine, ArrowUpRight } from './Icons'

gsap.registerPlugin(ScrollTrigger)

const PillarsHorizontal = () => {
  const containerRef = useRef(null)
  const pinWrapRef = useRef(null)

  useEffect(() => {
    const pinWrap = pinWrapRef.current
    const container = containerRef.current
    if (!pinWrap || !container) return

    // Create a GSAP MatchMedia instance for responsive ScrollTriggers
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      // Calculate how far to translate the horizontal track
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

      // Image parallax effect inside horizontal panels
      const images = pinWrap.querySelectorAll('.panel-image')
      images.forEach(img => {
        gsap.fromTo(img,
          { scale: 1.1, xPercent: -5 },
          {
            scale: 1,
            xPercent: 5,
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

  const pillars = [
    {
      title: 'Shakti Shiksha',
      subtitle: 'Girl Child & Primary Education',
      description: 'We believe education is the primary channel to evoke female strength. Our school drives, learning hubs, and merit scholarships secure standard learning resources for girls in underserved villages.',
      color: 'from-orange-500/10 to-amber-500/10 border-brand-orange/20',
      tagColor: 'text-brand-orange bg-brand-orange/10 border-brand-orange/30',
      icon: BookOpen,
      image: '/shakti_shiksha.png',
      actionText: 'Empower a Child'
    },
    {
      title: 'Arogya Shakti',
      subtitle: 'Healthcare, Clean Water & Nutrition',
      description: 'Strengthening the physical foundation of communities. Aadi Shakti conducts local medical diagnostics, nutritional workshops, maternal care outreach, and clean water filtration installations.',
      color: 'from-teal-500/10 to-emerald-500/10 border-teal-500/20',
      tagColor: 'text-teal-400 bg-teal-400/10 border-teal-400/30',
      icon: Activity,
      image: '/arogya_shakti.png',
      actionText: 'Support health camp'
    },
    {
      title: 'Swayam Shakti',
      subtitle: 'Skill Development & Entrepreneurship',
      description: 'Transforming women into self-reliant change agents. We offer hands-on training in local handicrafts, tailoring, textile management, digital literacy, and provide micro-capital mentorship.',
      color: 'from-pink-500/10 to-purple-500/10 border-brand-pink/20',
      tagColor: 'text-brand-pink bg-brand-pink/10 border-brand-pink/30',
      icon: Cpu,
      image: '/swayam_shakti.png',
      actionText: 'Fund micro-enterprise'
    },
    {
      title: 'Prakriti Shakti',
      subtitle: 'Environmental & Conservation Drives',
      description: 'Uplifting humanity means protecting our green home. Prakriti Shakti launches local afforestation campaigns, clean energies initiatives like solar grids, and promotes bio-waste treatment.',
      color: 'from-emerald-500/10 to-yellow-500/10 border-emerald-500/20',
      tagColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      icon: TreePine,
      image: '/prakriti_shakti.png',
      actionText: 'Plant a forest'
    }
  ]

  return (
    <div 
      id="pillars" 
      ref={containerRef} 
      className="relative w-full bg-brand-dark overflow-hidden md:h-screen flex flex-col justify-center"
    >
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-purple top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      {/* Intro Header (Visible on Desktop / Mobile) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16 md:pt-0 md:absolute md:top-12 md:left-12 md:right-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">
            Pillars of Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-2">
            HOW WE SHAPE CHANGE
          </h2>
        </div>
        <p className="text-xs md:text-sm text-gray-400 max-w-md">
          Through a comprehensive ecosystem approach, we address the intersectional roots of empowerment, social well-being, and ecological health.
        </p>
      </div>

      {/* Horizontal Panels (or stacked on mobile) */}
      <div 
        ref={pinWrapRef} 
        className="flex flex-col md:flex-row md:h-screen w-full md:w-[400vw] relative z-10 pt-10 pb-20 md:py-0"
      >
        {pillars.map((pillar, index) => {
          const IconComponent = pillar.icon
          return (
            <div 
              key={pillar.title}
              className="w-full md:w-screen h-auto md:h-full flex items-center justify-center px-6 md:px-12 py-10 md:py-0 shrink-0"
            >
              <div 
                className={`w-full max-w-6xl rounded-3xl border p-6 md:p-12 bg-linear-to-br ${pillar.color} backdrop-blur-md glass-panel flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 items-center`}
              >
                {/* Text Content Column */}
                <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
                  {/* Badge */}
                  <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${pillar.tagColor}`}>
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>PILLAR 0{index + 1}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mt-6">
                    {pillar.title}
                  </h3>
                  <h4 className="text-sm font-semibold tracking-wide text-brand-orange mt-2">
                    {pillar.subtitle}
                  </h4>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-300/80 font-light mt-6 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Action Link */}
                  <a 
                    href="#contribute"
                    className="mt-8 flex items-center gap-2 text-xs font-black tracking-widest text-white group cursor-pointer"
                    data-cursor="pointer"
                  >
                    <span>{pillar.actionText.toUpperCase()}</span>
                    <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-brand-dark flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </a>
                </div>

                {/* Cover Image Column */}
                <div className="lg:col-span-5 w-full order-1 lg:order-2">
                  <div 
                    className="w-full aspect-4/3 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative"
                    data-cursor="view"
                  >
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-brand-indigo/60 to-transparent z-10 pointer-events-none" />
                    <img 
                      src={pillar.image} 
                      alt={pillar.title} 
                      className="panel-image w-full h-full object-cover object-center scale-110"
                    />
                  </div>
                </div>

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PillarsHorizontal
