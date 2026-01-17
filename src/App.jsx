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
    <div className="relative min-h-screen font-sans text-slate-200 overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      <AntigravityBackground />
      <AudioPlayer />
      <Navbar />

      <main className="relative z-10">
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
