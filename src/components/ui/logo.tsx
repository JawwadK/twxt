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
      {/* Background circle */}
      <circle
        cx="256"
        cy="256"
        r="256"
        className="fill-black dark:fill-white"
      />

      {/* Rounded T */}
      <g className="fill-white dark:fill-black">
        {/* Horizontal bar of T with rounded ends */}
        <path
          d="
          M 140 160 
          A 20 20 0 0 1 160 140 
          L 352 140 
          A 20 20 0 0 1 372 160
          L 372 200
          A 20 20 0 0 1 352 220
          L 276 220 
          L 276 352
          A 20 20 0 0 1 256 372
          L 236 372
          A 20 20 0 0 1 216 352
          L 216 220
          L 160 220
          A 20 20 0 0 1 140 200
          Z"
        />
      </g>
    </svg>
  );
};
