# Danyal Wahdat — Portfolio

> **Architecting Autonomous AI & Scalable LLMOps**

A production-grade portfolio built with React, Tailwind CSS, and Framer Motion. Dark mode, cyberpunk aesthetic with neon accents, interactive terminal animations, and a node-based architecture graph.

---

## Tech Stack

- **React 18** — UI framework
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations & transitions
- **Google Fonts** — JetBrains Mono, Syne, DM Sans

---

## Project Structure

```
portfolio/
├── public/
│   └── index.html              # HTML shell + Google Fonts
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Fixed navbar with smooth scroll
│   │   ├── Hero.jsx             # Hero + animated terminal window
│   │   ├── HeroProject.jsx      # Multi-Agent Decision Debater (flagship)
│   │   ├── Projects.jsx         # Expandable engineering case studies
│   │   ├── Skills.jsx           # Skill clusters with animated bars
│   │   ├── Experience.jsx       # Timeline (work + education)
│   │   └── Contact.jsx          # Contact + footer
│   ├── App.jsx                  # Root component + loading screen
│   ├── index.css                # Global styles + Tailwind directives
│   └── index.js                 # React DOM entry point
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                  # Vercel deploy config
└── package.json
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# Opens at http://localhost:3000
```

---

## Deploy to Vercel

### Option A: Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# From the portfolio directory
vercel

# Follow prompts — Vercel auto-detects Create React App
# Your site will be live at https://your-project.vercel.app
```

### Option B: GitHub + Vercel Dashboard

1. Push this folder to a **GitHub repository**
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Framework preset: **Create React App** (auto-detected)
5. Build command: `npm run build`
6. Output directory: `build`
7. Click **Deploy** — done!

### Option C: Drag & Drop Build

```bash
# Build locally
npm run build

# Drag the /build folder to vercel.com/new
```

---

## Customization Notes

### Update GitHub Links
In `HeroProject.jsx` and `Projects.jsx`, the GitHub links point to your profile.
Update `href` values if you have direct repo URLs.

### Update Contact Info
In `Contact.jsx`, all email/LinkedIn/GitHub links are pre-filled with your actual details.

### Add Your Photo (Optional)
In `Hero.jsx`, you can add an `<img>` tag with your photo URL from the original portfolio:
```
https://i.postimg.cc/k46R2Jfm/prf.jpg
```

---

## Design System

| Token | Value | Use |
|-------|-------|-----|
| `--neon-blue` | `#00D4FF` | Primary accent, borders, glows |
| `--neon-purple` | `#9B59FF` | Agent architecture, hero project |
| `--neon-green` | `#00FF88` | Success states, availability badge |
| `--bg-void` | `#020408` | Main background |
| Font Display | Syne | Headlines, titles |
| Font Mono | JetBrains Mono | Code, labels, badges |
| Font Body | DM Sans | Paragraphs |

---

Built by Danyal Wahdat · [GitHub](https://github.com/Danialpro2k04) · [LinkedIn](https://linkedin.com/in/danyal-wahdat-b747a928b)
