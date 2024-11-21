// components/layout/MainLayout.jsx
"use client";

import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const MainLayout = ({ 
  user, 
  darkMode, 
  onThemeToggle, 
  onLogout,
  currentView,
  onNavigate,
  children 
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Background - different gradients for light/dark mode */}
      <div className="fixed inset-0 -z-10">
        {/* Light mode gradient */}
        <div className="absolute inset-0 dark:hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,216,255,0.5),rgba(255,255,255,0.9))]" />
        {/* Dark mode gradient */}
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(0,0,0,0.95))]" />
      </div>

      <Sidebar 
        currentUser={user}
        currentView={currentView}
        onNavigate={onNavigate}
        className="relative bg-background/80 backdrop-blur-sm border-r"
      />
      
      <div className="flex-1">
        <Header 
          user={user}
          darkMode={darkMode}
          onThemeToggle={onThemeToggle}
          onLogout={onLogout}
        />
        <main className="max-w-2xl mx-auto px-4 py-6">
          <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};