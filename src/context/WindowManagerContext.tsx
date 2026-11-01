import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';

export type WindowId =
  | 'dueler'
  | 'mafioso'
  | 'ani-cpp'
  | 'shedskin'
  | 'about'
  | 'contact'
  | 'next'
  | 'resume';

export interface WindowInstance {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevRect?: { x: number; y: number; width: number; height: number };
}

interface WindowManagerContextType {
  windows: Record<WindowId, WindowInstance>;
  focusedWindowId: WindowId | null;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximizeWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, pos: { x: number; y: number }) => void;
  updateWindowSize: (id: WindowId, size: { width: number; height: number }) => void;
  cycleFocus: (direction?: 'forward' | 'backward') => void;
  openWindowList: WindowInstance[];
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

// Non-uniform default positions and sizes to avoid the sterile "tidy grid" AI tell
const DEFAULT_WINDOWS: Record<WindowId, Omit<WindowInstance, 'isOpen' | 'isMinimized' | 'isMaximized' | 'zIndex'>> = {
  dueler: {
    id: 'dueler',
    title: 'dueler.bot — Pokémon Battle Engine',
    position: { x: 130, y: 50 },
    size: { width: 880, height: 630 },
  },
  mafioso: {
    id: 'mafioso',
    title: 'mafioso.py — Hidden Role Engine',
    position: { x: 170, y: 65 },
    size: { width: 840, height: 590 },
  },
  'ani-cpp': {
    id: 'ani-cpp',
    title: 'ani-cli.cpp — C++20 Media Streamer',
    position: { x: 210, y: 55 },
    size: { width: 820, height: 570 },
  },
  shedskin: {
    id: 'shedskin',
    title: 'shedskin — Unity 6 Metroidvania',
    position: { x: 150, y: 75 },
    size: { width: 860, height: 610 },
  },
  about: {
    id: 'about',
    title: 'about.txt — Meet Rathod',
    position: { x: 190, y: 50 },
    size: { width: 780, height: 600 },
  },
  contact: {
    id: 'contact',
    title: 'contact.sh — Interactive Shell',
    position: { x: 230, y: 85 },
    size: { width: 750, height: 510 },
  },
  next: {
    id: 'next',
    title: 'next.txt — What I Am Building',
    position: { x: 270, y: 100 },
    size: { width: 660, height: 470 },
  },
  resume: {
    id: 'resume',
    title: 'resume.pdf — Systems & Bot Engineering',
    position: { x: 150, y: 55 },
    size: { width: 800, height: 630 },
  },
};

function getStoredLayout(): Partial<Record<WindowId, { x: number; y: number; width: number; height: number }>> {
  try {
    const raw = localStorage.getItem('meet_window_layout');
    if (raw) {
      const parsed = JSON.parse(raw);
      const valid: Partial<Record<WindowId, { x: number; y: number; width: number; height: number }>> = {};
      const winW = typeof window !== 'undefined' ? window.innerWidth : 1440;
      const winH = typeof window !== 'undefined' ? window.innerHeight : 900;

      for (const k of Object.keys(parsed) as WindowId[]) {
        const item = parsed[k];
        if (
          item &&
          typeof item.x === 'number' &&
          typeof item.y === 'number' &&
          item.y >= 48 &&
          item.y < winH - 100 &&
          item.x >= 10 &&
          item.x < winW - 120
        ) {
          valid[k] = item;
        }
      }
      return valid;
    }
  } catch {
    // Fail silently on storage errors
  }
  return {};
}

function saveLayout(windows: Record<WindowId, WindowInstance>): void {
  try {
    const toSave: Record<string, { x: number; y: number; width: number; height: number }> = {};
    for (const key of Object.keys(windows) as WindowId[]) {
      const w = windows[key];
      toSave[key] = {
        x: w.position.x,
        y: w.position.y,
        width: w.size.width,
        height: w.size.height,
      };
    }
    localStorage.setItem('meet_window_layout', JSON.stringify(toSave));
  } catch {
    // Fail silently
  }
}

