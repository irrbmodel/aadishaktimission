import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const containerRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const items = [
    {
      id: 1,
      title: 'Shakti Shiksha Camp',
      category: 'education',
      image: '/images/children_smiling.jpeg',
      span: 'md:col-span-8 md:row-span-1'
    },
    {
      id: 2,
      title: 'Arogya Diagnostics',
      category: 'health',
      image: '/images/maternalnutrition.jpeg',
      span: 'md:col-span-4 md:row-span-1'
    },
    {
      id: 3,
      title: 'Weaving Self-Reliance',
      category: 'livelihood',
      image: '/images/book_bank.jpeg',
      span: 'md:col-span-4 md:row-span-1'
    },
    {
      id: 4,
      title: 'Native Afforestation Drive',
      category: 'eco',
      image: '/images/outreach_walk.jpeg',
      span: 'md:col-span-8 md:row-span-1'
    },
    {
      id: 5,
      title: 'Village Learning Initiative',
      category: 'education',
      image: '/images/girls_studying.jpeg',
      span: 'md:col-span-5 md:row-span-1'
    },
    {
      id: 6,
      title: 'Solarization of Clinics',
      category: 'eco',
      image: '/images/summer_camp.jpeg',
      span: 'md:col-span-7 md:row-span-1'
    }
  ]

  useEffect(() => {
    // Scroll velocity skewing effect
    let proxy = { skew: 0 }
    const skewSetter = gsap.quickTo('.gallery-item-inner', 'skewY', { duration: 0.3, ease: 'power3' })
    const clamp = gsap.utils.clamp(-6, 6) // limit skew to be subtle and aesthetic

    const skewTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -450)
        // only apply if it's larger than the current skew to prevent jitters
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto',
            onUpdate: () => skewSetter(proxy.skew)
          })
        }
      }
    })

    return () => {
      skewTrigger.kill()
    }
  }, [activeFilter]) // Recreate trigger when grid items re-render from filter change

  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category === activeFilter)

  return (
    <section 
      id="gallery"
      ref={containerRef}
      className="relative w-full min-h-screen bg-brand-dark border-b border-white/5 flex flex-col pt-32 pb-48"
    >
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-[450px] h-[450px] bg-brand-orange bottom-[20%] right-[-10%] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
            07 / Visual Archive
          </span>
          <span className="font-serif italic text-xs text-white/50">
            Shakti in Action
          </span>
        </div>
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">
              Our Visual Archive
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-2">
              SHAKTI IN ACTION
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 bg-white/5 p-1 border border-white/5 rounded-full overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'education', label: 'Education' },
              { id: 'health', label: 'Healthcare' },
              { id: 'livelihood', label: 'Livelihood' },
              { id: 'eco', label: 'Eco-Conservation' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeFilter === filter.id 
                    ? 'bg-white text-black font-black shadow-md shadow-white/20' 
                    : 'text-white hover:bg-white/10'
                }`}
                data-cursor="pointer"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[60vh] md:h-[62vh] w-full">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className={`gallery-item relative overflow-hidden rounded-3xl border border-white/10 group ${item.span}`}
            >
              {/* Inner container to apply the velocity skewing */}
              <div 
                className="gallery-item-inner w-full h-full relative"
                data-cursor="view"
              >
                {/* Background Dim Shadow overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-brand-indigo/80 via-transparent to-transparent opacity-60 group-hover:opacity-85 z-10 transition-opacity duration-300 pointer-events-none" />

                {/* Cover Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />

                {/* Text Details overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 md:translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-end justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-black text-white mt-1 uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white md:scale-0 group-hover:scale-100 group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-brand-dark transition-all duration-300">
                    <span className="text-xs font-black">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Gallery
