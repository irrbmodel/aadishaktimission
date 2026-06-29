import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Navbar = ({ isLoaded, view, setView, onGetInvolvedClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavbarHidden, setIsNavbarHidden] = useState(false)
  const menuRef = useRef(null)
  const linksRef = useRef([])
  const imageRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const ourImpactEl = document.getElementById('our-impact')
      const journeyEl = document.getElementById('journey')
      
      let isOverImpact = false
      let isOverJourney = false

      if (ourImpactEl) {
        const rect = ourImpactEl.getBoundingClientRect()
        isOverImpact = rect.top <= 80 && rect.bottom >= 80
      }

      if (journeyEl) {
        const rect = journeyEl.getBoundingClientRect()
        isOverJourney = rect.top <= 80 && rect.bottom >= 80
      }

      setIsNavbarHidden(isOverImpact || isOverJourney)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mountedRef = useRef(false)
  const scrollLockRef = useRef(0)
  const preventTouchRef = useRef(null)

  useEffect(() => {
    // Skip on initial mount — menu is closed by default
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }

    if (isOpen) {
      // Pause smooth scrolling and lock native viewport scroll
      window.lenis?.stop()
      document.documentElement.classList.add('lenis-stopped')

      const tl = gsap.timeline()

      tl.fromTo(
        menuRef.current,
        { clipPath: 'inset(0 0 100% 0)', y: '-2%' },
        { clipPath: 'inset(0 0 0% 0)', y: '0%', duration: 0.8, ease: 'power4.inOut' }
      )

      tl.fromTo(
        linksRef.current,
        { yPercent: 110, rotate: 3, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.055,
          ease: 'power3.out',
        },
        '-=0.45'
      )

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        )
      }

      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.3'
        )
      }

    } else {
      // Restore smooth scrolling and unlock viewport scroll
      document.documentElement.classList.remove('lenis-stopped')
      window.lenis?.start()

      const tl = gsap.timeline()

      tl.to(
        [...linksRef.current].reverse(),
        {
          yPercent: 110,
          opacity: 0,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power2.in',
        }
      )

      if (imageRef.current) {
        tl.to(
          imageRef.current,
          { x: 50, opacity: 0, duration: 0.3, ease: 'power2.in' },
          '<'
        )
      }

      tl.to(
        menuRef.current,
        { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'power4.inOut' },
        '-=0.15'
      )
    }

    return () => {
      // Cleanup if component unmounts while menu is open
      document.documentElement.classList.remove('lenis-stopped')
      window.lenis?.start()
    }
  }, [isOpen])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setIsOpen(false)
    
    if (targetId === 'become-member') {
      if (onGetInvolvedClick) onGetInvolvedClick('membership')
      return
    }
    if (targetId === 'donation-impact') {
      if (onGetInvolvedClick) onGetInvolvedClick('donation')
      return
    }
    
    if (view !== 'home' && setView) {
      setView('home', targetId)
    } else {
      setTimeout(() => {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 600)
    }
  }

  const menuItems = [
    { label: 'our approach', id: 'philosophy' },
    { label: 'our programs', id: 'journey' },
    { label: 'our impact', id: 'our-impact' },
    { label: 'meet the team', id: 'team' },
    { label: 'contact', id: 'footer' }
  ]

  const isDarkHero = !isScrolled && view === 'home' && !isOpen

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-4 sm:px-6 lg:px-12 flex justify-center ${
          isNavbarHidden
            ? 'opacity-0 -translate-y-full pointer-events-none'
            : isLoaded
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-8 pointer-events-none'
        } ${isScrolled ? 'pt-4' : 'pt-6 md:pt-8'}`}
      >
        <div className={`w-full max-w-7xl flex items-center justify-between transition-all duration-700 ${
          isScrolled 
            ? 'bg-brand-cream/80 backdrop-blur-xl border border-brand-dark/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-3 px-6 rounded-full'
            : 'bg-transparent py-2 px-2'
        }`}>
          {/* Logo & Brand Name */}
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            data-cursor="pointer"
          >
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border shadow-sm shrink-0 transition-all duration-500 group-hover:scale-105 ${
              isDarkHero ? 'border-brand-cream/30' : 'border-brand-dark/15'
            }`}>
              <img 
                src="/logo.jpg" 
                alt="Aadi Shakti Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex items-baseline gap-1.5 md:gap-2">
              <span className={`font-serif font-black text-xl md:text-2xl tracking-tight transition-colors duration-300 ${
                isDarkHero ? 'text-brand-cream' : 'text-brand-dark'
              }`}>
                Aadi Shakti.
              </span>
              <span className={`hidden sm:inline-block font-display text-[8px] md:text-[9px] font-black tracking-[0.25em] uppercase transition-colors duration-300 ${
                isDarkHero ? 'text-brand-cream/80' : 'text-brand-dark'
              }`}>
                mission
              </span>
            </div>
          </a>

          <div className="flex items-center gap-4 md:gap-6">
            {/* CTA Buttons */}
            <button
              onClick={() => onGetInvolvedClick && onGetInvolvedClick('donation')}
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border border-transparent bg-brand-red text-brand-cream font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-cream hover:text-brand-dark hover:border-brand-dark transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              data-cursor="pointer"
            >
              Get Involved
            </button>

            {/* Premium Menu Trigger */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-12 h-12 flex flex-col justify-center items-center group focus:outline-none z-50 cursor-pointer rounded-full transition-colors ${
                isDarkHero ? 'hover:bg-brand-cream/10' : 'hover:bg-brand-cream/5'
              }`}
              aria-label="Menu"
              data-cursor="pointer"
            >
              <div className="relative w-6 h-4 flex flex-col justify-between items-end">
                <span 
                  className={`h-[1.5px] transition-all duration-500 origin-center ${
                    isOpen ? 'bg-brand-red w-6 rotate-45 translate-y-[7px]' : `${isDarkHero ? 'bg-brand-cream' : 'bg-brand-dark'} w-6`
                  }`} 
                />
                <span 
                  className={`h-[1.5px] transition-all duration-300 ${
                    isOpen ? 'bg-brand-red w-0 opacity-0' : `${isDarkHero ? 'bg-brand-cream' : 'bg-brand-dark'} w-4 group-hover:w-6`
                  }`} 
                />
                <span 
                  className={`h-[1.5px] transition-all duration-500 origin-center ${
                    isOpen ? 'bg-brand-red w-6 -rotate-45 translate-y-[-7px]' : `${isDarkHero ? 'bg-brand-cream' : 'bg-brand-dark'} w-5 group-hover:w-6`
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <nav 
        ref={menuRef}
        style={{ clipPath: 'inset(0 0 100% 0)' }}
        className="fixed inset-0 w-full h-dvh bg-brand-cream z-40 flex flex-col overflow-hidden"
      >
        {/* Inner layout — full height, no overflow */}
        <div className="flex flex-col h-full w-full px-6 md:px-14 lg:px-20 pt-20 md:pt-24 pb-4 md:pb-8 overflow-y-auto scrollbar-none">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 flex-1 min-h-0 items-center">

            {/* Left Column: Navigation links */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start w-full overflow-hidden">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#0ea5e9] mb-3 select-none hidden lg:block">
                Navigation
              </span>
              <ul className="flex flex-col items-center lg:items-start w-full">
                {menuItems.map((item, index) => {
                  return (
                    <li key={item.label} className="w-full text-center lg:text-left border-b border-brand-dark/8 last:border-b-0">
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className="relative inline-block font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-light text-brand-dark tracking-tight cursor-pointer transition-all duration-300 py-2 md:py-2.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-brand-red after:transition-all after:duration-500 hover:after:w-full"
                        data-cursor="pointer"
                      >
                        <div className="overflow-hidden pb-2">
                          <span 
                            ref={(el) => (linksRef.current[index] = el)}
                            className="inline-block origin-bottom-left"
                          >
                            {item.label}
                          </span>
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Right Column: Editorial Visual (visible only on large screens) */}
            <div className="hidden lg:flex lg:col-span-5 w-full justify-end items-center h-full">
              <div ref={imageRef} className="relative w-full max-w-sm xl:max-w-md h-[65%] rounded-2xl overflow-hidden shadow-2xl group/menu-img opacity-0">
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/70 via-brand-dark/10 to-transparent z-10 pointer-events-none" />
                <img 
                  src="/images/youth_group.jpeg" 
                  alt="Empowering Communities" 
                  className="w-full h-full object-cover scale-105 group-hover/menu-img:scale-100 transition-transform duration-1000 ease-out pointer-events-none"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                  <span className="font-sans text-[9px] font-bold text-brand-red uppercase tracking-widest mb-2">
                    Our Mission
                  </span>
                  <p className="font-serif italic text-base md:text-lg text-brand-dark leading-snug">
                    Empowerment from the roots, reaching the highest peaks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer row */}
          <div ref={footerRef} className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between border-t border-brand-dark/10 pt-4 gap-3 opacity-0">
            <div className="flex items-center gap-6">
              {['Instagram', 'Linkedin', 'Twitter'].map((soc) => (
                <a 
                  key={soc}
                  href="#"
                  className="font-sans text-[10px] font-bold tracking-widest text-brand-dark/50 hover:text-brand-red uppercase transition-colors cursor-pointer"
                  data-cursor="pointer"
                >
                  {soc}
                </a>
              ))}
            </div>
            <span className="font-sans text-[9px] font-bold tracking-[0.2em] text-brand-dark/30 uppercase">
              AADI SHAKTI MISSION NGO &copy; 2026
            </span>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
