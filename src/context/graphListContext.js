import React, { createContext, useState } from 'react';

const defaultGraph = {
  name: 'Nick',
  edges: '',
  id: 1,
};

const GraphListContext = createContext();

const GraphListProvider = ({ children }) => {
  const [graphs, setGraph] = useState([defaultGraph]);

  const saveNewGraph = (name) => {
    const newGraph = { id: graphs.length + 1, name, edges: '' };
    setGraph((prevGraph) => [...prevGraph, newGraph]);
  };

  return (
    <GraphListContext.Provider
      value={{
        graphs,
        saveNewGraph,
      }}
    >
      {children}
    </GraphListContext.Provider>
  );
};

export { GraphListProvider, GraphListContext };
