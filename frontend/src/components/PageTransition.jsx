import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const PageTransition = ({ isActive, onMidpoint, onComplete }) => {
  const overlayRef = useRef(null)
  const panelsRef = useRef([])
  const edgesRef = useRef([])
  const logoRef = useRef(null)
  const timelineRef = useRef(null)

  const onMidpointRef = useRef(onMidpoint)
  const onCompleteRef = useRef(onComplete)

  // Sync callbacks to mutable refs to prevent timing / re-render glitches
  useEffect(() => {
    onMidpointRef.current = onMidpoint
    onCompleteRef.current = onComplete
  }, [onMidpoint, onComplete])

  useEffect(() => {
    // If the transition is triggered active
    if (isActive) {
      // 1. Lock scrolling (Lenis and standard CSS)
      document.documentElement.classList.add('lenis-stopped')
      document.body.style.overflow = 'hidden'
      
      // Make overlay container interactive
      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = 'auto'
      }

      // 2. Kill any active transition timelines
      if (timelineRef.current) {
        timelineRef.current.kill()
      }

      // 3. Define the GSAP Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Re-enable scrolling when completely done
          document.documentElement.classList.remove('lenis-stopped')
          document.body.style.overflow = ''
          window.lenis?.start()
          
          if (overlayRef.current) {
            overlayRef.current.style.pointerEvents = 'none'
          }
          
          if (onCompleteRef.current) onCompleteRef.current()
        }
      })

      timelineRef.current = tl

      // Make sure panels start at 100% y
      gsap.set(panelsRef.current, { y: '100%' })
      gsap.set(edgesRef.current, { height: '8px' })
      gsap.set(logoRef.current, { opacity: 0, scale: 0.95, y: 15 })

      // Phase 1: Slide panels up in staggered sequence
      tl.to(panelsRef.current, {
        y: '0%',
        duration: 0.75,
        ease: 'power4.inOut',
        stagger: 0.08
      })
      tl.to(edgesRef.current, {
        height: '16px',
        duration: 0.75,
        ease: 'power4.inOut',
        stagger: 0.08
      }, '<')

      // Phase 2: Fade in & scale the brand reveal elements
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out'
      }, '-=0.15') // Start slightly before the last panel finishes settling

      // Shimmer hold (aesthetic pause while screen is fully black)
      tl.to(logoRef.current, {
        opacity: 0,
        scale: 1.03,
        y: -10,
        duration: 0.5,
        delay: 0.65, // Let the user read and admire the design
        ease: 'power3.in',
        onComplete: () => {
          // MIDPOINT: Swap page view & reset scroll positions
          if (onMidpointRef.current) onMidpointRef.current()
        }
      })

      // Phase 3: Slide panels up and out of the viewport
      tl.to(panelsRef.current, {
        y: '-100%',
        duration: 0.75,
        ease: 'power4.inOut',
        stagger: 0.08
      })
      tl.to(edgesRef.current, {
        height: '24px',
        duration: 0.75,
        ease: 'power4.inOut',
        stagger: 0.08
      }, '<')

      // Post-transition cleanup: Reset panel positions silently
      tl.set(panelsRef.current, {
        y: '100%'
      })
      tl.set(edgesRef.current, {
        height: '8px'
      })

    } else {
      // Ensure scrolling is unlocked if inactive
      document.documentElement.classList.remove('lenis-stopped')
      document.body.style.overflow = ''
      window.lenis?.start()
      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = 'none'
      }
    }

    return () => {
      // Cleanup: always ensure scroll is unlocked on component unmount
      document.documentElement.classList.remove('lenis-stopped')
      document.body.style.overflow = ''
      window.lenis?.start()
    }
  }, [isActive])

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 w-full h-full z-9999 pointer-events-none select-none overflow-hidden"
    >
      {/* 5 Staggered Vertical Panels */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (panelsRef.current[i] = el)}
          className="absolute top-0 h-full w-[20.2%] bg-white border-r border-brand-dark/10 flex flex-col justify-end"
          style={{
            left: `${i * 20}%`,
            transform: 'translateY(100%)',
            willChange: 'transform'
          }}
        >
          {/* Sky-blue, Yellow & Red premium accent line at the bottom of each panel */}
          <div
            ref={(el) => (edgesRef.current[i] = el)}
            className="w-full bg-linear-to-r from-brand-skyblue via-[#facc15] to-[#dc2626]"
            style={{ height: '8px' }}
          />
        </div>
      ))}

      {/* Floating Center Brand typography and visual graphic */}
      <div 
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 opacity-0 transform-gpu"
      >
        {/* Subtle glowing halo ring behind logo */}
        <div className="absolute w-48 h-48 rounded-full bg-brand-skyblue/10 blur-xl pointer-events-none animate-pulse" />

        {/* Circular Logo Outline */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand-dark/15 mb-6 shadow-2xl flex items-center justify-center bg-brand-cream">
          <img
            src="/logo.jpg"
            alt="Aadi Shakti Logo"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Brand Name */}
        <h2 className="font-serif text-5xl md:text-6xl text-brand-dark tracking-[0.06em] font-bold mb-2 shadow-xs">
          Aadi Shakti
        </h2>

        {/* Subtitle */}
        <span className="font-sans text-[12px] md:text-[14px] font-black tracking-[0.4em] text-brand-dark uppercase">
          mission
        </span>
      </div>
    </div>
  )
}

export default PageTransition
