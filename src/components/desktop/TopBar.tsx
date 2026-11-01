import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useWindowManager, type WindowId } from '../../context/WindowManagerContext';

export const TopBar: React.FC = () => {
  const { theme, mode, cycleTheme } = useTheme();
  const { openWindow } = useWindowManager();
  const [timeString, setTimeString] = useState<string>('');
  const [appMenuOpen, setAppMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLaunch = (id: WindowId) => {
    openWindow(id);
    setAppMenuOpen(false);
  };

  return (
    <header className="top-bar" role="banner">
      <div className="top-bar-left">
        <button
          className="brand-badge"
          onClick={() => setAppMenuOpen(!appMenuOpen)}
          aria-expanded={appMenuOpen}
          aria-label="Application Menu"
        >
          RATHOD // VOL. 01 ▾
        </button>

        {appMenuOpen && (
          <nav
            style={{
              position: 'absolute',
              top: 'var(--topbar-height)',
              left: 16,
              background: 'var(--surface)',
              border: '2px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 200,
              zIndex: 9999,
            }}
            aria-label="Applications"
          >
            {[
              { id: 'dueler', label: '1. dueler.bot (Pokémon AI)' },
              { id: 'mafioso', label: '2. mafioso.py (Social Deduction)' },
              { id: 'ani-cpp', label: '3. ani-cli.cpp (C++ Media Tool)' },
              { id: 'shedskin', label: '4. shedskin (Unity 6 Platformer)' },
              { id: 'about', label: '5. about.txt (Profile & Scars)' },
              { id: 'contact', label: '6. contact.sh (Terminal Shell)' },
              { id: 'next', label: '7. next.txt (Next Projects)' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleLaunch(item.id as WindowId)}
                style={{
                  textAlign: 'left',
                  padding: '8px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  borderBottom: '1px solid var(--grid-line)',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        <div className="sys-status" aria-label="System status">
          <span className="status-dot" aria-hidden="true" />
          <span>OMARCHY ARCH-LINUX 7.2</span>
        </div>
      </div>

      <div className="top-bar-center">
        <span style={{ color: 'var(--ink-muted)', fontSize: 11 }}>
          COMMIT: 57698a7 [BUILD GREEN]
        </span>
      </div>

      <div className="top-bar-right">
        <button
          className="theme-switcher-btn"
          onClick={cycleTheme}
          aria-label={`Current theme: ${theme} (mode: ${mode}). Click to cycle.`}
        >
          THEME: {mode.toUpperCase()} [{theme.toUpperCase()}]
        </button>

        <span className="clock-display" aria-label="Local Time">
          {timeString || '12:00:00'}
        </span>
      </div>
    </header>
  );
};
