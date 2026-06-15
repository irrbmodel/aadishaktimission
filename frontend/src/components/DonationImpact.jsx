import React, { useState } from 'react'

const DonationImpact = () => {
  const [selectedTier, setSelectedTier] = useState(1) // index of tier
  const [customAmount, setCustomAmount] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const tiers = [
    {
      amount: 15,
      title: 'Shiksha Sponsor',
      impact: 'Uniforms, textbooks, notebooks, and fresh mid-day meals for one girl child for 1 month.',
      color: 'border-brand-orange/40 hover:border-brand-orange text-brand-orange shadow-brand-orange/10',
      activeColor: 'bg-brand-orange/10 border-brand-orange text-brand-orange shadow-brand-orange/25',
      glow: 'shadow-[0_0_20px_rgba(255,120,45,0.15)]',
      theme: 'orange'
    },
    {
      amount: 35,
      title: 'Arogya Angel',
      impact: 'Complete pre-natal checkups, pediatric diagnostics, and nutritional kits for a mother and child.',
      color: 'border-teal-400/40 hover:border-teal-400 text-teal-400 shadow-teal-400/10',
      activeColor: 'bg-teal-400/10 border-teal-400 text-teal-400 shadow-teal-400/25',
      glow: 'shadow-[0_0_20px_rgba(45,212,191,0.15)]',
      theme: 'teal'
    },
    {
      amount: 75,
      title: 'Swayam Sponsor',
      impact: 'Vocational sewing kit materials, sewing machine access, and 12-weeks of micro-enterprise mentorship.',
      color: 'border-brand-pink/40 hover:border-brand-pink text-brand-pink shadow-brand-pink/10',
      activeColor: 'bg-brand-pink/10 border-brand-pink text-brand-pink shadow-brand-pink/25',
      glow: 'shadow-[0_0_20px_rgba(255,42,122,0.15)]',
      theme: 'pink'
    },
    {
      amount: 150,
      title: 'Prakriti Pioneer',
      impact: 'Setup of a bio-waste compost facility or installation of solar lighting kits in village clinics.',
      color: 'border-emerald-400/40 hover:border-emerald-400 text-emerald-400 shadow-emerald-400/10',
      activeColor: 'bg-emerald-400/10 border-emerald-400 text-emerald-400 shadow-emerald-400/25',
      glow: 'shadow-[0_0_20px_rgba(52,211,153,0.15)]',
      theme: 'emerald'
    }
  ]

  const active = tiers[selectedTier]

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value)
    setSelectedTier(-1) // deactivate standard tiers
  }

  const handleTierSelect = (index) => {
    setSelectedTier(index)
    setCustomAmount('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const amount = customAmount ? parseFloat(customAmount) : tiers[selectedTier].amount
    if (isNaN(amount) || amount <= 0) return

    setSuccessMsg(`Thank you! Initiating secure payment portal for $${amount}...`)
    setTimeout(() => {
      setSuccessMsg('')
    }, 4000)
  }

  // Calculate custom equivalents
  const calculatedImpact = () => {
    const amt = parseFloat(customAmount)
    if (isNaN(amt) || amt <= 0) return null
    
    const booksCount = Math.floor(amt / 5)
    const kitsCount = Math.floor(amt / 15)
    
    if (amt < 15) {
      return `Provides educational learning materials for ${booksCount} student${booksCount > 1 ? 's' : ''}.`
    }
    return `Provides complete school supplies kits for ${kitsCount} girl child${kitsCount > 1 ? 'ren' : ''} next semester.`
  }

  return (
    <section 
      id="contribute"
      className="relative w-full py-24 md:py-36 bg-brand-dark overflow-hidden border-b border-white/5"
    >
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-purple top-1/2 left-[-10%] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Intro */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">
            Evoke Your Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-2">
            FUEL THE FLAME OF CHANGE
          </h2>
          <p className="text-xs md:text-sm text-gray-400 max-w-md mt-4">
            Join the mission. Select an impact tier or build your own to fund community transformation directly.
          </p>
        </div>

        {/* Donation Interactive Box */}
        <div className="w-full max-w-4xl mx-auto bg-white/5 border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-md glass-panel">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Tiers Selection */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <h3 className="text-sm font-bold text-white tracking-widest uppercase">
                Select Impact Level
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tiers.map((tier, idx) => {
                  const isSelected = selectedTier === idx
                  return (
                    <button
                      key={tier.amount}
                      type="button"
                      onClick={() => handleTierSelect(idx)}
                      className={`p-5 rounded-2xl border flex flex-col items-center text-center cursor-pointer transition-all duration-300 ${
                        isSelected ? `${tier.activeColor} ${tier.glow} scale-105` : `${tier.color} bg-white/5`
                      }`}
                      data-cursor="pointer"
                    >
                      <span className="text-[10px] font-bold tracking-widest opacity-80 uppercase block">
                        {tier.title.split(' ')[0]}
                      </span>
                      <span className="font-display font-black text-3xl mt-4 block">
                        ${tier.amount}
                      </span>
                      <span className="text-[10px] opacity-70 mt-1 block">/ one-time</span>
                    </button>
                  )
                })}
              </div>

              {/* Custom Input */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-xs font-bold text-white/60 tracking-wider uppercase">
                  Or Enter Custom Donation (USD)
                </label>
                <div className="relative w-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden focus-within:border-brand-orange/50 transition-colors">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-display font-bold text-lg text-white/50">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="E.g. 50"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full h-14 pl-12 pr-6 bg-transparent text-white focus:outline-none font-display font-bold text-lg"
                    data-cursor="pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right: Calculated Summary & CTA */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full lg:min-h-[280px] bg-white/5 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-tr from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <h3 className="text-xs font-black text-white/40 tracking-widest uppercase">
                  DIRECT OUTCOME
                </h3>
                
                {/* Dynamic Summary */}
                {selectedTier >= 0 ? (
                  <div className="mt-4 animate-fade-in">
                    <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                      {active.title}
                    </span>
                    <p className="text-sm text-gray-300 font-light mt-3 leading-relaxed">
                      {active.impact}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 animate-fade-in">
                    <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                      Custom contribution
                    </span>
                    <p className="text-sm text-gray-300 font-light mt-3 leading-relaxed">
                      {calculatedImpact() || 'Nurturing community growth with localized support drives.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-display font-black text-xs tracking-widest uppercase bg-brand-orange hover:bg-brand-pink text-brand-dark hover:text-white transition-all duration-300 shadow-md shadow-brand-orange/10"
                  data-cursor="donate"
                >
                  INITIATE SECURE PORTAL
                </button>
                
                <span className="text-[9px] text-white/40 tracking-wider text-center block mt-3">
                  🔒 256-bit encrypted secure donation
                </span>
              </div>

            </div>

          </form>

          {/* Success Dialog Popup Overlay */}
          {successMsg && (
            <div className="mt-6 p-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 text-xs font-semibold tracking-wider text-center animate-pulse">
              {successMsg}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default DonationImpact
