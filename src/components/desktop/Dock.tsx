import React, { useState } from 'react';
import { useWindowManager, type WindowId } from '../../context/WindowManagerContext';

export const Dock: React.FC = () => {
  const { windows, focusedWindowId, focusWindow, closeWindow, openWindow } = useWindowManager();
  const [showRawStats, setShowRawStats] = useState<boolean>(false);

  const openList = Object.values(windows).filter((w) => w.isOpen);

  return (
    <footer className="bottom-dock" role="navigation" aria-label="Taskbar">
      <div className="dock-left">
        <button
          className="start-btn"
          onClick={() => openWindow('contact')}
          aria-label="Open Terminal Shell"
        >
          <span style={{ fontSize: 13 }}>▶</span>
          <span>START.SH</span>
        </button>

        {openList.map((win) => {
          const isFocused = focusedWindowId === win.id && !win.isMinimized;
          return (
            <div
              key={win.id}
              className={`dock-item-btn ${isFocused ? 'active' : ''} ${win.isMinimized ? 'minimized' : ''}`}
              onClick={() => focusWindow(win.id as WindowId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0 6px 0 10px',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  backgroundColor: isFocused ? 'var(--accent)' : 'var(--ink-muted)',
                  display: 'inline-block',
                }}
              />
              <span>{win.id}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(win.id as WindowId);
                }}
                title={`Close ${win.id}`}
                aria-label={`Close ${win.id}`}
                style={{
                  marginLeft: 4,
                  padding: '0 4px',
                  background: 'transparent',
                  border: 'none',
                  color: 'inherit',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  fontWeight: 900,
                  cursor: 'pointer',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.75,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.color = '#ff3800';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.75';
                  e.currentTarget.style.color = 'inherit';
                }}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      <div className="dock-right">
        {/* Deliberate Imperfection 2: Raw unfinished diagnostic control */}
        <div className="raw-diagnostic-box" title="Unfiltered kernel memory monitor">
          <span>HEAP: 48.2MB</span>
          <span>HEAP_MAX: 128MB</span>
          <button
            className="raw-toggle-lever"
            onClick={() => setShowRawStats(!showRawStats)}
            aria-label="Toggle raw memory allocation diagnostic"
          >
            {showRawStats ? 'RAW_DUMP [ON]' : 'RAW_DUMP [OFF]'}
          </button>
        </div>

        {showRawStats && (
          <div
            style={{
              position: 'fixed',
              bottom: 'calc(var(--dock-height) + 8px)',
              right: 16,
              background: '#000',
              color: '#39ff14',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              padding: 12,
              border: '2px solid #39ff14',
              boxShadow: '4px 4px 0 #000',
              zIndex: 9999,
              maxWidth: 320,
              lineHeight: 1.4,
            }}
          >
            <div>[DIAGNOSTIC MEMORY DUMP]</div>
            <div>0x7ffc3a8e: V8_ISOLATE_ACTIVE [OK]</div>
            <div>0x7ffc3a94: GSAP_TICKER_RAF_SLOT [16.66ms]</div>
            <div>0x7ffc3a9c: LENIS_SMOOTH_SCROLL [ACTIVE]</div>
            <div>0x7ffc3aa0: THREAD_COUNT: 4 | ZOMBIE_PROCS: 0</div>
          </div>
        )}

        <div style={{ fontSize: 11, color: 'var(--ink)' }}>
          <span>CPU: 1.2%</span>
        </div>
      </div>
    </footer>
  );
};
