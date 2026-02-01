import React, { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';
import AntigravityBackground from './components/AntigravityBackground';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import SpaceLoader from './components/SpaceLoader';
import AudioPlayer from './components/AudioPlayer';

// Lazy load only the heavy bottom sections
const ExploreSpace = lazy(() => import('./components/ExploreSpace'));
const SolarSystemExplorer = lazy(() => import('./components/SolarSystemExplorer'));

function App() {
  // Preload bottom sections after initial render
  useEffect(() => {
    // Preload after a short delay to not block initial render
    const timer = setTimeout(() => {
      import('./components/ExploreSpace');
      import('./components/SolarSystemExplorer');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden selection:bg-cosmic-amber/30 selection:text-cosmic-amber-light">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cosmic-amber focus:text-slate-900 focus:rounded-lg focus:font-semibold"
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

        <Suspense fallback={<SpaceLoader />}>
          <ExploreSpace />
          <SolarSystemExplorer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
