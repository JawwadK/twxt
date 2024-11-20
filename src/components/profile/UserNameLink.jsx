import React from 'react';

export const UserNameLink = ({ username, displayName, onClick }) => {
  return (
    <div className="inline">
      <button 
        onClick={() => onClick(username)}
        className="hover:underline"
      >
        <span className="font-semibold">{displayName}</span>
        <span className="text-muted-foreground ml-1">@{username}</span>
      </button>
    </div>
  );
};