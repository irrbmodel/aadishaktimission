import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Core Components
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import StoryNavigator from './components/StoryNavigator'

// Page Sections
import Hero from './components/Hero'
import PolaroidParallax from './components/PolaroidParallax'
import Philosophy from './components/Philosophy'
import PillarsHorizontal from './components/PillarsHorizontal'
import JourneyTimeline from './components/JourneyTimeline'
import Gallery from './components/Gallery'
import Team from './components/Team'
import ActionHub from './components/ActionHub'
import MembershipPayment from './components/MembershipPayment'
import DonationPayment from './components/DonationPayment'
import Footer from './components/Footer'
import IntroAnimation from './components/IntroAnimation'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [introFinished, setIntroFinished] = useState(false)
  const [view, setView] = useState('home') // 'home', 'become-member', 'donation', 'membership-payment', or 'donation-payment'
  const [membershipData, setMembershipData] = useState({ name: '', email: '', phone: '' })
  const [donationData, setDonationData] = useState({ donorName: '', donorEmail: '', amount: 0, category: 'general' })

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
    // 1. Initialize Lenis Smooth Scroll with premium physics settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium exponential easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: false,
      infinite: false,
    })

    // 2. Sync Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to run Lenis updates for perfect frame synchronization
    const rafUpdate = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafUpdate)
    gsap.ticker.lagSmoothing(0)

    // Refresh GSAP on Lenis updates (forces recalcs on layout reflows)
    const handleRefresh = () => {
      ScrollTrigger.sort()
      lenis.resize()
    }
    ScrollTrigger.addEventListener('refresh', handleRefresh)

    // 3. Clear/Refresh ScrollTrigger configurations after layout settlement
    const handleLoad = () => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', handleLoad)

    const t1 = setTimeout(() => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    }, 200)
    const t2 = setTimeout(() => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    }, 1000)
    const t3 = setTimeout(() => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    }, 2500)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafUpdate)
      ScrollTrigger.removeEventListener('refresh', handleRefresh)
      window.removeEventListener('load', handleLoad)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
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

  useEffect(() => {
    if (!isLoaded || view !== 'home') return

    // Allow slight delay to let elements settle and calculate bounds correctly
    const timer = setTimeout(() => {
      const panels = [
        document.getElementById('hero'),
        document.getElementById('polaroid-transition'),
        document.getElementById('philosophy'),
        document.getElementById('philosophy-snapshots'),
        document.getElementById('pillars'),
        document.getElementById('journey'),
        document.getElementById('gallery'),
        document.getElementById('team')
      ].filter(Boolean)

      const ctx = gsap.context(() => {
        // 1. (GSAP pinning for static h-screen panels removed to allow natural scrolling for variable height sections)

        // 2. Scale down, blur, and fade out the current panel as the next panel overlaps it
        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return // Skip the last panel (Team)

          const nextPanel = panels[i + 1]
          if (nextPanel) {
            gsap.to(panel, {
              scale: 0.88,
              opacity: 0.25,
              filter: 'blur(4px)',
              yPercent: -15, // parallax drift back
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: nextPanel,
                start: 'top bottom', // starts when next panel enters
                end: 'top top',      // ends when next panel covers it
                scrub: true,
                invalidateOnRefresh: true
              }
            })
          }
        })
      })

      ScrollTrigger.refresh()
    }, 300)

    return () => clearTimeout(timer)
  }, [isLoaded, view])

  return (
    <div className="relative min-h-screen bg-brand-cream selection:bg-brand-red selection:text-brand-cream">
      {/* Dynamic Background Glowing Blobs (Global mesh accent) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 overflow-hidden">
        <div className="glowing-blob w-[600px] h-[600px] bg-brand-red/10 top-[-20%] left-[-10%]" />
        <div className="glowing-blob w-[500px] h-[500px] bg-brand-grey/5 bottom-[-10%] right-[-10%] [animation-delay:-8s]" />
      </div>

      {/* Navigation Header */}
      <Navbar 
        isLoaded={isLoaded} 
        view={view} 
        setView={(v, targetSection) => navigateTo(v, v === 'home' ? 'Home' : v === 'donation' ? 'Donation' : 'Membership', targetSection)} 
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
          <main className="relative z-10 w-full bg-brand-cream">
            <Hero isLoaded={isLoaded} onJoinNow={() => navigateTo('become-member', 'Membership')} />
            <PolaroidParallax isLoaded={isLoaded} />
            <Philosophy isLoaded={isLoaded} />
            <PillarsHorizontal isLoaded={isLoaded} />
            <JourneyTimeline isLoaded={isLoaded} />
            <Gallery />
            <Team isLoaded={isLoaded} />
          </main>
        ) : view === 'become-member' ? (
          <main className="relative z-10 w-full overflow-hidden pt-20">
            <ActionHub 
              isLoaded={isLoaded} 
              mode="membership"
              onProceed={(data) => {
                navigateTo('membership-payment', 'Membership', () => {
                  ScrollTrigger.getAll().forEach(t => t.kill())
                  setMembershipData(data)
                })
              }}
            />
          </main>
        ) : view === 'donation' ? (
          <main className="relative z-10 w-full overflow-hidden pt-20">
            <ActionHub 
              isLoaded={isLoaded} 
              mode="donation"
            />
          </main>
        ) : view === 'membership-payment' ? (
          <main className="relative z-10 w-full overflow-hidden">
            <MembershipPayment 
              membershipData={membershipData} 
              onBack={() => navigateTo('home', 'Home')} 
            />
          </main>
        ) : (
          <main className="relative z-10 w-full overflow-hidden">
            <DonationPayment 
              donationData={donationData} 
              onBack={() => navigateTo('home', 'Home')} 
            />
          </main>
        )}

        {/* Footer Section */}
        <Footer 
          view={view} 
          setView={(v, targetSection) => navigateTo(v, v === 'home' ? 'Home' : v === 'donation' ? 'Donation' : 'Membership', targetSection)} 
        />
      </div>

      {/* Premium Page Transition Overlay */}
      <PageTransition 
        isActive={isTransitioning}
        onMidpoint={() => {
          if (targetView !== 'home') {
            ScrollTrigger.getAll().forEach(t => t.kill())
          }
          setView(targetView)
          if (navigationCallback) navigationCallback()
          window.scrollTo(0, 0)
          
          setTransitionState('animating-in')
          
          // Re-sort/re-calculate scroll triggers for the newly rendered view
          setTimeout(() => {
            ScrollTrigger.sort()
            ScrollTrigger.refresh()
          }, 50)
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

      {/* Story Navigator Sidebar */}
      {view === 'home' && <StoryNavigator isLoaded={isLoaded && introFinished} />}
    </div>
  )
}

export default App