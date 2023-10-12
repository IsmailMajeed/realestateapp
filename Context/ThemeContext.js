import React, { createContext, useState } from 'react';
import { lightColors, darkColors } from '../Components/colors';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = (value) => {
    if (value === 'Dark Mode')
      setIsDarkMode(true);
    else
      setIsDarkMode(false);
  };

  const theme = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}