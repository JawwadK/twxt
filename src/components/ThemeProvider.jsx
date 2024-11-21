// components/ThemeProvider.jsx
"use client";

import { useEffect } from "react";

function ThemeProvider({ children, darkMode }) {
  // Update class when component mounts and when darkMode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', darkMode);
    }
  }, [darkMode]);

  return children;
}

export default ThemeProvider;