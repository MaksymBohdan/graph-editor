import React, { useContext, useEffect, useState } from 'react';
import { GraphListContext } from '../../context/graphListContext';

import LineSvg from './LineSvg';

const ConnectionLine = () => {
  const { graphs } = useContext(GraphListContext);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const c = graphs
      .filter((el) => el.edge)
      .map((el) => {
        // const m = document.getElementById(el.id);
        const main = document.getElementById(el.id).style;
        const related = document.getElementById(el.edge).style;
        console.log('main', {
          top: Number.parseInt(main.top),
          left: Number.parseInt(main.left),
        });
        console.log('related', {
          top: Number.parseInt(related.top),
          left: Number.parseInt(related.left),
        });

        return {
          id: el.id,
          main: {
            top: Number.parseInt(main.top),
            left: Number.parseInt(main.left),
          },
          related: {
            top: Number.parseInt(related.top),
            left: Number.parseInt(related.left),
          },
        };
      });
    setConnections(c);
  }, [graphs]);

  return (
    <svg width="100%">
      {connections.map((el) => (
        <LineSvg key={el.id} main={el.main} related={el.related} />
      ))}
    </svg>
  );
};

export default ConnectionLine;

ConnectionLine.whyDidYouRender = true;
