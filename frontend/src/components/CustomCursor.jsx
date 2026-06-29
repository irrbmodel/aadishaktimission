import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRingRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [isHoverDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches
    }
    return false
  })
  const [cursorState, setCursorState] = useState(null) // 'pointer' | 'view' | 'play' | 'prev' | 'next' | 'drag' | null
  const [isVisible, setIsVisible] = useState(false)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    if (!isHoverDevice) return

    // Apply cursor-hide class to body
    document.body.classList.add('custom-cursor-active')

    const cursorRing = cursorRingRef.current
    const cursorDot = cursorDotRef.current
    if (!cursorRing || !cursorDot) return

    // GSAP quickTo setters for high-performance coordinate updates
    const xRingTo = gsap.quickTo(cursorRing, 'x', { duration: 0.3, ease: 'power3.out' })
    const yRingTo = gsap.quickTo(cursorRing, 'y', { duration: 0.3, ease: 'power3.out' })

    const xDotTo = gsap.quickTo(cursorDot, 'x', { duration: 0.08, ease: 'power3.out' })
    const yDotTo = gsap.quickTo(cursorDot, 'y', { duration: 0.08, ease: 'power3.out' })

    const onMouseMove = (e) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        setIsVisible(true)
      }
      
      // Target position
      xRingTo(e.clientX)
      yRingTo(e.clientY)

      xDotTo(e.clientX)
      yDotTo(e.clientY)
    }

    const onMouseLeaveWindow = () => {
      isVisibleRef.current = false
      setIsVisible(false)
    }

    const onMouseEnterWindow = () => {
      isVisibleRef.current = true
      setIsVisible(true)
    }

    // Global listener for interactive elements with data-cursor attributes
    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        const state = target.getAttribute('data-cursor')
        setCursorState(state)
      } else {
        // Fallback for standard links
        const standardLink = e.target.closest('a, button, [role="button"]')
        if (standardLink) {
          setCursorState('pointer')
        }
      }
    }

    const onMouseOut = (e) => {
      const target = e.target.closest('[data-cursor], a, button, [role="button"]')
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
  }, [isHoverDevice])

  if (!isHoverDevice) return null

  // Determine size & content based on custom state
  let cursorText = ''
  let ringClasses = 'w-6 h-6 -mt-3 -ml-3 border border-brand-dark/30 bg-transparent'
  let dotClasses = 'w-1.5 h-1.5 -mt-0.75 -ml-0.75 bg-brand-cream'

  if (cursorState === 'pointer') {
    ringClasses = 'w-10 h-10 -mt-5 -ml-5 border border-brand-red bg-brand-red/5 scale-110'
    dotClasses = 'w-1 h-1 -mt-0.5 -ml-0.5 bg-brand-red'
  } else if (cursorState === 'view') {
    cursorText = 'VIEW'
    ringClasses = 'w-14 h-14 -mt-7 -ml-7 border-none bg-brand-cream text-brand-cream text-[9px] font-black tracking-widest scale-120'
    dotClasses = 'scale-0'
  } else if (cursorState === 'play') {
    cursorText = 'PLAY'
    ringClasses = 'w-14 h-14 -mt-7 -ml-7 border-none bg-brand-red text-brand-cream text-[9px] font-black tracking-widest scale-120 shadow-lg'
    dotClasses = 'scale-0'
  } else if (cursorState === 'prev') {
    cursorText = 'PREV'
    ringClasses = 'w-14 h-14 -mt-7 -ml-7 border-none bg-brand-cream text-brand-dark text-[9px] font-black tracking-widest scale-120'
    dotClasses = 'scale-0'
  } else if (cursorState === 'next') {
    cursorText = 'NEXT'
    ringClasses = 'w-14 h-14 -mt-7 -ml-7 border-none bg-brand-cream text-brand-dark text-[9px] font-black tracking-widest scale-120'
    dotClasses = 'scale-0'
  } else if (cursorState === 'drag') {
    cursorText = 'DRAG'
    ringClasses = 'w-12 h-12 -mt-6 -ml-6 border-none bg-brand-cream text-brand-dark text-[9px] font-black tracking-widest scale-110'
    dotClasses = 'scale-0'
  }

  return (
    <div 
      className={`fixed top-0 left-0 pointer-events-none z-9999 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Outer Ring */}
      <div 
        ref={cursorRingRef}
        className={`absolute rounded-full flex items-center justify-center pointer-events-none transition-all duration-300 ease-out select-none font-sans ${ringClasses}`}
      >
        {cursorText && <span className="font-sans text-center">{cursorText}</span>}
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
