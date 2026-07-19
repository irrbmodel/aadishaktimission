import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRingRef = useRef(null)
  const cursorDotRef = useRef(null)
  const isVisibleRef = useRef(false)
  const cursorStateRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorState, setCursorState] = useState(null) // 'pointer' | 'view' | 'play' | 'prev' | 'next' | 'drag' | 'text' | null
  const [isPressed, setIsPressed] = useState(false)

  const [isHoverDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches
    }
    return false
  })

  useEffect(() => {
    if (!isHoverDevice) return

    // Apply cursor-hide class to both html and body elements
    document.documentElement.classList.add('custom-cursor-active')
    document.body.classList.add('custom-cursor-active')

    const cursorRing = cursorRingRef.current
    const cursorDot = cursorDotRef.current
    if (!cursorRing || !cursorDot) return

    // GSAP quickTo setters for high-performance coordinate updates
    const xRingTo = gsap.quickTo(cursorRing, 'x', { duration: 0.22, ease: 'power3.out' })
    const yRingTo = gsap.quickTo(cursorRing, 'y', { duration: 0.22, ease: 'power3.out' })

    const xDotTo = gsap.quickTo(cursorDot, 'x', { duration: 0.04, ease: 'power3.out' })
    const yDotTo = gsap.quickTo(cursorDot, 'y', { duration: 0.04, ease: 'power3.out' })

    let hasInitializedPos = false

    const setNextState = (newState) => {
      if (cursorStateRef.current !== newState) {
        cursorStateRef.current = newState
        setCursorState(newState)
      }
    }

    const updateCursorStateFromElement = (target) => {
      if (!target) {
        setNextState(null)
        return
      }

      // 1. Explicit data-cursor attribute
      const dataCursorEl = target.closest('[data-cursor]')
      if (dataCursorEl) {
        setNextState(dataCursorEl.getAttribute('data-cursor'))
        return
      }

      // 2. Text input elements
      const textEl = target.closest(
        'input[type="text"], input[type="email"], input[type="search"], input[type="tel"], input[type="number"], input[type="password"], textarea, [contenteditable="true"]'
      )
      if (textEl) {
        setNextState('text')
        return
      }

      // 3. Standard interactive elements
      const interactiveEl = target.closest(
        'a, button, input[type="submit"], input[type="button"], label, select, [role="button"], .cursor-pointer, [onclick]'
      )
      if (interactiveEl) {
        if (interactiveEl.hasAttribute('disabled') || interactiveEl.classList.contains('pointer-events-none')) {
          setNextState(null)
          return
        }
        setNextState('pointer')
        return
      }

      setNextState(null)
    }

    const onMouseMove = (e) => {
      if (!hasInitializedPos) {
        hasInitializedPos = true
        gsap.set(cursorRing, { x: e.clientX, y: e.clientY })
        gsap.set(cursorDot, { x: e.clientX, y: e.clientY })
      }

      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        setIsVisible(true)
      }

      xRingTo(e.clientX)
      yRingTo(e.clientY)
      xDotTo(e.clientX)
      yDotTo(e.clientY)

      updateCursorStateFromElement(e.target)
    }

    const onMouseDown = () => setIsPressed(true)
    const onMouseUp = () => setIsPressed(false)

    const onMouseLeaveWindow = () => {
      isVisibleRef.current = false
      setIsVisible(false)
    }

    const onMouseEnterWindow = (e) => {
      isVisibleRef.current = true
      setIsVisible(true)
      if (e) {
        xRingTo(e.clientX)
        yRingTo(e.clientY)
        xDotTo(e.clientX)
        yDotTo(e.clientY)
      }
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false
        setIsVisible(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [isHoverDevice])

  if (!isHoverDevice) return null

  // Determine size & content based on custom state
  let cursorText = ''
  let ringClasses = 'w-7 h-7 -mt-3.5 -ml-3.5 border border-white/90 bg-transparent rounded-full'
  let dotClasses = 'w-1.5 h-1.5 -mt-0.75 -ml-0.75 bg-white rounded-full'

  if (cursorState === 'pointer') {
    ringClasses = 'w-11 h-11 -mt-5.5 -ml-5.5 border border-white bg-white/20 scale-100 rounded-full'
    dotClasses = 'w-2 h-2 -mt-1 -ml-1 bg-white rounded-full'
  } else if (cursorState === 'text') {
    ringClasses = 'w-0 h-0 opacity-0 scale-0'
    dotClasses = 'w-[2px] h-5 -mt-2.5 -ml-[1px] bg-white rounded-full'
  } else if (cursorState === 'view') {
    cursorText = 'VIEW'
    ringClasses = 'w-14 h-14 -mt-7 -ml-7 border-none bg-white text-black font-extrabold text-[9px] tracking-widest scale-100 rounded-full shadow-2xl'
    dotClasses = 'scale-0 opacity-0'
  } else if (cursorState === 'play') {
    cursorText = 'PLAY'
    ringClasses = 'w-14 h-14 -mt-7 -ml-7 border-none bg-white text-black font-extrabold text-[9px] tracking-widest scale-100 rounded-full shadow-2xl'
    dotClasses = 'scale-0 opacity-0'
  } else if (cursorState === 'prev') {
    cursorText = 'PREV'
    ringClasses = 'w-14 h-14 -mt-7 -ml-7 border-none bg-white text-black font-extrabold text-[9px] tracking-widest scale-100 rounded-full shadow-2xl'
    dotClasses = 'scale-0 opacity-0'
  } else if (cursorState === 'next') {
    cursorText = 'NEXT'
    ringClasses = 'w-14 h-14 -mt-7 -ml-7 border-none bg-white text-black font-extrabold text-[9px] tracking-widest scale-100 rounded-full shadow-2xl'
    dotClasses = 'scale-0 opacity-0'
  } else if (cursorState === 'drag') {
    cursorText = 'DRAG'
    ringClasses = 'w-12 h-12 -mt-6 -ml-6 border-none bg-white text-black font-extrabold text-[9px] tracking-widest scale-100 rounded-full shadow-2xl'
    dotClasses = 'scale-0 opacity-0'
  }

  const pressedScale = isPressed ? 'scale-85' : ''

  return (
    <div 
      className={`fixed top-0 left-0 pointer-events-none z-999999 mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Outer Ring positioning wrapper */}
      <div 
        ref={cursorRingRef}
        className="absolute top-0 left-0 pointer-events-none"
      >
        {/* Inner Ring styling element */}
        <div 
          className={`absolute flex items-center justify-center pointer-events-none transition-all duration-300 ease-out select-none font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] ${ringClasses} ${pressedScale}`}
        >
          {cursorText && <span className="font-sans text-center font-black tracking-widest">{cursorText}</span>}
        </div>
      </div>

      {/* Center Dot positioning wrapper */}
      <div 
        ref={cursorDotRef}
        className="absolute top-0 left-0 pointer-events-none"
      >
        {/* Inner Dot styling element */}
        <div 
          className={`absolute pointer-events-none transition-all duration-200 ease-out drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] ${dotClasses} ${pressedScale}`}
        />
      </div>
    </div>
  )
}

export default CustomCursor

