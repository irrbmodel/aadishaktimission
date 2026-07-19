import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [modalIndex, setModalIndex] = useState(null)
  const galleryRef = useRef(null)

  const items = [
    {
      id: 1,
      title: 'Shakti Shiksha Camp',
      category: 'education',
      categoryLabel: 'Education',
      image: '/images/children_smiling.jpeg',
      span: 'md:col-span-8 md:row-span-1'
    },
    {
      id: 2,
      title: 'Arogya Diagnostics',
      category: 'health',
      categoryLabel: 'Healthcare',
      image: '/images/maternalnutrition.jpeg',
      span: 'md:col-span-4 md:row-span-1'
    },
    {
      id: 3,
      title: 'Weaving Self-Reliance',
      category: 'livelihood',
      categoryLabel: 'Livelihood',
      image: '/images/book_bank.jpeg',
      span: 'md:col-span-4 md:row-span-1'
    },
    {
      id: 4,
      title: 'Native Afforestation Drive',
      category: 'eco',
      categoryLabel: 'Eco-Conservation',
      image: '/images/outreach_walk.jpeg',
      span: 'md:col-span-8 md:row-span-1'
    },
    {
      id: 5,
      title: 'Village Learning Initiative',
      category: 'education',
      categoryLabel: 'Education',
      image: '/images/girls_studying.jpeg',
      span: 'md:col-span-5 md:row-span-1'
    },
    {
      id: 6,
      title: 'Solarization of Clinics',
      category: 'eco',
      categoryLabel: 'Eco-Conservation',
      image: '/images/summer_camp.jpeg',
      span: 'md:col-span-7 md:row-span-1'
    }
  ]

  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category === activeFilter)

  const handlePrev = () => {
    setModalIndex(prev => (prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length))
  }

  const handleNext = () => {
    setModalIndex(prev => (prev === null ? null : (prev + 1) % filteredItems.length))
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalIndex === null) return
      if (e.key === 'Escape') setModalIndex(null)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    if (modalIndex !== null) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.classList.add('gallery-modal-open')
      document.documentElement.classList.add('gallery-modal-open', 'lenis-stopped')
      if (window.lenis) window.lenis.stop()

      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.classList.remove('gallery-modal-open')
      document.documentElement.classList.remove('gallery-modal-open', 'lenis-stopped')
      if (window.lenis) window.lenis.start()
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.classList.remove('gallery-modal-open')
      document.documentElement.classList.remove('gallery-modal-open', 'lenis-stopped')
      if (window.lenis) window.lenis.start()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalIndex, filteredItems.length])

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
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-brand-skyblue">
            06 / Visual Archive
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
                onClick={() => {
                  setActiveFilter(filter.id)
                  setModalIndex(null)
                }}
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
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => setModalIndex(index)}
              data-cursor="view"
              className={`gallery-card relative overflow-hidden rounded-[28px] group shadow-[0_18px_60px_rgba(0,0,0,0.06)] border border-brand-dark/5 hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer ${item.span}`}
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
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-black text-white mt-2 uppercase">
                    {item.title}
                  </h3>
                </div>

                {/* Hover Arrow: White arrow inside white border on hover */}
                <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white md:scale-0 group-hover:scale-100 group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white shadow-lg transition-all duration-300">
                  <svg className="w-4 h-4 text-white transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Carousel (Portaled to document.body) */}
      {modalIndex !== null && filteredItems[modalIndex] && createPortal(
        <div 
          className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-full h-full min-h-screen z-999999 bg-black backdrop-blur-3xl flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fadeIn overscroll-none touch-none"
          onClick={() => setModalIndex(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Header Controls */}
          <div 
            className="flex items-center justify-between w-full max-w-7xl mx-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1.5 rounded-full border border-brand-orange/30">
                {filteredItems[modalIndex].categoryLabel}
              </span>
              <span className="text-xs font-bold text-white/60 tracking-wider">
                {modalIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              onClick={() => setModalIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-orange text-white border border-white/20 flex items-center justify-center transition-all duration-300 group"
              title="Close (Esc)"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Content Area */}
          <div 
            className="relative flex-1 flex items-center justify-center my-4 max-w-7xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-brand-orange text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 group hover:scale-110 shadow-2xl"
              title="Previous Photo (Left Arrow)"
            >
              <svg className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Active Image View */}
            <div className="relative max-w-5xl w-full max-h-[68vh] sm:max-h-[72vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-2 sm:p-4 shadow-2xl">
              <img 
                src={filteredItems[modalIndex].image} 
                alt={filteredItems[modalIndex].title}
                className="max-h-[60vh] sm:max-h-[64vh] w-auto max-w-full object-contain rounded-lg transition-all duration-500"
              />
              <div className="mt-3 text-center">
                <h3 className="text-lg sm:text-2xl font-display font-black text-white uppercase tracking-wide">
                  {filteredItems[modalIndex].title}
                </h3>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-brand-orange text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 group hover:scale-110 shadow-2xl"
              title="Next Photo (Right Arrow)"
            >
              <svg className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div 
            className="w-full max-w-4xl mx-auto flex items-center justify-center gap-3 overflow-x-auto py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setModalIndex(idx)}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                  modalIndex === idx 
                    ? 'border-brand-orange scale-105 shadow-lg shadow-brand-orange/30' 
                    : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
                }`}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}

export default Gallery
