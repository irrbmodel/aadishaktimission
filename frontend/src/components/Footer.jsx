import React from 'react'
import { ArrowUp, Instagram, Linkedin, Twitter, Youtube, Send } from './Icons'

const Footer = () => {
  const handleScrollTop = (e) => {
    e.preventDefault()
    // Scroll smoothly to top. Lenis handles this.
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-brand-dark border-t border-white/5 py-16 md:py-24 overflow-hidden z-10">
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-[400px] h-[400px] bg-brand-pink bottom-[-10%] left-[-10%] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Brand & Mission Statement */}
          <div className="md:col-span-4 flex flex-col items-start">
            <span className="font-display font-black text-2xl tracking-wider bg-linear-to-r from-white via-orange-100 to-brand-orange bg-clip-text text-transparent uppercase select-none">
              Aadi Shakti
            </span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 -mt-1 block">
              MISSION
            </span>
            <p className="text-sm text-gray-400 font-light mt-6 leading-relaxed max-w-xs">
              Evoking collective cosmic strength to cultivate self-reliant communities, support girl child education, ensure health access, and sustain our green ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h3 className="text-[10px] font-black text-white/50 tracking-widest uppercase mb-2">
              Explore
            </h3>
            {[
              { label: 'Philosophy', id: 'philosophy' },
              { label: 'Pillars of Impact', id: 'pillars' },
              { label: 'Journey Timeline', id: 'journey' },
              { label: 'Visual Archive', id: 'gallery' },
              { label: 'Contribute', id: 'contribute' }
            ].map((link) => (
              <a
                key={link.label}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-xs text-gray-400 hover:text-brand-orange transition-colors self-start"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-[10px] font-black text-white/50 tracking-widest uppercase mb-2">
              Contact Us
            </h3>
            <div className="text-xs text-gray-400 font-light flex flex-col gap-3 leading-relaxed">
              <span>📍 Sector 12, Noida, Uttar Pradesh, 201301</span>
              <span>📧 connect@aadishaktimission.org</span>
              <span>📞 +91 98765 43210</span>
            </div>

            {/* Social Handles */}
            <div className="flex gap-3 mt-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' }
              ].map((soc, index) => {
                const IconComponent = soc.icon
                return (
                  <a
                    key={index}
                    href={soc.href}
                    className="w-9 h-9 rounded-full border border-white/10 hover:border-brand-orange hover:bg-brand-orange/10 hover:text-brand-orange flex items-center justify-center text-white/70 transition-all duration-300"
                    data-cursor="pointer"
                  >
                    <IconComponent className="w-4.5 h-4.5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-[10px] font-black text-white/50 tracking-widest uppercase mb-2">
              Receive Updates
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed mb-1">
              Subscribe to our monthly Shakti Newsletter for impact reports.
            </p>
            <div className="relative w-full rounded-xl border border-white/10 bg-white/5 overflow-hidden focus-within:border-brand-orange/40 transition-colors">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full h-11 pl-4 pr-12 bg-transparent text-xs text-white focus:outline-none"
                data-cursor="pointer"
              />
              <button
                type="button"
                className="absolute right-1 top-1 w-9 h-9 bg-brand-orange text-brand-dark rounded-lg flex items-center justify-center hover:bg-brand-pink hover:text-white transition-all duration-300"
                data-cursor="pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Giant Typographic Backdrop & Copyright Info */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          
          <div className="text-[10px] text-white/40 tracking-wider font-light text-center md:text-left select-none">
            © {currentYear} Aadi Shakti Mission. All Rights Reserved. | Registered Section 8 NGO.
          </div>

          {/* Huge decorative text */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-8xl text-white/1 tracking-[0.2em] uppercase select-none pointer-events-none">
            SHAKTI
          </div>

          {/* Back to top button */}
          <a
            href="#"
            onClick={handleScrollTop}
            className="flex items-center gap-2 text-xs font-black tracking-widest text-white/60 hover:text-brand-orange transition-colors group"
            data-cursor="pointer"
          >
            <span>BACK TO TOP</span>
            <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-brand-dark transition-all duration-300">
              <ArrowUp className="w-4 h-4" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
