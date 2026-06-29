import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StoryNavigator = ({ isLoaded }) => {
  const [activeChapter, setActiveChapter] = useState(0)

  const chapters = [
    { id: 'hero', title: 'Vision', num: '01' },
    { id: 'polaroid-transition', title: 'Community', num: '02' },
    { id: 'philosophy', title: 'Our Approach', num: '03' },
    { id: 'philosophy-snapshots', title: 'Snapshots', num: '04' },
    { id: 'journey', title: 'Programs', num: '05' },
    { id: 'gallery', title: 'Archive', num: '06' },
    { id: 'our-impact', title: 'Impact', num: '07' },
    { id: 'team', title: 'Founders', num: '08' }
  ]

  useEffect(() => {
    if (!isLoaded) return

    const triggers = []

    chapters.forEach((chapter, index) => {
      const el = document.getElementById(chapter.id)
      if (!el) return

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveChapter(index)
          }
        }
      })
      triggers.push(st)
    })

    // Fade in sidebar when page is loaded
    gsap.fromTo(
      '.story-navigator-container',
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 1.2, delay: 1.5, ease: 'power3.out' }
    )

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [isLoaded])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentChapterId = chapters[activeChapter]?.id
  const isHiddenSection = currentChapterId === 'hero' || currentChapterId === 'our-impact'

  return (
    <div 
      className={`fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block transition-all duration-500 ease-in-out ${
        isHiddenSection ? 'opacity-0 pointer-events-none translate-x-4' : 'opacity-100 translate-x-0'
      }`}
    >
      <div className="story-navigator-container flex flex-col items-end gap-6 select-none opacity-0">
        {/* Decorative vertical track line */}
        <div className="absolute right-[11px] top-4 bottom-4 w-px bg-brand-cream/10 pointer-events-none">
          <div 
            className="w-full bg-brand-red transition-all duration-500 ease-out"
            style={{
              height: `${(activeChapter / (chapters.length - 1)) * 100}%`,
              marginTop: '0'
            }}
          />
        </div>

        {chapters.map((ch, idx) => {
          const isActive = activeChapter === idx
          return (
            <button
              key={ch.id}
              onClick={() => scrollToSection(ch.id)}
              className="flex items-center gap-2 group cursor-pointer relative py-1 focus:outline-none"
              data-cursor="pointer"
            >
              {/* Hover text label */}
              <span className={`font-sans text-[10px] font-black tracking-widest uppercase transition-all duration-300 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${
                isActive ? 'text-brand-red' : 'text-brand-grey'
              }`}>
                {ch.title}
              </span>

              {/* Chapter dot and index */}
              <div className="flex items-center justify-center w-6 h-6 relative">
                <span className={`absolute font-display text-[8px] font-black tracking-tighter left-6 transition-all duration-300 ${
                  isActive ? 'text-brand-red opacity-100 scale-100' : 'text-brand-grey/40 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                }`}>
                  {ch.num}
                </span>
                <div 
                  className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                    isActive 
                      ? 'bg-brand-red border-brand-red scale-125 shadow-[0_0_10px_rgba(155,0,0,0.4)]' 
                      : 'bg-brand-cream border-brand-dark/25 group-hover:border-brand-red group-hover:bg-brand-red/10 scale-100'
                  }`}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default StoryNavigator
