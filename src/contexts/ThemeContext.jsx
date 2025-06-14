import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    // Initialize from localStorage or default to 'light'
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    // Initialize from localStorage or default to '#dc3545' (red, based on your existing app)
    const savedColor = localStorage.getItem('primaryColor');
    return savedColor || '#dc3545';
  });

  // Apply theme mode and primary color to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    localStorage.setItem('themeMode', themeMode);
    localStorage.setItem('primaryColor', primaryColor);
    console.log('Theme mode set:', themeMode); // Temporary log
  }, [themeMode, primaryColor]);

  const toggleThemeMode = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const changePrimaryColor = (color) => {
    setPrimaryColor(color);
  };

  const themeColors = {
    // You can add more predefined colors here
    red: '#dc3545',
    blue: '#007bff',
    green: '#28a745',
    purple: '#6f42c1',
    orange: '#fd7e14',
  };

  return (
    <ThemeContext.Provider value={{
      themeMode,
      toggleThemeMode,
      primaryColor,
      changePrimaryColor,
      themeColors,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}; 