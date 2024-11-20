// components/layout/Header.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Sun, Moon } from 'lucide-react';

export const Header = ({ user, darkMode, onThemeToggle, onLogout }) => (
  <div className="flex justify-between items-center mb-6 p-4 border-b animate-in fade-in">
    <div className="flex items-center gap-3">
      <Image 
        src="/logo.svg" 
        alt="Logo" 
        width={32} 
        height={32} 
        className="logo-small"
      />
      <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
    </div>
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="icon"
        onClick={onThemeToggle}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </Button>
      <Button variant="outline" onClick={onLogout}>
        <LogOut size={16} className="mr-2" />
        Logout
      </Button>
    </div>
  </div>
);