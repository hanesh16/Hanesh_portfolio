import React, { Suspense, lazy, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AntigravityBackground from './components/AntigravityBackground';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpaceLoader from './components/SpaceLoader';
import AudioPlayer from './components/AudioPlayer';
import ScrollProgress from './components/ScrollProgress';
import SpaceNavigator from './components/SpaceNavigator';

// Lazy load the explorer sections
const ExploreSpace = lazy(() => import('./components/ExploreSpace'));
const SolarSystemExplorer = lazy(() => import('./components/SolarSystemExplorer'));

function App() {
  const [mode, setMode] = useState('portfolio');

  const handleModeChange = (newMode) => {
    setMode(newMode);
    // Scroll to top when switching modes
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Preload explorer components
  useEffect(() => {
    const timer = setTimeout(() => {
      import('./components/ExploreSpace');
      import('./components/SolarSystemExplorer');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Standalone Explore Mode
  if (mode === 'explore') {
    return (
      <div className="relative min-h-screen bg-[#020205] overflow-hidden">
        <Suspense fallback={<SpaceLoader />}>
          <ExploreSpace />
        </Suspense>
        <SpaceNavigator currentMode={mode} onModeChange={handleModeChange} />
      </div>
    );
  }

  // Standalone Solar System Mode
  if (mode === 'solar') {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden">
        <Suspense fallback={<SpaceLoader />}>
          <SolarSystemExplorer />
        </Suspense>
        <SpaceNavigator currentMode={mode} onModeChange={handleModeChange} />
      </div>
    );
  }

  // Main Portfolio Mode
  return (
    <div className="relative min-h-screen font-sans text-slate-200 overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-slate-900 focus:rounded-md focus:font-semibold"
      >
        Skip to main content
      </a>

      <AntigravityBackground />
      <AudioPlayer />
      <Navbar />

      <main id="main-content" className="relative z-10" role="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
      
      {/* Space Navigator - switches between modes */}
      <SpaceNavigator currentMode={mode} onModeChange={handleModeChange} />
    </div>
  );
}

export default App;
