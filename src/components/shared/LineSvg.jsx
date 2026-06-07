import React from "react";

export default function LineSvg({ colorOne, colorTwo, svgId, svgWidth = "200", svgHeight = "50", strokeWidth = "8" }) {
  return (
    <div className="flex justify-center">
      <svg width={svgWidth} height={svgHeight} viewBox="0 0 320 60" fill="none">
        <path
          d="M10 40 Q160 5 310 50"
          // stroke={`url(${svgId})`}
          stroke={`url(#${svgId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <defs>
          <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id={svgId}>
            <stop offset="0%" stopColor={colorOne} />
            <stop offset="100%" stopColor={colorTwo} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
