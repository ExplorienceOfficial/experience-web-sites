# Experience Web Sites

Modern, cinematic web experience with scroll-based animations.

## 📁 Project Structure

```
experience-web-sites/
├── index.html              # Main HTML file
├── css/                    # Stylesheets (modular)
│   ├── base.css           # CSS variables & reset
│   ├── components.css     # Navbar & scroll progress
│   ├── hero.css           # Hero section & parallax
│   ├── story.css          # Story sections & morphing
│   ├── features.css       # Feature cards & footer
│   └── utilities.css      # Animations & responsive
├── js/                     # JavaScript (modular)
│   ├── app.js             # Main initialization
│   ├── story.js           # Story animations
│   ├── cards.js           # Card animations
│   └── interactions.js    # User interactions
└── assets/                 # Images, fonts, etc.
```

## 🚀 Features

- **Cinematic Scroll Animations** - Video-like storytelling experience
- **Parallax Effects** - Depth and motion on scroll
- **Morphing Shapes** - Dynamic, animated backgrounds
- **3D Tilt Effects** - Interactive mouse movements
- **Responsive Design** - Works on all devices
- **Modular Architecture** - Easy to maintain and extend

## 🛠️ Running Locally

### Option 1: Using http-server (Recommended)
```bash
npx -y http-server . -o
```

### Option 2: Direct File Access
Simply open `index.html` in your browser.

## 📝 Customization

- **Colors**: Edit CSS variables in `css/base.css`
- **Content**: Modify sections in `index.html`
- **Animations**: Adjust timing in respective CSS/JS files

## 🎨 Tech Stack

- Pure HTML5
- Vanilla CSS3 (with CSS Grid & Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Outfit)

---

Made with ❤️ for modern web experiences
