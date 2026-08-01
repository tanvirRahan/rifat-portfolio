<div align="center">

# 🌌 Next-Gen Interactive 3D Portfolio

**A hyper-optimized, immersive developer portfolio built with React, Three.js, and Tailwind CSS.**

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#)
[![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)](#)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](#)

[Live Preview](https://rifat-portfolio.vercel.app/) <!-- Replace with actual domain later --> · [Report Bug](https://github.com/tanvirRahan/rifat-portfolio/issues) · [Request Feature](https://github.com/tanvirRahan/rifat-portfolio/issues)

<br />

</div>

## ⚡ Overview

This is not just a portfolio; it's a **WebGL-powered interactive experience**. Designed with a modern, cyberpunk-inspired aesthetic, it features a full 3D interactive hero scene, buttery-smooth scroll animations, and a premium glassmorphism UI.

Most importantly, it has been **engineered to the absolute physical limits of performance** — achieving 60fps on desktop and maintaining zero-lag, battery-friendly rendering on mobile devices through deep GPU/CPU optimization techniques.

---

## ✨ Premium Features

- **🎮 Immersive 3D Hero Scene:** A fully modeled 3D room with a coder desk, interactive keyboard (InstancedMesh), and a rotating holographic globe, built entirely in the browser using React Three Fiber.
- **🎬 Cinematic Animations:** Scroll-triggered reveals, staggered layout entrances, and HUD-style floating elements powered by **GSAP**.
- **🌊 Fluid Scrolling:** Integrated **Lenis** smooth scroll for a premium, momentum-based browsing experience (with native fallbacks for touch devices).
- **💎 Glassmorphism UI:** Dark-mode exclusive, cyberpunk-inspired design utilizing neon accents (`#06b6d4` cyan & `#a855f7` violet), and custom CSS micro-animations.
- **🚀 1000x Speed Optimization:** Dynamic DPR scaling, aggressive mobile frame-throttling, CSS paint containment, and conditional WebGL shadow mapping to guarantee 0 lag on any device.

---

## 🛠️ Full Tech Stack

### Frontend Core
- **[React 18](https://react.dev/):** Component-driven UI architecture.
- **[TypeScript](https://www.typescriptlang.org/):** Strict type-safety across the entire codebase.
- **[Vite](https://vitejs.dev/):** Ultra-fast HMR and optimized production bundling (with manual chunk splitting).
- **[Tailwind CSS (v4)](https://tailwindcss.com/):** Utility-first styling engine, heavily customized for complex gradients and blurs.

### 3D & WebGL Engine
- **[Three.js](https://threejs.org/):** Core low-level WebGL graphics API.
- **[React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber):** React reconciler for declarative Three.js integration.
- **[@react-three/drei](https://github.com/pmndrs/drei):** Ecosystem helpers for cameras, environments, and loaders.

### Animation & Physics
- **[GSAP](https://gsap.com/):** Industry-standard timeline animations and ScrollTrigger.
- **[React Lenis](https://lenis.darkroom.engineering/):** Hardware-accelerated smooth scrolling.

---

## 🧠 Deep Optimization Highlights

This project implements extreme optimization strategies to solve the notorious "battery drain and lag" issues common in WebGL sites:

1. **Mobile GPU Stripping:** 3D Shadows and MSAA Anti-aliasing are conditionally disabled on mobile devices to save massive GPU fill rate.
2. **Draw Call Reduction:** 65 individual 3D keyboard keys are merged into a single `InstancedMesh`, reducing CPU draw calls from 65 to 1.
3. **Frame Throttling:** Background ambient particles run at a throttled 30fps on mobile to halve the math calculation overhead, while remaining imperceptible to the human eye.
4. **CSS Containment:** `contain: paint layout` prevents browser-wide repaints during complex UI animations.
5. **Memory Management:** Strict use of `useMemo` for all 3D Geometries and Materials to prevent garbage collection stuttering during React re-renders.

---

## 📂 Project Architecture

```text
src/
├── components/
│   ├── layout/         # Global layout (Navbar, Footer, ParticleBackground, CustomCursor)
│   ├── sections/       # Page sections (Hero, About, Projects, Skills, Contact)
│   └── ui/             # Reusable UI elements (Modals, Buttons)
├── data/               # Static type-safe data (projects.ts, skills.ts)
├── three/
│   ├── scenes/         # 3D R3F components (HeroScene, Coder, Hologram, Room, CameraRig)
│   └── shaders/        # Custom WebGL shader logic
├── hooks/              # Custom React hooks (useScrollAnimation)
├── utils/              # Helper functions (Tailwind cn utility)
├── styles/             # Global CSS and Tailwind directives
└── App.tsx             # Root application assembly
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanvirRahan/rifat-portfolio.git
   ```

2. **Navigate & Install:**
   ```bash
   cd rifat-portfolio
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👨‍💻 Author

**Tanvir Rahan Rifat**  

<div align="center">
  <br />
  <p><i>Built with extreme passion, caffeine, and highly optimized code.</i> 🚀</p>
</div>
