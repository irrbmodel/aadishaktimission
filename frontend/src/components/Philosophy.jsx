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

  // 1. Scroll reveal for the new premium Philosophy grid layout
  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      // Left side profile layout slide-in
      gsap.fromTo('.philosophy-left-col',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Right side cards staggered fade-in
      gsap.fromTo('.philosophy-card',
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.philosophy-cards-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
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
        <div className="absolute glowing-blob w-[450px] h-[450px] bg-brand-red/5 top-[10%] left-[5%] opacity-20 pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-16 select-none">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
            03 / Who We Are & Our Approach
          </span>
          <span className="font-serif italic text-xs text-brand-grey">
            Aadi Shakti Mission
          </span>
        </div>

        {/* Premium Asymmetric Layout Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Editorial Profile */}
          <div className="philosophy-left-col lg:col-span-5 flex flex-col gap-8 relative select-none">
            {/* Elegant header */}
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[10px] font-black text-brand-red tracking-[0.25em] uppercase">
                About Us
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-dark font-black tracking-tighter leading-none uppercase">
                Practical, Local, Sustained.
              </h2>
            </div>
            
            {/* Museum-style framed photo overlay */}
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden border border-brand-dark/5 p-3.5 bg-brand-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] transform -rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="absolute inset-0 bg-brand-dark/5 z-10 pointer-events-none" />
              <img 
                src="/images/women_empowerment_class.jpeg" 
                alt="Our Community Class" 
                className="w-full h-full object-cover rounded-[18px]"
              />
              
              {/* Floating brand message card */}
              <div className="absolute bottom-6 -right-6 bg-brand-dark border border-brand-light-grey/15 text-brand-cream px-6 py-5 rounded-[22px] max-w-[260px] shadow-2xl z-20 flex flex-col gap-2 transform rotate-2">
                {/* Traditional Pahari design-inspired diamond */}
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-brand-light-grey rounded-full" />
                  <span className="font-display text-[7px] font-black tracking-[0.3em] uppercase text-brand-light-grey">
                    THE VISION
                  </span>
                </div>
                <p className="font-serif italic text-xs leading-relaxed text-brand-cream/90">
                  "Awakening Himalayan potential. One community, one cooperative, one craft at a time."
                </p>
              </div>
            </div>

            {/* Introductory copy */}
            <div className="flex flex-col gap-4 mt-8 max-w-md">
              <p className="font-sans text-sm text-brand-grey leading-relaxed font-light">
                We partner with communities to co-design practical interventions that strengthen education, livelihoods, and health while respecting local heritage.
              </p>
            </div>
          </div>

          {/* Right Column: Cascading 3-Pillar Cards Grid */}
          <div className="philosophy-cards-grid lg:col-span-7 flex flex-col gap-6 w-full">
            {[
              {
                num: '01',
                title: 'Social Equity',
                icon: <Eye className="text-brand-light-grey group-hover:text-brand-cream" size={22} />,
                desc: 'We organize independent women cooperatives, establish mentorship pathways for young girls, and build digital libraries to eliminate systemic literacy barriers across remote valleys.',
                points: ['Independent cooperatives', 'Academic mentoring', 'Digital study libraries']
              },
              {
                num: '02',
                title: 'Economic Autonomy',
                icon: <Shield className="text-brand-light-grey group-hover:text-brand-cream" size={22} />,
                desc: 'By establishing local handloom cooperative structures, supplying premium raw materials, and matching products to urban design centers, we secure sustainable wages for artisans.',
                points: ['Handloom coop models', 'Premium raw materials', 'Urban design markets']
              },
              {
                num: '03',
                title: 'Ecological Harmony',
                icon: <Leaf className="text-brand-light-grey group-hover:text-brand-cream" size={22} />,
                desc: 'We lead community native afforestation drives, rain-water harvesting study clusters, and solar clinic energy transitions to safeguard vulnerable Himalayan ecosystems.',
                points: ['Native afforestation', 'Rain-water harvesting', 'Solar energy transitions']
              }
            ].map((pillar) => (
              <div 
                key={pillar.num}
                className="philosophy-card group w-full bg-brand-white/40 hover:bg-brand-white border border-brand-dark/5 hover:border-brand-grey/25 rounded-[32px] p-8 md:p-10 shadow-[0_12px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_24px_55px_rgba(2,99,88,0.05)] transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8 items-start cursor-default"
              >
                {/* Visual Number Indicator */}
                <div className="absolute right-6 top-6 font-display text-8xl font-black text-brand-grey/5 select-none pointer-events-none transition-colors duration-500 group-hover:text-brand-grey/10">
                  {pillar.num}
                </div>
                
                {/* Left side card icon container */}
                <div className="w-12 h-12 rounded-2xl bg-brand-dark/5 group-hover:bg-brand-dark flex items-center justify-center shrink-0 transition-colors duration-500">
                  {pillar.icon}
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-4 relative z-10 max-w-lg">
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-[8px] font-black tracking-widest text-brand-red/60 uppercase">
                      PILLAR {pillar.num}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-brand-dark font-black uppercase tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-brand-grey leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                  
                  {/* Action Highlights */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {pillar.points.map((pt, i) => (
                      <span key={i} className="font-sans text-[9px] font-bold text-brand-dark bg-brand-light-grey/30 border border-brand-light-grey/10 rounded-full px-3 py-1 uppercase tracking-wider">
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Decorative border highlight line */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-brand-red/0 group-hover:bg-brand-red transition-colors duration-500" />
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

      {/* SECTION 2: Active Snapshots Showcase (Horizontal Scroll - Full Viewport) */}
      <section
        id="philosophy-snapshots"
        ref={snapshotsContainerRef}
        className="relative w-full h-screen bg-brand-cream overflow-hidden border-b border-brand-dark/5 flex flex-col justify-between"
      >
        {/* Subtle background blob */}
        <div className="absolute glowing-blob w-[550px] h-[550px] bg-brand-red/5 bottom-[-10%] right-[-10%] opacity-20 pointer-events-none" />

        {/* Section Header (Fixed position overlay during pinning) */}
        <div className="absolute top-0 left-0 w-full pt-12 px-6 md:px-12 z-20">
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-brand-dark/10 pb-4 select-none">
            <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
              04 / Active Snapshots
            </span>
            <span className="font-serif italic text-xs text-brand-grey">
              Impact in Uttarakhand
            </span>
          </div>
        </div>

        {/* Horizontal Track (translates horizontally) */}
        <div 
          ref={sliderRef}
          className="flex flex-row flex-nowrap items-center h-full z-10 transform-gpu"
        >
          {images.map((img, idx) => (
            <div 
              key={img.src}
              className="horizontal-snapshot-card shrink-0 w-screen h-screen flex items-center justify-center relative select-none"
            >
              {/* Inner layout container with padding to avoid overlapping headers/footers */}
              <div className="w-full max-w-7xl h-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center px-6 md:px-16 pt-28 pb-24 relative overflow-hidden">
                
                {/* Massive backdrop index behind the content */}
                <div className="absolute left-6 bottom-4 font-display text-[15rem] md:text-[24rem] font-black text-brand-grey/[0.03] select-none pointer-events-none tracking-tighter leading-none z-0">
                  0{idx + 1}
                </div>

                {/* Left Column: Details */}
                <div className="lg:col-span-5 flex flex-col justify-center relative z-10 max-w-md lg:max-w-lg">
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
                <div className="lg:col-span-7 flex justify-center items-center relative z-10 w-full">
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
        <div className="absolute bottom-0 left-0 w-full pb-8 px-6 md:px-12 z-20">
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
