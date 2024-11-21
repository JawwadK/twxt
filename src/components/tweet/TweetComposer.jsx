// components/tweet/TweetComposer.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image as ImageIcon, X } from 'lucide-react';
import { ImagePreview } from './ImagePreview';
import { cn } from '@/lib/utils';

export const TweetComposer = ({ user, onTweetSubmit }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 280;

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedImage) return;
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
    });

    // Reset form
    setContent('');
    setSelectedImage(null);
    setCharCount(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit();
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-4">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
            {user.avatar}
          </div>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setCharCount(e.target.value.length);
              }}
              onKeyDown={handleKeyDown}
              className="min-h-[100px] resize-none border-none bg-transparent p-0 focus-visible:ring-0"
            />
            
            {selectedImage && (
              <ImagePreview 
                file={selectedImage} 
                onRemove={() => setSelectedImage(null)} 
              />
            )}
            
            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={handleImageSelect}
                />
                <label 
                  htmlFor="image-upload" 
                  className="p-2 hover:bg-secondary rounded-full cursor-pointer transition-colors"
                >
                  <ImageIcon size={20} className="text-primary" />
                </label>
              </div>

              <div className="flex items-center gap-4">
                <span className={cn(
                  "text-sm",
                  charCount > MAX_CHARS ? "text-red-500" : "text-muted-foreground"
                )}>
                  {charCount}/{MAX_CHARS}
                </span>
                <Button 
                  onClick={handleSubmit} 
                  disabled={charCount > MAX_CHARS || (!content.trim() && !selectedImage)}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};