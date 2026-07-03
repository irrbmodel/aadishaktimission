import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Lightbulb, Award, Briefcase, Leaf, Scale, Users, HeartHandshake } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const VisionMission = ({ isLoaded }) => {
  const containerRef = useRef(null)

  const missionItems = [
    {
      text: "Promote holistic education and lifelong learning.",
      icon: BookOpen,
    },
    {
      text: "Encourage innovation, creativity, and research for societal development.",
      icon: Lightbulb,
    },
    {
      text: "Develop leadership, ethical values, and responsible citizenship.",
      icon: Award,
    },
    {
      text: "Strengthen skills, entrepreneurship, and employability.",
      icon: Briefcase,
    },
    {
      text: "Promote health, well-being, and environmental sustainability.",
      icon: Leaf,
    },
    {
      text: "Foster constitutional values, human dignity, equality, and social justice.",
      icon: Scale,
    },
    {
      text: "Encourage volunteerism, community engagement, and nation-building.",
      icon: Users,
    },
    {
      text: "Build partnerships among academia, industry, government, and civil society for sustainable development.",
      icon: HeartHandshake,
    }
  ]

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Vision Card Reveal
      gsap.fromTo(
        ".vision-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ".vision-card",
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Mission Cards Stagger
      gsap.fromTo(
        ".mission-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ".mission-grid",
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <section 
      id="vision-mission" 
      ref={containerRef}
      className="relative z-20 w-full min-h-screen bg-brand-cream border-b border-brand-dark/5 flex flex-col py-24 md:py-32"
    >
      {/* Decorative Blob */}
      <div className="absolute glowing-blob w-[500px] h-[500px] bg-brand-red/5 bottom-[10%] left-[-10%] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-brand-dark/10 pb-4 mb-16">
          <span className="font-display text-[10px] font-black uppercase tracking-[0.35em] text-brand-red/80">
            04 / Vision & Mission
          </span>
          <span className="font-serif italic text-xs text-brand-grey">
            Our Purpose
          </span>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Sticky Vision Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-4">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-red">
              our vision
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-brand-dark uppercase tracking-tight leading-none mb-2">
              to inspire &<br />
              <span className="text-brand-red">empower</span>
            </h2>
            
            <div className="vision-card bg-white/70 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-brand-dark/10 shadow-[0_20px_50px_rgba(1,62,55,0.03)] relative overflow-hidden mt-4">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[6px] bg-brand-red" />
              
              {/* Decorative quotation background icon */}
              <div className="absolute -right-6 -bottom-10 font-serif text-[12rem] text-brand-dark/5 select-none pointer-events-none leading-none">
                ”
              </div>
 
              <p className="font-serif text-xl sm:text-2xl text-brand-dark leading-relaxed tracking-tight font-light relative z-10">
                To build an inclusive, empowered, and sustainable society by unlocking the inherent potential of every individual and fostering leadership, innovation, and social responsibility.
              </p>
            </div>
          </div>
 
          {/* Right Side: Mission Grid */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-red mb-2">
              our mission
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-brand-dark uppercase tracking-tight leading-none mb-8">
              key pillars
            </h2>
 
            <div className="mission-grid grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {missionItems.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div 
                    key={idx}
                    className="mission-card bg-white rounded-3xl p-6 border border-brand-dark/8 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(1,62,55,0.03)] hover:-translate-y-1 flex flex-col gap-4 cursor-default"
                  >
                    {/* Icon container */}
                    <div className="w-10 h-10 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-grey">
                      <Icon size={18} className="stroke-[1.5]" />
                    </div>
 
                    {/* Mission Text */}
                    <p className="font-serif text-sm sm:text-[14.5px] text-brand-dark/85 leading-relaxed font-light">
                      {item.text}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default VisionMission
