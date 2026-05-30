# Hanesh Koganti Portfolio - AI Agent Guide

## Project Overview

This is a **personal portfolio website** for Hanesh Koganti, a Software Engineer & Full-Stack Developer. The site features a space/cosmic theme with interactive 3D elements and serves as a showcase of professional experience, projects, and technical skills.

**Key Features:**
- Interactive 3D solar system background using Three.js and React Three Fiber
- Solar System Explorer - an interactive 3D scene for exploring planets
- AI-powered "Explore Space" chat interface using GitHub Models (GPT-4o)
- Background music player with visual equalizer
- Animated navigation with scroll spy
- 3D tilt card effects with hover animations
- Terminal-style typewriter effects
- Fully responsive design (desktop & mobile)

**Live URL:** https://haneshkoganti.dev/

---

## Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 19 (with StrictMode) |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 + Custom CSS |
| **3D Rendering** | Three.js, @react-three/fiber, @react-three/drei |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Smooth Scrolling** | React Scroll |
| **AI Integration** | Azure AI Inference Client, GitHub Models (GPT-4o) |
| **Linting** | ESLint 9 with React Hooks plugin |

---

## Project Structure

```
├── index.html              # Entry HTML with SEO meta tags
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration with code splitting
├── tailwind.config.js      # Tailwind CSS theme configuration
├── postcss.config.js       # PostCSS with Tailwind v4 plugin
├── eslint.config.js        # ESLint configuration
├── .env                    # Environment variables (VITE_GITHUB_TOKEN)
├── .gitignore              # Git ignore rules
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── hanesh_floating.png
│   ├── astronaut.png
│   └── rocket.png
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main app with section layout & lazy loading
│   ├── index.css           # Global styles, Tailwind imports, animations
│   ├── App.css             # Component-specific styles (minimal)
│   ├── components/
│   │   ├── Navbar.jsx      # Fixed in-page section nav (desktop + mobile variants)
│   │   ├── SpaceNavigator.jsx         # Switches the 3 app modes (portfolio/explore/solar)
│   │   ├── Hero.jsx        # Hero section with typewriter terminal
│   │   ├── About.jsx       # About section with skills grid
│   │   ├── Experience.jsx  # Work experience timeline
│   │   ├── Projects.jsx    # Project showcase with image overlays
│   │   ├── Research.jsx    # Research / publications section
│   │   ├── Education.jsx   # Education & certifications cards
│   │   ├── Contact.jsx     # Contact section with social links
│   │   ├── Footer.jsx      # Site footer
│   │   ├── TiltCard.jsx    # Reusable 3D tilt effect card component
│   │   ├── ScrollProgress.jsx         # Top scroll progress indicator bar
│   │   ├── AntigravityBackground.jsx  # 3D particle background + mini solar system
│   │   ├── SolarSystemExplorer.jsx    # Interactive 3D planet explorer (LAZY LOADED)
│   │   ├── ExploreSpace.jsx           # AI chat interface (LAZY LOADED)
│   │   ├── AudioPlayer.jsx            # Background music with equalizer
│   │   └── SpaceLoader.jsx            # Loading spinner for Suspense
│   └── assets/
│       ├── textures/       # 3D textures (8k_sun.jpg, planets, etc.)
│       ├── Perplexity.mp3  # Background music
│       └── polaroid_placeholder.png
```

---

## Build & Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## Code Style Guidelines

### Component Structure
- Use functional components with arrow functions
- Group imports: React → Third-party → Components → Assets
- Use `framer-motion` for all animations (prefer `whileInView` for scroll-triggered)
- Wrap heavy components in `React.lazy()` and `Suspense`

### Styling Conventions
- **Primary color:** Amber (`#fbbf24`, `text-amber-400`, `border-amber-400`)
- **Background:** Dark space theme (`#050510`)
- **Text:** Slate palette (`text-slate-100`, `text-slate-300`, `text-slate-400`)
- **Glassmorphism:** Use `backdrop-blur-xl`, `bg-white/5`, `border-white/10`
- **Font families:** Inter (body), Outfit (headings)

### Tailwind Custom Classes (defined in `index.css`)
- `.holo-glass` - Holographic glass card effect
- `.cosmic-gradient` - Animated gradient text
- `.glow-text` - Text with amber glow shadow
- `.card-glow` - Hover glow effect for cards
- `.launch-btn` - Primary CTA button style
- `.nav-reactor-active` - Active nav item style

### Performance Patterns
- Use `loading="lazy"` and `decoding="async"` on images
- Lazy load heavy components (SolarSystemExplorer, ExploreSpace)
- Use CSS transforms (`transform-gpu`) for GPU acceleration
- Preload textures: `useTexture.preload()`

---

## Component Architecture

