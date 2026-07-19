import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Core Components
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import CustomCursor from './components/CustomCursor'

// Page Sections
import Hero from './components/Hero'
import PolaroidParallax from './components/PolaroidParallax'
import AboutUs from './components/AboutUs'
import JourneyTimeline from './components/JourneyTimeline'
import Gallery from './components/Gallery'
import OurImpact from './components/OurImpact'
import Team from './components/Team'
import VisionMission from './components/VisionMission'
import MembershipPayment from './components/MembershipPayment'
import DonationPayment from './components/DonationPayment'
import Footer from './components/Footer'
import IntroAnimation from './components/IntroAnimation'
import GetInvolvedSidePanel from './components/GetInvolvedSidePanel'
import ProgramSidePanel from './components/ProgramSidePanel'
import ActionHub from './components/ActionHub'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [introFinished, setIntroFinished] = useState(false)
  const [view, setView] = useState('home') // 'home', 'become-member', 'donation', 'membership-payment', or 'donation-payment'
  const [membershipData, setMembershipData] = useState({ name: '', email: '', phone: '' })
  const [donationData, setDonationData] = useState({ donorName: '', donorEmail: '', amount: 0, category: 'general' })
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [sidePanelMode, setSidePanelMode] = useState('donation')
  const [isProgramPanelOpen, setIsProgramPanelOpen] = useState(false)
  const [selectedProgramTitle, setSelectedProgramTitle] = useState(null)

  const openProgramPanel = (title) => {
    setSelectedProgramTitle(title)
    setIsProgramPanelOpen(true)
  }

  const openSidePanel = (mode = 'donation') => {
    setSidePanelMode(mode)
    setIsSidePanelOpen(true)
  }

  // Premium Page Transition States
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionState, setTransitionState] = useState('idle') // 'idle', 'animating-out', 'animating-in'
  const [scrollTarget, setScrollTarget] = useState(null)
  const [targetView, setTargetView] = useState(null)
  const [navigationCallback, setNavigationCallback] = useState(null)

  const navigateTo = (newView, label, callback) => {
    if (newView === view) {
      if (callback && typeof callback === 'string') {
        const el = document.getElementById(callback)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }
    
    // Start page fade-out and trigger panels overlay slide
    setTargetView(newView)
    
    if (typeof callback === 'function') {
      setNavigationCallback(() => callback)
      setScrollTarget(null)
    } else if (typeof callback === 'string') {
      setScrollTarget(callback)
      setNavigationCallback(null)
    } else {
      setNavigationCallback(null)
      setScrollTarget(null)
    }
    
    setTransitionState('animating-out')
    setIsTransitioning(true)
  }

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll with high-performance responsive settings
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    })

    // Expose Lenis instance globally
    window.lenis = lenis

    // 2. Sync Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for perfect frame synchronization without frame dropping
    const rafUpdate = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafUpdate)
    gsap.ticker.lagSmoothing(1000, 16)

    // Clear/Refresh ScrollTrigger configurations after layout settlement
    const handleLoad = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', handleLoad)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
      window.lenis = null
      gsap.ticker.remove(rafUpdate)
      window.removeEventListener('load', handleLoad)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) {
      document.documentElement.classList.add('lenis-stopped')
    } else {
      document.documentElement.classList.remove('lenis-stopped')
    }
    return () => {
      document.documentElement.classList.remove('lenis-stopped')
    }
  }, [isLoaded])

  return (
    <div className="relative min-h-screen bg-brand-cream selection:bg-brand-red selection:text-brand-cream">
      {/* Custom Pointer Cursor for Desktop */}
      <CustomCursor />

      {/* Dynamic Background Glowing Blobs (Global mesh accent) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 overflow-hidden">
        <div className="glowing-blob w-150 h-150 bg-brand-red/10 top-[-20%] left-[-10%]" />
        <div className="glowing-blob w-125 h-125 bg-brand-grey/5 bottom-[-10%] right-[-10%] [animation-delay:-8s]" />
      </div>

      {/* Navigation Header */}
      <Navbar 
        isLoaded={isLoaded} 
        view={view} 
        setView={(v, targetSection) => navigateTo(v, v === 'home' ? 'Home' : v === 'donation' ? 'Donation' : 'Membership', targetSection)} 
        onGetInvolvedClick={() => openSidePanel('donation')}
      />

      {/* Main Content & Footer Wrapper with Premium Fade & Scale Transitions */}
      <div 
        className={
          transitionState === 'idle'
            ? 'opacity-100'
            : transitionState === 'animating-out'
            ? 'transition-all duration-650 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu origin-center opacity-0 scale-[0.985] blur-[1px] pointer-events-none'
            : 'transition-all duration-650 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu origin-center opacity-100 scale-100 blur-none'
        }
      >
        {/* Main Content Sections */}
        {view === 'home' ? (
          <main className="relative z-10 w-full bg-brand-cream overflow-clip">
            <Hero isLoaded={isLoaded} onJoinNow={() => openSidePanel('membership')} />
            <AboutUs isLoaded={isLoaded} />
            <PolaroidParallax isLoaded={isLoaded} />
            <VisionMission isLoaded={isLoaded} />
            <JourneyTimeline isLoaded={isLoaded} onOpenProgram={openProgramPanel} />
            <Gallery />
            <OurImpact isLoaded={isLoaded} />
            <Team isLoaded={isLoaded} />
          </main>
        ) : view === 'become-member' ? (
          <main className="relative z-10 w-full overflow-clip pt-20">
            <ActionHub 
              isLoaded={isLoaded} 
              mode="membership"
              onBack={() => navigateTo('home', 'Home')}
              onProceed={(data) => {
                navigateTo('membership-payment', 'Membership', () => {
                  setMembershipData(data)
                })
              }}
            />
          </main>
        ) : view === 'donation' ? (
          <main className="relative z-10 w-full overflow-clip pt-20">
            <ActionHub 
              isLoaded={isLoaded} 
              mode="donation"
              onBack={() => navigateTo('home', 'Home')}
              onProceed={(data) => {
                navigateTo('donation-payment', 'Donation', () => {
                  setDonationData(data)
                })
              }}
            />
          </main>
        ) : view === 'membership-payment' ? (
          <main className="relative z-10 w-full overflow-clip">
            <MembershipPayment 
              membershipData={membershipData} 
              onBack={() => navigateTo('home', 'Home')} 
            />
          </main>
        ) : view === 'donation-payment' ? (
          <main className="relative z-10 w-full overflow-clip">
            <DonationPayment 
              donationData={donationData} 
              onBack={() => navigateTo('home', 'Home')} 
            />
          </main>
        ) : null}

        {/* Footer Section */}
        <Footer 
          view={view} 
          setView={(v, targetSection) => {
            if (v === 'donation') {
              openSidePanel('donation')
            } else if (v === 'become-member') {
              openSidePanel('membership')
            } else {
              navigateTo(v, v === 'home' ? 'Home' : v === 'donation' ? 'Donation' : 'Membership', targetSection)
            }
          }} 
        />
      </div>

      {/* Premium Page Transition Overlay */}
      <PageTransition 
        isActive={isTransitioning}
        onMidpoint={() => {
          setView(targetView)
          if (navigationCallback) navigationCallback()
          window.scrollTo(0, 0)
          
          setTransitionState('animating-in')
          
          // Re-sort/re-calculate scroll triggers for the newly rendered view
          setTimeout(() => {
            ScrollTrigger.refresh()
          }, 100)
        }}
        onComplete={() => {
          setIsTransitioning(false)
          setTargetView(null)
          setNavigationCallback(null)
          setTransitionState('idle')
          
          // If we have a scroll target, scroll to it now that the page is loaded!
          if (scrollTarget) {
            const el = document.getElementById(scrollTarget)
            if (el) {
              setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }
            setScrollTarget(null)
          }
        }}
      />

      {/* Cinematic Intro Animation Overlay */}
      {!introFinished && (
        <IntroAnimation 
          onStartTransition={() => setIsLoaded(true)} 
          onComplete={() => setIntroFinished(true)} 
        />
      )}

      {/* Unified Get Involved Side Panel */}
      <GetInvolvedSidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        defaultMode={sidePanelMode}
        onProceedDonation={(data) => {
          setIsSidePanelOpen(false)
          setTimeout(() => {
            navigateTo('donation-payment', 'Donation', () => {
              setDonationData(data)
            })
          }, 100)
        }}
        onProceedMember={(data) => {
          setIsSidePanelOpen(false)
          setTimeout(() => {
            navigateTo('membership-payment', 'Membership', () => {
              setMembershipData(data)
            })
          }, 100)
        }}
      />

      {/* Program Details Side Panel */}
      <ProgramSidePanel 
        isOpen={isProgramPanelOpen}
        onClose={() => setIsProgramPanelOpen(false)}
        programTitle={selectedProgramTitle}
        onGetInvolved={() => openSidePanel('donation')}
      />
    </div>
  )
}

export default App