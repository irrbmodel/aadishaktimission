import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

// ─── Floating Label Input (light theme) ──────────────────────────────────────
const LightInput = ({ label, type = 'text', value, onChange, maxLength, autoComplete, onFocus: onFocusProp, onBlur: onBlurProp }) => {
  const [focused, setFocused] = useState(false)
  const hasValue = value !== '' && value !== undefined

  return (
    <div className="relative">
      <div className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        focused
          ? 'border-brand-red/40 bg-brand-white shadow-md shadow-brand-red/8'
          : 'border-brand-dark/10 bg-brand-white hover:border-brand-dark/20'
      }`}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => { setFocused(true); onFocusProp?.() }}
          onBlur={() => { setFocused(false); onBlurProp?.() }}
          placeholder=" "
          maxLength={maxLength}
          autoComplete={autoComplete}
          className="peer w-full bg-transparent px-4 pt-6 pb-2 text-sm font-sans text-brand-dark focus:outline-none"
        />
        <label className={`absolute left-4 font-sans text-[10px] font-bold uppercase tracking-widest pointer-events-none transition-all duration-300 ${
          focused || hasValue
            ? 'top-2 text-brand-red/60 scale-90 origin-left'
            : 'top-1/2 -translate-y-1/2 text-brand-grey/50'
        }`}>
          {label}
        </label>
      </div>
    </div>
  )
}

// ─── Tier Card ────────────────────────────────────────────────────────────────
const TierCard = ({ tier, isSelected, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
    className={`relative p-6 rounded-3xl border cursor-pointer transition-all duration-300 overflow-hidden ${
      isSelected
        ? 'border-brand-red/30 bg-linear-to-br from-brand-red/5 via-brand-red/3 to-transparent shadow-xl shadow-brand-red/10'
        : 'border-brand-dark/8 bg-brand-white hover:border-brand-red/20 hover:shadow-lg'
    }`}
  >
    {isSelected && <div className="absolute top-0 left-0 w-full h-0.5 bg-brand-red" />}
    {isSelected && (
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-red/8 blur-3xl pointer-events-none" />
    )}

    <div className="flex items-start justify-between gap-6 relative z-10">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
            isSelected ? 'bg-brand-red/10' : 'bg-brand-cream'
          }`}>
            {tier.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-sans text-xs font-bold uppercase tracking-wide ${isSelected ? 'text-brand-dark' : 'text-brand-grey'}`}>
                {tier.title}
              </span>
              <span className={`font-sans text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-wide ${
                isSelected ? 'bg-brand-red text-brand-cream' : 'bg-brand-cream text-brand-grey'
              }`}>{tier.tag}</span>
            </div>
          </div>
        </div>
        <p className={`font-sans text-[11px] leading-relaxed mb-4 ${isSelected ? 'text-brand-dark/60' : 'text-brand-grey'}`}>
          {tier.desc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
          {tier.benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className={`w-3 h-3 shrink-0 ${isSelected ? 'text-brand-red' : 'text-brand-grey/30'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span className={`font-sans text-[10px] ${isSelected ? 'text-brand-dark/60' : 'text-brand-grey'}`}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 flex flex-col items-end gap-1">
        <div className={`font-serif text-2xl md:text-3xl font-bold ${isSelected ? 'text-brand-red' : 'text-brand-dark/20'}`}>
          {tier.price === 0 ? 'FREE' : `₹${tier.price}`}
        </div>
        {tier.price > 0 && (
          <span className={`font-sans text-[9px] uppercase tracking-wider ${isSelected ? 'text-brand-grey' : 'text-brand-dark/15'}`}>
            per {tier.period}
          </span>
        )}
        <div className={`w-5 h-5 rounded-full border-2 mt-2 flex items-center justify-center transition-all ${
          isSelected ? 'border-brand-red bg-brand-red' : 'border-brand-dark/15'
        }`}>
          {isSelected && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  </motion.div>
)

// ─── Main Component ───────────────────────────────────────────────────────────
const MembershipPayment = ({ membershipData, onBack }) => {
  const [selectedTier, setSelectedTier] = useState('advocate')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [paymentStep, setPaymentStep] = useState('input')
  const [processingStatus, setProcessingStatus] = useState('Initiating secure portal...')
  const [transactionId, setTransactionId] = useState('')
  const [memberId, setMemberId] = useState('')

  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState(membershipData.name || '')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  const [upiId, setUpiId] = useState('')

  const containerRef = useRef(null)

  const tiers = [
    {
      id: 'volunteer',
      icon: '🤝',
      title: 'Volunteer Member',
      price: 0,
      period: 'year',
      tag: 'Grassroots Force',
      desc: 'Dedicate your time and skills to volunteer directly in local development programs, medical camps, and learning hubs.',
      benefits: ['Direct field operations', 'Official volunteer certificate', 'Workshop toolkit access', 'Annual summit invitation']
    },
    {
      id: 'advocate',
      icon: '📣',
      title: 'Advocate Member',
      price: 500,
      period: 'month',
      tag: 'Movement Builder',
      desc: 'Help establish regional chapters, lead community awareness campaigns, and coordinate sustained local projects.',
      benefits: ['Priority coordination credentials', 'Welcome kit & materials', 'Monthly program briefings', 'Chapter voting rights']
    },
    {
      id: 'patron',
      icon: '🌟',
      title: 'Patron Member',
      price: 2500,
      period: 'month',
      tag: 'Sustained Pillar',
      desc: 'Commit to regular monthly support to finance vocational equipment, teacher honorariums, and digital classrooms.',
      benefits: ['Patron status & validation', 'Bi-annual impact audits', 'Exclusive round-table access', 'Community wall mention']
    }
  ]

  const currentTier = tiers.find(t => t.id === selectedTier)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    }
    window.scrollTo(0, 0)
  }, [])

  const handleCardNumberChange = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16)
    setCardNumber(v.replace(/(\d{4})/g, '$1 ').trim())
  }

  const handleExpiryChange = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2)
    setCardExpiry(v)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setPaymentStep('processing')
    const statuses = [
      'Validating member credentials...',
      'Securing SSL tunnel with payment node...',
      'Authenticating merchant transaction...',
      'Creating digital membership entry...',
      'Minting Member ID card...'
    ]
    let i = 0; setProcessingStatus(statuses[0])
    const iv = setInterval(() => {
      if (i < statuses.length - 1) { i++; setProcessingStatus(statuses[i]) }
    }, 900)
    setTimeout(() => {
      clearInterval(iv)
      setTransactionId(`ASM-${Math.floor(100000 + Math.random() * 900000)}-TX`)
      setMemberId(`ASM-2026-${Math.floor(1000 + Math.random() * 9000)}`)
      setPaymentStep('success')
    }, 5000)
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-brand-cream relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-brand-red/6 blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/4 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-24 md:pb-32">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 group mb-12 text-xs font-bold font-sans text-brand-grey hover:text-brand-red uppercase tracking-widest transition-colors cursor-pointer"
          data-cursor="pointer"
        >
          <svg className="w-4 h-4 stroke-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Homepage
        </button>

        {/* ─── PAYMENT INPUT ────────────────────────────────────────────────── */}
        {paymentStep === 'input' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT: Tier Selection */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-brand-red" />
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">Step 2 of 2</span>
                </div>
                <h1 className="font-serif text-5xl md:text-7xl text-brand-dark uppercase tracking-tight leading-[0.88] mb-5">
                  Select Your<br />
                  <span className="text-brand-red">Membership</span>
                </h1>
                <p className="font-sans text-sm text-brand-grey font-light leading-relaxed max-w-xl">
                  Choose how you wish to engage with our mission. Every tier directly funds education, healthcare, and vocational training in the Himalayas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="flex flex-col gap-4"
              >
                {tiers.map(tier => (
                  <TierCard
                    key={tier.id}
                    tier={tier}
                    isSelected={selectedTier === tier.id}
                    onClick={() => {
                      setSelectedTier(tier.id)
                      if (tier.price === 0) setPaymentMethod('register')
                      else if (paymentMethod === 'register') setPaymentMethod('card')
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* RIGHT: Checkout */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="sticky top-28"
              >
                <div className="relative rounded-3xl overflow-hidden border border-brand-dark/6 shadow-2xl">
                  {/* Header */}
                  <div className="relative bg-brand-dark px-8 py-7 overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-red/20 blur-3xl" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                        <span className="font-sans text-[9px] font-black uppercase tracking-[0.3em] text-brand-cream/40">Secure Transaction</span>
                      </div>
                      <h2 className="font-serif text-4xl text-brand-cream uppercase tracking-tight leading-[0.88]">Checkout</h2>
                    </div>
                  </div>

                  {/* Member Info Summary */}
                  <div className="bg-brand-cream/60 px-8 py-4 border-b border-brand-dark/6">
                    <div className="flex flex-col gap-2 font-sans text-[10px]">
                      <div className="flex justify-between items-center">
                        <span className="text-brand-grey uppercase tracking-wider">Member</span>
                        <span className="font-bold text-brand-dark">{(membershipData.name || '').toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-brand-grey uppercase tracking-wider">Contact</span>
                        <span className="font-bold text-brand-grey text-[9px]">{membershipData.phone} · {membershipData.email}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-brand-dark/6 pt-2 mt-1">
                        <span className="text-brand-grey uppercase tracking-wider">Tier</span>
                        <span className="font-bold text-brand-red text-xs">{currentTier.title}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-brand-grey uppercase tracking-wider">Total</span>
                        <span className="font-serif text-lg font-bold text-brand-dark">
                          {currentTier.price === 0 ? '₹0 · Free' : `₹${currentTier.price} / ${currentTier.period}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Form */}
                  <div className="bg-brand-white px-8 py-7">
                    {currentTier.price === 0 ? (
                      <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-5">
                        <p className="font-sans text-xs text-brand-grey leading-relaxed">
                          By completing this registration you commit your volunteer time to Aadi Shakti Mission programs. Our coordinators will contact you to schedule your onboarding.
                        </p>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" required className="mt-1 accent-brand-red" />
                          <span className="font-sans text-[11px] text-brand-dark/60 font-light leading-normal select-none">
                            I agree to complete initial training modules and adhere to the NGO code of conduct.
                          </span>
                        </label>
                        <button
                          type="submit"
                          className="w-full py-4 rounded-2xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-dark hover:bg-brand-red text-brand-cream transition-all cursor-pointer shadow-lg shadow-brand-dark/20 mt-2"
                        >
                          Confirm Volunteer Registration
                        </button>
                      </form>
                    ) : (
                      <div className="flex flex-col gap-6">
                        {/* Method Tabs */}
                        <div className="grid grid-cols-2 gap-2">
                          {[{ id: 'card', label: '💳 Card' }, { id: 'upi', label: '📱 UPI' }].map(m => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setPaymentMethod(m.id)}
                              className={`py-3 rounded-xl font-sans font-bold text-xs uppercase cursor-pointer border transition-all ${
                                paymentMethod === m.id
                                  ? 'bg-brand-dark border-brand-dark text-brand-cream'
                                  : 'bg-brand-cream border-brand-dark/10 text-brand-dark hover:border-brand-dark/25'
                              }`}
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>

                        {/* Card */}
                        {paymentMethod === 'card' && (
                          <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-5">
                            {/* Live Card Preview */}
                            <div
                              onClick={() => setIsCardFlipped(!isCardFlipped)}
                              className="relative w-full rounded-2xl overflow-hidden cursor-pointer select-none shadow-xl"
                              style={{ aspectRatio: '1.586' }}
                            >
                              <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-[#1a1a1a] to-brand-dark rounded-2xl" />
                              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-red/25 blur-3xl" />
                              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl" />

                              <AnimatePresence mode="wait">
                                {!isCardFlipped ? (
                                  <motion.div
                                    key="front"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 p-5 flex flex-col justify-between z-10"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className="w-9 h-6 bg-amber-400/30 rounded border border-amber-300/20 mb-1" />
                                        <span className="text-[6px] text-brand-cream/30 tracking-widest font-mono">SECURE CHIP</span>
                                      </div>
                                      <span className="font-serif text-xs text-brand-red font-bold">Aadi Shakti.</span>
                                    </div>
                                    <span className="font-mono text-sm md:text-base tracking-widest text-brand-cream/80">
                                      {cardNumber || '•••• •••• •••• ••••'}
                                    </span>
                                    <div className="flex justify-between items-end border-t border-white/8 pt-2">
                                      <div>
                                        <span className="text-[6px] text-brand-cream/30 font-mono tracking-wider block">HOLDER</span>
                                        <span className="font-sans text-[9px] font-bold uppercase tracking-wide text-brand-cream/70 truncate max-w-[130px]">
                                          {cardName || 'YOUR NAME'}
                                        </span>
                                      </div>
                                      <div className="text-right">
                                        <span className="text-[6px] text-brand-cream/30 font-mono tracking-wider block">EXPIRY</span>
                                        <span className="font-mono text-[9px] font-bold text-brand-cream/70">{cardExpiry || 'MM/YY'}</span>
                                      </div>
                                    </div>
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="back"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col justify-center z-10"
                                  >
                                    <div className="w-full h-8 bg-black/70 mb-4" />
                                    <div className="flex items-center justify-end gap-3 px-5">
                                      <span className="text-[7px] text-brand-cream/30 font-mono tracking-wider">CVV</span>
                                      <div className="bg-brand-cream text-brand-dark font-mono text-xs font-bold px-4 py-1 rounded tracking-widest">
                                        {cardCvv || '•••'}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <p className="text-[9px] text-brand-grey text-center font-sans">Tap card to flip · View CVV on back</p>

                            <LightInput label="Cardholder Name" type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} onFocus={() => setIsCardFlipped(false)} autoComplete="cc-name" />
                            <LightInput label="Card Number" type="text" value={cardNumber} onChange={handleCardNumberChange} onFocus={() => setIsCardFlipped(false)} maxLength={19} autoComplete="cc-number" />
                            <div className="grid grid-cols-2 gap-3">
                              <LightInput label="MM / YY" type="text" value={cardExpiry} onChange={handleExpiryChange} onFocus={() => setIsCardFlipped(false)} maxLength={5} autoComplete="cc-exp" />
                              <LightInput label="CVV" type="password" value={cardCvv} onChange={(e) => {
                                if (e.target.value.replace(/\D/g, '').length <= 3) setCardCvv(e.target.value.replace(/\D/g, ''))
                              }} onFocus={() => setIsCardFlipped(true)} onBlur={() => setIsCardFlipped(false)} maxLength={3} autoComplete="cc-csc" />
                            </div>

                            <button
                              type="submit"
                              className="w-full py-4 rounded-2xl font-sans font-bold text-sm tracking-widest uppercase bg-brand-dark hover:bg-brand-red text-brand-cream transition-all cursor-pointer shadow-lg shadow-brand-dark/20 mt-1"
                            >
                              🔒 Pay ₹{currentTier.price}/{currentTier.period}
                            </button>
                            <div className="flex justify-center gap-3 text-brand-grey/40 text-[9px] font-sans">
                              <span>✓ 256-Bit SSL</span><span>•</span><span>✓ Secure Gateway</span>
                            </div>
                          </form>
                        )}

                        {/* UPI */}
                        {paymentMethod === 'upi' && (
                          <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-3 gap-2">
                              {['Google Pay', 'PhonePe', 'Paytm'].map(app => (
                                <button
                                  key={app}
                                  type="button"
                                  onClick={() => setUpiId(`${membershipData.phone}@${app === 'Paytm' ? 'paytm' : app === 'PhonePe' ? 'ybl' : 'okaxis'}`)}
                                  className="py-2.5 rounded-xl border border-brand-dark/8 text-[10px] font-sans text-brand-grey hover:text-brand-red hover:border-brand-red/25 bg-brand-cream transition-all font-bold"
                                >
                                  {app}
                                </button>
                              ))}
                            </div>
                            <LightInput label="UPI ID (VPA)" type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                            <button
                              type="submit"
                              className="w-full py-4 rounded-2xl font-sans font-bold text-sm tracking-widest uppercase bg-brand-dark hover:bg-brand-red text-brand-cream transition-all cursor-pointer shadow-lg shadow-brand-dark/20"
                            >
                              🔒 Pay ₹{currentTier.price}/{currentTier.period}
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* ─── PROCESSING ───────────────────────────────────────────────────── */}
        {paymentStep === 'processing' && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center gap-10">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-brand-red/20 border-t-brand-red animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🔒</div>
            </div>
            <div className="text-center max-w-sm">
              <span className="font-sans text-[10px] font-black text-brand-grey uppercase tracking-[0.4em] animate-pulse block mb-3">
                Processing Payment
              </span>
              <p className="font-sans text-sm text-brand-grey leading-relaxed">{processingStatus}</p>
            </div>
            <div className="w-64 h-1 bg-brand-light-grey rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand-red rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            </div>
          </div>
        )}

        {/* ─── SUCCESS ──────────────────────────────────────────────────────── */}
        {paymentStep === 'success' && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center gap-10 text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-500/20 flex items-center justify-center shadow-xl shadow-emerald-500/10"
            >
              <svg className="w-10 h-10 text-emerald-600 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h2 className="font-serif text-4xl md:text-6xl text-brand-dark uppercase tracking-tight leading-[0.88] mb-4">
                Welcome to the<br />
                <span className="text-brand-red">Movement</span>
              </h2>
              <p className="font-sans text-sm text-brand-grey leading-relaxed max-w-md mx-auto">
                Thank you, {membershipData.name}. Your {currentTier.title} membership has been confirmed. Our coordinators will reach out within 24 hours.
              </p>
            </motion.div>

            {/* Membership Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full max-w-md relative rounded-3xl overflow-hidden border border-brand-dark/8 shadow-2xl"
            >
              {/* Card Header */}
              <div className="relative bg-linear-to-br from-brand-dark via-[#1a1a1a] to-[#0f0f0f] px-8 py-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-red/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-amber-500/8 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-sans text-[8px] font-black uppercase tracking-[0.4em] text-brand-cream/30 block mb-1">Aadi Shakti Mission</span>
                      <h3 className="font-serif text-2xl text-brand-cream uppercase tracking-tight">{currentTier.title}</h3>
                    </div>
                    <span className="text-2xl">{currentTier.icon}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[7px] text-brand-cream/30 font-mono tracking-wider block">MEMBER NAME</span>
                      <span className="font-sans text-sm font-bold text-brand-cream uppercase tracking-wide">{membershipData.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[7px] text-brand-cream/30 font-mono tracking-wider block">MEMBER ID</span>
                      <span className="font-mono text-xs font-bold text-brand-cream/70">{memberId}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="bg-brand-white px-8 py-6 flex flex-col gap-3">
                <span className="font-sans text-[8px] font-black tracking-[0.3em] text-brand-grey uppercase">Transaction Receipt</span>
                {[
                  { label: 'Transaction ID', value: transactionId, mono: true },
                  { label: 'Membership Tier', value: currentTier.title },
                  { label: 'Amount', value: currentTier.price === 0 ? '₹0 · Free Registration' : `₹${currentTier.price} / ${currentTier.period}` },
                  { label: 'Status', value: 'Confirmed & Active', green: true }
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center border-b border-brand-dark/5 pb-2.5 last:border-0 last:pb-0">
                    <span className="font-sans text-[10px] text-brand-grey uppercase tracking-wider">{row.label}</span>
                    <span className={`font-bold text-[10px] ${row.mono ? 'font-mono text-brand-dark' : row.green ? 'text-emerald-600' : 'text-brand-dark'}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={onBack}
              className="px-10 py-4 rounded-2xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-cream hover:bg-brand-dark hover:text-brand-cream text-brand-dark transition-all cursor-pointer border border-brand-dark/10 shadow-sm"
            >
              Return to Homepage
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MembershipPayment
