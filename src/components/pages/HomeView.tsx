import React from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import type { PageTab } from '../navigation/SiteNav';

interface HomeViewProps {
  onNavigate: (tab: PageTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="page-container">
      {/* Hero Introduction */}
      <section className="content-card" style={{ padding: '40px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span className="pill-badge">F.Y. B.SC IT STUDENT // DEVELOPER</span>
            <h1 className="section-title" style={{ fontSize: 'var(--text-hero)', marginBottom: 8 }}>
              MEET RATHOD
            </h1>
            <p style={{ fontSize: 16, color: 'var(--accent)', fontWeight: 700, marginBottom: 12 }}>
              Jai Hind College, Mumbai • F.Y. B.Sc Information Technology (2026 – 2029)
            </p>
          </div>

          <div style={{ fontSize: 12, color: 'var(--ink-muted)', textAlign: 'right' }}>
            <div>HANDLES: Gojo / iTsukiyomi</div>
            <div>LOC: Mumbai, India [UTC+5:30]</div>
          </div>
        </div>

        <p style={{ fontSize: 15, lineHeight: 1.7, maxWidth: '64ch', margin: '14px 0 24px 0' }}>
          I build turn-based Discord bot battle engines, native C++ terminal tools, and 2D physics controllers on Arch Linux. First-year IT student focused on systems programming, clean architecture, and building software that doesn't break.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => onNavigate('projects')} className="btn-primary">
            View Projects ↗
          </button>
          <button type="button" onClick={() => onNavigate('experience')} className="btn-secondary">
            Education &amp; Experience
          </button>
          <button type="button" onClick={() => onNavigate('resume')} className="btn-secondary">
            Resume PDF
          </button>
          <button type="button" onClick={() => onNavigate('contact')} className="btn-secondary">
            Get in Touch
          </button>
        </div>

        {/* Quick System Specs Strip */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 18,
            borderTop: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16,
            fontSize: 12,
          }}
        >
          <div>
            <strong style={{ color: 'var(--ink-muted)' }}>PRIMARY STACK</strong>
            <div style={{ fontWeight: 700, marginTop: 2 }}>Python, C++, TypeScript, C#</div>
          </div>
          <div>
            <strong style={{ color: 'var(--ink-muted)' }}>ENVIRONMENT</strong>
            <div style={{ fontWeight: 700, marginTop: 2 }}>Arch Linux (Omarchy / Hyprland)</div>
          </div>
          <div>
            <strong style={{ color: 'var(--ink-muted)' }}>LANGUAGES</strong>
            <div style={{ fontWeight: 700, marginTop: 2 }}>English, French, Hindi</div>
          </div>
          <div>
            <strong style={{ color: 'var(--ink-muted)' }}>COLLEGE CLUB</strong>
            <div style={{ fontWeight: 700, marginTop: 2 }}>DotComClub (DCC) Member</div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 800 }}>FEATURED PROJECTS</h2>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700, cursor: 'pointer' }}
          >
            All Projects &amp; Case Studies →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {/* Card 1: Pokémon Duel */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <span className="pill-badge">BOT // PYTHON // FASTAPI</span>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>{PROJECTS_DATA.dueler.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 16, lineHeight: 1.5 }}>
              {PROJECTS_DATA.dueler.shortDesc}
            </p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', cursor: 'pointer' }}
              >
                Read Case Study →
              </button>
              <a
                href={PROJECTS_DATA.dueler.repoUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 12, color: 'var(--ink-muted)' }}
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Card 2: ani-cli.cpp */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <span className="pill-badge">SYSTEMS // C++20</span>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>{PROJECTS_DATA['ani-cpp'].title}</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 16, lineHeight: 1.5 }}>
              {PROJECTS_DATA['ani-cpp'].shortDesc}
            </p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', cursor: 'pointer' }}
              >
                Read Case Study →
              </button>
              <a
                href={PROJECTS_DATA['ani-cpp'].repoUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 12, color: 'var(--ink-muted)' }}
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Card 3: SHEDSKIN */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <span className="pill-badge">GAME DEV // UNITY 6</span>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>{PROJECTS_DATA.shedskin.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 16, lineHeight: 1.5 }}>
              {PROJECTS_DATA.shedskin.shortDesc}
            </p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', cursor: 'pointer' }}
              >
                Read Case Study →
              </button>
              <a
                href={PROJECTS_DATA.shedskin.repoUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 12, color: 'var(--ink-muted)' }}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
