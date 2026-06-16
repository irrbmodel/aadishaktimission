import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BecomeMember = ({ isLoaded }) => {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const headerRef = useRef(null)

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    tier: 'advocate'
  })
  const [status, setStatus] = useState('idle') // idle, submitting, success

  const tiers = [
    { id: 'volunteer', title: 'Volunteer', desc: 'Join our grassroots movements and field camps.' },
    { id: 'advocate', title: 'Advocate', desc: 'Help spread awareness and organize local chapters.' },
    { id: 'patron', title: 'Patron', desc: 'Commit to recurring support for sustained impact.' }
  ]

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
          toggleActions: 'play none none none'
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
          toggleActions: 'play none none none'
        }
      }
    )
  }, [isLoaded])

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
    }, 2000)
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
          <p className="font-sans text-sm md:text-base text-brand-grey font-light leading-relaxed mt-4 max-w-md">
            Our mission requires dedicated individuals who believe in grassroots transformation. Whether you choose to volunteer on the field, advocate for our cause, or provide sustained patronage, your membership forms the backbone of Aadi Shakti Mission.
          </p>
          
          <div className="mt-8 flex flex-col gap-4">
            {tiers.map((tier) => (
              <div 
                key={tier.id}
                onClick={() => setFormState(prev => ({ ...prev, tier: tier.id }))}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                  formState.tier === tier.id 
                    ? 'border-brand-red bg-brand-red/5' 
                    : 'border-brand-dark/10 hover:border-brand-red/30 bg-brand-white'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  formState.tier === tier.id ? 'border-brand-red' : 'border-brand-grey'
                }`}>
                  {formState.tier === tier.id && <div className="w-2 h-2 rounded-full bg-brand-red" />}
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider">{tier.title}</h4>
                  <p className="font-sans text-[10px] text-brand-grey mt-1">{tier.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full max-w-md mx-auto lg:ml-auto">
          <div className="bg-brand-white border border-brand-dark/5 p-8 rounded-[32px] shadow-2xl">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                </div>
                <h3 className="font-serif text-2xl uppercase tracking-tight text-brand-dark">
                  Welcome to the <br/>Family
                </h3>
                <p className="font-sans text-xs text-brand-grey mt-4">
                  We've received your membership details. Our coordinator will reach out to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-[10px] font-bold font-sans text-brand-red uppercase tracking-wider hover:text-brand-dark transition-colors"
                >
                  Register Another Member
                </button>
              </div>
            ) : (
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
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+91"
                      className="w-full h-11 px-4 rounded-xl border border-brand-dark/10 font-sans text-xs bg-brand-white text-brand-dark focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full mt-4 py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-red hover:bg-brand-red/80 text-brand-cream transition-all disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Processing...' : 'Submit Membership'}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

export default BecomeMember
