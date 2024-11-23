import React, { createContext, useState, useEffect } from 'react';

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
  themes: string[];
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'emerald',
  setTheme: () => {},
  themes: ['emerald', 'dark', 'light'],
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themes = ['emerald', 'dark', 'light'];
  const [theme, setThemeState] = useState<string>('emerald');

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'emerald';
    setTheme(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
