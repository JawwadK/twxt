"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { TweetList } from "@/components/tweet/TweetList";
import { UserProfile } from "@/components/profile/UserProfile";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ThemeProvider  from "@/components/ThemeProvider";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useLocalStorage("currentUser", null);
  const [tweets, setTweets] = useLocalStorage("tweets", []);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [users, setUsers] = useLocalStorage("users", []);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentView, setCurrentView] = useState("home");

  // Add this right after your useLocalStorage hooks
  useEffect(() => {
    // Update existing users to include followers/following arrays
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = existingUsers.map((user) => ({
      ...user,
      followers: user.followers || [],
      following: user.following || [],
      joinedAt: user.joinedAt || new Date().toISOString(),
    }));
    setUsers(updatedUsers);

    // Update current user if needed
    if (user && (!user.followers || !user.following)) {
      const updatedUser = updatedUsers.find(
        (u) => u.username === user.username
      );
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  }, []);
  // Prevent hydration errors by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleTweetSubmit = (tweetData) => {
    const newTweet = {
      id: Date.now(),
      authorUsername: user.username,
      authorDisplayName: user.displayName,
      authorAvatar: user.avatar,
      timestamp: new Date().toISOString(),
      likedBy: [],
      comments: [],
      ...tweetData,
    };
    setTweets([newTweet, ...tweets]);
  };

  const handleLike = (tweetId) => {
    setTweets(
      tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const likedIndex = tweet.likedBy.indexOf(user.username);
          return {
            ...tweet,
            likedBy:
              likedIndex === -1
                ? [...tweet.likedBy, user.username]
                : tweet.likedBy.filter((_, i) => i !== likedIndex),
          };
        }
        return tweet;
      })
    );
  };

  const handleComment = (tweetId, content) => {
    if (!content.trim()) return;
    setTweets(
      tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            comments: [
              ...tweet.comments,
              {
                authorUsername: user.username,
                authorDisplayName: user.displayName,
                authorAvatar: user.avatar,
                content,
                timestamp: new Date().toISOString(),
              },
            ],
          };
        }
        return tweet;
      })
    );
  };

  const handleFollow = (usernameToFollow) => {
    const updatedUsers = users.map((u) => {
      if (u.username === usernameToFollow) {
        return {
          ...u,
          followers: u.followers.includes(user.username)
            ? u.followers.filter((f) => f !== user.username)
            : [...u.followers, user.username],
        };
      }
      if (u.username === user.username) {
        return {
          ...u,
          following: u.following.includes(usernameToFollow)
            ? u.following.filter((f) => f !== usernameToFollow)
            : [...u.following, usernameToFollow],
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    const updatedUser = updatedUsers.find((u) => u.username === user.username);
    setUser(updatedUser);
  };
  const handleNavigate = (view) => {
    if (view === "profile") {
      setCurrentProfile(user.username);
    } else if (view === "home") {
      setCurrentProfile(null);
    }
    setCurrentView(view);
  };

  if (!user) {
    return <AuthLayout onLogin={setUser} />;
  }

  const getMainContent = () => {
    switch (currentView) {
      case "home":
        return (
          <TweetList
            tweets={tweets}
            currentUser={user}
            onTweetSubmit={handleTweetSubmit}
            onLike={handleLike}
            onComment={handleComment}
            onUserClick={setCurrentProfile}
          />
        );
      case "notifications":
        return (
          <div className="p-4 text-center text-muted-foreground">
            Notifications feature coming soon!
          </div>
        );
      case "profile":
        const profileUser = users.find((u) => u.username === user.username);
        return (
          <UserProfile
            profileUser={profileUser}
            currentUser={user}
            tweets={tweets}
            onFollow={handleFollow}
            onLike={handleLike}
            onComment={handleComment}
            onBack={() => handleNavigate("home")}
            onUserClick={setCurrentProfile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider darkMode={darkMode}>
      <MainLayout
        user={user}
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode(!darkMode)}
        onLogout={() => {
          setUser(null);
          setCurrentProfile(null);
        }}
        currentView={currentView}
        onNavigate={handleNavigate}
      >
        {currentProfile && currentView !== "profile" ? (
          <UserProfile
            profileUser={users.find((u) => u.username === currentProfile)}
            currentUser={user}
            tweets={tweets}
            onFollow={handleFollow}
            onLike={handleLike}
            onComment={handleComment}
            onBack={() => setCurrentProfile(null)}
            onUserClick={setCurrentProfile}
          />
        ) : (
          getMainContent()
        )}
      </MainLayout>
    </ThemeProvider>
  );
}