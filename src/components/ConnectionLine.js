/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ConnectionLine = ({ locations, graphs }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    return () => {
      while (svgRef.current.lastElementChild) {
        svgRef.current.removeChild(svgRef.current.lastElementChild);
      }
    };
  }, [graphs.length]);

  return (
    <SvgCmp>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        ref={svgRef}
      >
        {locations.map(({ posnALeft, posnBLeft }) => (
          <>
            <defs>
              <marker
                id="arrowhead"
                viewBox="0 0 10 10"
                refX="3"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M2,2 L2,11 L10,6 L2,2" />
              </marker>
            </defs>
            <g
              fill="none"
              stroke="black"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            >
              <line
                x1={posnALeft.x}
                y1={posnALeft.y}
                x2={posnBLeft.x}
                y2={posnBLeft.y}
                stroke="red"
              />
            </g>
          </>
        ))}
      </svg>
    </SvgCmp>
  );
};

const SvgCmp = styled.div`
  position: absolute;
  width: 80%;
  height: 100%;
  top: 0px !important;
  left: 0px;
`;

export default ConnectionLine;
