import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const DonationImpact = () => {
  const [activeMember, setActiveMember] = useState(0)
  const [donationAmount, setDonationAmount] = useState(35)
  const [customAmount, setCustomAmount] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const portraitRef = useRef(null)

  const team = [
    {
      name: 'Aarti Devi Roy',
      role: 'Executive Director / Founder',
      bio: 'Leading community outreach projects for over 12 years with a primary focus on girl child literacy and micro-enterprise capital.',
      image: '/shakti_shiksha.png' // Utilizing existing assets as portrait placeholders
    },
    {
      name: 'Dr. Sandeep Sen',
      role: 'Chief Medical Outreach Officer',
      bio: 'Directing local diagnostic camps, sanitary distributions, and maternal healthcare networks in remote village coordinates.',
      image: '/arogya_shakti.png'
    },
    {
      name: 'Meera Kumari',
      role: 'Swayam Skill Advisor',
      bio: 'Specializing in handicraft management, local tailoring training, and structuring interest-free micro-finance capitals.',
      image: '/swayam_shakti.png'
    },
    {
      name: 'Rajesh Mishra',
      role: 'Eco-Conservation Specialist',
      bio: 'Designing afforestation layouts, community solar setups, and bio-waste treatment setups for rural habitats.',
      image: '/prakriti_shakti.png'
    }
  ]

  // GSAP animation for team portrait switch
  useEffect(() => {
    gsap.fromTo(portraitRef.current,
      { opacity: 0, scale: 0.95, filter: 'grayscale(100%)' },
      { opacity: 1, scale: 1, filter: 'grayscale(0%)', duration: 0.5, ease: 'power2.out' }
    )
  }, [activeMember])

  const handleDonate = (e) => {
    e.preventDefault()
    const amt = customAmount ? parseFloat(customAmount) : donationAmount
    if (isNaN(amt) || amt <= 0) return

    setSuccessMsg(`Thank you! Accessing secure gateway for $${amt}...`)
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  return (
    <section 
      id="donation-impact" 
      className="relative w-full py-24 md:py-36 bg-brand-cream border-b border-brand-dark/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Intro */}
        <div className="mb-16 select-none">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-grey block">
            OUR COLLECTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Meet the Team (Lg: col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-5xl md:text-7xl text-brand-dark uppercase tracking-tight leading-none">
                meet the team
              </h2>
              <p className="font-sans text-sm md:text-base text-brand-grey max-w-xl font-light leading-relaxed mt-4">
                Our movement is comprised of dedicated field practitioners, educators, medical experts, and conservationists who believe that lasting empowerment is built collaboratively from the ground up.
              </p>
            </div>

            {/* Interactive Listing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-6">
              
              {/* Member names list */}
              <div className="flex flex-col gap-4">
                {team.map((member, idx) => (
                  <div 
                    key={member.name}
                    onMouseEnter={() => setActiveMember(idx)}
                    onClick={() => setActiveMember(idx)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      activeMember === idx 
                        ? 'bg-brand-white border-brand-red/30 shadow-md translate-x-2' 
                        : 'bg-transparent border-transparent hover:translate-x-1'
                    }`}
                    data-cursor="pointer"
                  >
                    <span className="font-serif text-xl md:text-2xl text-brand-dark block">
                      {member.name}
                    </span>
                    <span className="font-sans text-[10px] font-bold text-brand-red uppercase tracking-wider block mt-1">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>

              {/* Focus Portrait & Biography */}
              <div className="flex flex-col gap-6 p-6 rounded-3xl bg-brand-white border border-brand-dark/5 shadow-xl">
                <div 
                  ref={portraitRef}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden border border-brand-dark/5 shadow-inner"
                >
                  {/* Desaturate / Grayscale filter for editorial look */}
                  <img 
                    src={team[activeMember].image} 
                    alt={team[activeMember].name} 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-serif text-lg text-brand-dark font-semibold">
                    {team[activeMember].name}
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-brand-grey leading-relaxed mt-2 font-light">
                    {team[activeMember].bio}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Crimson/Cream Contribution Panel (Lg: col-span-4) */}
          <div className="lg:col-span-4 bg-brand-white border border-brand-dark/5 p-6 md:p-8 rounded-[32px] shadow-2xl flex flex-col gap-6">
            <div>
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
                contribute
              </span>
              <h3 className="font-serif text-3xl text-brand-dark mt-2 tracking-tight">
                support the mission
              </h3>
              <p className="font-sans text-xs text-brand-grey leading-relaxed mt-2 font-light">
                Fuel our transformations directly. Choose an allocation or type a custom amount to fund our standard village operations.
              </p>
            </div>

            {/* Quick selectors */}
            <div className="grid grid-cols-3 gap-2">
              {[15, 35, 75].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setDonationAmount(val)
                    setCustomAmount('')
                  }}
                  className={`py-3 rounded-xl border text-xs font-bold font-display cursor-pointer transition-all duration-300 ${
                    donationAmount === val && !customAmount
                      ? 'border-brand-red bg-brand-red/5 text-brand-red scale-105'
                      : 'border-brand-dark/5 hover:border-brand-red/20 text-brand-dark'
                  }`}
                  data-cursor="pointer"
                >
                  ${val}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] font-bold text-brand-grey tracking-wider uppercase">
                OR CUSTOM AMOUNT (USD)
              </label>
              <div className="relative w-full rounded-xl border border-brand-dark/10 overflow-hidden focus-within:border-brand-red/50 transition-colors bg-brand-cream/35">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-bold text-sm text-brand-grey">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setDonationAmount(0)
                  }}
                  className="w-full h-11 pl-8 pr-4 bg-transparent text-brand-dark focus:outline-none font-sans font-bold text-sm"
                  data-cursor="pointer"
                />
              </div>
            </div>

            {/* CTA Submit */}
            <form onSubmit={handleDonate} className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-brand-red hover:bg-brand-dark text-brand-cream hover:text-brand-cream transition-all duration-300 shadow-md shadow-brand-red/10 cursor-pointer"
                data-cursor="pointer"
              >
                SECURE CONTRIBUTION
              </button>
              <span className="text-[9px] text-brand-grey tracking-wider text-center block">
                🔒 Secure 256-Bit Encrypted Transfer
              </span>
            </form>

            {successMsg && (
              <div className="p-3 rounded-xl border border-brand-red/20 bg-brand-red/5 text-brand-red text-center text-xs font-semibold tracking-wider animate-pulse">
                {successMsg}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

export default DonationImpact
