<div align="center">

# ⬡ Explorience

**Clear. Precise. Automated.**

An immersive, cinematic marketing experience for Explorience — built on an
interactive WebGL hero that flows through the _Cosmic Energy_ palette and reacts
to your every move.

`Next.js 15` · `React 19` · `TypeScript` · `Tailwind CSS` · `react-three-fiber` · `next-intl`

</div>

---

## ✨ Highlights

- **Interactive cosmic WebGL background** — a fluid metaball field (GLSL shader on
  react-three-fiber) that cycles softly through the Cosmic Energy trio
  (`#8A2BE2` → `#00FFFF` → `#FF6347`), warps and ripples toward the cursor, and
  reacts to scroll velocity. Film-grain finish over an obsidian base (`#0d0e12`).
- **Holographic section kickers** — badge labels flow through the same palette
  with a soft, futuristic gradient + glow.
- **Custom cursor** — a blended dot + lagging ring that inverts against whatever
  is behind it, so it stays visible on light or dark areas (desktop only).
- **Buttery navigation** — Lenis smooth scrolling; nav links glide to their
  section, and the top bar hides on scroll-down / reappears on scroll-up.
- **Opening cover** — a premium "preparing the experience" loader with a
  cosmic-trio progress bar.
- **Editorial layout** — hero, capability, services, about and contact sections
  with IntersectionObserver fade-up reveals and glassmorphism.
- **Bilingual** — full 🇹🇷 Turkish / 🇬🇧 English content via `next-intl`.
- **Responsive & accessible** — mobile menu, `prefers-reduced-motion` support,
  and adaptive WebGL quality/DPR.

## 🧰 Tech stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| Language | TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/), Inter |
| 3D / WebGL | [three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://drei.docs.pmnd.rs/), [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) |
| Motion | [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/) |
| i18n | [next-intl](https://next-intl.dev/) |
| State | [Zustand](https://zustand.docs.pmnd.rs/) |
| Icons | [lucide-react](https://lucide.dev/) |

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open **http://localhost:3000** — you'll be redirected to `/tr` (default)
or `/en`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Next.js lint |

## 🗂️ Project structure

```
src/
├─ app/[locale]/         # App Router pages, layout, 404 (localized)
├─ components/
│  ├─ canvas/            # WebGL scene (NovaScene) + canvas wrapper
│  ├─ ui/                # Navbar, sections, Loader, Cursor, badges…
│  └─ SmoothScroll.tsx   # Lenis integration
├─ i18n/                 # next-intl routing / request config
├─ lib/                  # store (Zustand), lenis helpers
└─ middleware.ts         # locale routing
messages/                # en.json · tr.json (all copy)
```

## 🌍 Internationalization

All copy lives in [`messages/en.json`](messages/en.json) and
[`messages/tr.json`](messages/tr.json). Locales are prefixed (`/en`, `/tr`) and
the default is Turkish. The in-nav EN/TR toggle switches locale in place.

## 🎨 Palette

| Token | Hex |
| --- | --- |
| Obsidian (base) | `#0d0e12` |
| Gunmetal | `#1e222b` |
| Cosmic — Blueviolet | `#8A2BE2` |
| Cosmic — Cyan | `#00FFFF` |
| Cosmic — Tomato | `#FF6347` |

## ☁️ Deployment

The app builds as a standard Next.js project (`npm run build`) and runs anywhere
Next.js is supported.

> **Note:** this repository was previously an Astro site deployed to Cloudflare
> via `wrangler.json`. After migrating to Next.js, the old **Cloudflare Workers
> Builds** check no longer applies and will fail until the deploy target is
> reconfigured. To deploy the current app either:
>
> - Use **[Vercel](https://vercel.com/)** — zero-config for Next.js, or
> - Keep **Cloudflare** and add the
>   [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter with a
>   `wrangler` config and matching build command.

---

<div align="center">

**Explorience** — Coding the future. · [ExplorienceOfficial](https://github.com/ExplorienceOfficial)

</div>
