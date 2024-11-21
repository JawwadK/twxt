// types/index.ts
export interface TweetComment {
  authorUsername: string;
  authorDisplayName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

export interface User {
  username: string;
  displayName: string;
  password: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar: string;
  followers: string[];
  following: string[];
  joinedAt: string;
}

export interface Tweet {
  id: number;
  authorUsername: string;
  authorDisplayName: string;
  authorAvatar: string;
  content?: string;
  image?: string;
  timestamp: string;
  likedBy: string[];
  comments: TweetComment[];
}

export interface TweetData {
  content?: string;
  image?: string;
}