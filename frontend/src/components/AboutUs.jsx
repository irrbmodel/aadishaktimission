import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Helper functions to clean word and check if it should be highlighted
const cleanWord = (word) => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase()
const isHighlighted = (word, list) => {
  const clean = cleanWord(word)
  return list.some(highlight => cleanWord(highlight) === clean)
}

const AboutUs = ({ isLoaded }) => {
  const containerRef = useRef(null)

  const renderParagraph = (text, highlightedWords, paragraphId) => {
    return text.split(/\s+/).map((word, idx) => {
      const isWordHighlighted = isHighlighted(word, highlightedWords)
      return (
        <span 
          key={`${paragraphId}-${idx}`} 
          className={`reveal-word-${paragraphId} inline-block mr-[0.25em] ${isWordHighlighted ? 'text-brand-yellow font-bold' : 'text-brand-dark font-light'}`}
        >
          {word}
        </span>
      )
    })
  }

  const renderP1 = () => {
    const text = "The Aadi Shakti Mission is a holistic initiative dedicated to nurturing the innate potential, creativity, resilience, and leadership qualities within every individual. Rooted in the timeless Indian philosophy of Aadi Shakti the primordial source of energy, wisdom, and creation the Mission recognizes that every human being possesses the power to learn, innovate, serve, and inspire positive change."
    const highlightedWords = [
      "Aadi", "Shakti", "Mission", "holistic", "initiative",
      "innate", "potential", "creativity", "resilience", "leadership", "qualities",
      "philosophy", "primordial", "energy", "wisdom", "creation",
      "power", "learn", "innovate", "serve", "inspire", "positive", "change"
    ]
    return renderParagraph(text, highlightedWords, "p1")
  }

  const renderP2 = () => {
    const text = "The Mission aims to cultivate responsible citizens, ethical leaders, skilled professionals, and compassionate change-makers through education, research, innovation, community engagement, and capacity building. It provides an inclusive platform where individuals from diverse backgrounds can develop their intellectual, emotional, social, and professional capabilities while contributing meaningfully to society."
    const highlightedWords = [
      "cultivate", "responsible", "citizens", "ethical", "leaders", "skilled", "professionals", "compassionate", "change-makers",
      "education", "research", "innovation", "community", "engagement", "capacity", "building",
      "inclusive", "platform", "intellectual", "emotional", "social", "professional", "capabilities", "meaningfully"
    ]
    return renderParagraph(text, highlightedWords, "p2")
  }

  const renderP3 = () => {
    const text = "Guided by the principles of inclusivity, sustainability, excellence, and service, the Aadi Shakti Mission seeks to bridge knowledge with action and individual growth with collective progress."
    const highlightedWords = [
      "principles", "inclusivity", "sustainability", "excellence", "service",
      "Aadi", "Shakti", "Mission", "bridge", "knowledge", "action", "individual", "growth", "collective", "progress"
    ]
    return renderParagraph(text, highlightedWords, "p3")
  }

  // Scroll reveal for the centered Philosophy text layout (Mist Reveal Effect)
  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches

      // Paragraph 1 reveal
      gsap.to(".reveal-word-p1", {
        opacity: 1,
        y: 0,
        ...(isDesktop ? { filter: "blur(0px)" } : {}),
        stagger: 0.008,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".philosophy-p1",
          start: "top 85%",
          end: "bottom 55%",
          scrub: 1.0,
        }
      })

      // Paragraph 2 reveal
      gsap.to(".reveal-word-p2", {
        opacity: 1,
        y: 0,
        ...(isDesktop ? { filter: "blur(0px)" } : {}),
        stagger: 0.008,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".philosophy-p2",
          start: "top 85%",
          end: "bottom 55%",
          scrub: 1.0,
        }
      })

      // Paragraph 3 reveal
      gsap.to(".reveal-word-p3", {
        opacity: 1,
        y: 0,
        ...(isDesktop ? { filter: "blur(0px)" } : {}),
        stagger: 0.012,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".philosophy-p3",
          start: "top 85%",
          end: "bottom 55%",
          scrub: 1.0,
        }
      })

      // Footer ornament fade in
      gsap.fromTo(".philosophy-footer-text",
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".philosophy-footer-text",
            start: "top 95%",
            end: "bottom 85%",
            scrub: 1.0,
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <section 
      id="philosophy"
      ref={containerRef}
      className="relative w-full bg-brand-cream py-20 sm:py-32 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden border-b border-brand-dark/5"
    >
      {/* Subtle grid lines background */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-12 md:px-24">
        <div className="w-px h-full bg-brand-dark/5" />
        <div className="w-px h-full bg-brand-dark/5" />
        <div className="w-px h-full bg-brand-dark/5 hidden md:block" />
      </div>

      {/* Ornament icon at top center */}
      <div className="flex flex-col items-center gap-2 mb-10 select-none relative z-10">
        <div className="w-2.5 h-2.5 bg-brand-red rotate-45 border border-brand-light-grey/60 flex items-center justify-center shadow-xs">
          <div className="w-1.5 h-1.5 bg-brand-cream rounded-full" />
        </div>
        <div className="w-px h-10 bg-linear-to-b from-brand-red/30 to-transparent" />
        <span className="mt-6 font-display text-[10px] font-black uppercase tracking-[0.35em] text-brand-red/80">
          01 / About Us
        </span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-8 md:gap-12">
        
        {/* Paragraph 1 - Large Editorial Serif Reveal */}
        <p className="philosophy-p1 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.45] text-brand-dark tracking-tight text-center max-w-5xl">
          {renderP1()}
        </p>

        {/* Paragraph 2 - Sub-headline Serif Reveal */}
        <p className="philosophy-p2 font-serif italic text-xl sm:text-2xl md:text-2.5xl lg:text-[2rem] text-brand-grey leading-relaxed tracking-tight text-center max-w-3.5xl">
          {renderP2()}
        </p>

        {/* Paragraph 3 - Value Proposition Reveal */}
        <p className="philosophy-p3 font-serif text-lg sm:text-xl md:text-2.5xl lg:text-[1.65rem] text-brand-dark/90 leading-relaxed tracking-tight text-center max-w-3xl">
          {renderP3()}
        </p>

        {/* Footer Ornament */}
        <div className="philosophy-footer-text flex items-center justify-center gap-3 mt-4 relative z-10 w-full">
          <div className="w-8 h-px bg-brand-dark/10" />
          <div className="w-1.5 h-1.5 bg-brand-yellow/60 rotate-45" />
          <div className="w-8 h-px bg-brand-dark/10" />
        </div>

      </div>
    </section>
  )
}

export default AboutUs
