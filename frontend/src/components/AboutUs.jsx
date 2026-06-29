import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutUs = ({ isLoaded }) => {
  const containerRef = useRef(null)

  const renderP1 = () => {
    const text = "Aadi Shakti Mission is a committed movement established to enhance and secure the social, economic, and ecological fabric of underserved communities. Combining grassroots activism with professional methodologies, we spent years executing high-impact initiatives for rural transformation and human empowerment."
    const redWords = ["social,", "economic,", "ecological", "rural", "transformation", "human", "empowerment."]
    
    return text.split(' ').map((word, idx) => {
      const isRed = redWords.includes(word)
      return (
        <span 
          key={`p1-${idx}`} 
          className={`reveal-word-p1 inline-block mr-[0.25em] will-change-[transform,opacity,filter] ${isRed ? 'text-brand-red font-bold' : 'text-brand-dark font-light'}`}
          style={{ opacity: 0.08, transform: "translateY(16px)", filter: "blur(4px)" }}
        >
          {word}
        </span>
      )
    })
  }

  const renderP2 = () => {
    const text = "Evoking transformative change that honors contextual integrity."
    const redWords = ["transformative", "change"]
    
    return text.split(' ').map((word, idx) => {
      const isRed = redWords.includes(word)
      return (
        <span 
          key={`p2-${idx}`} 
          className={`reveal-word-p2 inline-block mr-[0.25em] will-change-[transform,opacity,filter] ${isRed ? 'text-brand-red font-bold' : 'text-brand-dark font-light'}`}
          style={{ opacity: 0.08, transform: "translateY(16px)", filter: "blur(4px)" }}
        >
          {word}
        </span>
      )
    })
  }

  // 1. Scroll reveal for the centered Philosophy text layout (Mist Reveal Effect)
  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      // Timeline for paragraph 1 and paragraph 2 word reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 1.2, // Smooth scrubbing
        }
      })

      // Stagger paragraph 1 words - smoothly fading in, sliding up and unblurring
      tl.to(".reveal-word-p1", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.015,
        ease: "power2.out"
      })

      // Stagger paragraph 2 words after paragraph 1 finishes
      tl.to(".reveal-word-p2", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.025,
        ease: "power2.out"
      }, "+=0.05")

      // Fade in the footer small text at the end
      tl.fromTo(".philosophy-footer-text",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "+=0.05"
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <section 
      id="philosophy"
      ref={containerRef}
      className="relative w-full bg-brand-cream py-36 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden border-b border-brand-dark/5"
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
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-12 md:gap-14">
        
        {/* Paragraph 1 - Large Editorial Serif Reveal */}
        <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] leading-[1.45] text-brand-dark tracking-tight text-center max-w-5xl">
          {renderP1()}
        </p>

        {/* Paragraph 2 - Sub-headline Serif Reveal */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3.5xl text-brand-dark leading-relaxed tracking-tight text-center max-w-3xl">
          {renderP2()}
        </p>

        {/* Paragraph 3 - Small Sans-Serif Muted Footer */}
        <p className="philosophy-footer-text font-sans text-xs sm:text-sm text-brand-grey/60 leading-relaxed font-light text-center max-w-2xl mt-4 select-none">
          We believe standard local community interventions should prioritize durability, micro-independence, and self-reliance. Learn more about our mission below.
        </p>

      </div>
    </section>
  )
}

export default AboutUs
