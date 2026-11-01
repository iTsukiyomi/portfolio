import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ThemeName = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeName;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function getSystemTheme(): ThemeName {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function getStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem('meet_portfolio_theme') as ThemeName | null;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // Storage access disabled or blocked
  }
  // If user hasn't set an explicit preference, follow device default
  return getSystemTheme();
}

function storeTheme(theme: ThemeName): void {
  try {
    localStorage.setItem('meet_portfolio_theme', theme);
  } catch {
    // Ignore storage failure
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setActiveTheme] = useState<ThemeName>(getStoredTheme);

  const setTheme = useCallback((newTheme: ThemeName) => {
    setActiveTheme(newTheme);
    storeTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Listen to device/OS theme preference changes if user hasn't stored a manual override
  useEffect(() => {
    try {
      if (localStorage.getItem('meet_portfolio_theme')) return;
    } catch {
      // Ignore
    }

    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDeviceThemeChange = (e: MediaQueryListEvent) => {
      setActiveTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleDeviceThemeChange);
    return () => mediaQuery.removeEventListener('change', handleDeviceThemeChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
