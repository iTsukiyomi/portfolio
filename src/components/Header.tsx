import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

interface HeaderProps {
  onSelectProject: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectProject }) => {
  return (
    <header className="nav nav--centre">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">Skip to content</a>
        <a className="nav__logo" href="#top">{PROFILE_DATA.name}</a>

        <nav className="nav__links" aria-label="Main">
          <div className="nav__item">
            <a className="nav__link" href="#work">
              Work{' '}
              <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="nav__menu">
              <div className="wrap grid">
                <div className="menu-col span-3">
                  <p className="t-label">Discord Bots</p>
                  <a href="#work" onClick={() => onSelectProject('dueler')}>
                    Dueler<span>Pokémon battle bot with Pillow UI</span>
                  </a>
                  <a href="#work" onClick={() => onSelectProject('mafia')}>
                    Mafioso<span>Anime Mafia game with SQLite</span>
                  </a>
                </div>
                <div className="menu-col span-3">
                  <p className="t-label">Servers &amp; APIs</p>
                  <a href="#work" onClick={() => onSelectProject('pyredis')}>
                    PyRedis<span>Redis server built from scratch</span>
                  </a>
                  <a href="#work" onClick={() => onSelectProject('fastapi')}>
                    FastAPI Projects<span>MangaDex CLI &amp; Pokédex API</span>
                  </a>
                </div>
                <a
                  className="menu-card span-3 start-10"
                  href={PROFILE_DATA.links.repos}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="panel"
                    style={{
                      '--p-h': '140px',
                      background: 'var(--p-inv-bg)',
                      color: 'var(--p-inv-ink)',
                      padding: '16px',
                      display: 'grid',
                      alignContent: 'space-between',
                    } as React.CSSProperties}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--p-inv-muted)' }}>
                      github.com/iTsukiyomi
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500 }}>
                      PyMessage, chatbot &amp; more
                    </span>
                  </div>
                  <span className="t-card">More projects</span>
                  <span className="t-small muted">Browse all public repositories</span>
                </a>
              </div>
            </div>
          </div>

          <div className="nav__item"><a className="nav__link" href="#architecture">How it works</a></div>
          <div className="nav__item"><a className="nav__link" href="#stack">Tools</a></div>
          <div className="nav__item"><a className="nav__link" href="#contact">Contact</a></div>
        </nav>

        <div className="nav__actions">
          <a className="nav__link" href={PROFILE_DATA.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn btn--primary" href="#contact">Get in touch</a>
        </div>

        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
};
