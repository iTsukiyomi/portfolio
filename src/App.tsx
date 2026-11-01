import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { WindowManagerProvider, useWindowManager } from './context/WindowManagerContext';
import { TopBar } from './components/desktop/TopBar';
import { DesktopIcons } from './components/desktop/DesktopIcons';
import { Dock } from './components/desktop/Dock';
import { Window } from './components/windows/Window';
import { ProjectCaseStudy } from './components/windows/ProjectCaseStudy';
import { AboutView } from './components/windows/AboutView';
import { TerminalView } from './components/terminal/TerminalView';
import { NextView } from './components/windows/NextView';
import { ResumeView } from './components/windows/ResumeView';
import { BootSequence } from './components/ui/BootSequence';
import { CustomCursor } from './components/ui/CustomCursor';
import { PROJECTS_DATA } from './data/portfolioData';

const DesktopWorkspace: React.FC = () => {
  const { openWindowList, openWindow } = useWindowManager();
  const [bootFinished, setBootFinished] = useState<boolean>(false);

  const hasOpenWindows = openWindowList.length > 0;

  return (
    <div className="retro-desktop">
      <a href="#desktop-canvas" className="skip-link">
        Skip to desktop
      </a>

      {/* Boot sequence (once per session, skippable) */}
      {!bootFinished && <BootSequence onComplete={() => setBootFinished(true)} />}

      {/* Top Menu Bar */}
      <TopBar />

      {/* Desktop Canvas Surface */}
      <main className="desktop-canvas" id="desktop-canvas" tabIndex={-1}>
        {/* Desktop Icons Column */}
        <DesktopIcons />

        {/* Central Classic Desktop System Emblem (visible when desktop is clear or behind windows) */}
        <div
          className="desktop-hero-centerpiece"
          style={{
            opacity: hasOpenWindows ? 0.2 : 1,
            transition: 'opacity 250ms var(--ease-sharp)',
            pointerEvents: hasOpenWindows ? 'none' : 'auto',
          }}
          aria-hidden={hasOpenWindows}
        >
          <div className="desktop-system-badge">
            <div className="system-badge-header">
              <span>MEET RATHOD // PORTFOLIO</span>
              <span>MUMBAI, INDIA</span>
            </div>

            <h1 className="system-badge-title">
              MEET RATHOD
              <br />
              <span style={{ color: 'var(--accent)' }}>// MY WORKSPACE</span>
            </h1>

            <p className="system-badge-desc">
              First-year BSc IT student. I build Discord bots, C++ terminal tools, and game mechanics. Click any icon on the left or launch below:
            </p>

            <div className="system-quick-actions">
              <button
                type="button"
                className="desktop-action-btn featured"
                onClick={() => openWindow('dueler')}
              >
                [POKÉMON DUEL]
              </button>
              <button
                type="button"
                className="desktop-action-btn"
                onClick={() => openWindow('mafioso')}
              >
                [MAFIOSO]
              </button>
              <button
                type="button"
                className="desktop-action-btn"
                onClick={() => openWindow('ani-cpp')}
              >
                [ANI-CLI C++]
              </button>
              <button
                type="button"
                className="desktop-action-btn"
                onClick={() => openWindow('shedskin')}
              >
                [SHEDSKIN]
              </button>
              <button
                type="button"
                className="desktop-action-btn"
                onClick={() => openWindow('contact')}
              >
                [TERMINAL]
              </button>
              <button
                type="button"
                className="desktop-action-btn"
                onClick={() => openWindow('about')}
              >
                [ABOUT ME]
              </button>
            </div>
          </div>
        </div>

        {/* Retro Wallpaper Watermark */}
        <div className="desktop-watermark" aria-hidden="true">
          <div className="watermark-title">MEET RATHOD</div>
          <div className="watermark-sub">
            ARCH LINUX // SYSTEMS &amp; BOT ARCHITECTURE
          </div>
        </div>

        {/* Active Draggable Floating OS Windows */}
        {openWindowList.map((win) => {
          let content: React.ReactNode = null;
          if (win.id in PROJECTS_DATA) {
            if (win.id === 'next') {
              content = <NextView />;
            } else {
              content = <ProjectCaseStudy data={PROJECTS_DATA[win.id]} />;
            }
          } else if (win.id === 'about') {
            content = <AboutView />;
          } else if (win.id === 'contact') {
            content = <TerminalView />;
          } else if (win.id === 'resume') {
            content = <ResumeView />;
          }

          return (
            <Window key={win.id} instance={win}>
              {content}
            </Window>
          );
        })}
      </main>

      {/* Bottom Taskbar / Dock */}
      <Dock />

      {/* Hardware Cursor */}
      <CustomCursor />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <WindowManagerProvider>
        <DesktopWorkspace />
      </WindowManagerProvider>
    </ThemeProvider>
  );
};

export default App;
