import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

// ─── Floating Label Input (light) ─────────────────────────────────────────────
const LightInput = ({ label, type = 'text', value, onChange, maxLength, autoComplete, onFocus: onFocusProp, onBlur: onBlurProp }) => {
  const [focused, setFocused] = useState(false)
  const hasValue = value !== '' && value !== undefined

  return (
    <div className="relative">
      <div className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        focused
          ? 'border-brand-skyblue/50 bg-brand-white shadow-md shadow-brand-skyblue/8'
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
            ? 'top-2 text-brand-skyblue/70 scale-90 origin-left'
            : 'top-1/2 -translate-y-1/2 text-brand-grey/50'
        }`}>
          {label}
        </label>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const DonationPayment = ({ donationData, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [paymentStep, setPaymentStep] = useState('input')
  const [processingStatus, setProcessingStatus] = useState('Initiating secure portal...')
  const [transactionId, setTransactionId] = useState('')
  const [certificateId, setCertificateId] = useState('')

  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState(donationData.donorName || '')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  const [upiId, setUpiId] = useState('')

  const containerRef = useRef(null)

  const categories = [
    { id: 'general', title: 'General Operations' },
    { id: 'learning-hub', title: 'Village Learning Hub' },
    { id: 'neighborhoods', title: 'Nurturing Our Neighborhoods' },
    { id: 'youth', title: 'Empowering Youth' },
    { id: 'mother-earth', title: 'For Mother Earth' }
  ]

  const currentCategory = categories.find(c => c.id === donationData.category) || categories[0]
  const amount = donationData.amount || 0

  const getImpactDescription = (amt) => {
    if (amt <= 0) return 'Your contribution matters.'
    if (amt < 500) return `Your ₹${amt} supplies learning kits, notebooks, and writing materials to a rural girl child for a full month.`
    if (amt < 1000) return `Your ₹${amt} funds a comprehensive medical diagnostic screening and sanitary health pack for a rural mother.`
    if (amt < 2500) return `Your ₹${amt} provides full vocational tailoring training modules and a starter kit for a female entrepreneur.`
    if (amt < 5000) return `Your ₹${amt} installs a dual-stage clean water filter unit or buys 25 native tree saplings for community conservation.`
    return `Your ₹${amt} contributes to solar energy infrastructure, establishing solar panel blocks or supporting long-term community outreach.`
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

  const handleCardNumberChange = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16)
    setCardNumber(v.replace(/(\d{4})/g, '$1 ').trim())
  }

  const handleExpiryChange = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2)
    setCardExpiry(v)
  }

  const handleCvvChange = (e) => {
    const v = e.target.value.replace(/\D/g, '')
    if (v.length <= 3) setCardCvv(v)
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
    let i = 0; setProcessingStatus(statuses[0])
    const iv = setInterval(() => {
      if (i < statuses.length - 1) { i++; setProcessingStatus(statuses[i]) }
    }, 900)
    setTimeout(() => {
      clearInterval(iv)
      setTransactionId(`ASM-DON-${Math.floor(100000 + Math.random() * 900000)}-TX`)
      setCertificateId(`ASM-80G-${Math.floor(1000 + Math.random() * 9000)}`)
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-skyblue/8 blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-[160px]" />
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

            {/* LEFT: Donation Summary */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-brand-skyblue" />
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-brand-skyblue">Secure Donation</span>
                </div>
                <h1 className="font-serif text-5xl md:text-7xl text-brand-dark uppercase tracking-tight leading-[0.88] mb-5">
                  Complete Your<br />
                  <span className="text-brand-red">Donation</span>
                </h1>
                <p className="font-sans text-sm text-brand-grey font-light leading-relaxed max-w-xl">
                  100% of your contribution goes directly into field operations — procuring materials, conducting camps, and funding skill-development kits.
                </p>
              </motion.div>

              {/* Donation Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative p-8 rounded-3xl border border-brand-skyblue/20 bg-brand-white shadow-lg overflow-hidden"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-brand-skyblue/40 rounded-l-3xl" />
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-skyblue/5 blur-3xl" />

                <div className="relative z-10">
                  <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-brand-skyblue font-bold block mb-2">Donation Summary</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-brand-dark uppercase tracking-tight mb-5">
                    Your ₹{amount} Contribution
                  </h2>

                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="font-sans text-[9px] font-black tracking-widest text-brand-grey uppercase px-3 py-1 bg-brand-cream rounded-lg border border-brand-dark/8 inline-block">
                        {currentCategory.title}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-brand-dark/70 leading-relaxed">
                      {getImpactDescription(amount)}
                    </p>

                    {/* 80G */}
                    <div className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 mt-2">
                      <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <span className="font-sans text-[9px] font-black text-emerald-700 uppercase tracking-wider block mb-1">80G Tax Exemption Eligible</span>
                        <p className="font-sans text-[10px] text-emerald-700/70 leading-relaxed">
                          50% tax deduction under Section 80G. An official receipt will be emailed immediately after payment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Trust Stats */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="grid grid-cols-3 gap-4 p-6 rounded-2xl border border-brand-dark/6 bg-brand-white shadow-sm"
              >
                {[
                  { label: 'Transparency', value: '100%', desc: 'Funds reach ground' },
                  { label: 'Zero Overhead', value: '₹0', desc: 'Administrative cost' },
                  { label: 'Tax Benefit', value: '50%', desc: 'Under Section 80G' }
                ].map((item, i) => (
                  <div key={item.label} className={`text-center ${i !== 0 ? 'border-l border-brand-dark/6' : ''}`}>
                    <div className="font-serif text-xl md:text-2xl text-brand-red font-bold">{item.value}</div>
                    <div className="font-sans text-[8px] text-brand-grey uppercase tracking-wider mt-1">{item.desc}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: Checkout Terminal */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="sticky top-28"
              >
                <div className="relative rounded-3xl overflow-hidden border border-brand-dark/6 shadow-2xl">
                  {/* Header */}
                  <div className="relative bg-brand-cream px-8 py-7 overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-red/20 blur-3xl" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                        <span className="font-sans text-[9px] font-black uppercase tracking-[0.3em] text-brand-dark/40">Secure Payment</span>
                      </div>
                      <h2 className="font-serif text-4xl text-brand-dark uppercase tracking-tight leading-[0.88]">Checkout</h2>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="font-serif text-2xl font-bold text-brand-dark">₹{amount}</span>
                        <span className="font-sans text-xs text-brand-dark/40">→ {currentCategory.title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="bg-brand-cream/60 px-8 py-4 border-b border-brand-dark/6">
                    <div className="flex flex-col gap-1.5 font-sans text-[10px]">
                      <div className="flex justify-between items-center">
                        <span className="text-brand-grey uppercase tracking-wider">Donor</span>
                        <span className="font-bold text-brand-dark">{(donationData.donorName || '').toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-brand-grey uppercase tracking-wider">Email</span>
                        <span className="font-bold text-brand-grey text-[9px]">{donationData.donorEmail || ''}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Form */}
                  <div className="bg-brand-white px-8 py-7">
                    {/* Method Tabs */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {[{ id: 'card', label: '💳 Card' }, { id: 'upi', label: '📱 UPI' }].map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id)}
                          className={`py-3 rounded-xl font-sans font-bold text-xs uppercase cursor-pointer border transition-all ${
                            paymentMethod === m.id
                              ? 'bg-brand-cream border-brand-dark text-brand-dark'
                              : 'bg-brand-cream border-brand-dark/10 text-brand-dark hover:border-brand-dark/25'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    {/* Card Payment */}
                    {paymentMethod === 'card' && (
                      <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-5">
                        {/* Live Card Preview */}
                        <div
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                          className="relative w-full rounded-2xl overflow-hidden cursor-pointer select-none shadow-xl"
                          style={{ aspectRatio: '1.586' }}
                        >
                          <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-[#1a1a1a] to-brand-dark rounded-2xl" />
                          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-skyblue/20 blur-3xl" />
                          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-brand-red/15 blur-2xl" />

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
                                    <span className="text-[6px] text-brand-dark/30 tracking-widest font-mono">SECURE CHIP</span>
                                  </div>
                                  <span className="font-serif text-xs text-brand-skyblue font-bold">Aadi Shakti.</span>
                                </div>
                                <span className="font-mono text-sm md:text-base tracking-widest text-brand-dark/80">
                                  {cardNumber || '•••• •••• •••• ••••'}
                                </span>
                                <div className="flex justify-between items-end border-t border-white/8 pt-2">
                                  <div>
                                    <span className="text-[6px] text-brand-dark/30 font-mono tracking-wider block">HOLDER</span>
                                    <span className="font-sans text-[9px] font-bold uppercase tracking-wide text-brand-dark/70 truncate max-w-[130px]">
                                      {cardName || 'YOUR NAME'}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[6px] text-brand-dark/30 font-mono tracking-wider block">EXPIRY</span>
                                    <span className="font-mono text-[9px] font-bold text-brand-dark/70">{cardExpiry || 'MM/YY'}</span>
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
                                <div className="w-full h-8 bg-brand-cream/70 mb-4" />
                                <div className="flex items-center justify-end gap-3 px-5">
                                  <span className="text-[7px] text-brand-dark/30 font-mono tracking-wider">CVV</span>
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
                          <LightInput label="CVV" type="password" value={cardCvv} onChange={handleCvvChange} onFocus={() => setIsCardFlipped(true)} onBlur={() => setIsCardFlipped(false)} maxLength={3} autoComplete="cc-csc" />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 rounded-2xl font-sans font-bold text-sm tracking-widest uppercase bg-brand-cream hover:bg-brand-red text-brand-cream transition-all cursor-pointer shadow-lg shadow-brand-dark/20 mt-1"
                        >
                          🔒 Donate ₹{amount} Securely
                        </button>
                        <div className="flex justify-center gap-3 text-brand-grey/40 text-[9px] font-sans">
                          <span>✓ 256-Bit SSL</span><span>•</span><span>✓ 80G Eligible</span>
                        </div>
                      </form>
                    )}

                    {/* UPI Payment */}
                    {paymentMethod === 'upi' && (
                      <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-5">
                        {/* QR Code */}
                        <div className="flex flex-col items-center gap-4 p-5 rounded-2xl border border-brand-dark/8 bg-brand-cream">
                          <div className="w-36 h-36 bg-brand-white p-2 rounded-xl border border-brand-dark/8 shadow-sm">
                            <svg className="w-full h-full text-brand-dark" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                              <rect x="5" y="5" width="25" height="25" strokeWidth="6" />
                              <rect x="12" y="12" width="11" height="11" fill="currentColor" stroke="none" />
                              <rect x="70" y="5" width="25" height="25" strokeWidth="6" />
                              <rect x="77" y="12" width="11" height="11" fill="currentColor" stroke="none" />
                              <rect x="5" y="70" width="25" height="25" strokeWidth="6" />
                              <rect x="12" y="77" width="11" height="11" fill="currentColor" stroke="none" />
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
                              <circle cx="50" cy="50" r="12" fill="var(--color-brand-cream)" stroke="none" />
                              <text x="50" y="54" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="serif" fill="#9B0000">ASM</text>
                            </svg>
                          </div>
                          <div className="text-center">
                            <span className="font-sans text-[10px] font-bold text-brand-dark uppercase tracking-wider block">Scan to Pay</span>
                            <span className="font-sans text-[9px] text-brand-grey mt-1 block">Google Pay · PhonePe · Paytm · BHIM</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="h-px bg-brand-cream/8 flex-1" />
                          <span className="font-sans text-[9px] font-bold tracking-widest uppercase text-brand-grey">or enter VPA</span>
                          <div className="h-px bg-brand-cream/8 flex-1" />
                        </div>

                        <LightInput label="UPI ID (VPA)" type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} />

                        <button
                          type="submit"
                          className="w-full py-4 rounded-2xl font-sans font-bold text-sm tracking-widest uppercase bg-brand-cream hover:bg-brand-red text-brand-cream transition-all cursor-pointer shadow-lg shadow-brand-dark/20"
                        >
                          🔒 Verify &amp; Donate ₹{amount}
                        </button>
                      </form>
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
                Processing Donation
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
                Donation<br />
                <span className="text-brand-red">Received</span>
              </h2>
              <p className="font-sans text-sm text-brand-grey leading-relaxed max-w-md mx-auto">
                Thank you for your generous contribution. Your ₹{amount} has cleared our secure gateway and will reach the ground immediately.
              </p>
            </motion.div>

            {/* Digital Donation Certificate */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full max-w-md relative rounded-3xl overflow-hidden border border-brand-dark/8 shadow-2xl"
            >
              {/* Certificate Header */}
              <div className="relative bg-linear-to-br from-brand-dark via-[#1a1a1a] to-[#0f0f0f] px-8 py-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-skyblue/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-brand-red/15 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-sans text-[8px] font-black uppercase tracking-[0.4em] text-brand-dark/30 block mb-1">Aadi Shakti Mission</span>
                      <h3 className="font-serif text-xl text-brand-dark uppercase tracking-tight">Donation Certificate</h3>
                    </div>
                    <span className="font-sans text-[7px] font-black tracking-wider uppercase px-2 py-0.5 border border-emerald-400/30 text-emerald-300 bg-emerald-500/15 rounded-md">Verified</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[7px] text-brand-dark/30 font-mono tracking-wider block">DONOR NAME</span>
                      <span className="font-sans text-sm font-bold text-brand-dark uppercase tracking-wide">{donationData.donorName || ''}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[7px] text-brand-dark/30 font-mono tracking-wider block">AMOUNT</span>
                      <span className="font-serif text-2xl font-bold text-brand-dark">₹{amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="bg-brand-white px-8 py-6 flex flex-col gap-3">
                <span className="font-sans text-[8px] font-black tracking-[0.3em] text-brand-grey uppercase">Official Transaction Receipt</span>
                {[
                  { label: 'Certificate ID', value: certificateId, mono: true },
                  { label: 'Allocation Focus', value: currentCategory.title },
                  { label: 'Transaction ID', value: transactionId, mono: true },
                  { label: 'Tax Receipt', value: '80G Generated', green: true },
                  { label: 'Status', value: 'Confirmed', green: true }
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center border-b border-brand-dark/5 pb-2.5 last:border-0 last:pb-0">
                    <span className="font-sans text-[10px] text-brand-grey uppercase tracking-wider">{row.label}</span>
                    <span className={`font-bold text-[10px] ${row.mono ? 'font-mono text-brand-dark' : row.green ? 'text-emerald-600' : 'text-brand-dark'}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            >
              <button
                type="button"
                onClick={() => alert(`Generating PDF receipt: ${transactionId}`)}
                className="flex-1 py-3.5 rounded-2xl font-sans font-bold text-xs tracking-widest uppercase border border-brand-dark/10 bg-brand-white hover:border-brand-red hover:text-brand-red text-brand-dark transition-all cursor-pointer text-center shadow-sm"
              >
                📥 Download Receipt
              </button>
              <button
                type="button"
                onClick={onBack}
                className="flex-1 py-3.5 rounded-2xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-cream hover:bg-brand-red text-brand-cream transition-all cursor-pointer text-center shadow-lg"
              >
                Return Home
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonationPayment
