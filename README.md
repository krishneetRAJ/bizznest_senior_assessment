# Digital NEST Linktree Assessment

A React + Vite Linktree-style profile page with a responsive layout, accessible controls, and two JavaScript touches.

## Run Locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This project uses Vite, so GitHub Pages should deploy from GitHub Actions. The site base path in `vite.config.js` is set for a repository named `bizznest_technical_assessment`.

## JavaScript Features

The main JavaScript feature is a dark/light mode toggle. It updates React state, applies the selected theme to the document, and saves the preference in `localStorage` so the choice sticks after refresh.

For the Section 7 lean-in detail, I added a second JavaScript touch: a live link filter. As the user types, the visible links update immediately and show a clear empty state when no links match. The filter searches each link's title, URL label, and description.

I picked these because they are small, polished interactions that fit a Linktree page without making the project feel overbuilt. The trickiest part was keeping the theme preference simple while still respecting the user's system preference the first time they visit.

With more time, I would replace the starter profile details with final personal links, and run a Lighthouse pass. 
