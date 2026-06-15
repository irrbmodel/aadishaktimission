import React, { useEffect, useState } from 'react'
import { Sparkles, Heart } from './Icons'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      // Lenis smooth scroll will catch window.scrollTo automatically!
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12 ${
        isScrolled 
          ? 'bg-brand-dark/80 backdrop-blur-md border-b border-white/5 py-3 shadow-lg shadow-black/10' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2 group focus:outline-none"
          data-cursor="pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-tr from-brand-orange to-brand-pink p-0.5 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-tr from-brand-purple to-brand-orange animate-spin duration-[10s]" />
            <div className="relative w-full h-full bg-brand-dark rounded-full flex items-center justify-center z-10 transition-colors group-hover:bg-transparent">
              <Sparkles className="w-5 h-5 text-brand-orange group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="font-display font-black text-lg tracking-wider bg-linear-to-r from-white via-orange-100 to-brand-orange bg-clip-text text-transparent group-hover:via-brand-pink transition-all duration-500">
              AADI SHAKTI
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] text-white/50 -mt-1 group-hover:text-brand-orange transition-colors">
              MISSION
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full p-1.5 backdrop-blur-sm">
          {[
            { label: 'Philosophy', id: 'philosophy' },
            { label: 'Pillars of Impact', id: 'pillars' },
            { label: 'Journey', id: 'journey' },
            { label: 'Gallery', id: 'gallery' },
            { label: 'Contribute', id: 'contribute' }
          ].map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 relative"
              data-cursor="pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <a
            href="#contribute"
            onClick={(e) => handleNavClick(e, 'contribute')}
            className="relative overflow-hidden group px-6 py-2.5 rounded-full text-xs font-black tracking-widest text-brand-dark bg-linear-to-r from-brand-orange via-amber-400 to-brand-orange shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none flex items-center gap-1.5"
            data-cursor="donate"
          >
            {/* Gloss shine effect */}
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <Heart className="w-3.5 h-3.5 fill-brand-dark" />
            DONATE
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
