import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ThemeName = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeName;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function getStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem('meet_portfolio_theme') as ThemeName | null;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // Storage access disabled or blocked
  }
  return 'light'; // Light is default
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
