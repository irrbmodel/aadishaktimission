import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Philosophy = () => {
  const containerRef = useRef(null)
  const paragraphRef = useRef(null)
  const sliderRef = useRef(null)

  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [sliderIndex, setSliderIndex] = useState(0)

  const philosophyText = 
    "Aadi Shakti Mission is a committed movement established to enhance and secure the social, economic, and ecological fabric of underserved communities. Combining grassroots activism with professional methodologies, we have spent years executing creative, high-impact initiatives for rural transformation and building honest pathways for human empowerment."

  const images = [
    { src: '/shakti_shiksha.png', title: 'Shakti Shiksha Learning Center' },
    { src: '/arogya_shakti.png', title: 'Arogya Shakti Healthcare Camp' },
    { src: '/swayam_shakti.png', title: 'Swayam Shakti Craft Incubation' },
    { src: '/prakriti_shakti.png', title: 'Prakriti Shakti Afforestation Drive' }
  ]

  // 1. Word Scroll Colorizer Animation
  useEffect(() => {
    const words = paragraphRef.current.querySelectorAll('.reveal-word')
    
    gsap.fromTo(words,
      { color: 'rgba(0, 0, 0, 0.08)' },
      {
        color: '#000000',
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: true,
        }
      }
    )

    // Highlight specific key terms in brand red
    const keywords = ['Aadi Shakti Mission', 'social, economic, and ecological', 'rural transformation', 'human empowerment']
    words.forEach(span => {
      const text = span.textContent.trim()
      if (keywords.some(k => k.includes(text) && text.length > 3)) {
        gsap.to(span, {
          scrollTrigger: {
            trigger: span,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: true,
          },
          color: '#9B0000',
          fontWeight: '700'
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === paragraphRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  // 2. Custom GSAP Slider Transition
  const handlePrev = () => {
    setSliderIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSliderIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const sliderImages = sliderRef.current.querySelectorAll('.slider-img-item')
    gsap.to(sliderImages, {
      opacity: 0,
      scale: 0.95,
      xPercent: -5,
      duration: 0.5,
      ease: 'power2.inOut',
      overwrite: 'auto'
    })
    
    gsap.fromTo(sliderImages[sliderIndex],
      { opacity: 0, scale: 1.05, xPercent: 5 },
      {
        opacity: 1,
        scale: 1,
        xPercent: 0,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      }
    )
  }, [sliderIndex])

  return (
    <section 
      id="philosophy"
      ref={containerRef}
      className="relative w-full py-24 md:py-36 bg-brand-cream overflow-hidden border-b border-brand-dark/5"
    >
      {/* Subtle background blob */}
      <div className="absolute glowing-blob w-[400px] h-[400px] bg-brand-red/5 top-[20%] left-[5%] opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* About Section Header */}
        <div className="flex flex-col items-center mb-16 text-center select-none">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-grey">
            ABOUT US
          </span>
        </div>

        {/* Word Colorizer Paragraph */}
        <div className="max-w-5xl mx-auto mb-24 md:mb-32">
          <p 
            ref={paragraphRef}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] leading-tight tracking-tight text-brand-dark/10"
          >
            {philosophyText.split(' ').map((word, index) => (
              <span 
                key={index} 
                className="reveal-word inline-block mr-2 select-none"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Video & Slider Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-12">
          
          {/* Column 1: Video Card */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <h3 className="font-serif text-3xl sm:text-4xl text-brand-dark max-w-lg leading-tight">
                Evoking <span className="font-sans font-black italic text-brand-red">transformative change</span> that honors contextual integrity.
              </h3>
              <p className="font-sans text-sm md:text-base text-brand-grey leading-relaxed max-w-md font-light">
                We believe standard local community interventions should prioritize durability, micro-independence, and self-reliance. Learn more about our mission below.
              </p>
            </div>

            {/* Video container */}
            <div 
              onClick={() => setIsVideoOpen(true)}
              className="relative aspect-video w-full rounded-3xl overflow-hidden mt-8 border border-brand-dark/5 shadow-2xl cursor-pointer group"
              data-cursor="play"
            >
              <div className="absolute inset-0 bg-brand-dark/30 z-10 group-hover:bg-brand-dark/15 transition-all duration-500" />
              <video 
                src="https://www.septiembrearquitectura.com/images/lib/COCOLIA_Video_Web_6.mov#t=0.01"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-700"
                muted
                playsInline
                loop
                autoPlay
              />
            </div>
          </div>

          {/* Column 2: Swiper/GSAP Image Slider */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-brand-white border border-brand-dark/5 p-6 md:p-8 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
                FIELD WORK SNAPSHOTS
              </span>
              <span className="font-sans text-[10px] font-bold text-brand-red tracking-wider">
                0{sliderIndex + 1} / 0{images.length}
              </span>
            </div>

            {/* Custom Interactive Image Slider viewport */}
            <div 
              ref={sliderRef}
              className="relative w-full aspect-4/5 rounded-2xl overflow-hidden border border-brand-dark/5 flex items-center justify-center select-none"
            >
              {/* Invisible clickable zones for prev/next navigation */}
              <div 
                onClick={handlePrev} 
                className="absolute left-0 top-0 w-1/2 h-full z-20 cursor-pointer"
                data-cursor="prev"
              />
              <div 
                onClick={handleNext} 
                className="absolute right-0 top-0 w-1/2 h-full z-20 cursor-pointer"
                data-cursor="next"
              />

              {/* Slider Images */}
              {images.map((img, idx) => (
                <div 
                  key={img.src}
                  className={`slider-img-item absolute inset-0 w-full h-full ${
                    idx === sliderIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                  }`}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/40 to-transparent z-10 pointer-events-none" />
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20 select-none pointer-events-none">
                    <span className="font-serif text-sm text-brand-cream tracking-tight block">
                      {img.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons for convenience (mobile support) */}
            <div className="flex items-center justify-between mt-6 select-none">
              <button 
                onClick={handlePrev}
                className="px-4 py-2 text-xs font-bold text-brand-dark hover:text-brand-red transition-colors cursor-pointer"
              >
                PREVIOUS
              </button>
              <button 
                onClick={handleNext}
                className="px-4 py-2 text-xs font-bold text-brand-dark hover:text-brand-red transition-colors cursor-pointer"
              >
                NEXT
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Video Lightbox Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 w-full h-full bg-brand-dark/95 z-99999 flex items-center justify-center p-6 md:p-12 animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          {/* Close button */}
          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 text-brand-cream hover:text-brand-red text-sm tracking-widest font-sans font-bold cursor-pointer"
          >
            CLOSE [X]
          </button>
          
          <div 
            className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <video 
              src="https://www.septiembrearquitectura.com/images/lib/COCOLIA_Video_Web_6.mov"
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Philosophy
