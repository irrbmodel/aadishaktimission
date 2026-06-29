import React from 'react'

const OurImpact = ({ isLoaded }) => {
  const slides = [
    {
      image: '/images/girls_studying.jpeg',
      tag: '08 / Education',
      num: '10k+',
      label: 'Girls Mentored',
      desc: 'Empowering young girls in remote Himalayan valleys with computer literacy, textbooks, and mentoring.',
      quote: '"Education is the most powerful tool to cultivate self-reliance and change the future of our societies."'
    },
    {
      image: '/images/village_women_uttarakhand.png',
      tag: '08 / Livelihood',
      num: '15k+',
      label: 'Lives Empowered',
      desc: 'Creating independent women cooperatives and providing vocational training to build community resilience.',
      quote: '"Empowering women is not just charity, it is about unlocking their inherent potential to lead."'
    },
    {
      image: '/images/outreach_walk.jpeg',
      tag: '08 / Health Access',
      num: '50+',
      label: 'Villages Reached',
      desc: 'Delivering diagnostic camps, maternal nutrition, and primary healthcare to underserved high-altitude hamlets.',
      quote: '"Sustainable health starts at the grassroots. Every village reached is a community secured."'
    }
  ]

  if (!isLoaded) return null

  return (
    <section id="our-impact" className="relative w-full bg-brand-dark z-20">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
          style={{ zIndex: idx + 10 }}
        >
          {/* Background Blurred Photo */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <img 
              src={slide.image} 
              alt={slide.label} 
              className="w-full h-full object-cover"
              style={{ filter: 'blur(4px) brightness(0.4)', transform: 'scale(1.05)' }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-brand-dark/60 via-brand-dark/40 to-brand-dark/80 mix-blend-multiply" />
          </div>

          {/* Content panel */}
          <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center justify-center text-center text-white gap-6 md:gap-10">
            {/* Section Header */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-display text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-[#0ea5e9]">
                {slide.tag}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-cream uppercase tracking-tight leading-none mt-2">
                OUR IMPACT
              </h2>
            </div>

            {/* Metric & Description */}
            <div className="flex flex-col items-center gap-4 max-w-2xl px-4">
              <div className="inline-flex flex-col items-center bg-brand-dark/40 border border-white/20 rounded-2xl px-10 py-8 backdrop-blur-md shadow-2xl">
                <span className="font-serif text-6xl sm:text-7xl md:text-8xl font-black text-brand-cream leading-none drop-shadow-lg">
                  {slide.num}
                </span>
                <span className="font-display text-[10px] md:text-xs font-black uppercase tracking-widest text-[#0ea5e9] mt-3">
                  {slide.label}
                </span>
              </div>
              <p className="font-sans text-sm md:text-base text-brand-cream/90 font-light leading-relaxed mt-4">
                {slide.desc}
              </p>
            </div>

            {/* Inspirational Quote Overlay */}
            <div className="max-w-3xl mt-4 px-6 border-l-2 border-[#0ea5e9]/60 pl-4 md:pl-6">
              <blockquote className="font-serif text-base sm:text-lg md:text-xl text-brand-cream/90 italic leading-relaxed text-left">
                {slide.quote}
              </blockquote>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default OurImpact
