import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Core Components
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'

// Page Sections
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import PillarsHorizontal from './components/PillarsHorizontal'
import StatsCounter from './components/StatsCounter'
import JourneyTimeline from './components/JourneyTimeline'
import Gallery from './components/Gallery'
import DonationImpact from './components/DonationImpact'
import Footer from './components/Footer'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const App = () => {
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
    const handleRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', handleRefresh)

    // 3. Clear/Refresh ScrollTrigger configurations
    ScrollTrigger.refresh()

    // Cleanup on unmount
    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafUpdate)
      ScrollTrigger.removeEventListener('refresh', handleRefresh)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-brand-dark selection:bg-brand-orange selection:text-brand-dark">
      {/* Dynamic Background Glowing Blobs (Global mesh accent) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        <div className="glowing-blob w-[600px] h-[600px] bg-brand-purple/20 top-[-20%] left-[-10%]" />
        <div className="glowing-blob w-[500px] h-[500px] bg-brand-orange/15 bottom-[-10%] right-[-10%] [animation-delay:-8s]" />
      </div>

      {/* Global Interactive Custom Cursor Follower */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <Philosophy />
        <PillarsHorizontal />
        <StatsCounter />
        <JourneyTimeline />
        <Gallery />
        <DonationImpact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default App