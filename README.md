# BizzNEST Senior Linktree Assessment

A React + Vite Linktree-style profile page with a responsive layout, accessible controls, dark mode, and a senior-assessment feature pitch demo.

## Run Locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This project uses Vite, so GitHub Pages should deploy from GitHub Actions. The site base path in `vite.config.js` is set for a repository named `bizznest_senior_assessment`.

## Feature Pitch

The feature I would pitch to Linktree is **Scheduled Links**. It lets creators set links to appear, expire, or stay hidden until a specific time window. The demo uses mock data to show live, upcoming, and expired links, plus an audience preview mode that shows what visitors would actually see.

Read the feature pitch here: [Scheduled Links Pitch](https://docs.google.com/document/d/1wUxLmcyLh0Uq1VUp03zxqkVz1U-K-Ee4IjdSDjIA8to/edit?usp=sharing)

## JavaScript Features

The page includes a dark/light mode toggle. It updates React state, applies the selected theme to the document, and saves the preference in `localStorage` so the choice sticks after refresh.

The page also includes a live link filter. As the user types, the visible links update immediately and show a clear empty state when no links match. The filter searches each link's title, URL label, and description.

The senior feature demo adds scheduled link filtering, audience preview mode, and a small success-metric mockup for the pitch.
