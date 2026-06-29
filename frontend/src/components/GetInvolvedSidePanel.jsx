import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Shield } from 'lucide-react'

// Floating Label Input Component (matching brand design language)
const FloatInput = ({ label, type = 'text', name, value, onChange, error, prefix }) => {
  const [focused, setFocused] = useState(false)
  const hasValue = value !== '' && value !== undefined
  const isActive = focused || hasValue

  return (
    <div className="relative">
      <div className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        error
          ? 'border-red-400 bg-red-50/40'
          : focused
          ? 'border-brand-red/40 bg-brand-white shadow-md shadow-brand-red/5'
          : 'border-brand-dark/10 bg-brand-white hover:border-brand-dark/20'
      }`}>
        {prefix && (
          <span className={`absolute left-4 font-sans font-bold text-sm pointer-events-none transition-all duration-300 ${
            isActive ? 'top-5 text-brand-dark/50' : 'top-1/2 -translate-y-1/2 text-brand-grey/60'
          }`}>{prefix}</span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          className={`peer w-full bg-transparent pt-6 pb-2 text-sm font-sans text-brand-dark focus:outline-none ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
        />
        <label className={`absolute font-sans text-[10px] font-bold uppercase tracking-widest pointer-events-none transition-all duration-300 ${prefix ? 'left-8' : 'left-4'} ${
          isActive ? 'top-2 text-brand-red/70 scale-90 origin-left' : 'top-1/2 -translate-y-1/2 text-brand-grey/50'
        }`}>
          {label}
        </label>
      </div>
      {error && (
        <span className="text-[10px] text-brand-red font-semibold font-sans mt-1 block pl-1">✕ {error}</span>
      )}
    </div>
  )
}

