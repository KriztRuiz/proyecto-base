import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

export type Theme = 'light' | 'dark' | 'green';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme) || 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'green');
    root.classList.remove('theme-green');
    if (theme === 'dark') root.classList.add('dark');
    else if (theme === 'green') root.classList.add('green');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
