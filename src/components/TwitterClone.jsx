"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Send, LogOut } from 'lucide-react';

// Auth Components
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin(user);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

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
      avatar: displayName[0].toUpperCase(),
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    onSignup(newUser);
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Tweet Component
const Tweet = ({ tweet, currentUser, onLike, onComment }) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            {tweet.authorAvatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{tweet.authorDisplayName}</span>
              <span className="text-gray-500 text-sm">@{tweet.authorUsername}</span>
              <span className="text-gray-500 text-sm">
                {new Date(tweet.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1">{tweet.content}</p>
            
            <div className="flex items-center gap-6 mt-4">
              <button 
                className="flex items-center gap-1 text-gray-500 hover:text-red-500"
                onClick={() => onLike(tweet.id)}
              >
                <Heart 
                  className={tweet.likedBy.includes(currentUser.username) ? "fill-red-500 text-red-500" : ""} 
                  size={18} 
                />
                <span>{tweet.likedBy.length}</span>
              </button>
              
              <button 
                className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle size={18} />
                <span>{tweet.comments.length}</span>
              </button>
            </div>

            {showComments && (
              <div className="mt-4">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => {
                      onComment(tweet.id, comment);
                      setComment('');
                    }}
                    size="sm"
                  >
                    <Send size={16} />
                  </Button>
                </div>
                
                {tweet.comments.map((comment, i) => (
                  <div key={i} className="p-2 bg-gray-50 rounded mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                        {comment.authorAvatar}
                      </div>
                      <span className="font-semibold text-sm">{comment.authorDisplayName}</span>
                    </div>
                    <p className="ml-8 text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
const TwitterClone = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');

  // Load tweets from localStorage on mount
  useEffect(() => {
    const savedTweets = JSON.parse(localStorage.getItem('tweets') || '[]');
    setTweets(savedTweets);
  }, []);

  // Save tweets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tweets', JSON.stringify(tweets));
  }, [tweets]);

  const handlePost = () => {
    if (!newTweet.trim()) return;
    
    const tweet = {
      id: Date.now(),
      authorUsername: user.username,
      authorDisplayName: user.displayName,
      authorAvatar: user.avatar,
      content: newTweet,
      timestamp: new Date().toISOString(),
      likedBy: [],
      comments: []
    };
    
    setTweets([tweet, ...tweets]);
    setNewTweet('');
  };

  const handleLike = (tweetId) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        const likedIndex = tweet.likedBy.indexOf(user.username);
        if (likedIndex === -1) {
          return { ...tweet, likedBy: [...tweet.likedBy, user.username] };
        } else {
          const newLikedBy = [...tweet.likedBy];
          newLikedBy.splice(likedIndex, 1);
          return { ...tweet, likedBy: newLikedBy };
        }
      }
      return tweet;
    }));
  };

  const handleComment = (tweetId, content) => {
    if (!content.trim()) return;
    
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          comments: [...tweet.comments, {
            authorUsername: user.username,
            authorDisplayName: user.displayName,
            authorAvatar: user.avatar,
            content,
            timestamp: new Date().toISOString()
          }]
        };
      }
      return tweet;
    }));
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
  };

  if (!user) {
    return showLogin ? (
      <div>
        <LoginForm onLogin={setUser} />
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <button 
            className="text-blue-500 hover:underline"
            onClick={() => setShowLogin(false)}
          >
            Sign up
          </button>
        </p>
      </div>
    ) : (
      <div>
        <SignupForm onSignup={setUser} />
        <p className="text-center mt-4">
          Already have an account?{' '}
          <button 
            className="text-blue-500 hover:underline"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              {user.avatar}
            </div>
            <div className="flex-1">
              <Input
                placeholder="What's happening?"
                value={newTweet}
                onChange={(e) => setNewTweet(e.target.value)}
                className="mb-3"
              />
              <Button onClick={handlePost}>Post</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {tweets.map(tweet => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          currentUser={user}
          onLike={handleLike}
          onComment={handleComment}
        />
      ))}
    </div>
  );
};

export default TwitterClone;