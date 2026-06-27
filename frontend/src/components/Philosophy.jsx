import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Philosophy = ({ isLoaded }) => {
  const containerRef = useRef(null)
  const paragraphRef = useRef(null)
  const sliderRef = useRef(null)
  const subHeadingRef = useRef(null)
  const bgDivRef = useRef(null)
  const videoContainerRef = useRef(null)
  const descTextRef = useRef(null)

  const [sliderIndex, setSliderIndex] = useState(0)

  const philosophyText = 
    "Aadi Shakti Mission is a committed movement established to enhance and secure the social, economic, and ecological fabric of underserved communities. Combining grassroots activism with professional methodologies, we have spent years executing creative, high-impact initiatives for rural transformation and building honest pathways for human empowerment."

  const images = [
    { src: '/images/book_bank.jpeg', title: "National association for parents and Student's Rights: A Book Bank by Aadhi Shaki Mission" },
    { src: '/images/sus2.jpeg', title: "Nation Equality: Realizing Women's Rights" },
    { src: '/images/outreach_walk.jpeg', title: 'Community Outreach Walk' },
    { src: '/images/women_empowerment_class.jpeg', title: 'Nanhe Kadam, Badi Udaan' },
    { src: '/images/youth_group.jpeg', title: 'Youth against Corruption' },
    { src: '/images/carousel6.jpeg', title: "A news letter on :National association for parents and Student's Rights: A Book Bank by Aadhi Shaki Mission" }
  ]

  // 1. Word Scroll Colorizer & Subheading Slide-Up Animation
  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      const words = paragraphRef.current.querySelectorAll('.reveal-word')
      const keywords = ['Aadi Shakti Mission', 'social, economic, and ecological', 'rural transformation', 'human empowerment']

      gsap.fromTo(words,
        { 
          color: 'rgba(0, 0, 0, 0.08)',
          fontWeight: '400'
        },
        {
          color: (index, target) => {
            const text = target.textContent.trim()
            if (keywords.some(k => k.includes(text) && text.length > 3)) {
              return '#9B0000'
            }
            return '#000000'
          },
          fontWeight: (index, target) => {
            const text = target.textContent.trim()
            if (keywords.some(k => k.includes(text) && text.length > 3)) {
              return '700'
            }
            return '400'
          },
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

      // Subheading word slide-up reveal
      const subHeading = subHeadingRef.current
      const subWords = subHeading.querySelectorAll('.reveal-word-up')
      gsap.fromTo(subWords,
        { yPercent: 100 },
        {
          yPercent: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subHeading,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Background Parallax Divider Card
      gsap.fromTo(bgDivRef.current,
        { y: -70 },
        {
          y: 70,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      )

      // Video Container Floating Parallax
      gsap.fromTo(videoContainerRef.current,
        { y: 50 },
        {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      )

      // Description text slide-up reveal
      gsap.fromTo(descTextRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descTextRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

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

      {/* Background Parallax Divider Card (Septiembre style) */}
      <div 
        ref={bgDivRef}
        className="absolute left-0 right-0 w-full h-[50%] bg-brand-white/55 border-y border-brand-dark/5 shadow-inner z-0"
        style={{ top: '35%' }}
      />

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

        {/* Top Section: About Content (Text + Big Photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 
              ref={subHeadingRef}
              className="font-serif text-3xl sm:text-4xl text-brand-dark max-w-lg leading-tight"
            >
              {"Evoking transformative change that honors contextual integrity.".split(' ').map((word, idx) => {
                const cleaned = word.replace(/[^a-zA-Z]/g, '')
                if (cleaned === 'transformative' || cleaned === 'change') {
                  return (
                    <span key={idx} className="inline-block overflow-hidden pb-1 pr-2 mr-1">
                      <span className="reveal-word-up inline-block font-sans font-black italic text-brand-red pr-2">{word}</span>
                    </span>
                  )
                }
                return (
                  <span key={idx} className="inline-block overflow-hidden pb-1 mr-2">
                    <span className="reveal-word-up inline-block">{word}</span>
                  </span>
                )
              })}
            </h3>
            <p 
              ref={descTextRef}
              className="font-sans text-sm md:text-base text-brand-grey leading-relaxed max-w-md font-light"
            >
              We believe standard local community interventions should prioritize durability, micro-independence, and self-reliance. Learn more about our mission below.
            </p>
          </div>

          {/* Right Column: Big Photo */}
          <div 
            ref={videoContainerRef}
            className="lg:col-span-6 relative aspect-video w-full rounded-3xl overflow-hidden border border-brand-dark/5 shadow-2xl group"
          >
            <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-brand-dark/5 transition-all duration-500" />
            <img 
              src="/images/banner.jpeg" 
              alt="Aadi Shakti Mission" 
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700"
            />
          </div>
        </div>

        {/* Bottom Section: Horizontal Swiper/GSAP Image Slider */}
        <div className="mt-16 bg-brand-white border border-brand-dark/5 p-8 md:p-12 rounded-[32px] shadow-2xl border-fine transform-gpu">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Custom Interactive Image Slider viewport */}
            <div 
              ref={sliderRef}
              className="lg:col-span-8 relative w-full aspect-video sm:aspect-16/10 rounded-[20px] overflow-hidden border border-brand-dark/5 flex items-center justify-center select-none"
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
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/30 to-transparent z-10 pointer-events-none" />
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              ))}
            </div>

            {/* Sidebar Control Panel */}
            <div className="lg:col-span-4 flex flex-col justify-between py-2">
              <div className="flex flex-col gap-6">
                <div>
                  <span className="font-sans text-[10px] font-black tracking-[0.25em] text-brand-grey uppercase block mb-1">
                    FIELD WORK SNAPSHOTS
                  </span>
                  <div className="flex items-center justify-between border-b border-brand-dark/5 pb-4 mt-2">
                    <span className="font-display text-xs font-black text-brand-red tracking-wider">
                      0{sliderIndex + 1} &mdash; 0{images.length}
                    </span>
                    
                    {/* Minimal Dots Progress Indicators */}
                    <div className="flex gap-1.5 select-none">
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === sliderIndex ? 'w-6 bg-brand-red' : 'w-1.5 bg-brand-dark/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-sans text-[9px] font-black tracking-[0.25em] text-brand-grey/65 uppercase block mb-3">
                    ACTIVE PROJECT
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-brand-dark tracking-tight leading-relaxed max-w-sm">
                    {images[sliderIndex].title}
                  </h4>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-4 mt-8 select-none">
                <button 
                  onClick={handlePrev}
                  className="px-5 py-3 border border-brand-dark/10 rounded-full font-sans text-[10px] font-bold tracking-widest uppercase text-brand-dark hover:bg-brand-dark hover:text-brand-white transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </button>
                <button 
                  onClick={handleNext}
                  className="px-5 py-3 border border-brand-dark/10 rounded-full font-sans text-[10px] font-bold tracking-widest uppercase text-brand-dark hover:bg-brand-dark hover:text-brand-white transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  Next
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default Philosophy
