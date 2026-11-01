import React, { useRef } from 'react';
import { useWindowManager, type WindowId } from '../../context/WindowManagerContext';

interface IconConfig {
  id: WindowId;
  label: string;
  typeBadge: string;
  renderIcon: () => React.ReactNode;
}

const ICONS: IconConfig[] = [
  {
    id: 'dueler',
    label: 'dueler.bot',
    typeBadge: 'BOT',
    renderIcon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <circle cx="12" cy="12" r="3" fill="var(--accent)" />
      </svg>
    ),
  },
  {
    id: 'mafioso',
    label: 'mafioso.py',
    typeBadge: 'PY',
    renderIcon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 10 L12 3 L20 10 L18 20 L6 20 Z" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'ani-cpp',
    label: 'ani-cli.cpp',
    typeBadge: 'C++',
    renderIcon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="15" />
        <polyline points="7,9 10,12 7,15" stroke="var(--accent)" strokeWidth="2.5" />
        <line x1="12" y1="15" x2="16" y2="15" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'shedskin',
    label: 'shedskin',
    typeBadge: 'EXE',
    renderIcon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="6" width="16" height="12" />
        <circle cx="8" cy="12" r="2" fill="var(--accent)" />
        <circle cx="16" cy="12" r="1" fill="currentColor" />
        <line x1="4" y1="10" x2="20" y2="10" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'about.txt',
    typeBadge: 'DOC',
    renderIcon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 3 L14 3 L19 8 L19 21 L5 21 Z" />
        <polyline points="14,3 14,8 19,8" />
        <line x1="8" y1="12" x2="16" y2="12" stroke="var(--accent)" strokeWidth="2" />
        <line x1="8" y1="16" x2="14" y2="16" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'contact.sh',
    typeBadge: 'SH',
    renderIcon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="16" />
        <text x="6" y="15" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="bold">
          $&gt;
        </text>
      </svg>
    ),
  },
  {
    id: 'next',
    label: 'next.txt',
    typeBadge: 'WIP',
    renderIcon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
        <line x1="12" y1="8" x2="12" y2="16" stroke="var(--accent)" strokeWidth="2" />
        <line x1="8" y1="12" x2="16" y2="12" stroke="var(--accent)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'resume',
    label: 'resume.pdf',
    typeBadge: 'PDF',
    renderIcon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 3 L15 3 L20 8 L20 21 L4 21 Z" />
        <polyline points="15,3 15,8 20,8" />
        <text x="7" y="16" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="8" fontWeight="bold">
          PDF
        </text>
      </svg>
    ),
  },
];

export const DesktopIcons: React.FC = () => {
  const { openWindow } = useWindowManager();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number, id: WindowId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openWindow(id);
      return;
    }

    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('.desktop-icon-btn');
    if (!buttons || buttons.length === 0) return;

    let targetIndex = index;
    if (e.key === 'ArrowRight') {
      targetIndex = (index + 1) % buttons.length;
    } else if (e.key === 'ArrowLeft') {
      targetIndex = (index - 1 + buttons.length) % buttons.length;
    } else if (e.key === 'ArrowDown') {
      targetIndex = Math.min(index + 4, buttons.length - 1);
    } else if (e.key === 'ArrowUp') {
      targetIndex = Math.max(index - 4, 0);
    }

    if (targetIndex !== index) {
      e.preventDefault();
      buttons[targetIndex].focus();
    }
  };

  return (
    <nav
      className="desktop-icons-column"
      ref={containerRef}
      aria-label="Desktop Files and Projects"
    >
      {ICONS.map((icon, idx) => (
        <button
          key={icon.id}
          className="desktop-icon-btn"
          onClick={() => openWindow(icon.id)}
          onKeyDown={(e) => handleKeyDown(e, idx, icon.id)}
          aria-label={`Open ${icon.label}`}
        >
          <div className="icon-graphic-box">
            {icon.renderIcon()}
            <span className="icon-tag-pill">{icon.typeBadge}</span>
          </div>
          <span className="icon-label">{icon.label}</span>
        </button>
      ))}
    </nav>
  );
};
