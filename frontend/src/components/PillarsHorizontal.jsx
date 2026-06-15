import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PillarsHorizontal = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const contentRef = useRef(null)

  const categories = [
    { id: 'all', title: 'all programs', count: 30, desc: 'A holistic overview of our direct interventions addressing female literacy, diagnostic healthcare, vocational training, and environmental canopy protection across rural districts.' },
    { id: 'education', title: 'primary education', count: 12, desc: 'Creating secure, standard learning centers, providing merit scholarships, and donating computer resources to secure primary education pathways for rural girls.' },
    { id: 'health', title: 'healthcare wings', count: 8, desc: 'Conducting regular local medical checkups, diagnostic camps, nutritional audits, clean water filter installations, and maternal care outreach campaigns.' },
    { id: 'livelihood', title: 'skill incubation', count: 6, desc: 'Facilitating hands-on skill training in local tailoring, organic weaving, and digital literacy, paired with interest-free micro-grants for enterprise creation.' },
    { id: 'conservation', title: 'eco-conservation', count: 4, desc: 'Launching afforestation drives to plant native tree species, introducing bio-waste setups, and retrofitting local community centers with solar power grids.' }
  ]

  const projects = [
    { id: 1, title: 'Village Learning Hubs', category: 'education', subtitle: 'Primary Literacy', image: '/shakti_shiksha.png' },
    { id: 2, title: 'Mobile Clinic Vans', category: 'health', subtitle: 'Diagnostic Camps', image: '/arogya_shakti.png' },
    { id: 3, title: 'Weaving Autonomy Labs', category: 'livelihood', subtitle: 'Vocational Training', image: '/swayam_shakti.png' },
    { id: 4, title: 'Native Canopy Campaigns', category: 'conservation', subtitle: 'Afforestation', image: '/prakriti_shakti.png' },
    { id: 5, title: 'Digital Shakti Hubs', category: 'education', subtitle: 'Computer Literacy', image: '/swayam_shakti.png' },
    { id: 6, title: 'Maternal Nutrition Camps', category: 'health', subtitle: 'Maternal Diagnostics', image: '/arogya_shakti.png' }
  ]

  const activeInfo = categories.find(cat => cat.id === activeCategory)
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(proj => proj.category === activeCategory)

  // GSAP transition when category changes
  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 15 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        ease: 'power2.out',
        onComplete: () => {
          ScrollTrigger.refresh()
        }
      }
    )
  }, [activeCategory])

  // Refresh on initial layout settlement
  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section 
      id="pillars" 
      className="relative w-full py-24 md:py-36 bg-brand-cream border-b border-brand-dark/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Category section subtitle */}
        <div className="mb-16 select-none">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-grey block">
            OUR DEPLOYMENTS
          </span>
        </div>

        {/* Categories Tab Selector with numbers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Big Category Header */}
          <div className="lg:col-span-8 flex flex-col items-start gap-4">
            <h2 className="font-serif text-5xl md:text-7xl text-brand-dark tracking-tight uppercase leading-none">
              {activeInfo.title}
              <span className="align-super text-xs font-sans text-brand-red ml-3">
                {activeInfo.count}
              </span>
            </h2>
            <p className="font-sans text-sm md:text-base text-brand-grey/90 leading-relaxed max-w-xl font-light mt-4">
              {activeInfo.desc}
            </p>
          </div>

          {/* Right Column: Tab Trigger Buttons */}
          <div className="lg:col-span-4 flex flex-col items-start gap-2 border-l border-brand-dark/10 pl-6 md:pl-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-sans text-xs font-bold tracking-wider uppercase py-2 cursor-pointer transition-all duration-300 relative group flex items-center justify-between w-full ${
                  activeCategory === cat.id ? 'text-brand-red' : 'text-brand-dark hover:text-brand-red'
                }`}
                data-cursor="pointer"
              >
                <span>{cat.title}</span>
                <span className="text-[10px] text-brand-grey font-normal font-display">({cat.count})</span>
                {/* Underline anchor */}
                <span className={`absolute bottom-0 left-0 h-px bg-brand-red transition-all duration-300 ${
                  activeCategory === cat.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic Cards Grid */}
        <div 
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="group flex flex-col rounded-3xl overflow-hidden border border-brand-dark/5 bg-brand-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-brand-red/25"
            >
              {/* Cover image area */}
              <div 
                className="relative aspect-4/3 w-full overflow-hidden"
                data-cursor="view"
              >
                <div className="absolute inset-0 bg-brand-dark/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 pointer-events-none"
                />
              </div>

              {/* Text Area */}
              <div className="p-6 md:p-8 flex flex-col items-start justify-between">
                <span className="font-sans text-[10px] font-bold text-brand-red uppercase tracking-widest">
                  {proj.subtitle}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-brand-dark mt-2 tracking-tight group-hover:text-brand-red transition-colors">
                  {proj.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default PillarsHorizontal
