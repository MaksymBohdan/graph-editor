/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';

const ConnectionLine = ({ connections, graphs }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    return () => {
      while (svgRef.current.lastElementChild) {
        svgRef.current.removeChild(svgRef.current.lastElementChild);
      }
    };
  }, [graphs.length]);

  return (
    <svg width="100%" ref={svgRef}>
      {connections.map(({ posnALeft, posnBLeft }, idx) => (
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
            x1={posnALeft.x}
            y1={posnALeft.y - 100}
            x2={posnBLeft.x}
            y2={posnBLeft.y - 100}
            stroke="#000"
            strokeWidth="4"
            markerEnd="url(#arrow)"
          />
        </>
      ))}
    </svg>
  );
};

export default ConnectionLine;
