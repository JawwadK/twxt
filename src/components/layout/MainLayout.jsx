"use client";

import React from 'react';
import { Header } from './Header';

export const MainLayout = ({ 
  user, 
  darkMode, 
  onThemeToggle, 
  onLogout, 
  children 
}) => {
  return (
    <div className="min-h-screen">
      <Header 
        user={user}
        darkMode={darkMode}
        onThemeToggle={onThemeToggle}
        onLogout={onLogout}
      />
      <main className="container mx-auto max-w-2xl px-4 py-6">
        {children}
      </main>
    </div>
  );
};