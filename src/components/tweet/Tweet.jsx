import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { LinkPreview } from './LinkPreview';
import { UserNameLink } from '@/components/profile/UserNameLink';

export const Tweet = ({ 
  tweet, 
  currentUser, 
  onLike, 
  onComment,
  onUserClick  // Add this new prop
}) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleComment = () => {
    if (!comment.trim()) return;
    onComment(tweet.id, comment);
    setComment('');
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          {/* Author Avatar - Make it clickable */}
          <button 
            onClick={() => onUserClick(tweet.authorUsername)}
            className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted"
          >
            {tweet.authorAvatar}
          </button>

          <div className="flex-1">
            {/* Author Info - Replace with UserNameLink */}
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

            {/* Rest of the component stays the same */}
            <p className="mt-1">{tweet.content}</p>
            
            {tweet.image && (
              <img 
                src={tweet.image} 
                alt="Tweet image" 
                className="mt-2 rounded-lg max-h-96 object-contain bg-secondary"
              />
            )}
            {tweet.url && <LinkPreview url={tweet.url} />}
            
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
                      {/* Make comment author avatar clickable */}
                      <button 
                        onClick={() => onUserClick(comment.authorUsername)}
                        className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm hover:bg-muted/80"
                      >
                        {comment.authorAvatar}
                      </button>
                      {/* Replace comment author name with UserNameLink */}
                      <UserNameLink
                        username={comment.authorUsername}
                        displayName={comment.authorDisplayName}
                        onClick={onUserClick}
                      />
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