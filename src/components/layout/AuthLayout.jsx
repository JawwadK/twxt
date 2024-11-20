"use client";

import React, { useState } from 'react';
import { LoginForm } from '../auth/LoginForm';
import { SignupForm } from '../auth/SignupForm';

export const AuthLayout = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
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