const GetInvolvedSidePanel = ({ isOpen, onClose, defaultMode = 'donation', onProceedDonation, onProceedMember }) => {
  const [mode, setMode] = useState(defaultMode) // 'donation' or 'membership'
  
  // Membership Form state
  const [memberForm, setMemberForm] = useState({ name: '', phone: '', email: '' })
  const [memberErrors, setMemberErrors] = useState({})
  const [selectedTier, setSelectedTier] = useState('advocate')

  // Donation Form state
  const [donationForm, setDonationForm] = useState({ name: '', phone: '', email: '', amount: '1500' })
  const [selectedChip, setSelectedChip] = useState('1500')
  const [donationErrors, setDonationErrors] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('general')

  // Update mode when defaultMode changes upon opening
  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode)
      // Reset forms and errors on open
      setMemberErrors({})
      setDonationErrors({})
    }
  }, [isOpen, defaultMode])

  // Scroll lock when side panel is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('lenis-stopped')
    } else {
      document.documentElement.classList.remove('lenis-stopped')
    }
    return () => {
      document.documentElement.classList.remove('lenis-stopped')
    }
  }, [isOpen])

  const membershipTiers = [
    {
      id: 'volunteer',
      icon: '🤝',
      title: 'Volunteer',
      price: 'Free',
      tagline: 'Grassroots Force',
      desc: 'Dedicate your time and skills directly in field programs.',
    },
    {
      id: 'advocate',
      icon: '📣',
      title: 'Advocate',
      price: '₹500/mo',
      tagline: 'Movement Builder',
      desc: 'Lead chapters, campaigns, and sustained local community projects.',
      featured: true
    },
    {
      id: 'patron',
      icon: '🌟',
      title: 'Patron',
      price: '₹2,500/mo',
      tagline: 'Sustained Pillar',
      desc: 'Fund infrastructure, teacher honorariums, and digital classrooms.',
    }
  ]

  const donationChips = [
    { value: '500', label: '₹500' },
    { value: '1500', label: '₹1.5k' },
    { value: '5000', label: '₹5k' },
    { value: '10000', label: '₹10k' },
  ]

  const categories = [
    { id: 'general', label: 'General Operations', icon: '⚡' },
    { id: 'learning-hub', label: 'Learning Hubs', icon: '📚' },
    { id: 'neighborhoods', label: 'Healthcare Access', icon: '🏥' },
    { id: 'youth', label: 'Youth Skills', icon: '💡' },
    { id: 'mother-earth', label: 'Afforestation', icon: '🌱' },
  ]

  const getImpactCopy = (amountStr) => {
    const amt = parseFloat(amountStr)
    if (isNaN(amt) || amt <= 0) return 'Every contribution fuels grassroots mountain development projects directly.'
    if (amt < 500) return `₹${amt} supplies a rural child with one month of learning materials and notebooks.`
    if (amt < 1000) return `₹${amt} funds a medical diagnostic screening pack for a rural mother.`
    if (amt < 2500) return `₹${amt} provides vocational training modules for a female entrepreneur.`
    if (amt < 5000) return `₹${amt} installs a dual-stage clean water filtration unit for a school.`
    return `₹${amt} contributes to solar energy infrastructure and long-term community development.`
  }

  // Input handlers
  const handleMemberChange = (e) => {
    const { name, value } = e.target
    setMemberForm(prev => ({ ...prev, [name]: value }))
    if (memberErrors[name]) setMemberErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleDonationChange = (e) => {
    const { name, value } = e.target
    setDonationForm(prev => ({ ...prev, [name]: value }))
    if (name === 'amount') {
      const chips = ['500', '1500', '5000', '10000']
      setSelectedChip(chips.includes(value) ? value : '')
    }
    if (donationErrors[name]) setDonationErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleChipSelect = (val) => {
    setSelectedChip(val)
    setDonationForm(prev => ({ ...prev, amount: val }))
    if (donationErrors.amount) setDonationErrors(prev => ({ ...prev, amount: '' }))
  }

  // Validators
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const validatePhone = (phone) => {
    return /^\+?([0-9\s\-()]{7,15})$/.test(phone.trim())
  }

  // Submit Actions
  const handleMemberSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!memberForm.name.trim()) errs.name = 'Full name is required'
    if (!memberForm.phone.trim()) errs.phone = 'Phone number is required'
    else if (!validatePhone(memberForm.phone)) errs.phone = 'Invalid phone number format'
    
    if (!memberForm.email.trim()) errs.email = 'Email address is required'
    else if (!validateEmail(memberForm.email)) errs.email = 'Invalid email address'

    if (Object.keys(errs).length > 0) {
      setMemberErrors(errs)
      return
    }
    
    onProceedMember({
      name: memberForm.name,
      email: memberForm.email,
      phone: memberForm.phone,
      tier: selectedTier
    })
  }

  const handleDonationSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!donationForm.name.trim()) errs.name = 'Name is required'
    if (!donationForm.phone.trim()) errs.phone = 'Phone number is required'
    else if (!validatePhone(donationForm.phone)) errs.phone = 'Invalid phone number format'

    if (!donationForm.email.trim()) errs.email = 'Email address is required'
    else if (!validateEmail(donationForm.email)) errs.email = 'Invalid email address'

    const amt = parseFloat(donationForm.amount)
    if (isNaN(amt) || amt < 100) errs.amount = 'Minimum donation is ₹100'

    if (Object.keys(errs).length > 0) {
      setDonationErrors(errs)
      return
    }

    onProceedDonation({
      donorName: donationForm.name,
      donorEmail: donationForm.email,
      donorPhone: donationForm.phone,
      amount: amt,
      category: selectedCategory
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/45 backdrop-blur-md z-99999"
          />

          {/* Panel Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg md:max-w-xl bg-brand-cream border-l border-brand-dark/10 shadow-[0_0_60px_rgba(0,0,0,0.12)] z-999999 flex flex-col overflow-hidden"
            data-cursor="default"
          >
            {/* Header */}
            <div className="px-6 md:px-8 py-6 border-b border-brand-dark/10 flex items-center justify-between bg-brand-cream/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex flex-col items-start">
                <h2 className="font-serif text-2xl md:text-3xl text-brand-dark uppercase tracking-tight font-black leading-none">
                  Get Involved
                </h2>
                <span className="font-sans text-[9px] font-black text-brand-grey uppercase tracking-[0.25em] mt-1.5 ml-1 leading-none">
                  Aadi Shakti Mission
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-brand-dark/10 hover:border-brand-red flex items-center justify-center hover:bg-brand-red hover:text-brand-cream transition-all duration-300 group"
                aria-label="Close panel"
              >
                <X className="w-4 h-4 text-brand-dark group-hover:text-brand-cream transition-colors" />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div 
              className="flex-1 overflow-y-auto px-6 md:px-8 py-6 flex flex-col gap-6"
              data-lenis-prevent
            >
              {/* Segmented Filter Toggle */}
              <div className="relative p-1 bg-brand-dark/5 rounded-2xl flex items-center select-none">
                <button
                  type="button"
                  onClick={() => setMode('donation')}
                  className={`flex-1 py-3 text-center font-sans text-[10px] font-bold uppercase tracking-[0.15em] rounded-xl transition-all duration-300 relative z-10 cursor-pointer ${
                    mode === 'donation' ? 'text-brand-cream' : 'text-brand-grey/80 hover:text-brand-dark'
                  }`}
                >
                  Make a Donation
                </button>
                <button
                  type="button"
                  onClick={() => setMode('membership')}
                  className={`flex-1 py-3 text-center font-sans text-[10px] font-bold uppercase tracking-[0.15em] rounded-xl transition-all duration-300 relative z-10 cursor-pointer ${
                    mode === 'membership' ? 'text-brand-cream' : 'text-brand-grey/80 hover:text-brand-dark'
                  }`}
                >
                  Become a Member
                </button>

                {/* Animated Background Indicator */}
                <motion.div
                  className="absolute top-1 bottom-1 bg-brand-red rounded-xl shadow-md"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{
                    left: mode === 'donation' ? '4px' : '50%',
                    right: mode === 'donation' ? '50%' : '4px',
                    width: 'calc(50% - 4px)'
                  }}
                />
              </div>

              {/* Mode Specific Layouts */}
              {mode === 'donation' ? (
                /* DONATION FORM */
                <form onSubmit={handleDonationSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4">
                    <FloatInput
                      label="Your Full Name"
                      name="name"
                      value={donationForm.name}
                      onChange={handleDonationChange}
                      error={donationErrors.name}
                    />
                    <FloatInput
                      label="Email Address"
                      type="email"
                      name="email"
                      value={donationForm.email}
                      onChange={handleDonationChange}
                      error={donationErrors.email}
                    />
                    <FloatInput
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={donationForm.phone}
                      onChange={handleDonationChange}
                      error={donationErrors.phone}
                    />
                  </div>

                  {/* Donation Amount Segment */}
                  <div className="flex flex-col gap-3">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-grey">
                      Donation Amount
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {donationChips.map(chip => (
                        <button
                          key={chip.value}
                          type="button"
                          onClick={() => handleChipSelect(chip.value)}
                          className={`py-3 rounded-xl border text-center font-sans text-xs font-bold transition-all duration-300 cursor-pointer ${
                            selectedChip === chip.value
                              ? 'bg-brand-red border-transparent text-brand-cream shadow-md shadow-brand-red/10 -translate-y-0.5'
                              : 'bg-brand-white border-brand-dark/10 text-brand-dark hover:border-brand-red/35'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>

                    <FloatInput
                      label="Custom Amount"
                      type="number"
                      name="amount"
                      value={donationForm.amount}
                      onChange={handleDonationChange}
                      error={donationErrors.amount}
                      prefix="₹"
                    />
                  </div>

                  {/* Category Selector */}
                  <div className="flex flex-col gap-3">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-grey">
                      Direct funds to
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2.5 rounded-full border text-xs font-sans font-medium flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                            selectedCategory === cat.id
                              ? 'bg-brand-red/10 border-brand-red text-brand-dark font-semibold'
                              : 'bg-brand-white border-brand-dark/8 text-brand-grey hover:border-brand-red/20'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Impact Copy Widget */}
                  <div className="p-4 rounded-2xl bg-brand-white border border-brand-dark/5 shadow-inner-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Heart className="w-3.5 h-3.5 text-brand-red fill-brand-red" />
                      </div>
                      <div className="flex-1">
                        <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-brand-red block mb-1">
                          Social Impact
                        </span>
                        <p className="font-sans text-xs text-brand-dark/75 leading-relaxed font-light">
                          {getImpactCopy(donationForm.amount)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submission CTA */}
                  <button
                    type="submit"
                    className="w-full py-4 mt-2 rounded-2xl bg-brand-red text-brand-cream font-sans text-xs font-black uppercase tracking-[0.25em] hover:bg-brand-cream hover:text-brand-dark hover:border hover:border-brand-dark transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer text-center"
                  >
                    Proceed to Payment
                  </button>
                </form>
              ) : (
                /* MEMBERSHIP FORM */
                <form onSubmit={handleMemberSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <FloatInput
                      label="Your Full Name"
                      name="name"
                      value={memberForm.name}
                      onChange={handleMemberChange}
                      error={memberErrors.name}
                    />
                    <FloatInput
                      label="Email Address"
                      type="email"
                      name="email"
                      value={memberForm.email}
                      onChange={handleMemberChange}
                      error={memberErrors.email}
                    />
                    <FloatInput
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={memberForm.phone}
                      onChange={handleMemberChange}
                      error={memberErrors.phone}
                    />
                  </div>

                  {/* Membership Tier Cards */}
                  <div className="flex flex-col gap-3">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-grey">
                      Choose Membership Tier
                    </span>
                    <div className="flex flex-col gap-3">
                      {membershipTiers.map(tier => {
                        const isSelected = selectedTier === tier.id
                        return (
                          <div
                            key={tier.id}
                            onClick={() => setSelectedTier(tier.id)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col gap-2 ${
                              isSelected
                                ? 'bg-brand-red/5 border-brand-red/40 shadow-md shadow-brand-red/5'
                                : 'bg-brand-white border-brand-dark/10 hover:border-brand-red/20'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 rounded-full blur-xl pointer-events-none" />
                            )}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{tier.icon}</span>
                                <div className="flex flex-col">
                                  <span className="font-sans text-xs font-bold text-brand-dark">
                                    {tier.title}
                                  </span>
                                  <span className="font-sans text-[8px] font-bold uppercase text-brand-grey/70 tracking-wider">
                                    {tier.tagline}
                                  </span>
                                </div>
                              </div>
                              <span className="font-serif text-sm font-black text-brand-red">
                                {tier.price}
                              </span>
                            </div>
                            <p className="font-sans text-[10px] text-brand-grey font-light leading-relaxed">
                              {tier.desc}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Security Assurance */}
                  <div className="p-3 bg-brand-white rounded-2xl border border-brand-dark/5 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-brand-grey shrink-0" />
                    <div className="flex-1">
                      <span className="font-sans text-[8px] font-bold uppercase text-brand-grey/85 tracking-widest block">
                        Privacy Secured
                      </span>
                      <p className="font-sans text-[9px] text-brand-grey/65 font-light">
                        We never share your personal information. Verified 80G compliant NGO.
                      </p>
                    </div>
                  </div>

                  {/* Submission CTA */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-brand-red text-brand-cream font-sans text-xs font-black uppercase tracking-[0.25em] hover:bg-brand-cream hover:text-brand-dark hover:border hover:border-brand-dark transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer text-center"
                  >
                    {selectedTier === 'volunteer' ? 'Register Now' : 'Proceed to Payment'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default GetInvolvedSidePanel
