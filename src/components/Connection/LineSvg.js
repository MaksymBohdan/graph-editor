import React from 'react';

const LineSvg = ({ main, related }) => {
  return (
    <>
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="20"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
        </marker>
      </defs>
      <line
        x1={main.x}
        y1={main.y - 100}
        x2={related.x}
        y2={related.y - 100}
        stroke="#000"
        strokeWidth="4"
        markerEnd="url(#arrow)"
      />
    </>
  );
};

export default LineSvg;
