import React from 'react';

const LineSvg = ({ main, related, id }) => {
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
        id={id}
        x1={main.left}
        y1={main.top}
        x2={related.left}
        y2={related.top}
        stroke="#000"
        strokeWidth="4"
        markerEnd="url(#arrow)"
      />
    </>
  );
};

export default LineSvg;
