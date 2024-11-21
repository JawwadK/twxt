// components/tweet/Tweet.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { UserNameLink } from '@/components/profile/UserNameLink';
import Image from 'next/image';

export const Tweet = ({ 
  tweet, 
  currentUser, 
  onLike, 
  onComment,
  onUserClick
}) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const makeLinksClickable = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    onComment(tweet.id, comment);
    setComment('');
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <button 
            onClick={() => onUserClick(tweet.authorUsername)}
            className="h-10 w-10 shrink-0 rounded-full bg-secondary flex items-center justify-center hover:bg-muted"
          >
            {tweet.authorAvatar}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <UserNameLink
                username={tweet.authorUsername}
                displayName={tweet.authorDisplayName}
                onClick={onUserClick}
              />
              <span className="text-muted-foreground text-sm">
                {new Date(tweet.timestamp).toLocaleDateString()}
              </span>
            </div>

            <p className="mt-1 break-words whitespace-pre-wrap">
              {makeLinksClickable(tweet.content)}
            </p>
{tweet.image && (
  <Image 
    src={tweet.image} 
    alt="Tweet image" 
    className="mt-2 rounded-lg max-h-96 object-contain bg-secondary"
    width={400}
    height={400}
  />
)}
            
            <div className="flex items-center gap-6 mt-4">
              <button 
                className="flex items-center gap-1 text-muted-foreground hover:text-red-500"
                onClick={() => onLike(tweet.id)}
              >
                <Heart 
                  className={tweet.likedBy.includes(currentUser.username) ? "fill-red-500 text-red-500" : ""} 
                  size={18} 
                />
                <span>{tweet.likedBy.length}</span>
              </button>
              
              <button 
                className="flex items-center gap-1 text-muted-foreground hover:text-blue-500"
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
                  <Button onClick={handleComment} size="sm">
                    <Send size={16} />
                  </Button>
                </div>
                
                {tweet.comments.map((comment, i) => (
                  <div key={i} className="p-2 bg-secondary rounded mb-2">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onUserClick(comment.authorUsername)}
                        className="h-6 w-6 shrink-0 rounded-full bg-muted flex items-center justify-center text-sm hover:bg-muted/80"
                      >
                        {comment.authorAvatar}
                      </button>
                      <UserNameLink
                        username={comment.authorUsername}
                        displayName={comment.authorDisplayName}
                        onClick={onUserClick}
                      />
                    </div>
                    <p className="ml-8 text-sm break-words whitespace-pre-wrap">
                      {makeLinksClickable(comment.content)}
                    </p>
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