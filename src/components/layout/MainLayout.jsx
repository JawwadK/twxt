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
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
      <Sidebar 
        currentUser={user}
        currentView={currentView}
        onNavigate={onNavigate}
        className="bg-background/95 backdrop-blur-sm"
      />
      
      <div className="flex-1">
        <Header 
          user={user}
          darkMode={darkMode}
          onThemeToggle={onThemeToggle}
          onLogout={onLogout}
          className="bg-background/95 backdrop-blur-sm"
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