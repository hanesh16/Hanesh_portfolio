import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import AntigravityBackground from './components/AntigravityBackground';
import Hero from './components/Hero'; // Keep Hero eager for LCP
import SpaceLoader from './components/SpaceLoader';

// Lazy load non-critical sections
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const ExploreSpace = lazy(() => import('./components/ExploreSpace'));
const SolarSystemExplorer = lazy(() => import('./components/SolarSystemExplorer'));
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <div className="relative min-h-screen font-sans text-slate-200 overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      <AntigravityBackground />
      <AudioPlayer />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Suspense fallback={<SpaceLoader />}>
          <About />
          <Experience />
          <Projects />
          <Education />
          <Contact />
          <ExploreSpace />

          <SolarSystemExplorer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
