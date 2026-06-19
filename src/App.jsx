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

// Mock data for the senior assessment feature: scheduled/time-bound links.
const scheduledLinks = [
  {
    title: 'Resume Review Deadline',
    description: 'A temporary call-to-action for recruiters before an application window closes.',
    url: `${import.meta.env.BASE_URL}KRISHNEET_RAJ_RESUME.pdf`,
    window: 'Live until Friday at 5:00 PM',
    status: 'live',
    metric: '42 clicks before deadline',
  },
  {
    title: 'Portfolio Case Study Launch',
    description: 'A link that appears automatically when a new project is ready to share.',
    url: 'https://github.com/krishneetRAJ',
    window: 'Starts Monday at 9:00 AM',
    status: 'upcoming',
    metric: '3 reminders queued',
  },
  {
    title: 'Old Workshop RSVP',
    description: 'An event link that disappeared after the RSVP window ended.',
    url: 'https://www.linkedin.com/in/krishneet-raj',
    window: 'Expired last week',
    status: 'expired',
    metric: '18 late clicks prevented',
  },
];

// Tab options for filtering the scheduled link demo.
const scheduleFilters = ['all', 'live', 'upcoming', 'expired'];

// Human-friendly labels for each scheduled link status.
const statusLabels = {
  live: 'Live now',
  upcoming: 'Upcoming',
  expired: 'Expired',
};

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

  // State for the senior feature demo controls.
  const [scheduleFilter, setScheduleFilter] = useState('all');
  const [audiencePreview, setAudiencePreview] = useState(false);

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

  // Shows scheduled links based on the selected status tab.
  const filteredScheduledLinks = useMemo(() => {
    if (audiencePreview) {
      return scheduledLinks.filter((link) => link.status === 'live');
    }

    if (scheduleFilter === 'all') {
      return scheduledLinks;
    }

    return scheduledLinks.filter((link) => link.status === scheduleFilter);
  }, [audiencePreview, scheduleFilter]);

  // Counts each scheduled status for the feature summary and filter tabs.
  const scheduleCounts = useMemo(() => {
    return scheduledLinks.reduce(
      (counts, link) => {
        counts.all += 1;
        counts[link.status] += 1;
        return counts;
      },
      { all: 0, live: 0, upcoming: 0, expired: 0 },
    );
  }, []);

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
          <p className="eyebrow">Senior Assessment</p>
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

      {/* Senior assessment feature: scheduled links that change by time/status. */}
      <section className="scheduled-section" aria-labelledby="scheduled-heading">
        <div className="feature-intro">
          <div>
            <p className="eyebrow">Feature pitch</p>
            <h2 id="scheduled-heading">Scheduled Links</h2>
          </div>
          <p>
            A Linktree feature that lets creators schedule links to appear, expire, or stay hidden
            until the right moment.
          </p>
        </div>

        <div className="feature-controls" aria-label="Scheduled link controls">
          <div className="filter-tabs" aria-label="Filter scheduled links">
            {scheduleFilters.map((filter) => (
              <button
                className={filter === scheduleFilter ? 'filter-tab active' : 'filter-tab'}
                type="button"
                key={filter}
                aria-pressed={filter === scheduleFilter}
                onClick={() => {
                  setScheduleFilter(filter);
                  setAudiencePreview(false);
                }}
              >
                {filter}
                <span>{scheduleCounts[filter]}</span>
              </button>
            ))}
          </div>

          <label className="preview-toggle">
            <input
              type="checkbox"
              checked={audiencePreview}
              onChange={(event) => setAudiencePreview(event.target.checked)}
            />
            Audience preview
          </label>
        </div>

        <div className="scheduled-grid">
          <div className="scheduled-list" aria-live="polite">
            {filteredScheduledLinks.map((link) => (
              <article className={`scheduled-card ${link.status}`} key={link.title}>
                <div>
                  <span className="status-badge">{statusLabels[link.status]}</span>
                  <h3>{link.title}</h3>
                </div>
                <p>{link.description}</p>
                <div className="schedule-meta">
                  <span>{link.window}</span>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    Preview link
                  </a>
                </div>
              </article>
            ))}
          </div>

          <aside className="metric-panel" aria-labelledby="metric-heading">
            <p className="eyebrow">Success metric mockup</p>
            <h3 id="metric-heading">Launch timing impact</h3>
            <div className="metric-number">+18%</div>
            <p>Mock increase in clicks during a time-bound launch window.</p>
            <ul>
              {scheduledLinks.map((link) => (
                <li key={link.title}>
                  <span>{link.title}</span>
                  <strong>{link.metric}</strong>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
