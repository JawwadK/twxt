import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Link as LinkIcon, Calendar, ArrowLeft } from 'lucide-react';
import { Tweet } from '@/components/tweet/Tweet';

export const UserProfile = ({ 
  profileUser, 
  currentUser, 
  tweets, 
  onFollow,
  onLike,
  onComment,
  onBack,
  onUserClick
}) => {
  // Ensure followers and following arrays exist
  const followers = profileUser.followers || [];
  const following = profileUser.following || [];
  
  const isOwnProfile = currentUser.username === profileUser.username;
  const isFollowing = followers.includes(currentUser.username);
  
  const userTweets = tweets.filter(tweet => tweet.authorUsername === profileUser.username);
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">{profileUser.displayName}</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
            <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-4xl">
              {profileUser.avatar}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{profileUser.displayName}</h2>
                  <p className="text-muted-foreground">@{profileUser.username}</p>
                </div>
                
                {!isOwnProfile && (
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    onClick={() => onFollow(profileUser.username)}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                )}
              </div>

              {profileUser.bio && (
                <p className="mt-4">{profileUser.bio}</p>
              )}
              
              <div className="flex flex-wrap gap-4 mt-4 text-muted-foreground">
                {profileUser.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{profileUser.location}</span>
                  </div>
                )}
                
                {profileUser.website && (
                  <div className="flex items-center gap-1">
                    <LinkIcon size={16} />
                    <a 
                      href={profileUser.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {profileUser.website}
                    </a>
                  </div>
                )}
                
                {profileUser.joinedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>Joined {formatDate(profileUser.joinedAt)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 mt-4">
                <div>
                  <span className="font-bold">{following.length}</span>{' '}
                  <span className="text-muted-foreground">Following</span>
                </div>
                <div>
                  <span className="font-bold">{followers.length}</span>{' '}
                  <span className="text-muted-foreground">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{userTweets.length}</span>{' '}
                  <span className="text-muted-foreground">Tweets</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 mt-6">
        {userTweets.map(tweet => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            currentUser={currentUser}
            onLike={onLike}
            onComment={onComment}
            onUserClick={onUserClick}
          />
        ))}
        
        {userTweets.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No tweets yet
          </div>
        )}
      </div>
    </div>
  );
};