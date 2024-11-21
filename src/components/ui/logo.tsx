// components/ui/logo.tsx
"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <svg
      viewBox="0 0 512 512"
      className={cn("shrink-0", className)}
      aria-label="Twxt Logo"
    >
      <circle
        cx="256"
        cy="256"
        r="256"
        className="fill-black dark:fill-white"
      />
      <g className="fill-white dark:fill-black">
        <path d="M 180 140 L 332 140 L 332 180 L 276 180 L 276 372 L 236 372 L 236 180 L 180 180 Z" />
        <path
          d="M 150 160 Q 120 200, 140 240 Q 160 280, 140 320 L 160 330 Q 180 290, 160 250 Q 140 210, 160 170 Z"
          className="opacity-80"
        />
        <path
          d="M 362 160 Q 392 200, 372 240 Q 352 280, 372 320 L 352 330 Q 332 290, 352 250 Q 372 210, 352 170 Z"
          className="opacity-80"
          transform="scale(-1, 1) translate(-512, 0)"
        />
      </g>
    </svg>
  );
};
