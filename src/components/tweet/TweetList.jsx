// components/tweet/TweetList.jsx
import React from 'react';
import { Tweet } from './Tweet';
import { TweetComposer } from './TweetComposer';

export const TweetList = ({ 
  tweets, 
  currentUser,
  onTweetSubmit,
  onLike,
  onComment,
  onUserClick
}) => {
  return (
    <div>
      <TweetComposer user={currentUser} onTweetSubmit={onTweetSubmit} />
      
      <div className="space-y-4">
        {tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            currentUser={currentUser}
            onLike={onLike}
            onComment={onComment}
            onUserClick={onUserClick}
          />
        ))}
      </div>

      {tweets.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No tweets yet. Be the first to post something!
        </div>
      )}
    </div>
  );
};