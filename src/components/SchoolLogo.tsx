import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: number;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({ className = 'w-12 h-12', size = 48 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="drop-shadow-sm select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circular Rings */}
        <circle cx="50" cy="50" r="47" fill="#047857" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="42" fill="#064e3b" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />

        {/* Sunrise Rays */}
        <path d="M50 15 L50 25 M32 20 L38 27 M68 20 L62 27 M20 33 L29 36 M80 33 L71 36" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        {/* Half Sun */}
        <path d="M35 44 A15 15 0 0 1 65 44 Z" fill="#f59e0b" />

        {/* Open Book */}
        <path
          d="M50 48 Q35 42 22 47 L22 68 Q35 63 50 69 Q65 63 78 68 L78 47 Q65 42 50 48 Z"
          fill="#ffffff"
          stroke="#0f766e"
          strokeWidth="1.5"
        />
        {/* Book Spine */}
        <line x1="50" y1="48" x2="50" y2="69" stroke="#047857" strokeWidth="2" />
        {/* Book page lines */}
        <path d="M28 53 Q38 49 46 54 M28 59 Q38 55 46 60 M54 54 Q62 49 72 53 M54 60 Q62 55 72 59" stroke="#94a3b8" strokeWidth="1" />

        {/* Quill / Pen Nib */}
        <path d="M50 35 L53 43 L50 48 L47 43 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
        <circle cx="50" cy="41" r="0.8" fill="#064e3b" />

        {/* Water Lily / Shapla petals at base */}
        <path d="M42 78 C42 72 50 68 50 68 C50 68 58 72 58 78 C54 81 46 81 42 78 Z" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
        <path d="M36 80 C38 75 44 73 44 73 C44 73 43 78 39 81 Z" fill="#a7f3d0" />
        <path d="M64 80 C62 75 56 73 56 73 C56 73 57 78 61 81 Z" fill="#a7f3d0" />

        {/* Established Year text */}
        <text x="50" y="90" textAnchor="middle" fill="#fde68a" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
          স্থাপিত: ১৯৬৮
        </text>
      </svg>
    </div>
  );
};
