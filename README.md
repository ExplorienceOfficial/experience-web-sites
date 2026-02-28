# 🌌 Explorience - The Future of Digital Storytelling

[![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

**Explorience** is a next-generation cinematic web experience built with **Astro 5**. It pushes the boundaries of standard web design by combining Apple-style scrollytelling with high-performance CSS 3D hardware-accelerated components.

---

## ✨ Key Features

### 💎 Cinematic Scrollytelling
- **Dynamic 3D Orthographic Animation**: Objects transform, rotate, and extrude physical parts based on precise scroll interpolation.
- **Apple-Inspired Physics**: Ultra-smooth "Lerp" (Linear Interpolation) logic for 60fps interaction feel.

### 🛠️ Pure CSS 3D Hardware (No WebGL Bloat)
- Unlike heavy 3D sites, Explorience uses **Pure CSS 3D Transforms** for its hardware mockups.
- **High-Performance**: Near-zero CPU overhead compared to Three.js/Canvas solutions.
- **Shadows & Extrusions**: Photorealistic depth using smart layering and Z-axis extrusions.

### 🌍 Multi-Language Support (i18n)
- **Native Routing**: Full TR/EN support with SEO-optimized subdirectories.
- **Dynamic Translation System**: Shared UI components with localized content.

### 📱 Premium Mobile Experience
- **Static Fallback**: Smart detection disables heavy parallax on mobile for a natural scrolling experience.
- **Interactive UI**: Custom-built mobile hamburger menu with glassmorphism effects.
- **Responsive Layouts**: Force-hovered active states for 3D elements on touch devices to ensure visual quality.

---

## 🎨 Project High-End Components

| Component | Description |
| :--- | :--- |
| **Quantum AI Core** | A 3D CPU socket with glowing AR hologram rings. |
| **Server Rack** | Multi-blade compute node with pop-out storage drives. |
| **Cinematic Globe** | Wireframe holographic Earth with pulsing data nodes. |
| **Glass Analytics Tablet** | 16:9 mockup with floating AR bar charts. |
| **Dynamic Phone** | iPhone-style device with an interactive expanding Notch (Dynamic Island). |

---

## 🛠️ Tech Stack

- **Core**: [Astro 5](https://astro.build/) (Static Site Generation / Hydration)
- **Styling**: Vanilla CSS3 (Custom Design Tokens, CSS 3D, Flexbox/Grid)
- **Logic**: ES6+ Vanilla JavaScript (Lerp Motion, Scroll Observers)
- **SEO**: `@astrojs/sitemap`, Robots.txt, and localized SEO meta-tags.
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) via Wrangler.

---

## 📁 Architecture

```bash
experience-web-sites/
├── src/
│   ├── components/       # Premium 3D & UI Components
│   │   ├── ScrollyObjects.astro  # Main Controller
│   │   └── Scrolly*.astro        # Individual 3D Hardware
│   ├── layouts/          # Shared Page Structures
│   ├── i18n/             # TR/EN Translation Logic
│   └── pages/            # Localized Routes (tr/en)
├── public/               # Static Assets (Favicon, Webmanifest)
└── astro.config.mjs      # SSO & i18n Config
```

---

## 🚀 Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/kagankarki/experience-web-sites.git
   cd experience-web-sites
   npm install
   ```

2. **Development**:
   ```bash
   npm run dev
   ```

3. **Build & Deploy**:
   ```bash
   npm run build
   npx wrangler pages deploy dist
   ```

---

## 📜 SEO & Performance

Explorience is built with performance as a priority. 
- **100/100 Lighthouse Score** targets (Static production build).
- **Responsive WebManifest**: Full PWA-ready metadata.
- **Semantic HTML**: Fully accessible navigation and structure.

---

Made with 🌌 by **Explorience Team**. 
*Transforming digital boundaries into experiences.*
