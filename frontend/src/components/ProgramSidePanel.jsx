import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Target, Heart, ArrowRight } from 'lucide-react'

const programData = {
  'Education & Capacity Building': {
    title: 'Education & Capacity Building',
    subtitle: 'Excellence & Learning',
    image: '/images/villagelearning2.jpeg',
    impact: 'Academic Excellence',
    headline: 'EDUCATION & CAPACITY',
    desc: 'Providing opportunities for academic excellence, professional development, digital literacy, and lifelong learning.',
    background: 'We believe that education is the foundation of individual and societal progress. By focusing on academic excellence, we aim to provide opportunities that foster professional development, digital literacy, and a passion for lifelong learning in all individuals.',
    goals: [
      'Promote academic excellence at all levels',
      'Facilitate professional development and skill acquisition',
      'Ensure widespread digital literacy',
      'Encourage and support lifelong learning initiatives'
    ]
  },
  'Leadership Development': {
    title: 'Leadership Development',
    subtitle: 'Confident & Ethical',
    image: '/images/relief_distribution.jpeg',
    impact: 'Nurturing Leaders',
    headline: 'LEADERSHIP DEVELOPMENT',
    desc: 'Nurturing confident, ethical, and socially responsible leaders capable of addressing local and global challenges.',
    background: 'The world needs leaders who are not only capable but also ethical and socially responsible. Our leadership programs are designed to nurture confident individuals who are prepared to face both local and global challenges with integrity and vision.',
    goals: [
      'Nurture confident and visionary leaders',
      'Instill strong ethical values and practices',
      'Foster social responsibility and civic engagement',
      'Equip leaders to address complex global challenges'
    ]
  },
  'Research & Innovation': {
    title: 'Research & Innovation',
    subtitle: 'Technology & Solutions',
    image: '/images/youth_group.jpeg',
    impact: 'Sustainable Development',
    headline: 'RESEARCH & INNOVATION',
    desc: 'Encouraging interdisciplinary research, innovation, entrepreneurship, and technology-driven solutions for sustainable development.',
    background: 'Innovation and research are key to driving sustainable development. By encouraging interdisciplinary approaches, we foster an environment where entrepreneurship and technology-driven solutions can thrive, addressing the most pressing challenges of our time.',
    goals: [
      'Encourage interdisciplinary research initiatives',
      'Foster a culture of innovation and entrepreneurship',
      'Develop technology-driven solutions for real-world problems',
      'Promote practices that lead to sustainable development'
    ]
  },
  'Community Engagement': {
    title: 'Community Engagement',
    subtitle: 'Outreach & Inclusion',
    image: '/images/ecology.jpeg',
    impact: 'Social Inclusion',
    headline: 'COMMUNITY ENGAGEMENT',
    desc: 'Promoting volunteerism, outreach programmes, legal literacy, health awareness, environmental conservation, and social inclusion.',
    background: 'A strong community is built on active engagement and inclusion. We are dedicated to promoting volunteerism and outreach programs that raise awareness on legal literacy, health, and environmental conservation, ensuring that every individual feels included and valued.',
    goals: [
      'Promote active volunteerism and community service',
      'Organize impactful outreach programmes',
      'Increase legal literacy and health awareness',
      'Drive environmental conservation and social inclusion'
    ]
  },
  'Skill Development & Entrepreneurship': {
    title: 'Skill Development & Entrepreneurship',
    subtitle: 'Enhancing Employability',
    image: '/images/carousel6.jpeg',
    impact: 'Career Readiness',
    headline: 'SKILL DEVELOPMENT',
    desc: 'Enhancing employability through vocational training, entrepreneurship development, financial literacy, and career readiness.',
    background: 'Empowering individuals with the right skills is essential for economic independence. Through vocational training, entrepreneurship development, and financial literacy programs, we enhance employability and ensure our community members are career-ready.',
    goals: [
      'Provide comprehensive vocational training',
      'Support entrepreneurship development',
      'Improve financial literacy across the community',
      'Enhance overall career readiness and employability'
    ]
  },
  'Health, Wellness & Sustainability': {
    title: 'Health, Wellness & Sustainability',
    subtitle: 'Well-being & Stewardship',
    image: '/images/villagelearning2.jpeg',
    impact: 'Sustainable Living',
    headline: 'HEALTH & SUSTAINABILITY',
    desc: 'Supporting physical and mental well-being while promoting environmental stewardship and sustainable living.',
    background: 'True well-being encompasses both physical and mental health, as well as the health of our environment. We are committed to supporting holistic wellness while simultaneously promoting environmental stewardship and practices that lead to sustainable living.',
    goals: [
      'Support physical and mental well-being programs',
      'Promote environmental stewardship',
      'Encourage sustainable living practices',
      'Create a healthier environment for future generations'
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
