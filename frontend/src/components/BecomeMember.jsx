import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BecomeMember = ({ isLoaded, onProceed }) => {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const headerRef = useRef(null)

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    if (!isLoaded) return

    // Animate Header
    gsap.fromTo(headerRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Animate Form Elements
    gsap.fromTo(formRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [isLoaded])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onProceed) {
      onProceed(formState)
    }
  }

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section 
      id="become-member" 
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 bg-brand-cream text-brand-dark overflow-hidden border-t border-b border-brand-dark/5"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand-red blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content */}
        <div ref={headerRef} className="flex flex-col gap-6">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-red">
            Join The Movement
          </span>
          <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-tight leading-none">
            become a <br />
            <span className="text-brand-red">member</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-grey font-light leading-relaxed mt-2 max-w-md">
            Our mission requires dedicated individuals who believe in grassroots transformation. Volunteer on the field, advocate for our cause, or provide sustained patronage to help shape self-reliant rural communities.
          </p>
          
          <div className="mt-6 flex flex-col gap-6 max-w-md">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001-.031c0-.225-.012-.447-.037-.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark">Active Engagement</h4>
                <p className="font-sans text-[11px] text-brand-grey mt-1">Lead local workshops, join our grassroots mobilization campaigns, and volunteer directly on the ground.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.33-1.5M3.75 21V10.33M12 21.75V12" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark">Sustained Advocacy & Patronage</h4>
                <p className="font-sans text-[11px] text-brand-grey mt-1">Organize local chapters, lead awareness campaigns, or commit to regular contributions for sustained community development.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark">Transparent Resource Allocation</h4>
                <p className="font-sans text-[11px] text-brand-grey mt-1">Receive direct verification on project milestones, financial audits, and real-time updates from our field teams.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full max-w-md mx-auto lg:ml-auto">
          <div className="bg-brand-white border border-brand-dark/5 p-8 rounded-[32px] shadow-2xl">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <h3 className="font-serif text-3xl uppercase tracking-tight text-brand-dark mb-1">
                  Sign Up Now
                </h3>
                <p className="font-sans text-[10px] text-brand-grey uppercase tracking-wider">
                  Fill in your details below
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[9px] font-bold text-brand-grey tracking-wider uppercase">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full h-11 px-4 rounded-xl border border-brand-dark/10 font-sans text-xs bg-brand-white text-brand-dark focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[9px] font-bold text-brand-grey tracking-wider uppercase">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full h-11 px-4 rounded-xl border border-brand-dark/10 font-sans text-xs bg-brand-white text-brand-dark focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[9px] font-bold text-brand-grey tracking-wider uppercase">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="+91"
                    className="w-full h-11 px-4 rounded-xl border border-brand-dark/10 font-sans text-xs bg-brand-white text-brand-dark focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-red hover:bg-brand-cream text-brand-cream hover:text-brand-dark transition-all flex items-center justify-center gap-2 group cursor-pointer"
                data-cursor="pointer"
              >
                <span>Proceed</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}

export default BecomeMember
