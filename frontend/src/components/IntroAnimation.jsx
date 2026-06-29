import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IntroAnimation = ({ onStartTransition, onComplete }) => {
  const [phase, setPhase] = useState(4) // Start immediately at the reveal phase
  
  const onStartTransitionRef = useRef(onStartTransition)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onStartTransitionRef.current = onStartTransition
    onCompleteRef.current = onComplete
  }, [onStartTransition, onComplete])
  
  useEffect(() => {
    // Start zoom transition after 2.5 seconds
    const t4 = setTimeout(() => {
      setPhase(5)
      if (onStartTransitionRef.current) onStartTransitionRef.current()
    }, 2500) 
    
    // Unmount completely after 4.2 seconds to allow the staggered slide-down
    const t5 = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current()
    }, 4200) 

    return () => {
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full z-99999 overflow-hidden flex flex-col justify-center items-center select-none pointer-events-auto">
      
      {/* 5 Staggered Vertical Panels (from PageTransition) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-full w-[20.2%] bg-brand-dark border-r border-brand-cream/20 flex flex-col justify-end"
          style={{ left: `${i * 20}%` }}
          initial={{ y: '0%' }}
          animate={phase === 5 ? { y: '100%' } : { y: '0%' }}
          transition={{
            duration: 0.75,
            ease: [0.7, 0, 0.25, 1], // Equivalent to power4.inOut
            delay: phase === 5 ? (i * 0.08) + 0.6 : 0 // Wait for logo to fade before sliding down
          }}
        >
          {/* Gold accent line */}
          <div className="w-full h-[4px] bg-linear-to-r from-brand-red via-[#d97706] to-brand-red opacity-80" />
        </motion.div>
      ))}

      {/* Brand Reveal & Typography Gateway Zoom */}
      <AnimatePresence>
        {phase >= 4 && (
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center">
              
              {/* Brand Title */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={phase === 5 ? {
                  scale: 1.03, 
                  opacity: 0, 
                  y: -10
                } : {
                  opacity: 1,
                  scale: 1
                }}
                transition={phase === 5 ? {
                  duration: 0.85,
                  ease: [0.7, 0, 0.25, 1]
                } : {
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="font-serif font-black text-6xl md:text-8xl text-brand-cream tracking-wide leading-none text-center select-none transform-gpu"
              >
                Aadi Shakti
              </motion.h1>

              {/* Logo (Above Title) */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.85 }}
                animate={phase === 5 ? {
                  opacity: 0,
                  y: -70,
                  scale: 0.8
                } : {
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                transition={phase === 5 ? {
                  duration: 0.4,
                  ease: 'easeIn'
                } : {
                  duration: 1.2,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute bottom-[calc(100%+2rem)] flex flex-col items-center"
              >
                {/* Orbit Ring */}
                <div className="relative flex items-center justify-center w-36 h-36 md:w-48 md:h-48">
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="47"
                      fill="none"
                      stroke="url(#orbit-grad)"
                      strokeWidth="1.2"
                      strokeDasharray="4 6 12 6"
                    />
                    <defs>
                      <linearGradient id="orbit-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFF8D6" />
                        <stop offset="50%" stopColor="#6fb9d9" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#FFF8D6" />
                      </linearGradient>
                    </defs>
                  </motion.svg>

                  {/* Logo Image */}
                  <div className="w-[86%] h-[86%] rounded-full overflow-hidden border-2 border-brand-cream/15 shadow-[0_0_35px_rgba(255,248,214,0.15)] bg-brand-cream flex items-center justify-center">
                    <img 
                      src="/logo.jpg" 
                      alt="Aadi Shakti Logo" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </motion.div>

              {/* Tagline / Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={phase === 5 ? {
                  opacity: 0,
                  y: -10
                } : {
                  opacity: 0.8,
                  y: 0
                }}
                transition={phase === 5 ? {
                  duration: 0.4,
                  ease: 'easeIn'
                } : {
                  duration: 1.2,
                  delay: 0.35,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute top-[calc(100%+2rem)] flex flex-col items-center text-center w-80 md:w-[480px]"
              >
                <p className="font-sans text-[12px] md:text-[14px] font-black tracking-[0.4em] text-white uppercase mb-2">
                  mission
                </p>
                <blockquote className="font-serif italic text-sm md:text-base text-brand-cream/90 font-bold leading-relaxed">
                  &ldquo;Let me be your helping hand.&rdquo;
                </blockquote>
              </motion.div>

            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default IntroAnimation
