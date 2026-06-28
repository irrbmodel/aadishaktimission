import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IntroAnimation = ({ onStartTransition, onComplete }) => {
  const canvasRef = useRef(null)
  // Phase timeline:
  // 1: Seeker hand enters & settles (0.0s – 1.6s)
  // 2: Divine hand enters & reaches seeker (1.6s – 3.2s)
  // 3: Clasp, Touch & Lift vertical glide, Spark dispersion, Hands fade (3.2s – 4.2s)
  // 4: Sacred Logo & Typography Reveal (4.2s – 5.8s)
  // 5: Gateway Zoom Transition & background fade-out (5.8s – 6.6s)
  const [phase, setPhase] = useState(1)
  
  const onStartTransitionRef = useRef(onStartTransition)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onStartTransitionRef.current = onStartTransition
    onCompleteRef.current = onComplete
  }, [onStartTransition, onComplete])
  
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 1600) // Seeker settles, Divine starts
    const t2 = setTimeout(() => setPhase(3), 3200) // Contact, Clasp & Ripple triggers
    const t3 = setTimeout(() => setPhase(4), 4200) // Reveal logo & name
    const t4 = setTimeout(() => {
      setPhase(5)
      if (onStartTransitionRef.current) onStartTransitionRef.current() // Fade homepage in
    }, 5800) 
    const t5 = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current() // Unmount intro overlay
    }, 6600) 

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [])

  // Canvas particle stardust & contact ripple physics
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    // 1. Stardust Particles: Slow breathing wave-like drift
    const stardustCount = 80
    const stardust = []
    for (let i = 0; i < stardustCount; i++) {
      stardust.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.08 + 0.02,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.005,
        radius: Math.random() * 1.3 + 0.3,
        alpha: Math.random() * 0.45 + 0.05,
        color: i % 3 === 0 ? '#ffeebf' : i % 3 === 1 ? '#a8ecff' : '#ffffff'
      })
    }

    // 2. Ripple & Sparks
    let rippleRadius = 0
    let rippleMaxRadius = Math.max(canvas.width, canvas.height) * 1.4
    let rippleActive = false
    let rippleAlpha = 1.0
    const sparks = []
    const sparkCount = 90

    const triggerRipple = () => {
      rippleActive = true
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 2
        sparks.push({
          x: centerX,
          y: centerY,
          angle: angle,
          angleDirection: Math.random() > 0.5 ? 1 : -1,
          angleSpeed: Math.random() * 0.03 + 0.015,
          speed: speed,
          radius: Math.random() * 2.2 + 0.4,
          alpha: 1.0,
          decay: Math.random() * 0.012 + 0.007,
          color: Math.random() > 0.45 ? '#ffeebf' : '#6fb9d9'
        })
      }
    }

    if (phase === 3) {
      triggerRipple()
    }

    let lastTime = Date.now()
    // 3. Animation Loop
    const render = () => {
      const now = Date.now()
      const dt = Math.min(3, (now - lastTime) / 16.666) // normalized to 60fps (1 unit = 16.67ms)
      lastTime = now

      // Clear with absolute black
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw Stardust with breathing twinkle and slow drift
      stardust.forEach(p => {
        // Slow drift
        p.angle += p.angleSpeed * dt
        p.x += Math.cos(p.angle) * p.speed * dt
        p.y += Math.sin(p.angle) * p.speed * dt

        // Wrap around screen edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        const time = now * 0.0015
        const twinkle = Math.sin(time + p.x * 0.05 + p.y * 0.05) * 0.2
        ctx.globalAlpha = Math.max(0.02, Math.min(0.8, p.alpha + twinkle))
        ctx.fill()
      })

      // Update & Draw Ripple
      if (rippleActive) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        
        rippleRadius += 14 * dt // speed of wave

        if (rippleRadius < rippleMaxRadius) {
          rippleAlpha = Math.max(0, 1 - (rippleRadius / rippleMaxRadius))

          ctx.beginPath()
          ctx.arc(centerX, centerY, rippleRadius, 0, Math.PI * 2)
          
          // Classy multi-color volumetric gradient stroke
          const grad = ctx.createRadialGradient(
            centerX, centerY, Math.max(0, rippleRadius - 30),
            centerX, centerY, rippleRadius + 30
          )
          grad.addColorStop(0, 'rgba(111, 185, 217, 0)')
          grad.addColorStop(0.3, `rgba(111, 185, 217, ${rippleAlpha * 0.6})`)
          grad.addColorStop(0.5, `rgba(255, 238, 191, ${rippleAlpha * 0.95})`)
          grad.addColorStop(0.7, `rgba(111, 185, 217, ${rippleAlpha * 0.6})`)
          grad.addColorStop(1, 'rgba(111, 185, 217, 0)')

          ctx.strokeStyle = grad
          ctx.lineWidth = 18
          ctx.shadowColor = 'rgba(255, 220, 150, 0.45)'
          ctx.shadowBlur = 35
          ctx.stroke()
          ctx.shadowBlur = 0
        }

        // Draw spiraling sparks
        sparks.forEach(s => {
          s.angle += s.angleSpeed * s.angleDirection * dt
          s.x += Math.cos(s.angle) * s.speed * dt
          s.y += Math.sin(s.angle) * s.speed * dt
          
          s.speed *= Math.pow(0.97, dt)
          s.alpha -= s.decay * dt

          if (s.alpha > 0) {
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
            ctx.fillStyle = s.color
            ctx.globalAlpha = s.alpha
            ctx.shadowColor = s.color
            ctx.shadowBlur = 8
            ctx.fill()
          }
        })
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1.0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [phase])

  // Custom animation properties representing the physical touch & lift
  const seekerAnimation = () => {
    if (phase === 1) return { x: "0vw", opacity: 0.95 }
    if (phase === 2) return { x: "0vw", opacity: 0.95 }
    if (phase === 3) {
      // Touch clasp: shift right slightly, lift upward, and fade out
      return { 
        x: "40px", 
        y: -120, 
        scale: 1.06,
        opacity: [0.95, 1, 1, 0],
        transition: { times: [0, 0.2, 0.4, 1.0], duration: 1.0, ease: 'easeOut' }
      }
    }
    return { opacity: 0 }
  }

  const divineAnimation = () => {
    if (phase === 1) return { x: "100vw", opacity: 0 }
    if (phase === 2) return { x: "0vw", opacity: 0.98 }
    if (phase === 3) {
      // Touch clasp: shift left slightly, lift upward, and fade out
      return { 
        x: "-40px", 
        y: -120, 
        scale: 1.04,
        opacity: [0.98, 1, 1, 0],
        transition: { times: [0, 0.2, 0.4, 1.0], duration: 1.0, ease: 'easeOut' }
      }
    }
    return { opacity: 0 }
  }

  return (
    <div className="fixed inset-0 w-full h-full z-99999 overflow-hidden flex flex-col justify-center items-center select-none">
      
      {/* Background Canvas Overlay (Fades out in Phase 5 to reveal homepage) */}
      <motion.div 
        className="absolute inset-0 bg-black pointer-events-none"
        animate={phase === 5 ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover" 
        />
      </motion.div>

      {/* Phase 1, 2 & 3: Photorealistic Hand Images (Lighten/Screen blend mode) */}
      <AnimatePresence>
        {phase <= 3 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          >
            {/* Seeker Hand (Left - Real Image) */}
            <motion.div
              initial={{ x: "-100vw", y: 0, opacity: 0 }}
              animate={seekerAnimation()}
              transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute right-[50%] w-[55vw] h-[55vw] max-w-[480px] max-h-[480px] flex items-center justify-end"
            >
              <img
                src="/seeker_hand_real.png"
                alt="Seeker Hand"
                className="w-[90%] h-[90%] object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
            </motion.div>

            {/* Divine Hand (Right - Real Image with Aura) */}
            <motion.div
              initial={{ x: "100vw", y: 0, opacity: 0 }}
              animate={divineAnimation()}
              transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute left-[50%] w-[55vw] h-[55vw] max-w-[480px] max-h-[480px] flex items-center justify-start"
            >
              <img
                src="/divine_hand_real.png"
                alt="Divine Hand"
                className="w-[90%] h-[90%] object-contain animate-pulse-subtle"
                style={{ mixBlendMode: 'screen' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 4 & 5: Brand Reveal & Typography Gateway Zoom */}
      <AnimatePresence>
        {phase >= 4 && (
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            
            {/* Logo Image Wrapper (Offset upward from center using absolute positioning) */}
            {phase === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -60 }}
                animate={{ opacity: 1, scale: 1, y: -160 }}
                exit={{ opacity: 0, scale: 0.8, y: -220, transition: { duration: 0.5 } }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                className="absolute flex items-center justify-center w-36 h-36 md:w-44 md:h-44"
              >
                {/* Orbit Ring */}
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
                    strokeWidth="1"
                    strokeDasharray="5 5 10 5"
                  />
                  <defs>
                    <linearGradient id="orbit-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffeebf" />
                      <stop offset="50%" stopColor="#6fb9d9" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ffeebf" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Logo Image */}
                <div className="w-[88%] h-[88%] rounded-full overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(111,185,217,0.2)] bg-black flex items-center justify-center">
                  <img 
                    src="/logo.jpg" 
                    alt="Aadi Shakti Logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </motion.div>
            )}

            {/* Brand Title (Centred perfectly in the viewport, zooms from the absolute center) */}
            <div className="absolute inset-x-0 flex justify-center items-center select-none overflow-visible">
              {phase === 5 ? (
                <motion.h1
                  animate={{ 
                    scale: 24, 
                    opacity: 0, 
                    filter: 'blur(15px)' 
                  }}
                  transition={{ duration: 0.85, ease: [0.7, 0, 0.25, 1] }}
                  className="font-serif font-bold text-6xl md:text-8xl text-white tracking-tight leading-none text-center transform-gpu"
                >
                  Aadi Shakti
                </motion.h1>
              ) : (
                <h1 className="font-serif font-bold text-6xl md:text-8xl text-white tracking-tight leading-none text-center flex overflow-visible">
                  {"Aadi Shakti".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 30, rotateX: -45 }}
                      animate={phase === 4 ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                      transition={{ 
                        duration: 0.95, 
                        delay: 0.15 + index * 0.045, 
                        ease: [0.215, 0.61, 0.355, 1] 
                      }}
                      className="inline-block transform-gpu origin-bottom whitespace-pre"
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>
              )}
            </div>

            {/* Tagline / Subtitle (Offset downward from center using absolute positioning) */}
            {phase === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 160 }}
                animate={{ opacity: 0.8, y: 120 }}
                exit={{ opacity: 0, y: 180, transition: { duration: 0.4 } }}
                transition={{ duration: 1.2, delay: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="absolute flex flex-col items-center text-center"
              >
                <p className="font-sans text-[11px] font-black tracking-[0.4em] text-sky-200 uppercase mb-2">
                  mission
                </p>
                <blockquote className="font-serif italic text-sm md:text-base text-gray-300 font-light max-w-[280px] md:max-w-md">
                  &ldquo;Let me be your helping hand.&rdquo;
                </blockquote>
              </motion.div>
            )}

          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default IntroAnimation
