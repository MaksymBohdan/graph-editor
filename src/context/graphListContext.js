import React, { createContext, useState, useRef } from 'react';

const GraphListContext = createContext();

const GraphListProvider = ({ children }) => {
  const [graphs, setGraph] = useState([]);
  const [currentGraph, setCurrentGraph] = useState({});
  const graphRef = useRef({});

  const saveNewGraph = (data) => {
    const newGraph = { id: Date.now().toString(), ...data };
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

  // DND move graph
  const moveGraph = (id, location) => {
    setGraph((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...location } : el))
    );
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
        graphRef,
        moveGraph,
      }}
    >
      {children}
    </GraphListContext.Provider>
  );
};

export { GraphListProvider, GraphListContext };
