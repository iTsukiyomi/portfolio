import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

const StackHubDiagram = React.memo(() => {
  const spec = JSON.stringify({
    layout: 'hub',
    ground: 'none',
    alt: 'Meet Rathod builds with Python, FastAPI, SQLite, Redis, Discord, and Arch Linux.',
    center: { label: 'Meet Rathod', icon: 'archlinux' },
    spokes: [
      { label: 'Python', icon: 'python' },
      { label: 'FastAPI', icon: 'fastapi' },
      { label: 'SQLite', icon: 'sqlite' },
      { label: 'Redis', icon: 'redis' },
      { label: 'Discord', icon: 'discord' },
      { label: 'Git', icon: 'git' },
    ],
  });

  return <div className="dg" data-dg-still="" data-diagram={spec} />;
});

export const StackSection: React.FC = () => {
  return (
    <section className="section" id="stack" aria-labelledby="stack-h">
      <div className="wrap">
        <div className="grid">
          <div className="span-5">
            <h2 id="stack-h">
              Python tools and Arch Linux setup.{' '}
              <span className="muted">First-year BSc IT student.</span>
            </h2>
            <p style={{ marginTop: 'var(--s-5)', fontSize: 'var(--t-lead)', lineHeight: 1.55 }}>
              I spend most of my time writing Python backends, Discord bots, and small CLI tools in Neovim. Everything shown here comes straight from my public GitHub repositories.
            </p>

            <div className="stack-mosaic" aria-label="Core languages and tools">
              {PROFILE_DATA.stackIcons.slice(0, 12).map((item) => (
                <div key={item.name} className="stack-chip">
                  <img src={item.icon} alt="" width={22} height={22} loading="lazy" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="frame frame--split frame--lit span-6 start-7"
            role="img"
            aria-label="Diagram of Meet Rathod's core tools"
            style={{ minHeight: '460px', display: 'grid', placeItems: 'center', padding: 'var(--s-5)' }}
          >
            <StackHubDiagram />
          </div>
        </div>
      </div>
    </section>
  );
};
