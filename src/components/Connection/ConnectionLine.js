/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import LineSvg from './LineSvg';

const ConnectionLine = ({ graphs, graphRef }) => {
  const [connections, setConnections] = useState([]);

  /**
   * GET CONNECTIONS LIST
   */
  const filteredGraphs = () => {
    const filteredConnections = graphs
      .filter(({ edge }) => edge)
      .map((el) => {
        const mainLocation = graphRef.current[el.id].getBoundingClientRect();
        const relatedLocation = graphRef.current[
          el.edge
        ].getBoundingClientRect();

        const main = {
          x: mainLocation.x + mainLocation.width / 2,
          y: mainLocation.y + mainLocation.height / 2,
        };
        const related = {
          x: relatedLocation.x + relatedLocation.width / 2,
          y: relatedLocation.y + +relatedLocation.height / 2,
        };

        return { main, related, id: el.id };
      });
    setConnections(filteredConnections);
  };

  useEffect(() => {
    filteredGraphs();
  }, [graphs]);

  return (
    <svg width="100%">
      {connections.map(({ main, related, id }) => (
        <LineSvg key={id} main={main} related={related} />
      ))}
    </svg>
  );
};

export default React.memo(ConnectionLine);
