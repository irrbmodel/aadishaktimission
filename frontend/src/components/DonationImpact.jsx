import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DonationImpact = ({ isLoaded }) => {
  const [donationAmount, setDonationAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [paymentStep, setPaymentStep] = useState('input') // 'input', 'processing', 'success'
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [transactionId, setTransactionId] = useState('')

  const detailsRef = useRef(null)
  const terminalRef = useRef(null)
  const headerRef = useRef(null)

  const presets = [100, 5000, 10000, 100000]

  const categories = [
    { id: 'general', title: 'General Operations', desc: 'Directs resources dynamically to where field teams indicate the highest immediate urgency.' },
    { id: 'learning-hub', title: 'Village Learning Hub', desc: 'Directly finances textbooks, digital devices, and operational costs for village learning hubs.' },
    { id: 'neighborhoods', title: 'Nurturing Our Neighborhoods', desc: 'Funds mobile clinic runs, medicine procurement, and clean water filter systems.' },
    { id: 'youth', title: 'Empowering Youth', desc: 'Finances tailoring equipment, micro-enterprise starter kits, and vocational skill workshops.' },
    { id: 'mother-earth', title: 'For Mother Earth', desc: 'Finances native tree saplings, protective mesh cages, and clean solar panel energy installations.' }
  ]

  // Impact description mapping based on selected amounts
  const getImpactDescription = (amount) => {
    if (amount <= 0) return 'Please select or enter an amount to see the impact of your contribution.'
    if (amount < 500) {
      return `A donation of ₹${amount} supplies learning kits, primary school notebooks, and writing materials to a rural girl child for an entire month.`
    } else if (amount < 1000) {
      return `A donation of ₹${amount} funds a comprehensive medical diagnostic screening and sanitary health distribution pack for a rural mother.`
    } else if (amount < 2500) {
      return `A donation of ₹${amount} provides full vocational tailoring training modules and a starter tool kit for a female entrepreneur.`
    } else if (amount < 5000) {
      return `A donation of ₹${amount} installs a dual-stage clean water filter unit or buys 25 native tree saplings with protective cages for community conservation.`
    } else {
      return `A donation of ₹${amount} contributes significantly to rural infrastructure, establishing solar panel blocks or supporting long-term community outreach cycles.`
    }
  }

  // GSAP animation for impact description switch
  useEffect(() => {
    if (detailsRef.current) {
      gsap.fromTo(detailsRef.current.querySelectorAll('.impact-anim'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      )
    }
  }, [donationAmount, customAmount, selectedCategory])

  // GSAP scroll reveal for heading
  useEffect(() => {
    if (!isLoaded) return

    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }
  }, [isLoaded])

  const currentAmount = customAmount ? parseFloat(customAmount) : donationAmount

  const handlePresetSelect = (val) => {
    setDonationAmount(val)
    setCustomAmount('')
  }

  const handleCustomChange = (e) => {
    const val = e.target.value
    setCustomAmount(val)
    if (val) {
      setDonationAmount(0)
    } else {
      setDonationAmount(100)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isNaN(currentAmount) || currentAmount < 100) return
    if (!donorName || !donorEmail) return

    // Animate to processing
    setPaymentStep('processing')
    
    // Simulate gateway response
    setTimeout(() => {
      const txId = `ASM-${Math.floor(100000 + Math.random() * 900000)}-TX`
      setTransactionId(txId)
      setPaymentStep('success')
    }, 2500)
  }

  const resetForm = () => {
    setPaymentStep('input')
    setCustomAmount('')
    setDonationAmount(100)
    setDonorName('')
    setDonorEmail('')
  }

  return (
    <section 
      id="donation-impact" 
      className="relative w-full py-24 md:py-36 bg-brand-cream border-b border-brand-dark/5 overflow-hidden"
    >
      {/* Mesh Glow Background */}
      <div className="absolute glowing-blob w-[600px] h-[600px] bg-brand-red/5 bottom-[-15%] left-[-10%] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Section Subtitle */}
        <div className="mb-16 select-none">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-grey block">
            FUEL THE TRANSFORMATION
          </span>
        </div>

        {/* Heading Block */}
        <div ref={headerRef} className="max-w-2xl mb-16 flex flex-col gap-4">
          <h2 className="font-serif text-5xl md:text-7xl text-brand-dark uppercase tracking-tight leading-none">
            support the <br />
            <span className="text-brand-red">mission</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-grey font-light leading-relaxed mt-4">
            We operate with zero commercial overhead. 100% of your contributions go directly into procuring materials, conducting camps, and funding skill-development kits for rural communities.
          </p>
        </div>

        {/* Main interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Impact Calculator (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Allocation Selector */}
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[10px] font-bold tracking-wider text-brand-grey uppercase">
                1. SELECT ALLOCATION DOMAIN
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-full border text-xs font-semibold tracking-wider font-sans cursor-pointer transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? 'border-brand-red bg-brand-red text-brand-cream'
                        : 'border-brand-dark/10 bg-brand-white text-brand-dark hover:border-brand-red/30'
                    }`}
                    data-cursor="pointer"
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets and Custom input panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              {/* Presets */}
              <div className="flex flex-col gap-3">
                <span className="font-sans text-[10px] font-bold tracking-wider text-brand-grey uppercase">
                  2. CONTRIBUTE AMOUNT (INR)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {presets.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handlePresetSelect(val)}
                      className={`py-3 rounded-xl border text-xs font-bold font-display cursor-pointer transition-all duration-300 ${
                        donationAmount === val && !customAmount
                          ? 'border-brand-red bg-brand-red/5 text-brand-red scale-105 shadow-sm shadow-brand-red/5'
                          : 'border-brand-dark/10 bg-brand-white hover:border-brand-red/30 text-brand-dark'
                      }`}
                      data-cursor="pointer"
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div className="flex flex-col gap-3">
                <label className="font-sans text-[10px] font-bold text-brand-grey tracking-wider uppercase">
                  OR DEFINE CUSTOM CONTRIBUTION
                </label>
                <div className="relative w-full rounded-xl border border-brand-dark/10 overflow-hidden focus-within:border-brand-red/40 focus-within:shadow-md transition-all bg-brand-white">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-bold text-sm text-brand-grey">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="100"
                    placeholder="Other Amount"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full h-11 pl-8 pr-4 bg-transparent text-brand-dark focus:outline-none font-sans font-bold text-sm"
                    data-cursor="pointer"
                  />
                  {(currentAmount !== '' && currentAmount < 100) && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <span className="text-[10px] text-brand-red font-bold animate-pulse">Min ₹100</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dynamic Impact Breakdown card */}
            <div 
              ref={detailsRef}
              className="p-8 md:p-10 rounded-[32px] bg-brand-white border border-brand-dark/5 shadow-xl flex flex-col gap-6 relative overflow-hidden"
            >
              {/* Decorative side accent */}
              <div className="absolute left-0 top-0 h-full w-[4px] bg-brand-red" />
              
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[10px] font-bold tracking-widest text-brand-red uppercase block">
                  REAL-TIME IMPACT BREAKDOWN
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-brand-dark uppercase tracking-tight">
                  your ₹{currentAmount || '0'} contribution
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {/* Allocation desc */}
                <p className="font-sans text-xs md:text-sm text-brand-grey font-light leading-relaxed border-b border-brand-dark/5 pb-4 italic impact-anim">
                  Allocation: {categories.find(c => c.id === selectedCategory)?.title} — {categories.find(c => c.id === selectedCategory)?.desc}
                </p>
                {/* Core impact */}
                <p className="font-sans text-sm md:text-base text-brand-dark font-medium leading-relaxed impact-anim">
                  {getImpactDescription(currentAmount)}
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Secure Payment Terminal (col-span-5) */}
          <div className="lg:col-span-5">
            <div 
              ref={terminalRef}
              className="relative bg-brand-white border border-brand-dark/5 p-8 md:p-10 rounded-[32px] shadow-2xl flex flex-col gap-6 overflow-hidden min-h-[440px] justify-between"
            >
              {/* Payment terminal top banner */}
              <div className="absolute top-0 left-0 w-full h-[6px] bg-brand-dark" />

              {paymentStep === 'input' && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full justify-between">
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
                        SECURE TERMINAL
                      </span>
                      <h3 className="font-serif text-3xl text-brand-dark mt-1 tracking-tight uppercase">
                        Donations
                      </h3>
                    </div>

                    {/* Inputs */}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[9px] font-bold text-brand-grey tracking-wider uppercase">
                          YOUR FULL NAME
                        </label>
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="e.g. Aarti Sharma"
                          className="w-full h-11 px-4 rounded-xl border border-brand-dark/10 font-sans text-xs bg-brand-cream/10 focus:outline-none focus:border-brand-red/40"
                          data-cursor="pointer"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[9px] font-bold text-brand-grey tracking-wider uppercase">
                          YOUR EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          required
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="e.g. aarti@example.com"
                          className="w-full h-11 px-4 rounded-xl border border-brand-dark/10 font-sans text-xs bg-brand-cream/10 focus:outline-none focus:border-brand-red/40"
                          data-cursor="pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-4">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-red hover:bg-brand-dark text-brand-cream hover:text-brand-cream transition-all duration-300 shadow-md shadow-brand-red/10 cursor-pointer"
                      data-cursor="pointer"
                    >
                      SECURE DONATION OF ₹{currentAmount}
                    </button>
                    <span className="text-[9px] text-brand-grey tracking-wider text-center block">
                      🔒 Secure 256-Bit Encrypted SSL Gateway
                    </span>
                  </div>
                </form>
              )}

              {paymentStep === 'processing' && (
                <div className="flex flex-col items-center justify-center py-16 gap-6 my-auto text-center animate-pulse">
                  {/* Glowing spinner */}
                  <div className="w-16 h-16 rounded-full border-4 border-brand-dark/10 border-t-brand-red animate-spin" />
                  <div className="flex flex-col gap-2">
                    <h4 className="font-serif text-xl text-brand-dark uppercase tracking-wide">
                      Connecting Gateway
                    </h4>
                    <p className="font-sans text-xs text-brand-grey font-light max-w-xs">
                      Authorizing secure transfer tokens. Please do not close or refresh this pane.
                    </p>
                  </div>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="flex flex-col items-center justify-center py-10 gap-6 my-auto text-center">
                  {/* Success Mark */}
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/5">
                    <svg className="w-8 h-8 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <h4 className="font-serif text-2xl text-brand-dark uppercase tracking-tight">
                      donation received
                    </h4>
                    <p className="font-sans text-xs text-brand-grey font-light max-w-xs">
                      Thank you, <span className="font-semibold text-brand-dark">{donorName}</span>! Your transfer of <span className="font-semibold text-brand-red">₹{currentAmount}</span> was successful.
                    </p>
                  </div>

                  {/* Receipt block */}
                  <div className="w-full bg-brand-cream/40 rounded-2xl p-4 border border-brand-dark/5 flex flex-col gap-1.5 text-left font-sans text-[10px] text-brand-grey mt-2">
                    <div className="flex justify-between">
                      <span>TRANSACTION ID:</span>
                      <span className="font-mono font-bold text-brand-dark">{transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RECEIPT STATUS:</span>
                      <span className="font-bold text-emerald-600">SENT TO {donorEmail.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between border-t border-brand-dark/5 pt-1.5 mt-1">
                      <span>ALLOCATION FOCUS:</span>
                      <span className="font-bold text-brand-dark">{categories.find(c => c.id === selectedCategory)?.title.toUpperCase()}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-4 text-xs font-bold font-sans text-brand-red hover:text-brand-dark transition-colors cursor-pointer"
                    data-cursor="pointer"
                  >
                    Make Another Donation
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default DonationImpact
