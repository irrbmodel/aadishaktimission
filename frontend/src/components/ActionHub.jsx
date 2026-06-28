import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ActionHub = ({ isLoaded, onProceed, mode = 'all' }) => {
  // Membership Form State
  const [memberForm, setMemberForm] = useState({ name: '', phone: '', email: '' })
  const [memberErrors, setMemberErrors] = useState({})

  // Donation Form State
  const [donationForm, setDonationForm] = useState({ name: '', phone: '', amount: '500' })
  const [selectedChip, setSelectedChip] = useState('500')
  const [donationErrors, setDonationErrors] = useState({})
  
  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [paymentStep, setPaymentStep] = useState('form') // 'form', 'processing', 'success'
  const [processingStatus, setProcessingStatus] = useState('')

  // Chip definitions and impact explanation mapping
  const chips = [
    { value: '500', label: '₹500', copy: '₹500 sponsors 1 village learning hub study kit for a rural child.' },
    { value: '1500', label: '₹1500', copy: '₹1500 sponsors vocational tailoring supplies for a female entrepreneur.' },
    { value: '5000', label: '₹5000', copy: '₹5000 installs a dual-stage clean water filtration unit for a school.' }
  ]

  const getImpactCopy = (amountStr) => {
    const amt = parseFloat(amountStr)
    if (isNaN(amt) || amt <= 0) return 'Every contribution fuels grassroots mountain development projects directly.'
    if (amt === 500) return '₹500 sponsors 1 village learning hub study kit for a rural child.'
    if (amt === 1500) return '₹1500 sponsors vocational tailoring supplies for a female entrepreneur.'
    if (amt === 5000) return '₹5000 installs a dual-stage clean water filtration unit for a school.'
    
    if (amt < 1000) {
      return `₹${amt} funds a monthly medical diagnostic screening and sanitary pack for a rural mother.`
    } else if (amt < 3000) {
      return `₹${amt} sponsors vocational training modules and kits for local youth artisans.`
    } else {
      return `₹${amt} contributes significantly to rural infrastructure, establishing solar panels or community hub libraries.`
    }
  }

  // Handle Membership Input Changes
  const handleMemberChange = (e) => {
    setMemberForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (memberErrors[e.target.name]) {
      setMemberErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }
  }

  const handleMemberSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!memberForm.name) errs.name = 'Name is required'
    if (!memberForm.phone) errs.phone = 'Phone number is required'
    if (!memberForm.email) errs.email = 'Email address is required'
    
    if (Object.keys(errs).length > 0) {
      setMemberErrors(errs)
      return
    }
    
    if (onProceed) {
      onProceed(memberForm)
    }
  }

  // Handle Donation Input Changes
  const handleDonationChange = (e) => {
    const val = e.target.value
    setDonationForm(prev => ({ ...prev, amount: val }))
    
    // De-select chip if custom amount is typed
    if (val !== '500' && val !== '1500' && val !== '5000') {
      setSelectedChip('')
    } else {
      setSelectedChip(val)
    }

    if (donationErrors.amount) {
      setDonationErrors(prev => ({ ...prev, amount: '' }))
    }
  }

  const handleChipSelect = (val) => {
    setSelectedChip(val)
    setDonationForm(prev => ({ ...prev, amount: val }))
    if (donationErrors.amount) {
      setDonationErrors(prev => ({ ...prev, amount: '' }))
    }
  }

  const handleDonationSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!donationForm.name) errs.name = 'Name is required'
    if (!donationForm.phone) errs.phone = 'Phone is required'
    const amt = parseFloat(donationForm.amount)
    if (isNaN(amt) || amt < 100) errs.amount = 'Minimum donation amount is ₹100'

    if (Object.keys(errs).length > 0) {
      setDonationErrors(errs)
      return
    }

    // Initialize drawer states and open the slider
    setUpiId('')
    setCardNumber('')
    setCardExpiry('')
    setCardCvv('')
    setCardName(donationForm.name)
    setPaymentStep('form')
    setIsDrawerOpen(true)
  }

  // Formatter for Card Inputs
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

  const handlePayNow = (e) => {
    e.preventDefault()
    setPaymentStep('processing')
    
    const steps = [
      'Establishing secure SSL gateway...',
      'Validating transaction token...',
      'Authorizing payment processing...',
      'Finalizing donation receipt...'
    ]

    let currentIdx = 0
    setProcessingStatus(steps[0])

    const interval = setInterval(() => {
      if (currentIdx < steps.length - 1) {
        currentIdx++
        setProcessingStatus(steps[currentIdx])
      } else {
        clearInterval(interval)
        setPaymentStep('success')
      }
    }, 900)
  }

  // Local helper templates to prevent code duplication
  const renderMembershipSection = () => (
    <div className="flex flex-col justify-start relative w-full">
      {/* Subtle background glow */}
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-brand-red/5 blur-3xl pointer-events-none" />
      
      <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-3">
        Join The Movement
      </span>
      <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-tight font-bold mb-4 leading-none">
        become a <span className="text-brand-red">member</span>
      </h2>
      <p className="font-sans text-xs md:text-sm text-brand-grey font-light leading-relaxed mb-12 max-w-md">
        Join the sisterhood of the hills. Sustain local Himalayan clinics, support rural libraries, and volunteer directly to construct self-reliant mountain economies.
      </p>

      <form onSubmit={handleMemberSubmit} className="flex flex-col gap-10 max-w-md w-full relative">
        {/* Input Name */}
        <div className="relative w-full">
          <input 
            type="text" 
            name="name"
            required
            value={memberForm.name}
            onChange={handleMemberChange}
            placeholder=" "
            className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-brand-red py-3 px-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
          />
          <label className="absolute left-1 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-brand-red peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-brand-red">
            Full Name
          </label>
          {memberErrors.name && (
            <span className="text-[10px] text-brand-red font-semibold font-sans mt-1 block">
              {memberErrors.name}
            </span>
          )}
        </div>

        {/* Input Phone */}
        <div className="relative w-full">
          <input 
            type="tel" 
            name="phone"
            required
            value={memberForm.phone}
            onChange={handleMemberChange}
            placeholder=" "
            className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-brand-red py-3 px-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
          />
          <label className="absolute left-1 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-brand-red peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-brand-red">
            Phone Number
          </label>
          {memberErrors.phone && (
            <span className="text-[10px] text-brand-red font-semibold font-sans mt-1 block">
              {memberErrors.phone}
            </span>
          )}
        </div>

        {/* Input Email */}
        <div className="relative w-full">
          <input 
            type="email" 
            name="email"
            required
            value={memberForm.email}
            onChange={handleMemberChange}
            placeholder=" "
            className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-brand-red py-3 px-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
          />
          <label className="absolute left-1 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-brand-red peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-brand-red">
            Email Address
          </label>
          {memberErrors.email && (
            <span className="text-[10px] text-brand-red font-semibold font-sans mt-1 block">
              {memberErrors.email}
            </span>
          )}
        </div>

        {/* Proceed Button */}
        <button
          type="submit"
          className="mt-4 py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-dark hover:bg-brand-red text-[#fdfbf7] transition-all cursor-pointer text-center relative group overflow-hidden"
          data-cursor="pointer"
        >
          <span className="relative z-10">Proceed</span>
          <div className="absolute inset-0 bg-brand-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0" />
        </button>
      </form>
    </div>
  )

  const renderDonationSection = (isSplit = false) => (
    <div className={`flex flex-col justify-start relative w-full ${isSplit ? 'lg:border-l lg:border-brand-dark/5 lg:pl-16 xl:pl-24' : ''}`}>
      {/* Subtle background glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

      <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-[#0ea5e9] mb-3">
        Direct Aid Interface
      </span>
      <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-tight font-bold mb-4 leading-none">
        direct <span className="text-[#0ea5e9]">donation</span>
      </h2>
      <p className="font-sans text-xs md:text-sm text-brand-grey font-light leading-relaxed mb-12 max-w-md">
        Sponsor a student's book kits, buy native trees for afforestation, or support women handloom cooperatives in Uttarakhand. Fuel community projects instantly.
      </p>

      <form onSubmit={handleDonationSubmit} className="flex flex-col gap-10 max-w-md w-full relative">
        {/* Input Name */}
        <div className="relative w-full">
          <input 
            type="text" 
            name="donorName"
            required
            value={donationForm.name}
            onChange={(e) => setDonationForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder=" "
            className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-[#0ea5e9] py-3 px-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
          />
          <label className="absolute left-1 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#0ea5e9] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-[#0ea5e9]">
            Your Name
          </label>
          {donationErrors.name && (
            <span className="text-[10px] text-brand-red font-semibold font-sans mt-1 block">
              {donationErrors.name}
            </span>
          )}
        </div>

        {/* Input Phone */}
        <div className="relative w-full">
          <input 
            type="tel" 
            name="donorPhone"
            required
            value={donationForm.phone}
            onChange={(e) => setDonationForm(prev => ({ ...prev, phone: e.target.value }))}
            placeholder=" "
            className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-[#0ea5e9] py-3 px-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
          />
          <label className="absolute left-1 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#0ea5e9] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-[#0ea5e9]">
            Phone Number
          </label>
          {donationErrors.phone && (
            <span className="text-[10px] text-brand-red font-semibold font-sans mt-1 block">
              {donationErrors.phone}
            </span>
          )}
        </div>

        {/* Input Donation Amount */}
        <div className="relative w-full flex items-center">
          <span className="absolute left-1 top-3 text-sm font-bold text-brand-dark font-sans select-none">₹</span>
          <input 
            type="number" 
            name="donorAmount"
            required
            value={donationForm.amount}
            onChange={handleDonationChange}
            placeholder=" "
            className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-[#0ea5e9] py-3 pl-5 pr-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
          />
          <label className="absolute left-5 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#0ea5e9] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-[#0ea5e9] peer-focus:left-1 peer-not-placeholder-shown:left-1">
            Donation Amount (INR)
          </label>
          {donationErrors.amount && (
            <span className="text-[10px] text-brand-red font-semibold font-sans mt-1 block absolute -bottom-5 left-0">
              {donationErrors.amount}
            </span>
          )}
        </div>

        {/* Preset select chips & micro-copy */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex gap-3">
            {chips.map(chip => (
              <button
                key={chip.value}
                type="button"
                onClick={() => handleChipSelect(chip.value)}
                className={`py-2.5 px-4 rounded-lg font-sans font-bold text-xs uppercase cursor-pointer border transition-all duration-300 ${
                  selectedChip === chip.value
                    ? 'bg-[#0ea5e9] border-[#0ea5e9] text-white shadow-md'
                    : 'bg-brand-white border-brand-dark/10 hover:border-[#0ea5e9] text-brand-dark'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
          
          {/* Dynamic Impact Micro-Copy */}
          <div className="bg-sky-500/5 rounded-xl p-3 border border-sky-500/10 min-h-[50px] flex items-center">
            <p className="font-sans text-xs text-brand-grey font-light leading-relaxed select-none">
              {getImpactCopy(donationForm.amount)}
            </p>
          </div>
        </div>

        {/* Proceed to Donate button */}
        <button
          type="submit"
          className="py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-dark hover:bg-[#0ea5e9] text-[#fdfbf7] transition-all cursor-pointer text-center relative group overflow-hidden"
          data-cursor="pointer"
        >
          <span className="relative z-10">Proceed to Donate</span>
          <div className="absolute inset-0 bg-[#0ea5e9] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0" />
        </button>
      </form>
    </div>
  )

  return (
    <section 
      id="action-hub" 
      className="relative w-full py-16 bg-[#fdfbf7] text-brand-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {mode === 'all' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {renderMembershipSection()}
            {renderDonationSection(true)}
          </div>
        )}

        {mode === 'membership' && (
          <div className="w-full max-w-xl mx-auto bg-brand-white border border-brand-dark/5 p-8 md:p-12 rounded-[24px] shadow-xl relative border-fine transform-gpu">
            {renderMembershipSection()}
          </div>
        )}

        {mode === 'donation' && (
          <div className="w-full max-w-xl mx-auto bg-brand-white border border-brand-dark/5 p-8 md:p-12 rounded-[24px] shadow-xl relative border-fine transform-gpu">
            {renderDonationSection(false)}
          </div>
        )}

      </div>

      {/* Slide-out Donation Checkout Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-9999998 bg-brand-dark/65 backdrop-blur-sm cursor-pointer"
            />

            {/* Sidebar Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-9999999 bg-brand-white shadow-2xl flex flex-col text-brand-dark overflow-hidden border-l border-brand-dark/5"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-brand-dark/5 flex items-center justify-between bg-brand-cream/30">
                <div>
                  <h3 className="font-serif text-lg font-bold tracking-tight uppercase leading-none">
                    secure checkout
                  </h3>
                  <span className="font-sans text-[7px] font-black tracking-widest text-[#0ea5e9] uppercase block mt-1">
                    Direct Aid Interface
                  </span>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-brand-grey hover:text-brand-red cursor-pointer py-1 px-3 border border-brand-dark/10 rounded-full hover:bg-brand-red/5 transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Drawer Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                
                {/* Summary Box */}
                <div className="bg-sky-500/5 border border-sky-500/10 rounded-2xl p-5 flex flex-col gap-2">
                  <span className="font-sans text-[8px] font-black tracking-wider text-brand-grey uppercase">
                    CONTRIBUTION SUMMARY
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs text-brand-grey">Donor name: {donationForm.name}</span>
                    <span className="font-serif text-xl font-bold text-brand-dark">₹{donationForm.amount}</span>
                  </div>
                  <p className="font-sans text-[10px] text-brand-grey font-light leading-relaxed mt-1 border-t border-sky-500/10 pt-2">
                    {getImpactCopy(donationForm.amount)}
                  </p>
                </div>

                {paymentStep === 'form' && (
                  <form onSubmit={handlePayNow} className="flex flex-col gap-8 mt-2">
                    {/* Method Selector */}
                    <div className="flex flex-col gap-2">
                      <span className="font-sans text-[8px] font-black tracking-wider text-brand-grey uppercase">
                        CHOOSE GATEWAY
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('upi')}
                          className={`py-3 rounded-xl font-sans font-bold text-xs uppercase cursor-pointer border transition-all duration-300 ${
                            paymentMethod === 'upi'
                              ? 'bg-brand-dark border-brand-dark text-white'
                              : 'bg-brand-white border-brand-dark/10 hover:border-brand-dark text-brand-dark'
                          }`}
                        >
                          📱 UPI / Apps
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`py-3 rounded-xl font-sans font-bold text-xs uppercase cursor-pointer border transition-all duration-300 ${
                            paymentMethod === 'card'
                              ? 'bg-brand-dark border-brand-dark text-white'
                              : 'bg-brand-white border-brand-dark/10 hover:border-brand-dark text-brand-dark'
                          }`}
                        >
                          💳 Secure Card
                        </button>
                      </div>
                    </div>

                    {/* Form Fields: UPI */}
                    {paymentMethod === 'upi' ? (
                      <div className="flex flex-col gap-6">
                        {/* Quick UPI App buttons */}
                        <div className="flex flex-col gap-2">
                          <span className="font-sans text-[8px] font-black tracking-wider text-brand-grey uppercase">
                            POPULAR UPI APPS
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
                              <button
                                key={app}
                                type="button"
                                onClick={() => setUpiId(`${donationForm.phone}@${app === 'Paytm' ? 'paytm' : app === 'PhonePe' ? 'ybl' : 'okaxis'}`)}
                                className="py-2.5 px-1 border border-brand-dark/5 rounded-lg text-[10px] font-sans text-brand-grey hover:text-[#0ea5e9] hover:border-[#0ea5e9] bg-brand-cream/10 transition-all font-bold"
                              >
                                {app}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* UPI ID input */}
                        <div className="relative w-full">
                          <input
                            type="text"
                            required
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder=" "
                            className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-[#0ea5e9] py-3 px-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
                          />
                          <label className="absolute left-1 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#0ea5e9] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-[#0ea5e9]">
                            ENTER UPI ID (VPA)
                          </label>
                        </div>
                      </div>
                    ) : (
                      /* Form Fields: Card */
                      <div className="flex flex-col gap-6">
                        {/* Card Number */}
                        <div className="relative w-full">
                          <input
                            type="text"
                            required
                            maxLength="19"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder=" "
                            className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-[#0ea5e9] py-3 px-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
                          />
                          <label className="absolute left-1 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#0ea5e9] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-[#0ea5e9]">
                            Card Number
                          </label>
                        </div>

                        {/* Exp / CVV split */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative w-full">
                            <input
                              type="text"
                              required
                              maxLength="5"
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              placeholder=" "
                              className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-[#0ea5e9] py-3 px-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
                            />
                            <label className="absolute left-1 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#0ea5e9] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-[#0ea5e9]">
                              Expiry (MM/YY)
                            </label>
                          </div>
                          <div className="relative w-full">
                            <input
                              type="password"
                              required
                              maxLength="3"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                              placeholder=" "
                              className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-[#0ea5e9] py-3 px-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
                            />
                            <label className="absolute left-1 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#0ea5e9] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-[#0ea5e9]">
                              CVV (***)
                            </label>
                          </div>
                        </div>

                        {/* Cardholder Name */}
                        <div className="relative w-full">
                          <input
                            type="text"
                            required
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder=" "
                            className="peer w-full bg-transparent border-b border-brand-dark/20 focus:border-[#0ea5e9] py-3 px-1 text-sm font-sans text-brand-dark focus:outline-none transition-colors"
                          />
                          <label className="absolute left-1 top-3 font-sans text-xs font-bold text-brand-grey/50 uppercase tracking-widest pointer-events-none transition-all duration-300 origin-left peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#0ea5e9] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-[#0ea5e9]">
                            Cardholder Name
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Pay Button */}
                    <button
                      type="submit"
                      className="w-full mt-4 py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-[#0ea5e9] hover:bg-[#0284c7] text-white transition-all cursor-pointer text-center relative overflow-hidden shadow-lg shadow-sky-500/10"
                    >
                      🔒 Pay ₹{donationForm.amount} securely
                    </button>

                    {/* Trust Indicators */}
                    <div className="flex justify-center items-center gap-2 text-brand-grey opacity-60 text-[9px] font-sans">
                      <span>✓ 256-Bit SSL Encryption</span>
                      <span>•</span>
                      <span>✓ 80G Tax Exemption Eligible</span>
                    </div>
                  </form>
                )}

                {/* Drawer Processing State */}
                {paymentStep === 'processing' && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12">
                    {/* Ring Spinner */}
                    <div className="w-12 h-12 rounded-full border-[3px] border-[#0ea5e9]/20 border-t-[#0ea5e9] animate-spin" />
                    <div className="text-center flex flex-col gap-2">
                      <span className="font-sans text-[10px] font-black text-brand-grey uppercase tracking-widest animate-pulse">
                        PROCESSING TRANSACTION
                      </span>
                      <p className="font-sans text-xs text-brand-grey/80 leading-relaxed max-w-xs font-light">
                        {processingStatus}
                      </p>
                    </div>
                  </div>
                )}

                {/* Drawer Success State */}
                {paymentStep === 'success' && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-8 py-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shadow-lg mx-auto">
                      <svg className="w-7 h-7 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl uppercase tracking-tight font-bold mb-2">
                        donation received
                      </h3>
                      <p className="font-sans text-xs text-brand-grey font-light max-w-xs leading-relaxed">
                        Thank you, {donationForm.name}. Your contribution has successfully cleared our secure gateway.
                      </p>
                    </div>

                    {/* Transaction Details Receipt */}
                    <div className="w-full bg-brand-cream/30 border border-brand-dark/5 p-5 rounded-2xl flex flex-col gap-3 font-sans text-xs text-left">
                      <span className="font-sans text-[8px] font-black tracking-widest text-brand-grey uppercase block mb-1">
                        OFFICIAL TRANSACTION RECEIPT
                      </span>
                      <div className="flex justify-between items-center text-brand-grey border-b border-brand-dark/5 pb-2">
                        <span>TRANSACTION ID</span>
                        <span className="font-mono font-bold text-brand-dark text-[10px]">TXN_DON_{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                      <div className="flex justify-between items-center text-brand-grey border-b border-brand-dark/5 pb-2">
                        <span>FUNDS ALLOCATED</span>
                        <span className="font-bold text-brand-dark uppercase text-[10px]">₹{donationForm.amount}</span>
                      </div>
                      <div className="flex justify-between items-center text-brand-grey pb-1">
                        <span>TAX RECEIPT STATUS</span>
                        <span className="font-bold text-emerald-600 uppercase text-[9px] px-1.5 py-0.5 bg-emerald-50 border border-emerald-500/25 rounded-md">80G Generated</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="w-full py-3.5 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-dark hover:bg-[#0ea5e9] text-white transition-all cursor-pointer text-center"
                    >
                      Finish
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ActionHub
