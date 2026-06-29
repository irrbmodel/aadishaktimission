import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Animated Counter ─────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, prefix = '', suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString('en-IN')}{suffix}</span>
}

// ─── Floating Label Input (light theme) ──────────────────────────────────────
const FloatInput = ({ label, type = 'text', name, value, onChange, error, prefix, accentColor = 'brand-red' }) => {
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
        <span className="text-[10px] text-brand-red font-semibold font-sans mt-1.5 block pl-1">✕ {error}</span>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const ActionHub = ({ isLoaded, onProceed, mode = 'all' }) => {
  const [memberForm, setMemberForm] = useState({ name: '', phone: '', email: '' })
  const [memberErrors, setMemberErrors] = useState({})
  const [selectedTierPreview, setSelectedTierPreview] = useState('advocate')

  const [donationForm, setDonationForm] = useState({ name: '', phone: '', amount: '1500' })
  const [selectedChip, setSelectedChip] = useState('1500')
  const [donationErrors, setDonationErrors] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('general')

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [paymentStep, setPaymentStep] = useState('form')
  const [processingStatus, setProcessingStatus] = useState('')

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
    { value: '500', label: '₹500', impact: 'Study kits for a rural child' },
    { value: '1500', label: '₹1,500', impact: 'Vocational tools for a woman' },
    { value: '5000', label: '₹5,000', impact: 'Clean water filtration unit' },
    { value: '10000', label: '₹10,000', impact: 'Solar panel for a village' },
  ]

  const categories = [
    { id: 'general', label: 'General', icon: '⚡' },
    { id: 'learning-hub', label: 'Learning Hub', icon: '📚' },
    { id: 'neighborhoods', label: 'Healthcare', icon: '🏥' },
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

  const handleMemberChange = (e) => {
    setMemberForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (memberErrors[e.target.name]) setMemberErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handleMemberSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!memberForm.name.trim()) errs.name = 'Full name is required'
    if (!memberForm.phone.trim()) errs.phone = 'Phone number is required'
    if (!memberForm.email.trim()) errs.email = 'Email address is required'
    if (Object.keys(errs).length > 0) { setMemberErrors(errs); return }
    if (onProceed) onProceed({ ...memberForm, tier: selectedTierPreview })
  }

  const handleDonationChange = (e) => {
    const val = e.target.value
    setDonationForm(prev => ({ ...prev, amount: val }))
    const chips = ['500', '1500', '5000', '10000']
    setSelectedChip(chips.includes(val) ? val : '')
    if (donationErrors.amount) setDonationErrors(prev => ({ ...prev, amount: '' }))
  }

  const handleChipSelect = (val) => {
    setSelectedChip(val)
    setDonationForm(prev => ({ ...prev, amount: val }))
    if (donationErrors.amount) setDonationErrors(prev => ({ ...prev, amount: '' }))
  }

  const handleDonationSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!donationForm.name.trim()) errs.name = 'Name is required'
    if (!donationForm.phone.trim()) errs.phone = 'Phone is required'
    const amt = parseFloat(donationForm.amount)
    if (isNaN(amt) || amt < 100) errs.amount = 'Minimum donation is ₹100'
    if (Object.keys(errs).length > 0) { setDonationErrors(errs); return }
    setUpiId(''); setCardNumber(''); setCardExpiry(''); setCardCvv(''); setCardName(donationForm.name)
    setPaymentStep('form'); setIsDrawerOpen(true)
  }

  const handleCardNumberChange = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16)
    setCardNumber(v.replace(/(\d{4})/g, '$1 ').trim())
  }

  const handleExpiryChange = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2)
    setCardExpiry(v)
  }

  const handlePayNow = (e) => {
    e.preventDefault()
    setPaymentStep('processing')
    const steps = ['Establishing secure SSL gateway...', 'Validating transaction token...', 'Authorizing payment...', 'Generating 80G receipt...']
    let i = 0; setProcessingStatus(steps[0])
    const iv = setInterval(() => {
      if (i < steps.length - 1) { i++; setProcessingStatus(steps[i]) }
      else { clearInterval(iv); setPaymentStep('success') }
    }, 900)
  }

  // ─── MEMBERSHIP PAGE ────────────────────────────────────────────────────────
  if (mode === 'membership') {
    return (
      <div className="min-h-screen bg-brand-cream relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-brand-red/6 blur-[200px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/4 blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-14 pb-20 md:pb-28">

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="mb-16 md:mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-brand-skyblue" />
              <span className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-brand-skyblue">
                Join The Movement
              </span>
            </div>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] text-brand-dark uppercase leading-[0.85] tracking-tight mb-6">
              Become<br />
              A <span className="text-brand-red italic">Member</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-brand-grey font-light leading-relaxed max-w-xl">
              Join a community of change-makers sustaining Himalayan clinics, rural libraries, and women cooperatives.
              Your membership directly powers grassroots mountain development.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mb-16 p-6 rounded-2xl border border-brand-dark/6 bg-brand-white shadow-sm"
          >
            {[
              { label: 'Active Members', value: 247, suffix: '+' },
              { label: 'Districts Covered', value: 8, suffix: '' },
              { label: 'Lives Impacted', value: 12400, suffix: '+' }
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center ${i !== 0 ? 'border-l border-brand-dark/6' : ''}`}>
                <div className="font-serif text-2xl md:text-4xl text-brand-dark font-bold">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-sans text-[9px] uppercase tracking-widest text-brand-grey mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT: Tier Showcase */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.35em] text-brand-grey block mb-5">
                  Choose Your Path
                </span>
                <div className="flex flex-col gap-3">
                  {membershipTiers.map((tier) => (
                    <motion.div
                      key={tier.id}
                      onClick={() => setSelectedTierPreview(tier.id)}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                      className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedTierPreview === tier.id
                          ? 'border-brand-red/30 bg-brand-red/4 shadow-lg shadow-brand-red/8'
                          : 'border-brand-dark/8 bg-brand-white hover:border-brand-red/20 hover:shadow-md'
                      }`}
                    >
                      {selectedTierPreview === tier.id && (
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-brand-red" />
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                            selectedTierPreview === tier.id ? 'bg-brand-red/10' : 'bg-brand-cream'
                          }`}>
                            {tier.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`font-sans text-xs font-bold uppercase tracking-wide ${
                                selectedTierPreview === tier.id ? 'text-brand-dark' : 'text-brand-grey'
                              }`}>{tier.title}</span>
                              <span className={`font-sans text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-wide ${
                                selectedTierPreview === tier.id ? 'bg-brand-red text-brand-cream' : 'bg-brand-cream text-brand-grey'
                              }`}>{tier.tagline}</span>
                            </div>
                            <p className="font-sans text-[10px] text-brand-grey leading-relaxed">{tier.desc}</p>
                          </div>
                        </div>
                        <div className="shrink-0 text-right ml-4">
                          <div className={`font-serif text-base font-bold ${
                            selectedTierPreview === tier.id ? 'text-brand-red' : 'text-brand-dark/30'
                          }`}>{tier.price}</div>
                          {selectedTierPreview === tier.id && (
                            <div className="w-4 h-4 rounded-full bg-brand-red flex items-center justify-center ml-auto mt-1.5">
                              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="font-sans text-[10px] text-brand-grey mt-3 pl-1">
                  * Full tier details and benefits selection in the next step.
                </p>
              </div>

              {/* What You Get */}
              <div className="p-6 rounded-2xl border border-brand-dark/6 bg-brand-white">
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-brand-grey font-bold block mb-5">What You Get</span>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: '🏔️', title: 'Ground Involvement', text: 'Direct participation in Himalayan development programs and local volunteer campaigns.' },
                    { icon: '📊', title: 'Full Transparency', text: 'Monthly impact reports and financial transparency audits sent directly to you.' },
                    { icon: '🤝', title: 'Recognition', text: 'Official credentials, certificates, and community recognition as a mission member.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-red/8 flex items-center justify-center text-lg shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark mb-0.5">{item.title}</h4>
                        <p className="font-sans text-[10px] text-brand-grey leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Sign-Up Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:sticky lg:top-28"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-brand-dark/6">
                <div className="relative bg-brand-dark px-8 py-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-red/20 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-amber-500/8 blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                      <span className="font-sans text-[9px] font-black uppercase tracking-[0.3em] text-brand-cream/40">
                        Step 1 of 2 · Basic Details
                      </span>
                    </div>
                    <h2 className="font-serif text-5xl text-brand-cream uppercase tracking-tight leading-[0.88]">
                      Join<br />Now
                    </h2>
                    <p className="font-sans text-xs text-brand-cream/35 font-light mt-3 max-w-xs leading-relaxed">
                      Fill in your details to proceed to tier selection and membership checkout.
                    </p>
                  </div>
                </div>

                {/* Form Body */}
                <div className="bg-brand-white px-8 py-8">
                  <form onSubmit={handleMemberSubmit} className="flex flex-col gap-5">
                    <FloatInput label="Full Name" type="text" name="name" value={memberForm.name} onChange={handleMemberChange} error={memberErrors.name} />
                    <FloatInput label="Phone Number" type="tel" name="phone" value={memberForm.phone} onChange={handleMemberChange} error={memberErrors.phone} />
                    <FloatInput label="Email Address" type="email" name="email" value={memberForm.email} onChange={handleMemberChange} error={memberErrors.email} />

                    <p className="font-sans text-[10px] text-brand-grey/60 leading-relaxed -mt-1">
                      By proceeding you agree to be contacted by our coordinators regarding your membership.
                    </p>

                    <button
                      type="submit"
                      data-cursor="pointer"
                      className="group relative w-full py-4 rounded-2xl font-sans font-bold text-xs tracking-widest uppercase overflow-hidden bg-brand-red text-brand-cream cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/25 hover:-translate-y-0.5 mt-2"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Proceed to Membership
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-brand-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <div className="flex items-center gap-2 justify-center">
                      <svg className="w-3.5 h-3.5 text-brand-grey/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-sans text-[9px] text-brand-grey/40 tracking-wider">
                        Next: Select your membership tier &amp; benefits
                      </span>
                    </div>
                  </form>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-5 flex items-center gap-3 px-2">
                <div className="flex -space-x-2">
                  {['#9B0000', '#1a1a1a', '#059669', '#D97706', '#2563EB'].map((color, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-brand-cream flex items-center justify-center text-[7px] text-white font-bold" style={{ backgroundColor: color }}>
                      {['A', 'S', 'M', 'R', 'K'][i]}
                    </div>
                  ))}
                </div>
                <p className="font-sans text-[10px] text-brand-grey">
                  <span className="font-bold text-brand-dark">247+ members</span> across 8 districts have joined.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // ─── DONATION PAGE ──────────────────────────────────────────────────────────
  if (mode === 'donation') {
    return (
      <div className="min-h-screen bg-brand-cream relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-skyblue/8 blur-[180px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-14 pb-20 md:pb-28">

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-brand-skyblue" />
              <span className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-brand-skyblue">
                Direct Aid Interface
              </span>
            </div>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] text-brand-dark uppercase leading-[0.85] tracking-tight mb-6">
              Fuel The<br />
              <span className="text-brand-red italic">Mission</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-brand-grey font-light leading-relaxed max-w-xl">
              100% of your contribution goes directly into field operations — no overheads, no intermediaries.
              Choose your cause and watch your impact unfold in real time.
            </p>
          </motion.div>

          {/* Impact Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 rounded-2xl border border-brand-dark/6 bg-brand-white shadow-sm"
          >
            {[
              { label: 'Total Contributed', value: 2840000, prefix: '₹', suffix: '+' },
              { label: 'Children Impacted', value: 8200, suffix: '+' },
              { label: 'Village Programs', value: 43, suffix: '' },
              { label: '80G Receipts', value: 1300, suffix: '+' }
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center ${i !== 0 ? 'border-l border-brand-dark/6' : ''}`}>
                <div className="font-serif text-xl md:text-3xl text-brand-dark font-bold leading-none">
                  <AnimatedCounter target={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix} />
                </div>
                <div className="font-sans text-[8px] uppercase tracking-widest text-brand-grey mt-1.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT: Cause + Amount */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-8"
            >
              {/* Category Selector */}
              <div>
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.35em] text-brand-grey block mb-4">
                  1. Choose Your Cause
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl border text-xs font-semibold tracking-wider font-sans cursor-pointer transition-all duration-300 flex items-center gap-2 ${
                        selectedCategory === cat.id
                          ? 'border-brand-red bg-brand-red text-brand-cream shadow-md shadow-brand-red/15'
                          : 'border-brand-dark/10 bg-brand-white text-brand-grey hover:border-brand-red/30 hover:text-brand-dark'
                      }`}
                    >
                      <span>{cat.icon}</span>{cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Chips */}
              <div>
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.35em] text-brand-grey block mb-4">
                  2. Select Amount (INR)
                </span>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {donationChips.map(chip => (
                    <motion.button
                      key={chip.value}
                      type="button"
                      onClick={() => handleChipSelect(chip.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedChip === chip.value
                          ? 'border-brand-red/40 bg-brand-red/5 shadow-lg shadow-brand-red/10'
                          : 'border-brand-dark/8 bg-brand-white hover:border-brand-red/20 hover:shadow-md'
                      }`}
                    >
                      {selectedChip === chip.value && (
                        <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-brand-red/8 blur-2xl" />
                      )}
                      <div className={`font-serif text-xl font-bold mb-1 relative z-10 ${
                        selectedChip === chip.value ? 'text-brand-red' : 'text-brand-dark'
                      }`}>{chip.label}</div>
                      <div className="font-sans text-[10px] text-brand-grey relative z-10">{chip.impact}</div>
                      {selectedChip === chip.value && (
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-brand-red flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative rounded-2xl border border-brand-dark/10 bg-brand-white overflow-hidden focus-within:border-brand-red/40 focus-within:shadow-md transition-all">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-bold text-sm text-brand-grey/60">₹</span>
                  <input
                    type="number"
                    min="100"
                    value={donationChips.some(c => c.value === donationForm.amount) ? '' : donationForm.amount}
                    onChange={handleDonationChange}
                    placeholder="Custom amount"
                    className="w-full h-12 pl-8 pr-4 bg-transparent text-brand-dark focus:outline-none font-sans text-sm"
                  />
                </div>
                {donationErrors.amount && (
                  <span className="text-[10px] text-brand-red font-semibold font-sans mt-1.5 block pl-1">✕ {donationErrors.amount}</span>
                )}
              </div>

              {/* Real-Time Impact Preview */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${donationForm.amount}-${selectedCategory}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-6 rounded-2xl border border-brand-red/15 bg-brand-red/3 overflow-hidden"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-brand-red/40 rounded-l-2xl" />
                  <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-brand-red/60 font-bold block mb-2">
                    Real-time Impact Preview
                  </span>
                  <p className="font-sans text-sm text-brand-dark/70 leading-relaxed">
                    {getImpactCopy(donationForm.amount)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* RIGHT: Donor Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:sticky lg:top-28"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-brand-dark/6">
                <div className="relative bg-brand-dark px-8 py-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-red/15 blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                      <span className="font-sans text-[9px] font-black uppercase tracking-[0.3em] text-brand-cream/40">
                        Secure Donation Gateway
                      </span>
                    </div>
                    <h2 className="font-serif text-5xl text-brand-cream uppercase tracking-tight leading-[0.88]">
                      Donate<br />Now
                    </h2>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-serif text-3xl text-brand-cream font-bold">₹{donationForm.amount || '0'}</span>
                      <span className="font-sans text-xs text-brand-cream/40">
                        → {categories.find(c => c.id === selectedCategory)?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Body */}
                <div className="bg-brand-white px-8 py-8">
                  <form onSubmit={handleDonationSubmit} className="flex flex-col gap-5">
                    <FloatInput
                      label="Your Name"
                      type="text"
                      name="donorName"
                      value={donationForm.name}
                      onChange={(e) => {
                        setDonationForm(prev => ({ ...prev, name: e.target.value }))
                        if (donationErrors.name) setDonationErrors(prev => ({ ...prev, name: '' }))
                      }}
                      error={donationErrors.name}
                    />
                    <FloatInput
                      label="Phone Number"
                      type="tel"
                      name="donorPhone"
                      value={donationForm.phone}
                      onChange={(e) => {
                        setDonationForm(prev => ({ ...prev, phone: e.target.value }))
                        if (donationErrors.phone) setDonationErrors(prev => ({ ...prev, phone: '' }))
                      }}
                      error={donationErrors.phone}
                    />

                    {/* 80G Notice */}
                    <div className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-50/50">
                      <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <p className="font-sans text-[10px] text-emerald-700/80 leading-relaxed">
                        All donations are <span className="font-bold">80G tax-exempt</span>. An official receipt will be emailed immediately after payment.
                      </p>
                    </div>

                    <button
                      type="submit"
                      data-cursor="pointer"
                      className="group relative w-full py-4 rounded-2xl font-sans font-bold text-xs tracking-widest uppercase overflow-hidden bg-brand-dark text-brand-cream cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/25 hover:-translate-y-0.5 mt-2"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        🔒 Proceed to Payment — ₹{donationForm.amount}
                      </span>
                      <div className="absolute inset-0 bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <div className="flex justify-center items-center gap-3 text-brand-grey/40 text-[9px] font-sans">
                      <span>✓ 256-Bit SSL Encrypted</span>
                      <span>•</span>
                      <span>✓ 80G Tax Exemption</span>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── Payment Drawer ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
                className="fixed inset-0 z-9998 bg-brand-dark/50 backdrop-blur-sm cursor-pointer"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                className="fixed top-0 right-0 h-full w-full max-w-md z-9999 bg-brand-white border-l border-brand-dark/8 flex flex-col overflow-hidden shadow-2xl"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-brand-dark/6 flex items-center justify-between bg-brand-cream/40">
                  <div>
                    <h3 className="font-serif text-xl font-bold tracking-tight uppercase text-brand-dark">Secure Checkout</h3>
                    <span className="font-sans text-[8px] font-black tracking-widest text-brand-skyblue uppercase block mt-0.5">Direct Aid Interface</span>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-brand-grey hover:text-brand-red cursor-pointer py-1.5 px-4 border border-brand-dark/10 rounded-full hover:bg-brand-red/5 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                  {/* Summary */}
                  <div className="bg-brand-skyblue/6 border border-brand-skyblue/15 rounded-2xl p-5">
                    <span className="font-sans text-[8px] font-black tracking-wider text-brand-grey uppercase block mb-3">Contribution Summary</span>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-sans text-xs text-brand-grey">Donor: {donationForm.name}</span>
                      <span className="font-serif text-2xl font-bold text-brand-dark">₹{donationForm.amount}</span>
                    </div>
                    <p className="font-sans text-[10px] text-brand-grey leading-relaxed border-t border-brand-dark/6 pt-2 mt-1">
                      {getImpactCopy(donationForm.amount)}
                    </p>
                  </div>

                  {paymentStep === 'form' && (
                    <form onSubmit={handlePayNow} className="flex flex-col gap-6">
                      {/* Method Tabs */}
                      <div className="grid grid-cols-2 gap-2">
                        {[{ id: 'upi', label: '📱 UPI / Apps' }, { id: 'card', label: '💳 Card' }].map(m => (
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

                      {paymentMethod === 'upi' ? (
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-3 gap-2">
                            {['Google Pay', 'PhonePe', 'Paytm'].map(app => (
                              <button
                                key={app}
                                type="button"
                                onClick={() => setUpiId(`${donationForm.phone}@${app === 'Paytm' ? 'paytm' : app === 'PhonePe' ? 'ybl' : 'okaxis'}`)}
                                className="py-2.5 rounded-xl border border-brand-dark/8 text-[10px] font-sans text-brand-grey hover:text-brand-dark hover:border-brand-dark/20 bg-brand-cream transition-all font-bold"
                              >
                                {app}
                              </button>
                            ))}
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="Enter UPI ID (VPA)"
                              className="w-full h-12 px-4 rounded-xl border border-brand-dark/10 bg-brand-cream/50 font-sans text-sm text-brand-dark focus:outline-none focus:border-brand-red/30"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          <div className="relative">
                            <input type="text" required maxLength={19} value={cardNumber} onChange={handleCardNumberChange} placeholder="Card Number" className="w-full h-12 px-4 rounded-xl border border-brand-dark/10 bg-brand-cream/50 font-mono text-sm text-brand-dark focus:outline-none focus:border-brand-red/30" />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" required maxLength={5} value={cardExpiry} onChange={handleExpiryChange} placeholder="MM / YY" className="h-12 px-4 rounded-xl border border-brand-dark/10 bg-brand-cream/50 font-mono text-sm text-brand-dark focus:outline-none focus:border-brand-red/30" />
                            <input type="password" required maxLength={3} value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} placeholder="CVV" className="h-12 px-4 rounded-xl border border-brand-dark/10 bg-brand-cream/50 font-mono text-sm text-brand-dark focus:outline-none focus:border-brand-red/30" />
                          </div>
                          <input type="text" required value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Cardholder Name" className="h-12 px-4 rounded-xl border border-brand-dark/10 bg-brand-cream/50 font-sans text-sm text-brand-dark focus:outline-none focus:border-brand-red/30" />
                        </div>
                      )}

                      <button type="submit" className="w-full py-4 rounded-2xl font-sans font-bold text-sm tracking-widest uppercase bg-brand-dark hover:bg-brand-red text-brand-cream transition-all cursor-pointer shadow-lg">
                        🔒 Pay ₹{donationForm.amount} Securely
                      </button>
                      <div className="flex justify-center gap-3 text-brand-grey/50 text-[9px] font-sans">
                        <span>✓ SSL Encrypted</span><span>•</span><span>✓ 80G Eligible</span>
                      </div>
                    </form>
                  )}

                  {paymentStep === 'processing' && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 py-16">
                      <div className="w-14 h-14 rounded-full border-2 border-brand-red/20 border-t-brand-red animate-spin" />
                      <div className="text-center">
                        <span className="font-sans text-[10px] font-black text-brand-grey uppercase tracking-widest animate-pulse block mb-2">
                          Processing Transaction
                        </span>
                        <p className="font-sans text-xs text-brand-grey max-w-xs leading-relaxed">{processingStatus}</p>
                      </div>
                    </div>
                  )}

                  {paymentStep === 'success' && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-8 py-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shadow-lg"
                      >
                        <svg className="w-8 h-8 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </motion.div>
                      <div>
                        <h3 className="font-serif text-2xl uppercase tracking-tight font-bold mb-2 text-brand-dark">Donation Received</h3>
                        <p className="font-sans text-xs text-brand-grey max-w-xs leading-relaxed">
                          Thank you, {donationForm.name}. Your contribution has cleared our secure gateway.
                        </p>
                      </div>
                      <div className="w-full bg-brand-cream border border-brand-dark/6 p-5 rounded-2xl flex flex-col gap-3 text-xs text-left">
                        <span className="font-sans text-[8px] font-black tracking-widest text-brand-grey uppercase block mb-1">Transaction Receipt</span>
                        {[
                          { label: 'Transaction ID', value: `TXN_DON_${Math.floor(100000 + Math.random() * 900000)}`, mono: true },
                          { label: 'Funds Allocated', value: `₹${donationForm.amount}` },
                          { label: 'Tax Receipt', value: '80G Generated', green: true }
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between items-center border-b border-brand-dark/5 pb-2 last:border-0 last:pb-0">
                            <span className="font-sans text-brand-grey text-[10px] uppercase tracking-wider">{row.label}</span>
                            <span className={`font-bold text-[10px] ${row.mono ? 'font-mono text-brand-dark' : row.green ? 'text-emerald-600' : 'text-brand-dark'}`}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="w-full py-3.5 rounded-2xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-dark hover:bg-brand-red text-brand-cream transition-all cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return null
}

export default ActionHub
