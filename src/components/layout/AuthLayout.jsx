// components/layout/AuthLayout.jsx
"use client";

import React, { useState } from 'react';
import { LoginForm } from '../auth/LoginForm';
import { SignupForm } from '../auth/SignupForm';
import { Logo } from '@/components/ui/logo';

export const AuthLayout = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-in fade-in">
      <div className="mb-8 flex flex-col items-center">
        <Logo className="w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold">Welcome to Twxt</h1>
      </div>
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm 
            onLogin={onLogin}
            onShowSignup={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm
            onSignup={onLogin}
            onShowLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};