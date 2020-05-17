/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { GraphListContext } from './graphListContext';
import { DnDContext } from './dndContext';

const ConnectionsContext = createContext();

const ConnectionsProvider = ({ children }) => {
  const [connections, setConnection] = useState([]);
  const { graphs } = useContext(GraphListContext);
  const { graphRef } = useContext(DnDContext);

  const filteredGraphs = () =>
    graphs
      .filter(({ edge }) => edge)
      .map((el) => {
        const mainLocation = graphRef.current[el.id].getBoundingClientRect();
        const relatedLocation = graphRef.current[
          el.edge
        ].getBoundingClientRect();

        const posnALeft = {
          x: mainLocation.x + mainLocation.width / 2,
          y: mainLocation.y + mainLocation.height / 2,
        };
        const posnBLeft = {
          x: relatedLocation.x + relatedLocation.width / 2,
          y: relatedLocation.y + +relatedLocation.height / 2,
        };

        setConnection((prev) => [...prev, { posnALeft, posnBLeft }]);
      });

  useEffect(() => {
    filteredGraphs();
  }, [graphs.length]);

  return (
    <ConnectionsContext.Provider value={{ connections }}>
      {children}
    </ConnectionsContext.Provider>
  );
};

export { ConnectionsProvider, ConnectionsContext };
