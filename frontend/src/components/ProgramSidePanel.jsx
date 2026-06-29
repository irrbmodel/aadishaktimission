import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Target, Heart, ArrowRight } from 'lucide-react'

const programData = {
  'Village Learning Hub': {
    title: 'Village Learning Hub',
    subtitle: 'Primary & Digital Literacy',
    image: '/images/villagelearning2.jpeg',
    impact: '500+ Rural Girls',
    headline: 'VILLAGE LEARNING HUB',
    desc: 'Establishing community learning spaces, libraries, and digital training labs to secure primary and digital literacy for rural children and girls.',
    background: 'Many rural villages lack basic educational infrastructure, books, and computers. Our learning hubs bridge this gap by bringing modern resources and dedicated educators directly to local neighborhoods.',
    goals: [
      'Set up 15 libraries with digital study labs',
      'Train 20+ village-level youth educators',
      'Increase digital literacy rates among girls by 60%'
    ]
  },
  'Nurturing Our Neighborhoods': {
    title: 'Nurturing Our Neighborhoods',
    subtitle: 'Community Health & Well-being',
    image: '/images/relief_distribution.jpeg',
    impact: '1,200+ Beneficiaries',
    headline: 'NURTURING NEIGHBORHOODS',
    desc: 'Uplifting local communities through regular health checkups, wellness camps, and clean water projects.',
    background: 'Preventative healthcare is often out of reach for marginalized communities. We provide direct support through neighborhood health camps, sanitary kit drives, and purified water stations.',
    goals: [
      'Host weekly health screenings in remote settlements',
      'Install 5 community water filtration units',
      'Conduct menstrual hygiene workshops & kit distributions'
    ]
  },
  'Empowering Youth': {
    title: 'Empowering Youth',
    subtitle: 'Skills & Autonomy',
    image: '/images/youth_group.jpeg',
    impact: '250+ Youth Trained',
    headline: 'EMPOWERING YOUTH',
    desc: 'Fostering leadership, micro-capital, and vocational craft training to empower local youth towards long-term self-reliance.',
    background: 'Youth unemployment in rural communities is high. By providing vocational training, business mentoring, and micro-grants, we help young people establish self-sustaining livelihoods.',
    goals: [
      'Set up skill training clinics (stitching, craft, IT)',
      'Award 10 micro-capital seed grants yearly',
      'Foster community cooperative startup groups'
    ]
  },
  'For Mother Earth': {
    title: 'For Mother Earth',
    subtitle: 'Eco-Conservation & Forestry',
    image: '/images/ecology.jpeg',
    impact: '5,000+ Saplings',
    headline: 'FOR MOTHER EARTH',
    desc: 'Preserving our ecosystem through native afforestation drives, solar clinic power setups, and green space development.',
    background: 'Deforestation and carbon footprint expansion directly impact rural livelihoods. We lead community-driven forestry initiatives, plantation drives, and solar power upgrades for village schools.',
    goals: [
      'Plant 5,000+ native saplings (Neem, Banyan, etc.)',
      'Transition 4 local community clinics to solar energy',
      'Conduct rainwater harvesting training sessions'
    ]
  },
  'Heritage & Handloom Revival': {
    title: 'Heritage & Handloom Revival',
    subtitle: 'Craft & Aipan Conservation',
    image: '/images/carousel6.jpeg',
    impact: '80+ Women Artisans',
    headline: 'HERITAGE & HANDLOOM',
    desc: 'Sustaining local Himalayan weaving and sacred Aipan folk arts through female cooperatives and market bridges.',
    background: 'Traditional Himalayan craft forms are dying as younger generations migrate. We establish design workshops, supply raw wool, and connect local women to urban design centers to revive Pahari handlooms.',
    goals: [
      'Sponsor 80+ active weavers with raw materials',
      'Establish a digital database for traditional patterns',
      'Setup 3 local handloom aggregation cooperatives'
    ]
  }
}

export default function ProgramSidePanel({ isOpen, onClose, programTitle, onGetInvolved }) {
  // Lock body scroll when panel is open
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

  const program = programTitle ? programData[programTitle] : null

  return (
    <AnimatePresence>
      {isOpen && program && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-90"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-dvh w-full md:w-[500px] lg:w-[600px] bg-brand-white z-100 shadow-2xl flex flex-col"
          >
            {/* Header / Image Area */}
            <div className="relative h-64 sm:h-80 shrink-0">
              <img 
                src={program.image} 
                alt={program.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-brand-dark/60 via-brand-dark/20 to-brand-dark/90" />
              
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-brand-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-brand-white hover:bg-brand-white/30 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-brand-red/90 text-brand-white text-[10px] font-bold tracking-widest uppercase mb-3 rounded-sm">
                  {program.subtitle}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-brand-white uppercase leading-none mb-2 font-black">
                  {program.title}
                </h2>
              </div>
            </div>

            {/* Scrollable Content */}
            <div 
              className="flex-1 overflow-y-auto overflow-x-hidden"
              data-lenis-prevent
            >
              <div className="p-6 sm:p-10 flex flex-col gap-8 sm:gap-10">
                {/* Intro / Desc */}
                <div>
                  <p className="font-sans text-lg sm:text-xl text-brand-dark font-light leading-relaxed">
                    {program.desc}
                  </p>
                </div>

                {/* Background Context */}
                <div>
                  <h3 className="font-sans text-xs font-bold text-brand-grey uppercase tracking-widest mb-3">
                    The Challenge
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-brand-grey leading-relaxed">
                    {program.background}
                  </p>
                </div>

                {/* Goals */}
                <div className="bg-brand-gray/30 p-6 sm:p-8 rounded-2xl">
                  <h3 className="font-sans text-xs font-bold text-brand-dark uppercase tracking-widest flex items-center gap-2 mb-5">
                    <Target size={16} className="text-brand-red" />
                    Key Objectives
                  </h3>
                  <ul className="space-y-4">
                    {program.goals.map((goal, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0 mt-2" />
                        <span className="font-sans text-sm text-brand-dark leading-relaxed">
                          {goal}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Impact Stat */}
                <div className="flex items-center justify-between border-t border-brand-dark/10 pt-8 pb-4">
                  <div>
                    <h3 className="font-sans text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1">
                      Current Impact
                    </h3>
                    <p className="font-serif text-2xl text-brand-dark">
                      {program.impact}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                    <Heart size={20} fill="currentColor" />
                  </div>
                </div>

              </div>
            </div>

            {/* Sticky Bottom Action */}
            <div className="p-6 border-t border-brand-dark/10 bg-brand-white shrink-0">
              <button
                onClick={() => {
                  onClose()
                  if (onGetInvolved) onGetInvolved()
                }}
                className="w-full h-14 bg-brand-dark text-brand-white font-sans text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-brand-red transition-colors duration-300"
              >
                Support This Program
                <ArrowRight size={16} />
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
