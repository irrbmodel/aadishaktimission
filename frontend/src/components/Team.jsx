import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Team = ({ isLoaded }) => {
  const [activeMember, setActiveMember] = useState(0)
  const previewCardRef = useRef(null)
  const headingRef = useRef(null)

  const team = [
    {
      name: 'Aarti Devi Roy',
      role: 'Executive Director / Founder',
      quote: 'Education is not a privilege; it is the fundamental frequency of a community\'s evolution.',
      bio: 'Leading community outreach projects for over 12 years with a primary focus on girl child literacy, rural development, and micro-enterprise capital for underserved women.',
      image: '/shakti_shiksha.png'
    },
    {
      name: 'Dr. Sandeep Sen',
      role: 'Chief Medical Outreach Officer',
      quote: 'Healthcare is the canvas on which all human progress is drawn. We cannot build tomorrow if we are sick today.',
      bio: 'Directing local diagnostic camps, sanitary distributions, and maternal healthcare networks in remote village coordinates to ensure medical equity.',
      image: '/arogya_shakti.png'
    },
    {
      name: 'Meera Kumari',
      role: 'Swayam Skill Advisor',
      quote: 'True independence is economic. Empower a woman, and she will uplift her entire family and village.',
      bio: 'Specializing in handicraft management, local tailoring training, and structuring interest-free micro-finance capitals for women-led cooperatives.',
      image: '/swayam_shakti.png'
    },
    {
      name: 'Rajesh Mishra',
      role: 'Eco-Conservation Specialist',
      quote: 'Sustaining the soil is sustaining the soul. We do not inherit the earth; we borrow it from our children.',
      bio: 'Designing afforestation layouts, community solar setups, and eco-friendly bio-waste treatment setups for rural habitats and sustainable farming practices.',
      image: '/prakriti_shakti.png'
    }
  ]

  // Animate preview contents when activeMember changes
  useEffect(() => {
    if (previewCardRef.current) {
      gsap.fromTo(
        previewCardRef.current.querySelectorAll('.animate-on-change'),
        { opacity: 0, y: 15, filter: 'blur(4px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 0.5, 
          stagger: 0.08, 
          ease: 'power2.out' 
        }
      )
    }
  }, [activeMember])

  // Reveal heading on scroll
  useEffect(() => {
    if (!isLoaded) return

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }
  }, [isLoaded])

  return (
    <section 
      id="team" 
      className="relative w-full py-24 md:py-36 bg-brand-cream border-b border-brand-dark/5 overflow-hidden"
    >
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-red/5 top-[10%] right-[-10%] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Subtitle */}
        <div className="mb-16 select-none">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-grey block">
            OUR COLLECTIVE LEADERSHIP
          </span>
        </div>

        {/* Heading & Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Editorial Headers & Interactive List */}
          <div className="lg:col-span-6 flex flex-col gap-12">
            <div ref={headingRef} className="flex flex-col gap-4">
              <h2 className="font-serif text-5xl md:text-7xl text-brand-dark uppercase tracking-tight leading-none">
                meet the <br />
                <span className="text-brand-red">team</span>
              </h2>
              <p className="font-sans text-sm md:text-base text-brand-grey max-w-lg font-light leading-relaxed mt-4">
                Our movement is driven by dedicated educators, practitioners, conservationists, and medical advisors who combine local wisdom with structured execution to bring lasting empowerment.
              </p>
            </div>

            {/* Interactive Team Names List */}
            <div className="flex flex-col border-t border-brand-dark/10 divide-y divide-brand-dark/10 mt-4">
              {team.map((member, idx) => (
                <button
                  key={member.name}
                  onMouseEnter={() => setActiveMember(idx)}
                  onClick={() => setActiveMember(idx)}
                  className="w-full py-6 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-6 md:gap-8">
                    {/* Index display */}
                    <span className={`font-display text-xs font-bold tracking-widest ${
                      activeMember === idx ? 'text-brand-red' : 'text-brand-grey/50 group-hover:text-brand-dark'
                    } transition-colors duration-300`}>
                      0{idx + 1}
                    </span>
                    
                    <div>
                      {/* Name */}
                      <span className={`font-serif text-xl sm:text-2xl md:text-3xl block transition-all duration-300 ${
                        activeMember === idx 
                          ? 'text-brand-dark font-medium translate-x-2' 
                          : 'text-brand-dark/60 group-hover:text-brand-dark group-hover:translate-x-1'
                      }`}>
                        {member.name}
                      </span>
                      {/* Role */}
                      <span className={`font-sans text-[10px] font-bold uppercase tracking-wider block mt-1 transition-colors duration-300 ${
                        activeMember === idx ? 'text-brand-red' : 'text-brand-grey/60 group-hover:text-brand-red/70'
                      }`}>
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    activeMember === idx 
                      ? 'border-brand-red bg-brand-red text-brand-cream rotate-45 scale-110 shadow-md shadow-brand-red/10' 
                      : 'border-brand-dark/15 text-brand-dark group-hover:border-brand-dark group-hover:bg-brand-dark group-hover:text-brand-cream'
                  }`}>
                    <svg className="w-3.5 h-3.5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Editorial Preview Spotlight Showcase */}
          <div className="lg:col-span-6">
            <div 
              ref={previewCardRef}
              className="relative rounded-[32px] bg-brand-white border border-brand-dark/5 p-8 md:p-10 shadow-2xl flex flex-col gap-8 overflow-hidden min-h-[580px] justify-between"
            >
              {/* Top Accent Lines */}
              <div className="absolute top-0 left-0 w-full h-[6px] bg-brand-red" />
              
              {/* Inner Decorative Quote Icon */}
              <div className="absolute right-8 top-8 opacity-5 text-brand-dark pointer-events-none select-none">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.765 2.827-4.765 5.71 0 .862.392 1.306 1.147 1.306 1.823 0 3.162 1.377 3.162 3.518 0 2.228-1.567 3.865-3.864 3.865-2.298 0-5.658-2.203-5.658-8.625 0-10.231 10.457-10.128 10.457-10.128v1.5s-6.31 1.667-6.31 8.625c0 .09.004.166.01.25.794-.57 1.761-.859 2.753-.859 2.52 0 4.58 2.059 4.58 4.58 0 2.52-2.06 4.58-4.58 4.58-2.518 0-4.578-2.06-4.578-4.58zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4.782 2.827-4.782 5.71 0 .862.392 1.306 1.147 1.306 1.822 0 3.162 1.377 3.162 3.518 0 2.228-1.567 3.865-3.864 3.865-2.297 0-5.658-2.203-5.658-8.625 0-10.231 10.457-10.128 10.457-10.128v1.5s-6.31 1.667-6.31 8.625c0 .09.004.166.01.25.794-.57 1.762-.859 2.753-.859 2.52 0 4.58 2.059 4.58 4.58 0 2.52-2.06 4.58-4.58 4.58-2.518 0-4.578-2.06-4.578-4.58z" />
                </svg>
              </div>

              {/* Portrait Display */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-brand-dark/5 shadow-inner bg-brand-cream/40 animate-on-change">
                <img 
                  src={team[activeMember].image} 
                  alt={team[activeMember].name} 
                  className="w-full h-full object-cover md:grayscale brightness-95 md:hover:grayscale-0 md:hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Details & Quote Content */}
              <div className="flex flex-col gap-6 relative z-10 grow justify-between">
                
                {/* Biography & Quote */}
                <div className="flex flex-col gap-4">
                  {/* Quote */}
                  <blockquote className="animate-on-change">
                    <p className="font-serif text-lg md:text-xl text-brand-dark/95 leading-relaxed italic relative pl-4 border-l-2 border-brand-red/60">
                      "{team[activeMember].quote}"
                    </p>
                  </blockquote>

                  {/* Biography */}
                  <p className="font-sans text-sm text-brand-grey leading-relaxed font-light animate-on-change">
                    {team[activeMember].bio}
                  </p>
                </div>

                {/* Director Signature Label */}
                <div className="border-t border-brand-dark/5 pt-4 flex flex-col gap-1 animate-on-change">
                  <span className="font-serif text-2xl text-brand-dark font-medium tracking-tight">
                    {team[activeMember].name}
                  </span>
                  <span className="font-sans text-[10px] font-bold text-brand-red uppercase tracking-wider">
                    {team[activeMember].role}
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Team