### Navigation Modes (no React Router)
`App.jsx` holds a single `mode` state (`'portfolio' | 'explore' | 'solar'`), toggled by `SpaceNavigator` via `onModeChange`. Each mode early-returns a different tree; switching modes scrolls to top. The two non-portfolio modes are lazy-loaded and rendered standalone (NOT nested inside `<main>`).
- **portfolio** — Full scrollable site (`react-scroll` smooth-scroll). Section IDs: `hero`, `about`, `experience`, `projects`, `research`, `education`, `contact`
- **explore** — `ExploreSpace` AI chat (lazy)
- **solar** — `SolarSystemExplorer` 3D scene (lazy)

### App.jsx Portfolio Layout
```
<ScrollProgress />         # Top progress bar
<AntigravityBackground />  # Fixed 3D background (z-index: -1)
<AudioPlayer />            # Fixed music toggle (z-index: 50)
<Navbar />                 # Fixed in-page section nav (z-index: 50)
<main id="main-content">   # Each section wrapped in a whileInView motion.div
  <Hero />                 # Top section
  <About />                # About + skills
  <Experience />           # Work history timeline
  <Projects />             # Project showcase
  <Research />             # Research / publications
  <Education />            # Education cards
  <Contact />              # Contact CTA
</main>
<Footer />
<SpaceNavigator />         # Mode switcher (portfolio/explore/solar)
```

### TiltCard Component
Reusable wrapper for 3D tilt effects:
```jsx
<TiltCard index={0} variant="default|scifi|scifi-tech" className="...">
  {/* Content */}
</TiltCard>
```
- `variant="scifi"` - Tech-style clipped corners with starfield background
- `variant="scifi-tech"` - More aggressive tech shape (40px cut)
- `index` - Used for staggered animation delays

---

## Environment Variables

| Variable | Purpose | Notes |
|----------|---------|-------|
| `VITE_GITHUB_TOKEN` | GitHub Models API authentication | Required for AI chat feature. Token must have models:read scope. |

**⚠️ Security Note:** The token is exposed to the client (Vite prefix). This is intentional for the demo, but in production consider proxying through a backend.

---

## 3D & Animation Guidelines

### React Three Fiber Patterns
- Use `useFrame()` for animations (never `requestAnimationFrame` directly)
- Use `useTexture()` for loading textures (with `.preload()` at module level)
- Implement responsive positioning via `useThree()` viewport
- Use `frustumCulled={false}` for particle systems

### Animation Timing Standards
- Entrance animations: `duration: 0.5`, `delay: index * 0.1`
- Spring physics: `stiffness: 150, damping: 15` for tilt effects
- Scroll-triggered: `whileInView` with `viewport: { once: true }`
- Page transitions: Use `AnimatePresence` where needed

---

## Accessibility

- **Skip link:** "Skip to main content" link for keyboard users
- **ARIA labels:** All interactive elements have descriptive labels
- **Reduced motion:** Respect `prefers-reduced-motion` media query
- **Focus states:** Custom focus styles on interactive elements
- **Semantic HTML:** Proper heading hierarchy, section landmarks

---

## Testing Strategy

Currently no automated tests are configured. Manual testing checklist:
- [ ] Navigation smooth scroll works on all sections
- [ ] Mobile navbar (bottom dock) appears at < 768px
- [ ] 3D background renders without console errors
- [ ] AI chat responds to queries (requires valid token)
- [ ] Audio player toggles correctly
- [ ] All images lazy load
- [ ] Lazy-loaded sections appear on scroll

---

## Deployment

**Build Output:** `dist/` directory

**Static Hosting:** The app is a static SPA suitable for:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

**SEO:** Meta tags are pre-rendered in `index.html` for social sharing.

---

## Common Issues & Solutions

### Audio Autoplay Blocked
The AudioPlayer has a robust fallback that listens for any user interaction (click, scroll, keydown, etc.) to start playback if autoplay is blocked.

### 3D Canvas Performance
- DPR is capped at 2 to prevent over-rendering on high-DPI displays
- Performance min is set to 0.5 in Canvas
- Large textures are preloaded to prevent stutter

### Mobile Touch Interference
SolarSystemExplorer uses a "scroll shield" (transparent overlay) to prevent the Canvas from intercepting scroll gestures when not in interaction mode.

---

## Key Dependencies Reference

```json
{
  "framer-motion": "^12.26.1",      // Animations
  "three": "^0.182.0",               // 3D rendering
  "@react-three/fiber": "^9.5.0",    // React Three.js integration
  "@react-three/drei": "^10.7.7",    // 3D helpers
  "maath": "^0.10.8",                // Math utilities for 3D
  "react-scroll": "^1.9.3",          // Smooth scroll navigation
  "lucide-react": "^0.562.0",        // Icon library
  "@azure-rest/ai-inference": "^1.0.0-beta.6"  // AI integration
}
```

---

## File Naming Conventions

- Components: PascalCase (e.g., `SolarSystemExplorer.jsx`)
- Assets: kebab-case or descriptive (e.g., `8k_earth_daymap.jpg`)
- CSS: Global in `index.css`, minimal component-specific CSS
- Constants: UPPER_SNAKE_CASE for module-level constants
