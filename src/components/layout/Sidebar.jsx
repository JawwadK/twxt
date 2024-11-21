// components/layout/Sidebar.jsx
import React from 'react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Home, Bell, User } from 'lucide-react';

export const Sidebar = ({ 
  currentView, 
  onNavigate,
  currentUser 
}) => {
  const navItems = [
    {
      icon: Home,
      label: 'Home',
      view: 'home'
    },
    {
      icon: Bell,
      label: 'Notifications',
      view: 'notifications'
    },
    {
      icon: User,
      label: 'Profile',
      view: 'profile'
    }
  ];

  return (
    <div className="w-64 border-r h-screen sticky top-0 p-4 flex flex-col gap-4">
      <div className="px-4">
        <Logo className="w-8 h-8" />
      </div>
      
      <nav className="flex flex-col gap-2">
        {navItems.map(({ icon: Icon, label, view }) => (
          <Button
            key={view}
            variant={currentView === view ? "default" : "ghost"}
            className="justify-start gap-4 px-4"
            onClick={() => onNavigate(view)}
          >
            <Icon size={24} />
            <span className="text-lg">{label}</span>
          </Button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-3 p-4 hover:bg-secondary rounded-lg cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            {currentUser.avatar}
          </div>
          <div>
            <div className="font-semibold">{currentUser.displayName}</div>
            <div className="text-sm text-muted-foreground">@{currentUser.username}</div>
          </div>
        </div>
      </div>
    </div>
  );
};