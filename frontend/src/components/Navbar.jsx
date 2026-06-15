import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Navbar = ({ isLoaded }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef(null)
  const linksRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // GSAP animate menu open
      gsap.to(menuRef.current, {
        y: '0%',
        duration: 0.8,
        ease: 'power4.out',
      })
      gsap.fromTo(
        linksRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    } else {
      document.body.style.overflow = ''
      // GSAP animate menu close
      gsap.to(menuRef.current, {
        y: '-100%',
        duration: 0.6,
        ease: 'power4.in',
      })
    }
  }, [isOpen])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setIsOpen(false)
    
    // Add a slight delay to allow menu animation to complete
    setTimeout(() => {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 600)
  }

  const menuItems = [
    { label: 'about us', id: 'philosophy' },
    { label: 'our programs', id: 'pillars' },
    { label: 'our values', id: 'journey' },
    { label: 'meet the team', id: 'team' },
    { label: 'contribute', id: 'donation-impact' },
    { label: 'contact', id: 'footer' }
  ]

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 px-6 md:px-12 bg-brand-cream border-b border-brand-dark/5 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        } ${
          isScrolled 
            ? 'py-4 shadow-[0_4px_30px_rgba(0,0,0,0.02)]' 
            : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-baseline gap-2 group focus:outline-none"
            data-cursor="pointer"
          >
            <span className="font-serif text-2xl md:text-3xl text-brand-dark tracking-tight">
              Aadi Shakti.
            </span>
            <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-brand-grey uppercase">
              mission
            </span>
          </a>

          {/* Minimal Menu Trigger (Septiembre style) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-6 flex flex-col justify-between items-end group focus:outline-none z-50 cursor-pointer"
            aria-label="Menu"
            data-cursor="pointer"
          >
            <span 
              className={`h-[1.5px] bg-brand-dark transition-all duration-300 origin-right ${
                isOpen ? 'w-8 -rotate-45 translate-y-[6px] translate-x-[-2px]' : 'w-10'
              }`} 
            />
            <span 
              className={`h-[1.5px] bg-brand-dark transition-all duration-200 ${
                isOpen ? 'w-0 opacity-0' : 'w-7 group-hover:w-10'
              }`} 
            />
            <span 
              className={`h-[1.5px] bg-brand-dark transition-all duration-300 origin-right ${
                isOpen ? 'w-8 rotate-45 translate-y-[-6px] translate-x-[-2px]' : 'w-10'
              }`} 
            />
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <nav 
        ref={menuRef}
        className="fixed inset-0 w-full h-screen bg-brand-cream border-b border-brand-dark/5 z-40 transform -translate-y-full flex flex-col justify-center px-6 md:px-24"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Left Column: Navigation links and info */}
          <div className="md:col-span-7 flex flex-col items-start gap-10 w-full">
            {/* Links List */}
            <ul className="flex flex-col gap-5 md:gap-7">
              {menuItems.map((item, index) => (
                <li key={item.label} className="overflow-hidden">
                  <a
                    ref={(el) => (linksRef.current[index] = el)}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="btn-underline font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark tracking-tight cursor-pointer"
                    data-cursor="pointer"
                  >
                    <span data-letter={item.label}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Socials / Language info footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full border-t border-brand-dark/10 pt-8 gap-4">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
                AADI SHAKTI MISSION NGO &copy; 2026
              </span>
              <div className="flex gap-6">
                {['Instagram', 'Linkedin', 'Twitter'].map((soc) => (
                  <a 
                    key={soc}
                    href="#"
                    className="font-sans text-xs font-semibold text-brand-dark hover:text-brand-red transition-colors cursor-pointer"
                    data-cursor="pointer"
                  >
                    {soc}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Image Grid (visible only on desktop/tablet) */}
          <div className="hidden md:block md:col-span-5 w-full">
            <div className="relative aspect-3/4 w-full rounded-[24px] overflow-hidden border border-brand-dark/5 shadow-2xl group/menu-img">
              {/* Overlay shading gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent z-10 transition-opacity duration-700 pointer-events-none group-hover/menu-img:opacity-75" />
              
              <img 
                src="/hero_empower.png" 
                alt="Empowering Communities" 
                className="w-full h-full object-cover scale-105 group-hover/menu-img:scale-100 transition-transform duration-1000 ease-out pointer-events-none"
              />
              
              {/* Floating aesthetic quote banner */}
              <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                <span className="font-serif text-xs text-brand-cream uppercase tracking-wider block bg-brand-dark/80 px-4 py-2 rounded-xl backdrop-blur-md border border-white/5 shadow-md">
                  Empowerment from the roots
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
