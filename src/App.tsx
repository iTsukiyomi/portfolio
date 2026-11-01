import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SiteNav, type PageTab } from './components/navigation/SiteNav';
import { HomeView } from './components/pages/HomeView';
import { ProjectsView } from './components/pages/ProjectsView';
import { ExperienceView } from './components/pages/ExperienceView';
import { AboutPageView } from './components/pages/AboutPageView';
import { ResumePageView } from './components/pages/ResumePageView';
import { ContactPageView } from './components/pages/ContactPageView';

function getInitialTab(): PageTab {
  if (typeof window === 'undefined') return 'overview';
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (
    hash === 'projects' ||
    hash === 'experience' ||
    hash === 'about' ||
    hash === 'resume' ||
    hash === 'contact'
  ) {
    return hash;
  }
  return 'overview';
}

const PortfolioApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PageTab>(getInitialTab);

  const handleSelectTab = useCallback((tab: PageTab) => {
    setActiveTab(tab);
    window.location.hash = tab === 'overview' ? '' : `#${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to browser Back / Forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (
        hash === 'projects' ||
        hash === 'experience' ||
        hash === 'about' ||
        hash === 'resume' ||
        hash === 'contact'
      ) {
        setActiveTab(hash);
      } else {
        setActiveTab('overview');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation Bar */}
      <SiteNav activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Active Page View */}
      <main id="main-content" style={{ flex: 1 }}>
        {activeTab === 'overview' && <HomeView onNavigate={handleSelectTab} />}
        {activeTab === 'projects' && <ProjectsView />}
        {activeTab === 'experience' && <ExperienceView />}
        {activeTab === 'about' && <AboutPageView />}
        {activeTab === 'resume' && <ResumePageView />}
        {activeTab === 'contact' && <ContactPageView />}
      </main>

      {/* Clean Minimalist Footer */}
      <footer
        style={{
          borderTop: '2px solid var(--border)',
          background: 'var(--surface)',
          padding: '24px 24px',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--ink-muted)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-content-width)',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <strong>Meet Rathod</strong> • Jai Hind College, Mumbai (B.Sc IT)
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="https://github.com/iTsukiyomi" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/meet-rathod-a1326a448/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:meetr459@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
};

export default App;
