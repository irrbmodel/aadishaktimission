import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const galleryRef = useRef(null)

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

  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category === activeFilter)

  useEffect(() => {
    if (!galleryRef.current) return

    const cards = galleryRef.current.querySelectorAll('.gallery-card')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
        }
      )
    }, galleryRef)

    return () => ctx.revert()
  }, [activeFilter])

  return (
    <section 
      id="gallery"
      ref={galleryRef}
      className="relative z-10 w-full min-h-screen bg-brand-cream flex flex-col pt-32 pb-32"
    >
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-112.5 h-112.5 bg-brand-orange bottom-[20%] right-[-10%] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="w-full flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-6">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-brand-red/80">
            07 / Visual Archive
          </span>
          <span className="font-serif italic text-xs text-brand-dark/50">
            Shakti in Action
          </span>
        </div>
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">
              Our Visual Archive
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-dark uppercase mt-2">
              SHAKTI IN ACTION
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 bg-brand-dark/5 p-1 border border-brand-dark/5 rounded-full overflow-x-auto max-w-full">
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
                    ? 'bg-brand-dark text-brand-cream font-black shadow-md shadow-brand-dark/20' 
                    : 'text-brand-dark hover:bg-brand-dark/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px] md:auto-rows-[450px] w-full">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className={`gallery-card relative overflow-hidden rounded-[28px] group shadow-[0_18px_60px_rgba(0,0,0,0.06)] border border-brand-dark/5 hover:shadow-[0_24px_70px_rgba(0,0,0,0.1)] transition-all duration-500 ${item.span}`}
            >
              {/* Background Dim Shadow overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-80 z-10 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute inset-0 rounded-[28px] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Cover Image */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-brand-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Text Details overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 md:translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-end justify-between">
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
          ))}
        </div>

      </div>
    </section>
  )
}

export default Gallery
