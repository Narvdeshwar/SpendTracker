import React from 'react';

interface ProgressRingProps {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ 
  percentage, 
  color, 
  size = 120, 
  strokeWidth = 10 
}) => {
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="text-black/5"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-ring-circle"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold data-value">{Math.round(percentage)}%</span>
        <span className="text-[10px] meta-label opacity-40">Spent</span>
      </div>
    </div>
  );
};
