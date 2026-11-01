import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export type PageTab = 'overview' | 'projects' | 'experience' | 'about' | 'resume' | 'contact';

interface SiteNavProps {
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
}

const TABS: { id: PageTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const SiteNav: React.FC<SiteNavProps> = ({ activeTab, onSelectTab }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-nav" role="banner">
      <div className="site-nav-inner">
        <div className="site-nav-top-row">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('overview');
            }}
            className="site-logo"
          >
            <span className="site-logo-dot" />
            <span>MEET RATHOD</span>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn mobile-theme-btn"
            aria-label={`Toggle theme. Current theme: ${theme.toUpperCase()}`}
          >
            {theme === 'light' ? '☾ DARK' : '☀ LIGHT'}
          </button>
        </div>

        <nav className="nav-tabs" aria-label="Main Navigation">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle-btn desktop-theme-btn"
          aria-label={`Toggle theme. Current theme: ${theme.toUpperCase()}`}
        >
          {theme === 'light' ? '☾ DARK' : '☀ LIGHT'}
        </button>
      </div>
    </header>
  );
};
