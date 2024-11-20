import { useEffect } from 'react';

const ThemeProvider = ({ darkMode, children }) => {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return children;
};

export default ThemeProvider;