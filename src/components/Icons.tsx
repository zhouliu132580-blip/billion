import React from 'react';

export const SproutIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7 20h10" />
    <path d="M10 20c0-3.5 0-7 0-7s-2-1-3-3 1-4 3-4 3 2 3 4-1 3-3 3" />
    <path d="M14 20c0-2.5 0-5 0-5s2-1 3-3-1-4-3-4-3 2-3 4 1 3 3 3" />
  </svg>
);

export const LeafIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a10 10 0 0 1-10 10Z" />
    <path d="M11 20c0-4.5 7-8 8-10" />
  </svg>
);

export const CrownIcon = ({ className, color = "currentColor" }: { className?: string, color?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill={color} 
    stroke="none" 
    className={className}
  >
    <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z" />
    <rect x="5" y="18" width="14" height="2" />
  </svg>
);
