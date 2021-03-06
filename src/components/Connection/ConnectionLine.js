import React, { useContext, useEffect, useState } from 'react';
// COMPONENTS
import LineSvg from './LineSvg';
// OTHERS
import { GraphListContext } from '../../context/graphListContext';

const ConnectionLine = () => {
  const { arrows, graphs } = useContext(GraphListContext);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const arrow = arrows.map(({ id, mainId, relatedId }) => {
      const main = document.getElementById(mainId).style;
      const related = document.getElementById(relatedId).style;

      return {
        id: id,
        main: {
          top: Number.parseInt(main.top) + 50,
          left: Number.parseInt(main.left) + 50,
        },
        related: {
          top: Number.parseInt(related.top) + 50,
          left: Number.parseInt(related.left) + 50,
        },
      };
    });
    setConnections(arrow);
  }, [graphs]);

  return (
    <svg width="100%">
      {connections.map((el) => (
        <LineSvg key={el.id} main={el.main} related={el.related} id={el.id} />
      ))}
    </svg>
  );
};

export default ConnectionLine;

ConnectionLine.whyDidYouRender = true;
