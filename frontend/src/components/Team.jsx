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
      name: 'Dr. Sushma Anthwal',
      role: 'Founder & Trustee',
      quote: 'Empowering rural communities is not about charity, but about unlocking their inherent potential for self-reliance and resilience.',
      bio: 'A visionary educator and social activist leading grassroots initiatives in rural literacy, women empowerment, and community development for over two decades.',
      image: '/images/founder_podium.jpeg'
    },
    {
      name: 'Dr. Shalini Bahuguna',
      role: 'Founder & Trustee',
      quote: 'Sustainable change begins at the grassroots. When we harmonize education, health, and conservation, we secure the future of our societies.',
      bio: 'An expert in public health and environmental stewardship, dedicated to implementing holistic wellness, nutrition, and resource conservation frameworks in underserved regions.',
      image: '/images/shalini.jpeg'
    }
  ]

  // Animate preview contents when activeMember changes
  useEffect(() => {
    if (previewCardRef.current) {
      gsap.fromTo(
        previewCardRef.current.querySelectorAll('.animate-on-change'),
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
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

    const ctx = gsap.context(() => {
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
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <section 
      id="team" 
      className="relative z-20 w-full min-h-screen bg-brand-cream border-b border-brand-dark/5 flex flex-col pt-32 pb-48"
    >
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-red/5 top-[10%] right-[-10%] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-6">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
            06 / Leadership
          </span>
          <span className="font-serif italic text-xs text-brand-grey">
            Our Founders
          </span>
        </div>

        {/* Heading & Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Editorial Headers & Interactive List */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div ref={headingRef} className="flex flex-col gap-4">
              <h2 className="font-serif text-5xl md:text-7xl text-brand-dark uppercase tracking-tight leading-none">
                our <br />
                <span className="text-brand-red">founders</span>
              </h2>
              <p className="font-sans text-sm md:text-base text-brand-grey max-w-lg font-light leading-relaxed mt-4">
                Our movement is established and guided by our founders, who bring decades of academic expertise and grassroots leadership to direct local empowerment, education, healthcare, and ecological conservation initiatives.
              </p>
            </div>

            {/* Interactive Team Names List - Hidden on mobile/tablets */}
            <div className="hidden lg:flex flex-col border-t border-brand-dark/10 divide-y divide-brand-dark/10 mt-4">
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
                      : 'border-brand-dark/15 text-brand-dark group-hover:border-brand-dark group-hover:bg-brand-cream group-hover:text-brand-dark'
                  }`}>
                    <svg className="w-3.5 h-3.5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Editorial Preview Spotlight Showcase - Hidden on mobile/tablets */}
          <div className="hidden lg:block lg:col-span-6">
            <div 
              ref={previewCardRef}
              className="relative rounded-[32px] bg-brand-white border border-brand-dark/5 p-6 md:p-8 shadow-2xl flex flex-col gap-4 overflow-hidden justify-between h-full max-h-[85vh]"
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
                  className="w-full h-full object-cover brightness-95 md:hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Details & Quote Content */}
              <div className="flex flex-col gap-4 relative z-10 grow justify-between">
                
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

          {/* Mobile/Tablet Stacked Founders Display - Visible only on small viewports */}
          <div className="flex flex-col gap-8 lg:hidden mt-8 w-full">
            {team.map((member) => (
              <div 
                key={member.name}
                className="relative rounded-[32px] bg-brand-white border border-brand-dark/5 p-6 md:p-8 shadow-2xl flex flex-col gap-6 overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-[6px] bg-brand-red" />
                
                {/* Portrait Display */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-brand-dark/5 shadow-inner bg-brand-cream/40">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover brightness-95"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Details & Quote Content */}
                <div className="flex flex-col gap-4 relative z-10">
                  {/* Quote */}
                  <blockquote>
                    <p className="font-serif text-base md:text-lg text-brand-dark/95 leading-relaxed italic relative pl-4 border-l-2 border-brand-red/60">
                      "{member.quote}"
                    </p>
                  </blockquote>

                  {/* Biography */}
                  <p className="font-sans text-xs md:text-sm text-brand-grey leading-relaxed font-light">
                    {member.bio}
                  </p>

                  {/* Director Signature Label */}
                  <div className="border-t border-brand-dark/5 pt-4 flex flex-col gap-1">
                    <span className="font-serif text-xl text-brand-dark font-medium tracking-tight">
                      {member.name}
                    </span>
                    <span className="font-sans text-[10px] font-bold text-brand-red uppercase tracking-wider">
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Team
