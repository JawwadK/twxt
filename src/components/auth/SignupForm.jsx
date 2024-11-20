import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const SignupForm = ({ onSignup, onShowLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.username === username)) {
      alert('Username already taken');
      return;
    }

    const newUser = {
      username,
      password,
      displayName,
      bio,
      location,
      website,
      avatar: displayName[0].toUpperCase(),
      followers: [],
      following: [],
      joinedAt: new Date().toISOString()
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    onSignup(newUser);
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={160}
          />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            type="url"
          />
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <button 
            onClick={onShowLogin}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </CardContent>
    </Card>
  );
};