# 🕵️ Imposter Who?

A party bluffing and deduction game for 3–15 players built with React + Vite. No backend required — all logic runs in the browser.

## 🎮 How to Play

1. **Add Players** — Everyone enters their name (3–15 players)
2. **Choose a Category** — Food, Movies, Jobs, Tech, and 8 more
3. **Get Your Role** — Pass the phone privately. Most players see the secret word. The Imposter sees nothing
4. **Give Clues** — Each player says ONE word hinting at the secret word. The Imposter must fake it
5. **Discuss & Vote** — Debate who was suspicious, then vote for the Imposter
6. **Reveal** — See if the group caught the Imposter!

## ✨ Features

- 12 categories with 500+ words
- 1 or multiple Imposters
- 🃏 **Troll Mode** — everyone is the Imposter
- ⏱ **Turn Timer** — 15 / 20 / 30 / 45 / 60 seconds
- 📝 **Notes panel** during discussion
- 🗳️ **Private voting** — one player at a time
- 🏆 **Scoreboard** — tracks wins across rounds
- 🕵️ **Imposter guess** — if caught, Imposters can guess the word to steal the win
- Fully offline — no internet needed after load
- PWA-ready — installable on mobile

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy anywhere static files are served.

## 🌐 Deploy

### Vercel (recommended)
```bash
npx vercel
```

### Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### GitHub Pages
Set build output to `dist/` in your Pages settings.

## 🛠 Tech Stack

- **React 19** — UI and state
- **Vite** — build tool
- **Pure CSS** — no UI library, custom design system
- **Google Fonts** — Bebas Neue + Nunito
- **PWA** — manifest + meta tags for installability

## 📁 Project Structure

```
src/
├── App.jsx          # All screens and game logic
├── main.jsx         # React entry point
├── index.css        # Global styles + design system
└── data/
    └── words.js     # 500+ words across 12 categories
public/
├── favicon.svg
└── manifest.json
```

## 🔮 Planned Features (coming soon)

- Custom word entry
- Sound effects
- Animated transitions
- Dark/light theme toggle
- Local storage score persistence
- Custom categories

---

Made with ❤️ for game nights
