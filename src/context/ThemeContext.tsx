import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ThemeName = 'photocopy' | 'dusk' | 'phosphor';
export type ThemeMode = ThemeName | 'auto';

interface ThemeContextType {
  theme: ThemeName;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function getAutoTheme(): ThemeName {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) {
    return 'photocopy';
  } else if (hour >= 18 && hour < 22) {
    return 'dusk';
  } else {
    return 'phosphor';
  }
}

function getStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem('meet_portfolio_theme') as ThemeMode | null;
    if (stored === 'photocopy' || stored === 'dusk' || stored === 'phosphor' || stored === 'auto') {
      return stored;
    }
  } catch {
    // Storage access disabled or blocked
  }
  return 'auto';
}

function storeTheme(mode: ThemeMode): void {
  try {
    localStorage.setItem('meet_portfolio_theme', mode);
  } catch {
    // Ignore storage failure
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(getStoredTheme);
  const [activeTheme, setActiveTheme] = useState<ThemeName>(() => {
    const initialMode = getStoredTheme();
    return initialMode === 'auto' ? getAutoTheme() : initialMode;
  });

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    storeTheme(newMode);
    const resolved = newMode === 'auto' ? getAutoTheme() : newMode;
    setActiveTheme(resolved);
  }, []);

  const cycleTheme = useCallback(() => {
    const order: ThemeMode[] = ['photocopy', 'dusk', 'phosphor', 'auto'];
    const nextIdx = (order.indexOf(mode) + 1) % order.length;
    setMode(order[nextIdx]);
  }, [mode, setMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    if (mode === 'auto') {
      const interval = setInterval(() => {
        const next = getAutoTheme();
        setActiveTheme((prev) => (prev !== next ? next : prev));
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, mode, setMode, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
