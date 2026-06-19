import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PillarsHorizontal = ({ isLoaded }) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const contentRef = useRef(null)
  const headerRef = useRef(null)
  const sectionRef = useRef(null)
  const hasAnimatedRef = useRef(false)

  const categories = [
    { id: 'all', title: 'all programs', count: 4, desc: 'A holistic overview of our focused programs addressing education hubs, community health and wellness, youth vocational empowerment, and eco-conservation.' },
    { id: 'learning-hub', title: 'village learning hub', count: 1, desc: 'Establishing community learning spaces, libraries, and digital training labs to secure primary and digital literacy for rural children and girls.' },
    { id: 'neighborhoods', title: 'nurturing neighborhoods', count: 1, desc: 'Uplifting local communities through regular health checkups, wellness camps, and clean water projects.' },
    { id: 'youth', title: 'empowering youth', count: 1, desc: 'Fostering leadership, micro-capital, and vocational craft training to empower local youth towards long-term self-reliance.' },
    { id: 'mother-earth', title: 'nurturing mother earth', count: 1, desc: 'Preserving our ecosystem through native afforestation drives, solar clinic power setups, and green space development.' }
  ]

  const projects = [
    { id: 1, title: 'Village Learning Hub', category: 'learning-hub', subtitle: 'Primary & Digital Literacy', image: '/images/villagelearning2.jpeg', impact: '500+ Rural Girls' },
    { id: 2, title: 'Nurturing Our Neighborhoods', category: 'neighborhoods', subtitle: 'Community Health & Well-being', image: '/images/relief_distribution.jpeg', impact: '1,200+ Beneficiaries' },
    { id: 3, title: 'Empowering Youth', category: 'youth', subtitle: 'Skills & Autonomy', image: '/images/youth_group.jpeg', impact: '250+ Youth' },
    { id: 4, title: 'For Mother Earth', category: 'mother-earth', subtitle: 'Eco-Conservation & Forestry', image: '/images/ecology.jpeg', impact: '5,000+ Saplings Planted' }
  ]

  const [displayedProjects, setDisplayedProjects] = useState(projects)

  const activeInfo = categories.find(cat => cat.id === activeCategory)

  // Smooth Category Switcher handler
  const handleCategoryChange = (newCat) => {
    if (newCat === activeCategory) return
    hasAnimatedRef.current = true
    
    const cards = contentRef.current.querySelectorAll('.project-card')
    const headerTitle = headerRef.current.querySelector('h2')
    const headerDesc = headerRef.current.querySelector('p')
    
    // Step 1: Fade out existing cards & header info
    const tl = gsap.timeline({
      onComplete: () => {
        // Step 2: Swap the projects & category in state
        setActiveCategory(newCat)
        const nextProjects = newCat === 'all' 
          ? projects 
          : projects.filter(proj => proj.category === newCat)
        setDisplayedProjects(nextProjects)
      }
    })

    tl.to(cards, {
      opacity: 0,
      y: -15,
      scale: 0.96,
      duration: 0.25,
      stagger: 0.02,
      ease: 'power2.in'
    }, 0)

    tl.to([headerTitle, headerDesc], {
      opacity: 0,
      y: -10,
      duration: 0.2,
      stagger: 0.05,
      ease: 'power2.in'
    }, 0)
  }

  // Step 3: Fade and stagger in new cards & header text after state update
  useEffect(() => {
    if (!isLoaded) return
    // Guard: Only run this switcher animation if the initial scroll animation has finished
    if (!hasAnimatedRef.current) return

    const cards = contentRef.current.querySelectorAll('.project-card')
    const imgs = contentRef.current.querySelectorAll('.project-card img')
    const headerTitle = headerRef.current.querySelector('h2')
    const headerDesc = headerRef.current.querySelector('p')
    
    gsap.fromTo(cards,
      { opacity: 0, y: 20, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power3.out',
        onComplete: () => {
          ScrollTrigger.refresh()
        }
      }
    )

    // Premium image clip-path reveal + scale-down zoom
    gsap.fromTo(imgs,
      { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.22 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 0.75,
        stagger: 0.04,
        ease: 'power3.out',
        clearProps: 'clipPath,scale,transform' // clear props so hover CSS scale still works
      }
    )

    gsap.fromTo([headerTitle, headerDesc],
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out'
      }
    )
  }, [displayedProjects, isLoaded])

  // Initial ScrollTrigger entrance animation on scroll
  useEffect(() => {
    if (!isLoaded) return

    const t = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    const subtitle = sectionRef.current.querySelector('.subtitle-anim')
    const headerTitle = headerRef.current.querySelector('h2')
    const headerDesc = headerRef.current.querySelector('p')
    const buttons = sectionRef.current.querySelectorAll('.tab-button')
    const cards = contentRef.current.querySelectorAll('.project-card')
    const imgs = contentRef.current.querySelectorAll('.project-card img')

    // Set initial states to zero opacity / cropped to prevent layout flash
    gsap.set([subtitle, headerTitle, headerDesc, buttons, cards], { opacity: 0 })
    gsap.set(imgs, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.22 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        onComplete: () => {
          hasAnimatedRef.current = true
        }
      }
    })

    tl.fromTo(subtitle,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    tl.fromTo([headerTitle, headerDesc],
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
      '-=0.4'
    )
    tl.fromTo(buttons,
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
      '-=0.5'
    )
    tl.fromTo(cards,
      { y: 35, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out' },
      '-=0.4'
    )
    tl.fromTo(imgs,
      { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.22 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'clipPath,scale,transform'
      },
      '-=0.7' // start in sync with the cards entrance
    )

    return () => clearTimeout(t)
  }, [isLoaded])

  return (
    <section 
      ref={sectionRef}
      id="pillars" 
      className="relative w-full py-24 md:py-36 bg-brand-cream border-b border-brand-dark/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Category section subtitle */}
        <div className="subtitle-anim mb-12 select-none">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-grey block">
            OUR DEPLOYMENTS
          </span>
        </div>

        {/* Categories Tab Selector with numbers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Big Category Header */}
          <div ref={headerRef} className="lg:col-span-8 flex flex-col items-start gap-4">
            <h2 className="font-serif text-5xl md:text-7xl text-brand-dark tracking-tight uppercase leading-none">
              {activeInfo.title}
              <span className="align-super text-xs text-brand-red ml-3 font-bold font-display">
                {activeInfo.count}
              </span>
            </h2>
            <p className="font-sans text-sm md:text-base text-brand-grey/90 leading-relaxed max-w-xl font-light mt-4">
              {activeInfo.desc}
            </p>
          </div>

          {/* Right Column: Tab Trigger Buttons */}
          <div className="lg:col-span-4 flex flex-col items-start gap-2 lg:border-l border-l-0 lg:border-brand-dark/10 lg:pl-8 pl-0 w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`tab-button font-sans text-xs font-extrabold tracking-wider uppercase py-3 px-4 cursor-pointer transition-all duration-300 relative group flex items-center justify-between w-full rounded-xl ${
                  activeCategory === cat.id 
                    ? 'text-brand-red bg-brand-red/5' 
                    : 'text-brand-dark hover:text-brand-red hover:bg-brand-dark/5'
                }`}
                data-cursor="pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {activeCategory === cat.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  )}
                  {cat.title}
                </span>
                <span className="text-[10px] text-brand-grey font-bold font-display relative z-10">
                  {cat.count}
                </span>
                {/* Active marker accent bar */}
                {activeCategory === cat.id && (
                  <span className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-brand-red rounded-r" />
                )}
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic Cards Grid */}
        <div 
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[420px]"
        >
          {displayedProjects.map((proj) => (
            <div 
              key={proj.id}
              className="project-card group flex flex-col justify-between rounded-3xl overflow-hidden border border-brand-dark/5 bg-brand-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(155,0,0,0.06)] hover:border-brand-red/20"
            >
              {/* Image & Overlay Badges */}
              <div 
                className="relative aspect-4/3 w-full overflow-hidden"
                data-cursor="view"
              >
                <div className="absolute inset-0 bg-brand-dark/15 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover scale-100 group-hover:scale-108 transition-transform duration-700 pointer-events-none"
                />
              </div>

              {/* Text / Impact Area */}
              <div className="p-6 md:p-8 flex flex-col grow justify-between">
                <div>
                  <span className="font-sans text-[10px] font-extrabold text-brand-red uppercase tracking-widest">
                    {proj.subtitle}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-brand-dark mt-2 tracking-tight group-hover:text-brand-red transition-colors duration-300">
                    {proj.title}
                  </h3>
                </div>

                {/* Impact Row */}
                <div className="border-t border-brand-dark/5 pt-4 mt-6 flex items-center justify-between w-full">
                  <span className="font-sans text-[10px] font-bold text-brand-grey uppercase tracking-wider">
                    Impact
                  </span>
                  <span className="text-xs font-bold text-brand-dark font-display">
                    {proj.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default PillarsHorizontal

