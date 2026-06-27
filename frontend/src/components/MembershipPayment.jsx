import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const MembershipPayment = ({ membershipData, onBack }) => {
  const [selectedTier, setSelectedTier] = useState('advocate')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [paymentStep, setPaymentStep] = useState('input') // 'input', 'processing', 'success'
  const [processingStatus, setProcessingStatus] = useState('Initiating secure portal...')
  const [transactionId, setTransactionId] = useState('')
  const [memberId, setMemberId] = useState('')
  
  // Card Payment States
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState(membershipData.name || '')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [isCardFlipped, setIsCardFlipped] = useState(false)

  // UPI State
  const [upiId, setUpiId] = useState('')
  


  const containerRef = useRef(null)
  const cardPreviewRef = useRef(null)

  const tiers = [
    {
      id: 'volunteer',
      title: 'Volunteer Member',
      price: 0,
      period: 'year',
      tag: 'Grassroots Force',
      desc: 'Dedicate your time, skills, and energy to volunteer directly in local development programs, medical diagnostics camps, and learning hubs.',
      benefits: [
        'Direct participation in field operations',
        'Official volunteer certificate & credentials',
        'Access to community workshop toolkits',
        'Invitations to annual regional summits'
      ]
    },
    {
      id: 'advocate',
      title: 'Advocate Member',
      price: 500,
      period: 'month',
      tag: 'Movement Builder',
      desc: 'Help establish regional chapters, lead community awareness campaigns, and coordinate sustained local projects.',
      benefits: [
        'Priority coordination credentials',
        'Welcome kit with advocacy materials',
        'Monthly program review briefings',
        'Voting rights on local chapter agendas'
      ]
    },
    {
      id: 'patron',
      title: 'Patron Member',
      price: 2500,
      period: 'month',
      tag: 'Sustained Pillar',
      desc: 'Commit to regular monthly support to directly finance vocational equipment, teacher honorariums, and digital classroom infrastructure.',
      benefits: [
        'Premium Patron status & validation',
        'Direct bi-annual impact statement audits',
        'Exclusive round-table project meetings',
        'Permanent naming mention on community walls'
      ]
    }
  ]



  useEffect(() => {
    // Fade-in entry animation
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

  const currentTier = tiers.find(t => t.id === selectedTier)

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    
    // Set payment step to processing
    setPaymentStep('processing')

    // Simulate progress messages
    const statuses = [
      'Validating member credentials...',
      'Securing SSL tunnel with payment node...',
      'Authenticating merchant transaction...',
      'Creating digital membership entry...',
      'Minting Member ID card...'
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
      const tx = `ASM-${Math.floor(100000 + Math.random() * 900000)}-TX`
      const mem = `ASM-2026-${Math.floor(1000 + Math.random() * 9000)}`
      setTransactionId(tx)
      setMemberId(mem)
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
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-brand-red blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-red blur-[100px]" />
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
            
            {/* Left Column: Tiers Selection (col-span-7) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-red">
                  Step 2 of 2
                </span>
                <h1 className="font-serif text-4xl md:text-6xl text-brand-dark uppercase tracking-tight leading-none mt-2">
                  Select Membership <span className="text-brand-red">Tier</span>
                </h1>
                <p className="font-sans text-xs md:text-sm text-brand-grey font-light mt-4 max-w-xl">
                  Choose how you wish to engage with our work. Every contribution directly funds education, healthcare access, and vocational training starter packs.
                </p>
              </div>

              {/* Tiers List */}
              <div className="flex flex-col gap-5">
                {tiers.map((tier) => (
                  <div 
                    key={tier.id}
                    onClick={() => {
                      setSelectedTier(tier.id)
                      // If volunteer is selected, make payment method simple
                      if (tier.price === 0) {
                        setPaymentMethod('register')
                      } else if (paymentMethod === 'register') {
                        setPaymentMethod('card')
                      }
                    }}
                    className={`p-6 rounded-[24px] border-2 cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
                      selectedTier === tier.id 
                        ? 'border-brand-red bg-brand-red/2 shadow-xl shadow-brand-red/5' 
                        : 'border-brand-dark/10 hover:border-brand-red/30 bg-brand-white'
                    }`}
                  >
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedTier === tier.id ? 'border-brand-red' : 'border-brand-grey'
                        }`}>
                          {selectedTier === tier.id && <div className="w-2 h-2 rounded-full bg-brand-red" />}
                        </div>
                        <span className="font-sans text-[9px] font-black tracking-widest text-brand-red uppercase px-2 py-0.5 bg-brand-red/10 rounded-md">
                          {tier.tag}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-brand-dark uppercase tracking-tight mt-1">
                        {tier.title}
                      </h3>
                      <p className="font-sans text-[11px] text-brand-grey leading-relaxed max-w-lg font-light mt-1">
                        {tier.desc}
                      </p>
                      
                      {/* Benefits bullet list */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-brand-dark/5">
                        {tier.benefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-brand-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="font-sans text-[10px] text-brand-dark font-medium">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price block */}
                    <div className="flex flex-col items-end md:items-end justify-center shrink-0 border-t md:border-t-0 md:border-l border-brand-dark/5 pt-4 md:pt-0 md:pl-6 text-right md:w-36">
                      <span className="font-serif text-3xl font-bold text-brand-dark">
                        {tier.price === 0 ? 'FREE' : `₹${tier.price}`}
                      </span>
                      {tier.price > 0 && (
                        <span className="font-sans text-[10px] text-brand-grey tracking-wider uppercase mt-1">
                          per {tier.period}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
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
                    <span>MEMBER:</span>
                    <span className="font-bold text-brand-dark">{membershipData.name.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CONTACT:</span>
                    <span className="font-bold text-brand-dark">{membershipData.phone} | {membershipData.email.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-t border-brand-dark/5 pt-1.5 mt-1 font-bold text-brand-red text-xs">
                    <span>TOTAL AMOUNT:</span>
                    <span>{currentTier.price === 0 ? '₹0 (Registration Only)' : `₹${currentTier.price} / ${currentTier.period}`}</span>
                  </div>
                </div>

                {currentTier.price === 0 ? (
                  // Simple Form for Volunteer
                  <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-6 justify-between flex-1">
                    <div className="flex flex-col gap-4 mt-2">
                      <span className="font-sans text-[10px] font-bold text-brand-grey tracking-wider uppercase">
                        Terms of Engagement
                      </span>
                      <p className="font-sans text-xs text-brand-grey font-light leading-relaxed">
                        By completing this registration, you agree to commit your time and volunteer services to the active programs of Aadi Shakti Mission. Our coordinators will contact you via email and phone to schedule your introductory workshop.
                      </p>
                      
                      <label className="flex items-start gap-3 mt-2 cursor-pointer">
                        <input type="checkbox" required className="mt-1 accent-brand-red" />
                        <span className="font-sans text-[11px] text-brand-dark font-light leading-normal select-none">
                          I agree to complete the initial volunteer training modules and adhere to NGO code of conduct.
                        </span>
                      </label>
                    </div>

                    <div className="flex flex-col gap-3 mt-6">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-red hover:bg-brand-dark text-brand-cream transition-all duration-300 cursor-pointer shadow-md shadow-brand-red/10"
                        data-cursor="pointer"
                      >
                        CONFIRM VOLUNTEER REGISTRATION
                      </button>
                      <span className="text-[9px] text-brand-grey tracking-wider text-center block">
                        🔒 Verified Safe Profile Creation Gateway
                      </span>
                    </div>
                  </form>
                ) : (
                  // Payment Methods Tabs
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
                            <div className="absolute w-[120px] h-[120px] rounded-full bg-yellow-500/10 -bottom-8 -left-8 blur-2xl pointer-events-none" />

                            {!isCardFlipped ? (
                              // Front side
                              <div className="flex flex-col h-full justify-between relative z-10">
                                <div className="flex justify-between items-start">
                                  {/* Chip and Logo */}
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
                            PAY ₹{currentTier.price}
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
                            VERIFY & PAY ₹{currentTier.price}
                          </button>
                        </form>
                      )}


                    </div>

                    <span className="text-[9px] text-brand-grey tracking-wider text-center block mt-4">
                      🔒 Secure 256-Bit Encrypted SSL Gateway
                    </span>
                  </div>
                )}
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
                  Processing Gateway
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

        {/* Success State & Digital ID Card */}
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
                membership <span className="text-brand-red">confirmed</span>
              </h2>
              <p className="font-sans text-xs md:text-sm text-brand-grey font-light max-w-md mt-1">
                Thank you for joining the Aadi Shakti family. Below is your official digital credentials card.
              </p>
            </div>

            {/* Digital ID Card */}
            <div className={`w-full max-w-md aspect-1.58/1 rounded-3xl p-7 border relative overflow-hidden shadow-2xl bg-linear-to-br ${
              selectedTier === 'patron' 
                ? 'from-amber-900/90 via-stone-900 to-amber-950/80 border-amber-500/30' 
                : selectedTier === 'advocate'
                ? 'from-neutral-900 via-neutral-950 to-red-950/90 border-brand-red/30'
                : 'from-stone-800 via-neutral-900 to-zinc-900/90 border-neutral-500/20'
            } text-brand-cream`}>
              
              {/* Glowing visual overlay inside card */}
              <div className="absolute w-[220px] h-[220px] rounded-full bg-brand-red/10 top-[-20%] right-[-10%] blur-3xl pointer-events-none" />
              {selectedTier === 'patron' && (
                <div className="absolute w-[180px] h-[180px] rounded-full bg-amber-500/10 bottom-[-10%] left-[-10%] blur-3xl pointer-events-none" />
              )}

              {/* Watermark logo */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.03] w-48 h-48 pointer-events-none select-none">
                <svg className="w-full h-full text-brand-cream" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <circle cx="50" cy="50" r="45" strokeWidth="2" />
                  <circle cx="50" cy="50" r="35" strokeWidth="1" />
                  <path d="M50 15v70M15 50h70" strokeWidth="1" />
                </svg>
              </div>

              {/* ID Card Layout */}
              <div className="flex flex-col h-full justify-between relative z-10">
                {/* Top header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg tracking-tight leading-none font-bold">
                      Aadi Shakti <span className="text-brand-red">.</span>
                    </h3>
                    <span className="font-sans text-[7px] font-black tracking-[0.25em] text-brand-cream/60 uppercase mt-0.5 block">
                      mission credential
                    </span>
                  </div>
                  
                  {/* Status Tag */}
                  <span className="font-sans text-[7px] font-black tracking-wider uppercase px-2 py-0.5 border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 rounded-md">
                    Active Member
                  </span>
                </div>

                {/* Body Details */}
                <div className="flex gap-4 items-center my-4">
                  {/* Mock profile placeholder avatar matching premium UI */}
                  <div className="w-14 h-14 rounded-xl bg-brand-cream/5 border border-white/5 flex items-center justify-center text-brand-cream/40 shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-[11px] text-brand-cream/50 tracking-wider font-semibold uppercase">MEMBER</span>
                    <span className="font-serif text-lg md:text-xl font-bold tracking-tight uppercase leading-none truncate max-w-[240px]">
                      {membershipData.name || 'YOUR FULL NAME'}
                    </span>
                    <span className="font-sans text-[8px] font-bold text-brand-cream/70 tracking-widest uppercase">
                      {currentTier.tag}
                    </span>
                  </div>
                </div>

                {/* Bottom details block */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3">
                  <div className="flex flex-col">
                    <span className="text-[7px] text-brand-cream/40 tracking-wider uppercase font-mono">CREDENTIAL ID</span>
                    <span className="font-mono text-[9px] font-bold text-brand-cream mt-0.5">{memberId}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[7px] text-brand-cream/40 tracking-wider uppercase font-mono">ISSUED DATE</span>
                    <span className="font-mono text-[9px] font-bold text-brand-cream mt-0.5">JUN 2026</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[7px] text-brand-cream/40 tracking-wider uppercase font-mono">EXPIRATION</span>
                    <span className="font-mono text-[9px] font-bold text-brand-cream mt-0.5">JUN 2027</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Summary & Actions */}
            <div className="w-full max-w-md bg-brand-white border border-brand-dark/5 p-6 rounded-[24px] shadow-lg flex flex-col gap-4 font-sans text-xs">
              <span className="font-sans text-[9px] font-bold tracking-widest text-brand-grey uppercase block mb-1">
                REGISTRATION RECEIPT
              </span>
              
              {currentTier.price > 0 && (
                <div className="flex justify-between items-center text-brand-grey border-b border-brand-dark/5 pb-2.5">
                  <span>TRANSACTION ID</span>
                  <span className="font-mono font-bold text-brand-dark text-[10px]">{transactionId}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center text-brand-grey border-b border-brand-dark/5 pb-2.5">
                <span>REGISTERED EMAIL</span>
                <span className="font-bold text-brand-dark uppercase text-[10px]">{membershipData.email}</span>
              </div>

              <div className="flex justify-between items-center text-brand-grey border-b border-brand-dark/5 pb-2.5">
                <span>COMMITTED TIER</span>
                <span className="font-bold text-brand-red uppercase text-[10px]">{currentTier.title}</span>
              </div>

              <div className="flex justify-between items-center font-bold text-brand-dark pt-1">
                <span>MEMBERSHIP FEE</span>
                <span className="text-sm">{currentTier.price === 0 ? '₹0 (VOLUNTEER)' : `₹${currentTier.price}`}</span>
              </div>
            </div>

            {/* WhatsApp Group Join Bridge */}
            <div className="w-full max-w-md bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-[24px] shadow-lg flex flex-col items-center gap-4 text-center">
              <span className="font-sans text-[9px] font-black tracking-widest text-emerald-600 uppercase block select-none">
                WHATSAPP CIRCLE GATEWAY
              </span>
              
              {/* Beautifully Framed QR Code Graphic */}
              <div className="relative p-3 bg-brand-white rounded-2xl border border-emerald-500/10 shadow-xs select-none">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="text-brand-dark">
                  {/* Outer border & frame */}
                  <rect width="100" height="100" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                  {/* Mock QR code squares */}
                  {/* Corners */}
                  <rect x="10" y="10" width="20" height="20" rx="2" fill="currentColor" />
                  <rect x="14" y="14" width="12" height="12" rx="1" fill="#ffffff" />
                  <rect x="17" y="17" width="6" height="6" fill="currentColor" />

                  <rect x="70" y="10" width="20" height="20" rx="2" fill="currentColor" />
                  <rect x="74" y="14" width="12" height="12" rx="1" fill="#ffffff" />
                  <rect x="77" y="17" width="6" height="6" fill="currentColor" />

                  <rect x="10" y="70" width="20" height="20" rx="2" fill="currentColor" />
                  <rect x="14" y="74" width="12" height="12" rx="1" fill="#ffffff" />
                  <rect x="17" y="77" width="6" height="6" fill="currentColor" />

                  {/* QR details & dots pattern representing mock payload */}
                  <rect x="40" y="10" width="4" height="8" rx="1" fill="currentColor" />
                  <rect x="50" y="15" width="8" height="4" rx="1" fill="currentColor" />
                  <rect x="45" y="25" width="15" height="4" rx="1" fill="currentColor" />

                  <rect x="10" y="40" width="8" height="4" rx="1" fill="currentColor" />
                  <rect x="15" y="50" width="4" height="8" rx="1" fill="currentColor" />
                  <rect x="25" y="45" width="4" height="15" rx="1" fill="currentColor" />

                  <rect x="40" y="40" width="20" height="20" rx="2" fill="#10b981" />
                  {/* Center WhatsApp icon mock shape */}
                  <path d="M 50,44 C 46.7,44 44,46.7 44,50 C 44,51.3 44.4,52.5 45.1,53.5 L 44.2,56.8 L 47.5,55.9 C 48.5,56.6 49.7,57 51,57 C 54.3,57 57,54.3 57,51 C 57,47.7 54.3,44 51,44 Z" fill="#ffffff" />
                  
                  <rect x="70" y="40" width="8" height="8" rx="1" fill="currentColor" />
                  <rect x="80" y="50" width="10" height="4" rx="1" fill="currentColor" />

                  <rect x="40" y="70" width="12" height="4" rx="1" fill="currentColor" />
                  <rect x="45" y="80" width="8" height="8" rx="1" fill="currentColor" />
                  <rect x="70" y="70" width="8" height="4" rx="1" fill="currentColor" />
                  <rect x="80" y="80" width="10" height="10" rx="1" fill="currentColor" />
                </svg>
              </div>

              <div className="flex flex-col gap-1 px-4">
                <p className="font-sans text-xs text-brand-grey font-light">
                  Scan the QR code or click the button below to join the official **Aadi Shakti community circle** on WhatsApp.
                </p>
              </div>

              {/* Pulsing Green WhatsApp Button */}
              <a
                href="https://chat.whatsapp.com/mock-aadi-shakti"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-[#10b981] hover:bg-[#059669] text-white transition-all cursor-pointer text-center shadow-lg shadow-emerald-500/10 animate-pulse relative block mb-2"
                data-cursor="pointer"
              >
                💬 Enter the Aadi Shakti Circle
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button
                type="button"
                onClick={() => {
                  // Simulate print action
                  alert('Generating PDF printout for card: ' + memberId)
                }}
                className="flex-1 py-3.5 rounded-xl font-sans font-bold text-xs tracking-wider uppercase border border-brand-dark/10 bg-brand-white hover:border-brand-red text-brand-dark hover:text-brand-red transition-all cursor-pointer text-center"
                data-cursor="pointer"
              >
                📥 Print ID Card
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

export default MembershipPayment
