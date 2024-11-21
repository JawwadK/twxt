"use client";

import type { User, Tweet, TweetComment, TweetData } from "../types";
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { TweetList } from "@/components/tweet/TweetList";
import { UserProfile } from "@/components/profile/UserProfile";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ThemeProvider from "@/components/ThemeProvider";

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [user, setUser] = useLocalStorage<User | null>("currentUser", null);
  const [tweets, setTweets] = useLocalStorage<Tweet[]>("tweets", []);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);
  const [users, setUsers] = useLocalStorage<User[]>("users", []);
  const [currentProfile, setCurrentProfile] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<
    "home" | "notifications" | "profile"
  >("home");

  useEffect(() => {
    const existingUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    ) as User[];
    const updatedUsers = existingUsers.map((user: User) => ({
      ...user,
      followers: user.followers || [],
      following: user.following || [],
      joinedAt: user.joinedAt || new Date().toISOString(),
    }));
    setUsers(updatedUsers);

    if (user && (!user.followers || !user.following)) {
      const updatedUser = updatedUsers.find(
        (u: User) => u.username === user.username
      );
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  }, [setUser, setUsers, user]); // Added missing dependencies

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleTweetSubmit = (tweetData: TweetData) => {
    const newTweet: Tweet = {
      id: Date.now(),
      authorUsername: user!.username,
      authorDisplayName: user!.displayName,
      authorAvatar: user!.avatar,
      timestamp: new Date().toISOString(),
      likedBy: [],
      comments: [],
      ...tweetData,
    };
    setTweets([newTweet, ...tweets]);
  };

  const handleLike = (tweetId: number) => {
    setTweets(
      tweets.map((tweet: Tweet) => {
        if (tweet.id === tweetId) {
          const likedIndex = tweet.likedBy.indexOf(user!.username);
          return {
            ...tweet,
            likedBy:
              likedIndex === -1
                ? [...tweet.likedBy, user!.username]
                : tweet.likedBy.filter((_, i: number) => i !== likedIndex),
          };
        }
        return tweet;
      })
    );
  };

  const handleComment = (tweetId: number, content: string) => {
    if (!content.trim()) return;
    setTweets(
      tweets.map((tweet: Tweet) => {
        if (tweet.id === tweetId) {
          const newComment: TweetComment = {
            authorUsername: user!.username,
            authorDisplayName: user!.displayName,
            authorAvatar: user!.avatar,
            content,
            timestamp: new Date().toISOString(),
          };

          return {
            ...tweet,
            comments: [...tweet.comments, newComment],
          };
        }
        return tweet;
      })
    );
  };

  const handleFollow = (usernameToFollow: string) => {
    const updatedUsers = users.map((u: User) => {
      if (u.username === usernameToFollow) {
        return {
          ...u,
          followers: u.followers.includes(user!.username)
            ? u.followers.filter((f: string) => f !== user!.username)
            : [...u.followers, user!.username],
        };
      }
      if (u.username === user!.username) {
        return {
          ...u,
          following: u.following.includes(usernameToFollow)
            ? u.following.filter((f: string) => f !== usernameToFollow)
            : [...u.following, usernameToFollow],
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    const updatedUser = updatedUsers.find(
      (u: User) => u.username === user!.username
    );
    setUser(updatedUser || null);
  };

  const handleNavigate = (view: "home" | "notifications" | "profile") => {
    if (view === "profile") {
      setCurrentProfile(user!.username);
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
        const profileUser = users.find(
          (u: User) => u.username === user.username
        );
        return profileUser ? (
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
        ) : null;
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
            profileUser={users.find((u: User) => u.username === currentProfile)}
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
