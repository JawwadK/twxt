"use client";

import React, { useState } from 'react';
import { LoginForm } from '../auth/LoginForm';
import { SignupForm } from '../auth/SignupForm';

import Image from 'next/image';

export const AuthLayout = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-in fade-in">
      <div className="mb-8 flex flex-col items-center">
        <Image 
          src="/logo.svg" 
          alt="Logo" 
          width={64} 
          height={64} 
          className="logo-large mb-4"
        />
        <h1 className="text-3xl font-bold">Welcome to Tweeter</h1>
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