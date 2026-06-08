import React, { useEffect, useMemo, useState } from 'react';
import profileImage from './assets/profile.jpg';

//Profile information shown at the top of the page. 
const profile = {
  name: 'Krishneet Raj',
  role: 'Software Developer',
  location: 'Salinas, CA',
  bio: 'Building thoughtful web experiences with clean code, useful interactions, and a little visual personality.',
};

//Each object in this array becomes one clickable link card.
const links = [
  {
    title: 'GitHub',
    url: 'https://github.com/krishneetRAJ',
    displayUrl: 'github.com/krishneetRAJ',
    description: 'Code samples and project repos',
    icon: 'GH',
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/krishneet-raj',
    displayUrl: 'linkedin.com/in/krishneet-raj',
    description: 'Experience and professional updates',
    icon: 'IN',
  },
  {
    title: 'Resume',
    url: `${import.meta.env.BASE_URL}KRISHNEET_RAJ_RESUME.pdf`,
    displayUrl: 'KRISHNEET_RAJ_RESUME.pdf',
    description: 'Skills, experience, and education',
    icon: 'CV',
  },
  {
    title: 'Email',
    url: 'mailto:krishneetaraj@gmail.com',
    displayUrl: 'krishneetaraj@gmail.com',
    description: 'Start a conversation with me',
    icon: 'EM',
  },
];

//Gets the saved theme from localStorage, or falls back to the user's system theme.
function getStoredTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');

    //Only accept the two theme names and nothing else
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  } catch {
    //If browser storage is unavailable, the app still loads in dark mode.
    return 'dark';
  }
}

export default function App() {
  //Theme state controls the dark/light mode toggle.
  const [theme, setTheme] = useState(getStoredTheme);

  //Query state stores whatever the user types into the search box.
  const [query, setQuery] = useState('');

  //Whenever the theme changes, update the page attribute and remember the choice.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem('theme', theme);
    } catch { 
      //If browser storage is unavailable, we fail silently
    }
  }, [theme]);

  //Filters the links in real time when the user types in the search box.
  const filteredLinks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    //If the search box is empty, show every link.
    if (!normalizedQuery) {
      return links;
    }

    //Search across the title, display URL, and short description.
    return links.filter((link) => {
      const searchableText = `${link.title} ${link.displayUrl} ${link.description}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  //Used for the button label so screen readers know what the next action is.
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <main className="page-shell">
      {/* Profile header with status, theme toggle, image, and bio. */}
      <section className="profile" aria-labelledby="profile-heading">
        <div className="top-bar">
          <span className="status-pill">
            <span aria-hidden="true" className="status-dot" />
            Available
          </span>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${nextTheme} mode`}
            aria-pressed={theme === 'light'}
            onClick={() => setTheme(nextTheme)}
          >
            {/* Visual label changes depending on the current theme. */}
            <span aria-hidden="true">{theme === 'dark' ? 'Sun' : 'Moon'}</span>
          </button>
        </div>

        <img className="avatar" src={profileImage} alt={`${profile.name} profile`} />

        <div className="identity">
          <p className="eyebrow">Associate Assessment</p>
          <h1 id="profile-heading">{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="location">{profile.location}</p>
          <p className="bio">{profile.bio}</p>
        </div>
      </section>

      {/* Link area with the second JavaScript touch: live filtering. */}
      <section className="links-section" aria-labelledby="links-heading">
        <div className="section-header">
          <div>
            <p className="eyebrow">Links</p>
            <h2 id="links-heading">Find me online</h2>
          </div>

          {/* The label is visually hidden but still available to screen readers. */}
          <label className="search-control">
            <span className="visually-hidden">Search links</span>
            <input
              type="search"
              value={query}
              placeholder="Search links"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        {/* aria-live politely announces changes as search results update. */}
        <div className="link-list" aria-live="polite">
          {filteredLinks.map((link) => (
            <a className="link-card" href={link.url} key={link.title} target="_blank" rel="noreferrer">
              <span className="link-icon" aria-hidden="true">
                {link.icon}
              </span>
              <span className="link-copy">
                <span className="link-title">{link.title}</span>
                <span className="link-description">{link.description}</span>
                <span className="link-url">{link.displayUrl}</span>
              </span>
              <span className="link-arrow" aria-hidden="true">
                -&gt;
              </span>
            </a>
          ))}

          {/* Empty state appears when the search does not match any links. */}
          {filteredLinks.length === 0 && (
            <div className="empty-state" role="status">
              <p>No links match "{query}".</p>
              <button type="button" onClick={() => setQuery('')}>
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
