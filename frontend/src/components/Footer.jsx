import React from 'react'
import { ArrowUp } from './Icons'

const Footer = () => {
  const handleScrollTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="relative w-full bg-brand-cream border-t border-brand-dark/10 py-16 md:py-24 overflow-hidden z-10">
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-[400px] h-[400px] bg-brand-red/5 bottom-[-10%] left-[-10%] opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Logo / Tagline */}
          <div className="md:col-span-4 flex flex-col items-start select-none">
            <span className="font-serif text-3xl text-brand-dark tracking-tight">
              Aadi Shakti.
            </span>
            <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-brand-grey uppercase mt-1">
              mission
            </span>
            <p className="font-sans text-xs text-brand-grey leading-relaxed mt-6 max-w-xs font-light">
              Evoking collective strength to cultivate self-reliant communities, support girl education, ensure health access, and sustain our local ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="font-sans text-[10px] font-bold text-brand-grey tracking-widest uppercase mb-2">
              EXPLORE
            </h3>
            {[
              { label: 'about us', id: 'philosophy' },
              { label: 'our programs', id: 'pillars' },
              { label: 'our values', id: 'journey' },
              { label: 'meet the team', id: 'donation-impact' }
            ].map((link) => (
              <a
                key={link.label}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="font-sans text-xs text-brand-dark hover:text-brand-red transition-colors self-start"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="font-sans text-[10px] font-bold text-brand-grey tracking-widest uppercase mb-2">
              CONTACT
            </h3>
            <div className="font-sans text-xs text-brand-dark leading-relaxed flex flex-col gap-2 font-light">
              <span>📍 Sector 12, Noida, Uttar Pradesh, 201301</span>
              <span>📧 connect@aadishaktimission.org</span>
              <span>📞 +91 98765 43210</span>
            </div>
          </div>

          {/* Socials */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h3 className="font-sans text-[10px] font-bold text-brand-grey tracking-widest uppercase mb-2">
              FOLLOW
            </h3>
            <div className="font-sans text-xs flex flex-col gap-2 font-light">
              {['Instagram', 'Linkedin', 'Twitter', 'Medium'].map((soc) => (
                <a
                  key={soc}
                  href="#"
                  className="text-brand-dark hover:text-brand-red transition-colors self-start"
                  data-cursor="pointer"
                >
                  {soc}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Backdrop / Copyright */}
        <div className="mt-20 pt-8 border-t border-brand-dark/10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          
          <div className="font-sans text-[10px] text-brand-grey tracking-wider font-light text-center md:text-left select-none">
            &copy; {currentYear} Aadi Shakti Mission. All Rights Reserved. | Registered Section 8 NGO.
          </div>

          {/* Back to top button */}
          <a
            href="#"
            onClick={handleScrollTop}
            className="flex items-center gap-2 font-sans text-xs font-bold text-brand-dark hover:text-brand-red transition-colors group cursor-pointer"
            data-cursor="pointer"
          >
            <span>BACK TO TOP</span>
            <div className="w-8 h-8 rounded-full border border-brand-dark/20 group-hover:border-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-brand-cream transition-all duration-300">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
