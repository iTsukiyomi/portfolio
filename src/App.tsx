import React, { useState, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { WindowManagerProvider, useWindowManager } from './context/WindowManagerContext';
import { TopBar } from './components/desktop/TopBar';
import { DesktopIcons } from './components/desktop/DesktopIcons';
import { Dock } from './components/desktop/Dock';
import { ContextMenu } from './components/desktop/ContextMenu';
import { Window } from './components/windows/Window';
import { ProjectCaseStudy } from './components/windows/ProjectCaseStudy';
import { AboutView } from './components/windows/AboutView';
import { ContactView } from './components/windows/ContactView';
import { TerminalView } from './components/terminal/TerminalView';
import { NextView } from './components/windows/NextView';
import { ResumeView } from './components/windows/ResumeView';
import { BootSequence } from './components/ui/BootSequence';
import { CustomCursor } from './components/ui/CustomCursor';
import { PROJECTS_DATA } from './data/portfolioData';

interface SelectionBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

const DesktopWorkspace: React.FC = () => {
  const { windows, openWindowList, openWindow } = useWindowManager();
  const [bootFinished, setBootFinished] = useState<boolean>(false);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Marquee selection box drag state
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; button: number } | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Check if any window is open AND not minimized
  const hasVisibleWindows = Object.values(windows).some((w) => w.isOpen && !w.isMinimized);

  // Right-click or left-click drag on canvas starts blue selection box
  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    // Only trigger if clicking on canvas or background, not on windows or icons
    const target = e.target as HTMLElement;
    if (target.closest('.os-window-frame') || target.closest('.desktop-icon-btn') || target.closest('.desktop-system-badge')) {
      return;
    }

    dragStartRef.current = { x: e.clientX, y: e.clientY, button: e.button };
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!dragStartRef.current) return;

    const startX = dragStartRef.current.x;
    const startY = dragStartRef.current.y;
    const dist = Math.hypot(e.clientX - startX, e.clientY - startY);

    if (dist > 5) {
      isDraggingRef.current = true;
      setContextMenu(null); // Close context menu if dragging

      setSelectionBox({
        left: Math.min(startX, e.clientX),
        top: Math.min(startY, e.clientY),
        width: Math.abs(e.clientX - startX),
        height: Math.abs(e.clientY - startY),
      });
    }
  };

  const handlePointerUp = () => {
    setSelectionBox(null);
    dragStartRef.current = null;
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    // Only open context menu on canvas background, not on windows or buttons
    const target = e.target as HTMLElement;
    if (target.closest('.os-window-frame') || target.closest('button') || target.closest('a')) {
      return;
    }

    e.preventDefault();
    // If user dragged a selection box, don't open context menu
    if (isDraggingRef.current) {
      return;
    }

    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="retro-desktop"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onContextMenu={handleContextMenu}
    >
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

        {/* Central Desktop System Emblem */}
        <div
          className="desktop-hero-centerpiece"
          style={{
            opacity: hasVisibleWindows ? 0.18 : 1,
            transition: 'opacity 200ms var(--ease-sharp)',
            pointerEvents: hasVisibleWindows ? 'none' : 'auto',
          }}
          aria-hidden={hasVisibleWindows}
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
                className="desktop-action-btn"
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

        {/* Windows Drag-Selection Box Marquee */}
        {selectionBox && (
          <div
            className="desktop-selection-box"
            style={{
              left: selectionBox.left,
              top: selectionBox.top,
              width: selectionBox.width,
              height: selectionBox.height,
            }}
            aria-hidden="true"
          />
        )}

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
            content = <ContactView />;
          } else if (win.id === 'terminal') {
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

      {/* Right-Click Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}

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
