// components/tweet/TweetComposer.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon } from 'lucide-react';
import { ImagePreview } from './ImagePreview';
import { cn } from '@/lib/utils';

export const TweetComposer = ({ user, onTweetSubmit }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [url, setUrl] = useState('');
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 280;

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedImage && !url) return;
    if (charCount > MAX_CHARS) return;

    let imageData = null;
    if (selectedImage) {
      const reader = new FileReader();
      imageData = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(selectedImage);
      });
    }

    onTweetSubmit({
      content,
      image: imageData,
      url: url.trim() || null,
    });

    // Reset form
    setContent('');
    setSelectedImage(null);
    setUrl('');
    setCharCount(0);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-4">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            {user.avatar}
          </div>
          <div className="flex-1">
            <Input
              placeholder="What's happening?"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setCharCount(e.target.value.length);
              }}
              className="mb-3"
            />
            
            <div className="flex items-center gap-2 mb-3">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={handleImageSelect}
              />
              <label 
                htmlFor="image-upload" 
                className="cursor-pointer p-2 hover:bg-secondary rounded-full"
              >
                <ImageIcon size={20} className="text-blue-500" />
              </label>
              
              <Input
                placeholder="Add a link..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
            </div>
            
            {selectedImage && (
              <ImagePreview 
                file={selectedImage} 
                onRemove={() => setSelectedImage(null)} 
              />
            )}
            
            <div className="flex justify-between items-center">
              <Button onClick={handleSubmit} disabled={charCount > MAX_CHARS}>
                Post
              </Button>
              <span className={cn(
                "text-sm",
                charCount > MAX_CHARS ? "text-red-500" : "text-muted-foreground"
              )}>
                {charCount}/{MAX_CHARS}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};