export const WindowManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [maxZ, setMaxZ] = useState(10);
  const [focusedWindowId, setFocusedWindowId] = useState<WindowId | null>(null);
  const focusedRef = useRef<WindowId | null>(null);

  useEffect(() => {
    focusedRef.current = focusedWindowId;
  }, [focusedWindowId]);

  const [windows, setWindows] = useState<Record<WindowId, WindowInstance>>(() => {
    const stored = getStoredLayout();
    const initial: Record<string, WindowInstance> = {};

    for (const key of Object.keys(DEFAULT_WINDOWS) as WindowId[]) {
      const def = DEFAULT_WINDOWS[key];
      const custom = stored[key];
      initial[key] = {
        ...def,
        position: custom ? { x: custom.x, y: custom.y } : def.position,
        size: custom ? { width: custom.width, height: custom.height } : def.size,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 1,
      };
    }
    return initial as Record<WindowId, WindowInstance>;
  });

  // Clamp window position inside viewport boundaries
  const clampPosition = useCallback((pos: { x: number; y: number }, _size?: { width: number; height: number }) => {
    const topBarHeight = 44;
    const dockHeight = 52;
    const maxX = Math.max(10, window.innerWidth - 120);
    const maxY = Math.max(topBarHeight + 10, window.innerHeight - dockHeight - 60);

    return {
      x: Math.max(10, Math.min(pos.x, maxX)),
      y: Math.max(topBarHeight + 6, Math.min(pos.y, maxY)),
    };
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setMaxZ((prevMax) => {
      const nextZ = prevMax + 1;
      setWindows((prev) => {
        if (!prev[id]) return prev;
        return {
          ...prev,
          [id]: {
            ...prev[id],
            isMinimized: false,
            zIndex: nextZ,
          },
        };
      });
      return nextZ;
    });

    setFocusedWindowId(id);
    focusedRef.current = id;

    // Update URL hash
    const targetHash = `#projects/${id}`;
    if (window.location.hash !== targetHash && window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', targetHash);
    }
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    console.log('openWindow called for:', id);
    setWindows((prev) => {
      const current = prev[id];
      if (!current) return prev;

      // Bring to front and ensure open and un-minimized
      const nextZ = maxZ + 1;
      setMaxZ(nextZ);

      // Clamp initial position
      const safePos = clampPosition(current.position, current.size);

      return {
        ...prev,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
          position: safePos,
        },
      };
    });

    setFocusedWindowId(id);
    focusedRef.current = id;
    const targetHash = `#projects/${id}`;
    if (window.location.hash !== targetHash && window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', targetHash);
    }
  }, [maxZ, clampPosition]);

  const closeWindow = useCallback((id: WindowId) => {
    console.log('closeWindow called for:', id);
    setWindows((prev) => {
      const current = prev[id];
      if (!current) return prev;
      return {
        ...prev,
        [id]: {
          ...current,
          isOpen: false,
          isMinimized: false,
        },
      };
    });

    setFocusedWindowId((prevFocused) => {
      if (prevFocused !== id) return prevFocused;
      // Focus next open window with highest zIndex
      const remainingOpen = Object.values(windows).filter(
        (w) => w.isOpen && !w.isMinimized && w.id !== id
      );
      if (remainingOpen.length === 0) {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        return null;
      }
      remainingOpen.sort((a, b) => b.zIndex - a.zIndex);
      const nextFocused = remainingOpen[0].id;
      focusedRef.current = nextFocused;
      window.history.replaceState(null, '', `#projects/${nextFocused}`);
      return nextFocused;
    });
  }, [windows]);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const current = prev[id];
      if (!current) return prev;
      return {
        ...prev,
        [id]: {
          ...current,
          isMinimized: true,
        },
      };
    });

    setFocusedWindowId((prevFocused) => {
      if (prevFocused !== id) return prevFocused;
      const remaining = Object.values(windows).filter(
        (w) => w.isOpen && !w.isMinimized && w.id !== id
      );
      if (remaining.length === 0) return null;
      remaining.sort((a, b) => b.zIndex - a.zIndex);
      return remaining[0].id;
    });
  }, [windows]);

  const toggleMaximizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const current = prev[id];
      if (!current) return prev;

      if (current.isMaximized) {
        // Restore previous dimensions
        return {
          ...prev,
          [id]: {
            ...current,
            isMaximized: false,
            position: current.prevRect ? { x: current.prevRect.x, y: current.prevRect.y } : current.position,
            size: current.prevRect ? { width: current.prevRect.width, height: current.prevRect.height } : current.size,
          },
        };
      } else {
        // Maximize to viewport leaving topbar & dock
        const topBarHeight = 44;
        const dockHeight = 52;
        return {
          ...prev,
          [id]: {
            ...current,
            isMaximized: true,
            prevRect: {
              x: current.position.x,
              y: current.position.y,
              width: current.size.width,
              height: current.size.height,
            },
            position: { x: 8, y: topBarHeight + 6 },
            size: {
              width: Math.max(340, window.innerWidth - 16),
              height: Math.max(300, window.innerHeight - topBarHeight - dockHeight - 16),
            },
          },
        };
      }
    });
  }, []);

  const updateWindowPosition = useCallback((id: WindowId, pos: { x: number; y: number }) => {
    setWindows((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const clamped = clampPosition(pos, current.size);
      const updated = {
        ...prev,
        [id]: {
          ...current,
          position: clamped,
        },
      };
      saveLayout(updated);
      return updated;
    });
  }, [clampPosition]);

  const updateWindowSize = useCallback((id: WindowId, size: { width: number; height: number }) => {
    setWindows((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const minW = 340;
      const minH = 240;
      const maxW = window.innerWidth - 20;
      const maxH = window.innerHeight - 100;

      const clampedSize = {
        width: Math.max(minW, Math.min(size.width, maxW)),
        height: Math.max(minH, Math.min(size.height, maxH)),
      };

      const updated = {
        ...prev,
        [id]: {
          ...current,
          size: clampedSize,
        },
      };
      saveLayout(updated);
      return updated;
    });
  }, []);

  const cycleFocus = useCallback((direction: 'forward' | 'backward' = 'forward') => {
    const openList = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);
    if (openList.length <= 1) return;

    openList.sort((a, b) => b.zIndex - a.zIndex);
    const currentIndex = openList.findIndex((w) => w.id === focusedWindowId);

    let nextIndex: number;
    if (direction === 'forward') {
      nextIndex = (currentIndex + 1) % openList.length;
    } else {
      nextIndex = (currentIndex - 1 + openList.length) % openList.length;
    }

    focusWindow(openList[nextIndex].id);
  }, [windows, focusedWindowId, focusWindow]);

  // Synchronize with URL hash on mount and hashchange
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').replace(/^projects\//, '');
      if (hash && hash in DEFAULT_WINDOWS) {
        openWindow(hash as WindowId);
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [openWindow]);

  // Global Keyboard shortcuts: Esc closes focused window, Alt+Tab cycles
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('WindowManager keydown:', e.key, 'focusedRef:', focusedRef.current);
      if (e.key === 'Escape' && focusedRef.current) {
        closeWindow(focusedRef.current);
      } else if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        cycleFocus(e.shiftKey ? 'backward' : 'forward');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeWindow, cycleFocus]);

  const openWindowList = useMemo(() => {
    return Object.values(windows).filter((w) => w.isOpen);
  }, [windows]);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        focusedWindowId,
        openWindow,
        closeWindow,
        focusWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        updateWindowPosition,
        updateWindowSize,
        cycleFocus,
        openWindowList,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};

export function useWindowManager(): WindowManagerContextType {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return context;
}
