import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { WindowManagerProvider, useWindowManager, type WindowId } from './context/WindowManagerContext';
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

  // When boot finishes, check if URL has an explicit project/page hash
  useEffect(() => {
    if (bootFinished) {
      const hash = window.location.hash.replace(/^#\/?/, '').replace(/^projects\//, '');
      if (
        hash &&
        (hash in PROJECTS_DATA ||
          hash === 'about' ||
          hash === 'contact' ||
          hash === 'resume' ||
          hash === 'next')
      ) {
        openWindow(hash as WindowId);
      }
    }
  }, [bootFinished, openWindow]);

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
            opacity: hasOpenWindows ? 0.25 : 1,
            transition: 'opacity 250ms var(--ease-sharp)',
            pointerEvents: hasOpenWindows ? 'none' : 'auto',
          }}
          aria-hidden={hasOpenWindows}
        >
          <div className="desktop-system-badge">
            <div className="system-badge-header">
              <span>OMARCHY OS v7.2.5 [READY]</span>
              <span>DEV RIG // MUMBAI, IN</span>
            </div>

            <h1 className="system-badge-title">
              MEET RATHOD
              <br />
              <span style={{ color: 'var(--accent)' }}>// RETRO WORKSPACE</span>
            </h1>

            <p className="system-badge-desc">
              First-year BSc IT student engineering Discord bot architectures, C++20 media tools, and physics controllers on Arch Linux. Double-click any file icon on the left or select an entry point below:
            </p>

            <div className="system-quick-actions">
              <button
                type="button"
                className="desktop-action-btn featured"
                onClick={() => openWindow('dueler')}
              >
                [01. DUELER.BOT]
              </button>
              <button
                type="button"
                className="desktop-action-btn"
                onClick={() => openWindow('mafioso')}
              >
                [02. MAFIOSO.PY]
              </button>
              <button
                type="button"
                className="desktop-action-btn"
                onClick={() => openWindow('ani-cpp')}
              >
                [03. ANI-CLI.CPP]
              </button>
              <button
                type="button"
                className="desktop-action-btn"
                onClick={() => openWindow('shedskin')}
              >
                [04. SHEDSKIN]
              </button>
              <button
                type="button"
                className="desktop-action-btn"
                onClick={() => openWindow('contact')}
              >
                [SHELL: CONTACT.SH]
              </button>
              <button
                type="button"
                className="desktop-action-btn"
                onClick={() => openWindow('about')}
              >
                [ABOUT.TXT]
              </button>
            </div>
          </div>
        </div>

        {/* Retro Wallpaper Watermark */}
        <div className="desktop-watermark" aria-hidden="true">
          <div className="watermark-title">MEET RATHOD</div>
          <div className="watermark-sub">
            ARCH LINUX // OMARCHY 7.2 // SYSTEMS &amp; BOT ARCHITECTURE
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
