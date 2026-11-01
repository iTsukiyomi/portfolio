import React from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';

export const ProjectsView: React.FC = () => {
  return (
    <div className="page-container">
      <div style={{ marginBottom: 32 }}>
        <span className="pill-badge">CASE STUDIES &amp; OPEN SOURCE</span>
        <h1 className="section-title">PROJECTS</h1>
        <p className="section-subtitle">
          Real software I have built, shipped, and debugged. Each case study details what it does, how it works, what broke, and what I learned.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {/* 1. Pokémon Duel */}
        <article className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <div>
              <span className="pill-badge">{PROJECTS_DATA.dueler.typeTag}</span>
              <h2 style={{ fontSize: 'var(--text-h2)', marginTop: 4 }}>
                {PROJECTS_DATA.dueler.title}
              </h2>
            </div>
            <a
              href={PROJECTS_DATA.dueler.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              GitHub Repository ↗
            </a>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
            {PROJECTS_DATA.dueler.problem}
          </p>

          {/* Screenshot Preview */}
          {PROJECTS_DATA.dueler.image && (
            <div
              style={{
                border: '2px solid var(--border)',
                background: 'var(--surface-alt)',
                padding: 12,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <img
                src={`/portfolio/images/${PROJECTS_DATA.dueler.image}`}
                alt="Pokémon Duel Sprite Preview"
                style={{ height: 120, objectFit: 'contain', imageRendering: 'pixelated' }}
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Architecture Box */}
          <div
            style={{
              border: '1px solid var(--border)',
              background: 'var(--surface-alt)',
              padding: 20,
              marginBottom: 20,
            }}
          >
            <strong style={{ display: 'block', fontSize: 13, marginBottom: 8, color: 'var(--accent)' }}>
              ARCHITECTURE &amp; DECISIONS
            </strong>
            <ul style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PROJECTS_DATA.dueler.architectureNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>

          {/* What Broke */}
          <div
            style={{
              borderLeft: '4px solid #ef4444',
              background: 'var(--surface-alt)',
              padding: '14px 18px',
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            <strong style={{ color: '#ef4444' }}>FAILURE LOG &amp; FIX:</strong>
            <div style={{ marginTop: 4 }}>{PROJECTS_DATA.dueler.whatBroke.incident}</div>
            <div style={{ color: 'var(--ink-muted)', marginTop: 4 }}>
              <strong>Fix:</strong> {PROJECTS_DATA.dueler.whatBroke.fix}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: 12 }}>
            <span style={{ fontWeight: 700, color: 'var(--ink-muted)' }}>STACK:</span>
            {PROJECTS_DATA.dueler.techStack.map((tech) => (
              <span key={tech} className="pill-badge" style={{ marginBottom: 0 }}>
                {tech}
              </span>
            ))}
          </div>
        </article>

        {/* 2. ani-cli.cpp */}
        <article className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <div>
              <span className="pill-badge">{PROJECTS_DATA['ani-cpp'].typeTag}</span>
              <h2 style={{ fontSize: 'var(--text-h2)', marginTop: 4 }}>
                {PROJECTS_DATA['ani-cpp'].title}
              </h2>
            </div>
            <a
              href={PROJECTS_DATA['ani-cpp'].repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              GitHub Repository ↗
            </a>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
            {PROJECTS_DATA['ani-cpp'].problem}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 12,
              padding: 16,
              background: 'var(--surface-alt)',
              border: '1px solid var(--border)',
              marginBottom: 20,
              fontSize: 12,
            }}
          >
            <div>
              <span style={{ color: 'var(--ink-muted)' }}>BINARY FOOTPRINT</span>
              <div style={{ fontWeight: 800, fontSize: 16 }}>380 KB Stripped</div>
            </div>
            <div>
              <span style={{ color: 'var(--ink-muted)' }}>STARTUP TIME</span>
              <div style={{ fontWeight: 800, fontSize: 16 }}>&lt; 6ms</div>
            </div>
            <div>
              <span style={{ color: 'var(--ink-muted)' }}>MEMORY (RSS)</span>
              <div style={{ fontWeight: 800, fontSize: 16 }}>7.8 MB</div>
            </div>
          </div>

          <div
            style={{
              border: '1px solid var(--border)',
              background: 'var(--surface-alt)',
              padding: 20,
              marginBottom: 20,
            }}
          >
            <strong style={{ display: 'block', fontSize: 13, marginBottom: 8, color: 'var(--accent)' }}>
              CORE HIGHLIGHTS
            </strong>
            <ul style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PROJECTS_DATA['ani-cpp'].architectureNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: 12 }}>
            <span style={{ fontWeight: 700, color: 'var(--ink-muted)' }}>STACK:</span>
            {PROJECTS_DATA['ani-cpp'].techStack.map((tech) => (
              <span key={tech} className="pill-badge" style={{ marginBottom: 0 }}>
                {tech}
              </span>
            ))}
          </div>
        </article>

        {/* 3. Mafioso */}
        <article className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <div>
              <span className="pill-badge">{PROJECTS_DATA.mafioso.typeTag}</span>
              <h2 style={{ fontSize: 'var(--text-h2)', marginTop: 4 }}>
                {PROJECTS_DATA.mafioso.title}
              </h2>
            </div>
            <a
              href={PROJECTS_DATA.mafioso.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              GitHub Repository ↗
            </a>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
            {PROJECTS_DATA.mafioso.problem}
          </p>

          <div
            style={{
              border: '1px solid var(--border)',
              background: 'var(--surface-alt)',
              padding: 20,
              marginBottom: 20,
            }}
          >
            <strong style={{ display: 'block', fontSize: 13, marginBottom: 8, color: 'var(--accent)' }}>
              ENGINEERING DETAILS
            </strong>
            <ul style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PROJECTS_DATA.mafioso.architectureNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: 12 }}>
            <span style={{ fontWeight: 700, color: 'var(--ink-muted)' }}>STACK:</span>
            {PROJECTS_DATA.mafioso.techStack.map((tech) => (
              <span key={tech} className="pill-badge" style={{ marginBottom: 0 }}>
                {tech}
              </span>
            ))}
          </div>
        </article>

        {/* 4. SHEDSKIN */}
        <article className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <div>
              <span className="pill-badge">{PROJECTS_DATA.shedskin.typeTag}</span>
              <h2 style={{ fontSize: 'var(--text-h2)', marginTop: 4 }}>
                {PROJECTS_DATA.shedskin.title}
              </h2>
            </div>
            <a
              href={PROJECTS_DATA.shedskin.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              GitHub Repository ↗
            </a>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
            {PROJECTS_DATA.shedskin.problem}
          </p>

          <div
            style={{
              border: '1px solid var(--border)',
              background: 'var(--surface-alt)',
              padding: 20,
              marginBottom: 20,
            }}
          >
            <strong style={{ display: 'block', fontSize: 13, marginBottom: 8, color: 'var(--accent)' }}>
              PHYSICS &amp; CONTROLLER DESIGN
            </strong>
            <ul style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PROJECTS_DATA.shedskin.architectureNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: 12 }}>
            <span style={{ fontWeight: 700, color: 'var(--ink-muted)' }}>STACK:</span>
            {PROJECTS_DATA.shedskin.techStack.map((tech) => (
              <span key={tech} className="pill-badge" style={{ marginBottom: 0 }}>
                {tech}
              </span>
            ))}
          </div>
        </article>

        {/* 5. MangaDex CLI */}
        <article className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <div>
              <span className="pill-badge">CLI // PYTHON // PANDAS</span>
              <h2 style={{ fontSize: 'var(--text-h2)', marginTop: 4 }}>
                MangaDex CLI — Manga Search &amp; Data Exploration
              </h2>
            </div>
            <a
              href="https://github.com/iTsukiyomi/fastapi-projects"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              GitHub Repository ↗
            </a>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
            A command line interface built using Python, FastAPI, and public APIs to search, compare, and query manga metadata, with analytical data structures in Pandas and Matplotlib.
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: 12 }}>
            <span style={{ fontWeight: 700, color: 'var(--ink-muted)' }}>STACK:</span>
            {['Python', 'FastAPI', 'Pandas', 'Matplotlib', 'REST API'].map((tech) => (
              <span key={tech} className="pill-badge" style={{ marginBottom: 0 }}>
                {tech}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};
