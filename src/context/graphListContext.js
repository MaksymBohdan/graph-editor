import React, { createContext, useState } from 'react';

const defaultGraph = [
  {
    name: 'Nick',
    edge: [],
    id: 1,
  },
  {
    name: 'Tom',
    edge: [1],
    id: 2,
  },
];

const GraphListContext = createContext();

const GraphListProvider = ({ children }) => {
  const [graphs, setGraph] = useState(defaultGraph);
  const [currentGraph, setCurrentGraph] = useState({});

  const saveNewGraph = (data) => {
    const newGraph = { id: graphs.length + 1, ...data };
    setGraph((prevGraph) => [...prevGraph, newGraph]);
  };

  const editGraph = (idGraph, data) => {
    const editedGraphs = graphs.map((graph) =>
      graph.id === idGraph ? { ...graph, ...data } : graph
    );

    setGraph(editedGraphs);
  };

  const handleCurrentGraph = (graphId) => {
    const current = graphs.find(({ id }) => id === graphId);

    setCurrentGraph(current);
  };

  const resetCurrentGraph = () => {
    setCurrentGraph({});
  };

  return (
    <GraphListContext.Provider
      value={{
        graphs,
        saveNewGraph,
        handleCurrentGraph,
        resetCurrentGraph,
        currentGraph,
        editGraph,
      }}
    >
      {children}
    </GraphListContext.Provider>
  );
};

export { GraphListProvider, GraphListContext };
