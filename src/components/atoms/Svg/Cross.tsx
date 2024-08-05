import React from 'react';

interface CrossIconProps {
  size?: number;
  color?: string;
}

const CrossSvg: React.FC<CrossIconProps> = ({ size = 28, color = 'white' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CrossSvg;
