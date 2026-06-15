import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRingRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [cursorState, setCursorState] = useState(null) // 'pointer' | 'view' | 'donate' | 'drag' | null
  const [isVisible, setIsVisible] = useState(false)
  const [isHoverDevice, setIsHoverDevice] = useState(false)

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsHoverDevice(hoverQuery.matches)

    if (!hoverQuery.matches) return

    // Apply cursor-hide class to body
    document.body.classList.add('custom-cursor-active')

    const cursorRing = cursorRingRef.current
    const cursorDot = cursorDotRef.current
    if (!cursorRing || !cursorDot) return

    // GSAP quickTo setters for high-performance coordinate updates
    const xRingTo = gsap.quickTo(cursorRing, 'x', { duration: 0.35, ease: 'power3.out' })
    const yRingTo = gsap.quickTo(cursorRing, 'y', { duration: 0.35, ease: 'power3.out' })

    const xDotTo = gsap.quickTo(cursorDot, 'x', { duration: 0.1, ease: 'power3.out' })
    const yDotTo = gsap.quickTo(cursorDot, 'y', { duration: 0.1, ease: 'power3.out' })

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true)
      
      // Target position
      xRingTo(e.clientX)
      yRingTo(e.clientY)

      xDotTo(e.clientX)
      yDotTo(e.clientY)
    }

    const onMouseLeaveWindow = () => {
      setIsVisible(false)
    }

    const onMouseEnterWindow = () => {
      setIsVisible(true)
    }

    // Global listener for interactive elements with data-cursor attributes
    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        const state = target.getAttribute('data-cursor')
        setCursorState(state)
      }
    }

    const onMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        setCursorState(null)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
    }
  }, [isVisible])

  if (!isHoverDevice) return null

  // Determine size & content based on custom state
  let cursorText = ''
  let ringClasses = 'w-8 h-8 -mt-4 -ml-4 border border-brand-orange/60'
  let dotClasses = 'w-2 h-2 -mt-1 -ml-1 bg-brand-orange'

  if (cursorState === 'pointer') {
    ringClasses = 'w-12 h-12 -mt-6 -ml-6 border border-brand-pink bg-brand-pink/10 scale-110'
    dotClasses = 'w-1.5 h-1.5 -mt-0.75 -ml-0.75 bg-brand-pink scale-0'
  } else if (cursorState === 'view') {
    cursorText = 'VIEW'
    ringClasses = 'w-16 h-16 -mt-8 -ml-8 border-none bg-brand-purple text-white text-[10px] font-bold tracking-widest scale-120'
    dotClasses = 'scale-0'
  } else if (cursorState === 'donate') {
    cursorText = 'JOIN'
    ringClasses = 'w-20 h-20 -mt-10 -ml-10 border-none bg-brand-orange text-brand-indigo text-xs font-black tracking-widest scale-125 shadow-lg shadow-brand-orange/30'
    dotClasses = 'scale-0'
  } else if (cursorState === 'drag') {
    cursorText = 'DRAG'
    ringClasses = 'w-16 h-16 -mt-8 -ml-8 border-none bg-indigo-600 text-white text-[10px] font-bold tracking-widest scale-110'
    dotClasses = 'scale-0'
  }

  return (
    <div 
      className={`fixed top-0 left-0 pointer-events-none z-9999 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Outer Ring */}
      <div 
        ref={cursorRingRef}
        className={`absolute rounded-full flex items-center justify-center pointer-events-none transition-all duration-300 ease-out select-none ${ringClasses}`}
      >
        {cursorText && <span className="animate-fade-in font-display">{cursorText}</span>}
      </div>

      {/* Center Dot */}
      <div 
        ref={cursorDotRef}
        className={`absolute rounded-full pointer-events-none transition-transform duration-250 ${dotClasses}`}
      />
    </div>
  )
}

export default CustomCursor
