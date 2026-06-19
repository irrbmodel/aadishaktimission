import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const DonationPayment = ({ donationData, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [paymentStep, setPaymentStep] = useState('input') // 'input', 'processing', 'success'
  const [processingStatus, setProcessingStatus] = useState('Initiating secure portal...')
  const [transactionId, setTransactionId] = useState('')
  const [certificateId, setCertificateId] = useState('')

  // Card Payment States
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState(donationData.donorName || '')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [isCardFlipped, setIsCardFlipped] = useState(false)

  // UPI State
  const [upiId, setUpiId] = useState('')

  const containerRef = useRef(null)
  const cardPreviewRef = useRef(null)

  const categories = [
    { id: 'general', title: 'General Operations', desc: 'Directs resources dynamically to where field teams indicate the highest immediate urgency.' },
    { id: 'learning-hub', title: 'Village Learning Hub', desc: 'Directly finances textbooks, digital devices, and operational costs for village learning hubs.' },
    { id: 'neighborhoods', title: 'Nurturing Our Neighborhoods', desc: 'Funds mobile clinic runs, medicine procurement, and clean water filter systems.' },
    { id: 'youth', title: 'Empowering Youth', desc: 'Finances tailoring equipment, micro-enterprise starter kits, and vocational skill workshops.' },
    { id: 'mother-earth', title: 'For Mother Earth', desc: 'Finances native tree saplings, protective mesh cages, and clean solar panel energy installations.' }
  ]

  const currentCategory = categories.find(c => c.id === donationData.category) || categories[0]
  const amount = donationData.amount || 0

  // Impact description mapping
  const getImpactDescription = (amt) => {
    if (amt <= 0) return 'Your contribution matters.'
    if (amt < 500) {
      return `Your ₹${amt} supplies learning kits, primary school notebooks, and writing materials to a rural girl child for an entire month.`
    } else if (amt < 1000) {
      return `Your ₹${amt} funds a comprehensive medical diagnostic screening and sanitary health distribution pack for a rural mother.`
    } else if (amt < 2500) {
      return `Your ₹${amt} provides full vocational tailoring training modules and a starter tool kit for a female entrepreneur.`
    } else if (amt < 5000) {
      return `Your ₹${amt} installs a dual-stage clean water filter unit or buys 25 native tree saplings with protective cages.`
    } else {
      return `Your ₹${amt} contributes significantly to rural infrastructure, establishing solar panel blocks or supporting long-term community outreach.`
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    }
    window.scrollTo(0, 0)
  }, [])

  // Card Formatters
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 16) value = value.slice(0, 16)
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim()
    setCardNumber(formatted)
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 4) value = value.slice(0, 4)
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2)
    }
    setCardExpiry(value)
  }

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 3) {
      setCardCvv(value)
    }
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setPaymentStep('processing')

    const statuses = [
      'Validating donor credentials...',
      'Securing SSL tunnel with payment node...',
      'Authenticating merchant transaction...',
      'Generating 80G tax-exemption receipt...',
      'Finalizing donation certificate...'
    ]

    let currentStatusIdx = 0
    const interval = setInterval(() => {
      if (currentStatusIdx < statuses.length - 1) {
        currentStatusIdx++
        setProcessingStatus(statuses[currentStatusIdx])
      }
    }, 900)

    setTimeout(() => {
      clearInterval(interval)
      const tx = `ASM-DON-${Math.floor(100000 + Math.random() * 900000)}-TX`
      const cert = `ASM-80G-${Math.floor(1000 + Math.random() * 9000)}`
      setTransactionId(tx)
      setCertificateId(cert)
      setPaymentStep('success')
    }, 5000)
  }

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen py-24 md:py-36 bg-brand-cream text-brand-dark relative z-10 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand-red blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-red blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 group mb-12 text-xs font-bold font-sans text-brand-red uppercase tracking-wider hover:text-brand-dark transition-colors cursor-pointer"
          data-cursor="pointer"
        >
          <svg className="w-4 h-4 stroke-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
          </svg>
          Back to Homepage
        </button>

        {paymentStep === 'input' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Donation Summary (col-span-7) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-red">
                  Secure Payment
                </span>
                <h1 className="font-serif text-4xl md:text-6xl text-brand-dark uppercase tracking-tight leading-none mt-2">
                  Complete Your <span className="text-brand-red">Donation</span>
                </h1>
                <p className="font-sans text-xs md:text-sm text-brand-grey font-light mt-4 max-w-xl">
                  100% of your contribution goes directly into procuring materials, conducting camps, and funding skill-development kits for rural communities.
                </p>
              </div>

              {/* Donation Details Card */}
              <div className="p-8 md:p-10 rounded-[32px] bg-brand-white border border-brand-dark/5 shadow-xl flex flex-col gap-6 relative overflow-hidden">
                {/* Decorative side accent */}
                <div className="absolute left-0 top-0 h-full w-[4px] bg-brand-red" />
                
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] font-bold tracking-widest text-brand-red uppercase block">
                    DONATION SUMMARY
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-brand-dark uppercase tracking-tight">
                    your ₹{amount} contribution
                  </h3>
                </div>

                {/* Category Info */}
                <div className="flex flex-col gap-3 border-b border-brand-dark/5 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[9px] font-black tracking-widest text-brand-red uppercase px-2.5 py-1 bg-brand-red/10 rounded-md">
                      {currentCategory.title}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-brand-grey font-light leading-relaxed italic">
                    {currentCategory.desc}
                  </p>
                </div>

                {/* Impact Description */}
                <div className="flex flex-col gap-3">
                  <span className="font-sans text-[10px] font-bold tracking-widest text-brand-grey uppercase">
                    YOUR IMPACT
                  </span>
                  <p className="font-sans text-sm md:text-base text-brand-dark font-medium leading-relaxed">
                    {getImpactDescription(amount)}
                  </p>
                </div>

                {/* Tax Benefit Notice */}
                <div className="bg-emerald-50/50 border border-emerald-500/10 rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                      80G Tax Exemption Eligible
                    </span>
                    <p className="font-sans text-[11px] text-emerald-700/70 font-light leading-relaxed">
                      This donation is eligible for 50% tax deduction under Section 80G of the Income Tax Act. An official receipt will be generated and sent to your registered email.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Secure Checkout Terminal (col-span-5) */}
            <div className="lg:col-span-5">
              <div className="bg-brand-white border border-brand-dark/5 p-8 rounded-[32px] shadow-2xl flex flex-col gap-6 relative overflow-hidden min-h-[500px]">
                {/* Secure banner */}
                <div className="absolute top-0 left-0 w-full h-[6px] bg-brand-dark" />
                
                <div>
                  <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
                    SECURE TRANSACT
                  </span>
                  <h3 className="font-serif text-3xl text-brand-dark mt-1 tracking-tight uppercase">
                    Checkout
                  </h3>
                </div>

                {/* Pre-filled info preview */}
                <div className="bg-brand-cream/40 rounded-2xl p-4 border border-brand-dark/5 flex flex-col gap-1.5 font-sans text-[10px] text-brand-grey">
                  <div className="flex justify-between">
                    <span>DONOR:</span>
                    <span className="font-bold text-brand-dark">{donationData.donorName.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EMAIL:</span>
                    <span className="font-bold text-brand-dark">{donationData.donorEmail.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ALLOCATION:</span>
                    <span className="font-bold text-brand-dark">{currentCategory.title.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-t border-brand-dark/5 pt-1.5 mt-1 font-bold text-brand-red text-xs">
                    <span>DONATION AMOUNT:</span>
                    <span>₹{amount}</span>
                  </div>
                </div>

                {/* Payment Methods Tabs */}
                <div className="flex flex-col gap-6 flex-1 justify-between">
                  <div className="flex flex-col gap-4">
                    {/* Tabs Header */}
                    <div className="flex border-b border-brand-dark/10">
                      {['card', 'upi'].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`flex-1 pb-3 text-[10px] font-bold tracking-wider font-sans uppercase transition-all relative cursor-pointer ${
                            paymentMethod === method ? 'text-brand-red' : 'text-brand-grey hover:text-brand-dark'
                          }`}
                          data-cursor="pointer"
                        >
                          {method}
                          {paymentMethod === method && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content: Card */}
                    {paymentMethod === 'card' && (
                      <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4">
                        
                        {/* Live Premium Credit Card mockup */}
                        <div 
                          ref={cardPreviewRef}
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                          className="relative w-full aspect-1.58/1 rounded-2xl p-6 bg-linear-to-br from-neutral-900 via-brand-dark to-neutral-800 text-brand-cream shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer select-none border border-white/10"
                          style={{ perspective: '1000px' }}
                        >
                          {/* Glowing blobs inside card */}
                          <div className="absolute w-[180px] h-[180px] rounded-full bg-brand-red/30 -top-12 -right-12 blur-3xl pointer-events-none" />
                          <div className="absolute w-[120px] h-[120px] rounded-full bg-emerald-500/10 -bottom-8 -left-8 blur-2xl pointer-events-none" />

                          {!isCardFlipped ? (
                            // Front side
                            <div className="flex flex-col h-full justify-between relative z-10">
                              <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-1.5">
                                  <div className="w-10 h-7 bg-amber-400/40 rounded-md border border-amber-300/30 flex items-center justify-center relative overflow-hidden">
                                    <div className="w-4 h-4 border border-brand-dark/20 rounded-xs absolute" />
                                    <div className="w-6 h-6 border-r border-b border-brand-dark/20" />
                                  </div>
                                  <span className="text-[7px] text-brand-cream/60 tracking-[0.25em] font-mono mt-1">SECURE ASM CHIP</span>
                                </div>
                                <span className="font-serif text-sm tracking-tight text-brand-red font-bold block">Aadi Shakti.</span>
                              </div>

                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-base md:text-lg tracking-widest text-brand-cream">
                                  {cardNumber || '•••• •••• •••• ••••'}
                                </span>
                              </div>

                              <div className="flex justify-between items-end border-t border-white/5 pt-2.5">
                                <div className="flex flex-col">
                                  <span className="text-[7px] text-brand-cream/50 tracking-wider font-mono">HOLDER NAME</span>
                                  <span className="font-sans text-[10px] font-bold tracking-wide uppercase truncate max-w-[160px]">
                                    {cardName || 'YOUR FULL NAME'}
                                  </span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-[7px] text-brand-cream/50 tracking-wider font-mono">EXPIRY</span>
                                  <span className="font-mono text-[10px] font-bold">
                                    {cardExpiry || 'MM/YY'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            // Back side
                            <div className="flex flex-col h-full justify-between relative z-10 py-2">
                              <div className="w-[calc(100%+3rem)] -mx-6 h-10 bg-black" />
                              <div className="flex items-center justify-end gap-3 mt-4 pr-2">
                                <span className="text-[6px] text-brand-cream/50 tracking-wider font-mono">SECURE CODE CVV</span>
                                <div className="bg-brand-cream text-brand-dark font-mono text-[10px] font-bold px-3 py-1 rounded-sm tracking-widest">
                                  {cardCvv || '•••'}
                                </div>
                              </div>
                              <div className="flex justify-between items-center text-[7px] text-brand-cream/40 font-mono tracking-wider mt-4">
                                <span>AUTHORIZED SIGNATURE</span>
                                <span>256-BIT ENCRYPTED</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <span className="text-[8px] text-brand-grey text-center -mt-2 tracking-wider">
                          💡 Click on the card to flip and view signature band / CVV field.
                        </span>

                        {/* Input Fields */}
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="font-sans text-[9px] font-bold text-brand-grey tracking-wider uppercase">
                              CARDHOLDER NAME
                            </label>
                            <input
                              type="text"
                              required
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              onFocus={() => setIsCardFlipped(false)}
                              placeholder="Name as printed on card"
                              className="w-full h-10 px-4 rounded-xl border border-brand-dark/10 font-sans text-xs bg-brand-cream/10 focus:outline-none focus:border-brand-red/40"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="font-sans text-[9px] font-bold text-brand-grey tracking-wider uppercase">
                              CARD NUMBER
                            </label>
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              onFocus={() => setIsCardFlipped(false)}
                              placeholder="1234 5678 1234 5678"
                              className="w-full h-10 px-4 rounded-xl border border-brand-dark/10 font-mono text-xs bg-brand-cream/10 focus:outline-none focus:border-brand-red/40"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="font-sans text-[9px] font-bold text-brand-grey tracking-wider uppercase">
                                EXPIRY DATE
                              </label>
                              <input
                                type="text"
                                required
                                value={cardExpiry}
                                onChange={handleExpiryChange}
                                onFocus={() => setIsCardFlipped(false)}
                                placeholder="MM/YY"
                                className="w-full h-10 px-4 rounded-xl border border-brand-dark/10 font-mono text-xs bg-brand-cream/10 focus:outline-none focus:border-brand-red/40"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="font-sans text-[9px] font-bold text-brand-grey tracking-wider uppercase">
                                CVV
                              </label>
                              <input
                                type="password"
                                required
                                value={cardCvv}
                                onChange={handleCvvChange}
                                onFocus={() => setIsCardFlipped(true)}
                                placeholder="•••"
                                className="w-full h-10 px-4 rounded-xl border border-brand-dark/10 font-mono text-xs bg-brand-cream/10 focus:outline-none focus:border-brand-red/40"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-4 py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-red hover:bg-brand-dark text-brand-cream transition-all duration-300 cursor-pointer shadow-md shadow-brand-red/10"
                          data-cursor="pointer"
                        >
                          DONATE ₹{amount}
                        </button>
                      </form>
                    )}

                    {/* Tab Content: UPI */}
                    {paymentMethod === 'upi' && (
                      <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col items-center gap-4 bg-brand-cream/20 border border-brand-dark/5 p-4 rounded-2xl text-center">
                          
                          {/* Simulated Premium QR Code */}
                          <div className="w-40 h-40 bg-brand-white border border-brand-dark/10 p-3 rounded-xl flex items-center justify-center relative overflow-hidden group shadow-lg">
                            <svg className="w-full h-full text-brand-dark" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                              {/* Corners */}
                              <rect x="5" y="5" width="25" height="25" strokeWidth="6" />
                              <rect x="12" y="12" width="11" height="11" fill="currentColor" stroke="none" />

                              <rect x="70" y="5" width="25" height="25" strokeWidth="6" />
                              <rect x="77" y="12" width="11" height="11" fill="currentColor" stroke="none" />

                              <rect x="5" y="70" width="25" height="25" strokeWidth="6" />
                              <rect x="12" y="77" width="11" height="11" fill="currentColor" stroke="none" />

                              {/* Mock QR Dots Grid */}
                              <rect x="40" y="5" width="6" height="6" fill="currentColor" stroke="none" />
                              <rect x="55" y="10" width="6" height="6" fill="currentColor" stroke="none" />
                              <rect x="45" y="25" width="6" height="6" fill="currentColor" stroke="none" />
                              
                              <rect x="5" y="45" width="6" height="6" fill="currentColor" stroke="none" />
                              <rect x="25" y="40" width="6" height="6" fill="currentColor" stroke="none" />

                              <rect x="40" y="40" width="15" height="15" fill="currentColor" stroke="none" />
                              <rect x="65" y="45" width="6" height="6" fill="currentColor" stroke="none" />
                              <rect x="80" y="40" width="15" height="6" fill="currentColor" stroke="none" />
                              <rect x="40" y="65" width="6" height="12" fill="currentColor" stroke="none" />
                              <rect x="50" y="80" width="12" height="6" fill="currentColor" stroke="none" />

                              <rect x="75" y="75" width="20" height="20" strokeWidth="2" />
                              <rect x="82" y="82" width="6" height="6" fill="currentColor" stroke="none" />

                              {/* Center logo seal */}
                              <circle cx="50" cy="50" r="14" fill="var(--color-brand-cream)" stroke="currentColor" strokeWidth="2" />
                              <text x="50" y="53" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="serif" fill="var(--color-brand-red)">ASM</text>
                            </svg>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="font-sans text-[10px] font-bold text-brand-dark uppercase tracking-wider">
                              Scan QR Code to Pay
                            </span>
                            <span className="font-sans text-[9px] text-brand-grey leading-relaxed">
                              Open Google Pay, PhonePe, Paytm, or BHIM UPI and scan the code.
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-brand-grey py-1">
                          <span className="h-px bg-brand-dark/10 flex-1" />
                          <span className="font-sans text-[9px] font-bold tracking-widest uppercase">OR ENTER VPA / UPI ID</span>
                          <span className="h-px bg-brand-dark/10 flex-1" />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-sans text-[9px] font-bold text-brand-grey tracking-wider uppercase">
                            UPI ADDRESS (VPA)
                          </label>
                          <input
                            type="text"
                            required
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. sharma@okhdfcbank"
                            className="w-full h-10 px-4 rounded-xl border border-brand-dark/10 font-sans text-xs bg-brand-cream/10 focus:outline-none focus:border-brand-red/40"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-2 py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-red hover:bg-brand-dark text-brand-cream transition-all duration-300 cursor-pointer shadow-md shadow-brand-red/10"
                          data-cursor="pointer"
                        >
                          VERIFY & DONATE ₹{amount}
                        </button>
                      </form>
                    )}

                  </div>

                  <span className="text-[9px] text-brand-grey tracking-wider text-center block mt-4">
                    🔒 Secure 256-Bit Encrypted SSL Gateway
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Processing State */}
        {paymentStep === 'processing' && (
          <div className="max-w-md mx-auto py-16">
            <div className="bg-brand-white border border-brand-dark/5 p-10 rounded-[32px] shadow-2xl flex flex-col items-center justify-center text-center gap-6 min-h-[400px] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-brand-red" />
              
              {/* Spinning Loader */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-brand-dark/5 border-t-brand-red animate-spin" />
                <svg className="w-8 h-8 text-brand-red animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl text-brand-dark uppercase tracking-wide">
                  Processing Donation
                </h3>
                <p className="font-sans text-xs text-brand-red font-medium h-4 transition-all duration-300">
                  {processingStatus}
                </p>
                <p className="font-sans text-[10px] text-brand-grey font-light max-w-xs mt-3 leading-relaxed">
                  Completing authorization profile. Please do not close this browser tab or refresh the page.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success State & Donation Certificate Card */}
        {paymentStep === 'success' && (
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-12">
            
            {/* Header Success info */}
            <div className="text-center flex flex-col gap-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/5 mx-auto">
                <svg className="w-8 h-8 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                </svg>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-dark uppercase tracking-tight leading-none mt-2">
                donation <span className="text-brand-red">received</span>
              </h2>
              <p className="font-sans text-xs md:text-sm text-brand-grey font-light max-w-md mt-1">
                Thank you for your generous contribution to Aadi Shakti Mission. Your official donation certificate is below.
              </p>
            </div>

            {/* Digital Donation Certificate Card */}
            <div className="w-full max-w-md aspect-1.58/1 rounded-3xl p-7 border relative overflow-hidden shadow-2xl bg-linear-to-br from-emerald-900/90 via-stone-900 to-emerald-950/80 border-emerald-500/30 text-brand-cream">
              
              {/* Glowing visual overlay */}
              <div className="absolute w-[220px] h-[220px] rounded-full bg-emerald-500/10 top-[-20%] right-[-10%] blur-3xl pointer-events-none" />
              <div className="absolute w-[180px] h-[180px] rounded-full bg-brand-red/10 bottom-[-10%] left-[-10%] blur-3xl pointer-events-none" />

              {/* Watermark logo */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.03] w-48 h-48 pointer-events-none select-none">
                <svg className="w-full h-full text-brand-cream" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <circle cx="50" cy="50" r="45" strokeWidth="2" />
                  <circle cx="50" cy="50" r="35" strokeWidth="1" />
                  <path d="M50 15v70M15 50h70" strokeWidth="1" />
                </svg>
              </div>

              {/* Certificate Layout */}
              <div className="flex flex-col h-full justify-between relative z-10">
                {/* Top header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg tracking-tight leading-none font-bold">
                      Aadi Shakti <span className="text-brand-red">.</span>
                    </h3>
                    <span className="font-sans text-[7px] font-black tracking-[0.25em] text-brand-cream/60 uppercase mt-0.5 block">
                      donation certificate
                    </span>
                  </div>
                  
                  {/* Status Tag */}
                  <span className="font-sans text-[7px] font-black tracking-wider uppercase px-2 py-0.5 border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 rounded-md">
                    Verified
                  </span>
                </div>

                {/* Body Details */}
                <div className="flex gap-4 items-center my-4">
                  {/* Heart icon */}
                  <div className="w-14 h-14 rounded-xl bg-brand-cream/5 border border-white/5 flex items-center justify-center text-emerald-400/60 shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-[11px] text-brand-cream/50 tracking-wider font-semibold uppercase">DONOR</span>
                    <span className="font-serif text-lg md:text-xl font-bold tracking-tight uppercase leading-none truncate max-w-[240px]">
                      {donationData.donorName || 'GENEROUS SOUL'}
                    </span>
                    <span className="font-sans text-[8px] font-bold text-emerald-400/70 tracking-widest uppercase">
                      ₹{amount} — {currentCategory.title}
                    </span>
                  </div>
                </div>

                {/* Bottom details block */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3">
                  <div className="flex flex-col">
                    <span className="text-[7px] text-brand-cream/40 tracking-wider uppercase font-mono">CERTIFICATE</span>
                    <span className="font-mono text-[9px] font-bold text-brand-cream mt-0.5">{certificateId}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[7px] text-brand-cream/40 tracking-wider uppercase font-mono">DATE</span>
                    <span className="font-mono text-[9px] font-bold text-brand-cream mt-0.5">JUN 2026</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[7px] text-brand-cream/40 tracking-wider uppercase font-mono">TAX RECEIPT</span>
                    <span className="font-mono text-[9px] font-bold text-emerald-400 mt-0.5">80G ELIGIBLE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Summary & Actions */}
            <div className="w-full max-w-md bg-brand-white border border-brand-dark/5 p-6 rounded-[24px] shadow-lg flex flex-col gap-4 font-sans text-xs">
              <span className="font-sans text-[9px] font-bold tracking-widest text-brand-grey uppercase block mb-1">
                DONATION RECEIPT
              </span>
              
              <div className="flex justify-between items-center text-brand-grey border-b border-brand-dark/5 pb-2.5">
                <span>TRANSACTION ID</span>
                <span className="font-mono font-bold text-brand-dark text-[10px]">{transactionId}</span>
              </div>
              
              <div className="flex justify-between items-center text-brand-grey border-b border-brand-dark/5 pb-2.5">
                <span>DONOR EMAIL</span>
                <span className="font-bold text-brand-dark uppercase text-[10px]">{donationData.donorEmail}</span>
              </div>

              <div className="flex justify-between items-center text-brand-grey border-b border-brand-dark/5 pb-2.5">
                <span>ALLOCATION FOCUS</span>
                <span className="font-bold text-brand-red uppercase text-[10px]">{currentCategory.title}</span>
              </div>

              <div className="flex justify-between items-center font-bold text-brand-dark pt-1">
                <span>DONATION AMOUNT</span>
                <span className="text-sm">₹{amount}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button
                type="button"
                onClick={() => {
                  alert('Generating PDF receipt for donation: ' + transactionId)
                }}
                className="flex-1 py-3.5 rounded-xl font-sans font-bold text-xs tracking-wider uppercase border border-brand-dark/10 bg-brand-white hover:border-brand-red text-brand-dark hover:text-brand-red transition-all cursor-pointer text-center"
                data-cursor="pointer"
              >
                📥 Download Receipt
              </button>
              <button
                type="button"
                onClick={onBack}
                className="flex-1 py-3.5 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-dark hover:bg-brand-red text-brand-cream transition-all cursor-pointer text-center"
                data-cursor="pointer"
              >
                Return Home
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default DonationPayment
