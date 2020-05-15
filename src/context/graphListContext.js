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
      }}
    >
      {children}
    </GraphListContext.Provider>
  );
};

export { GraphListProvider, GraphListContext };

// const defaultGraph = [
//   {
//     name: 'Nick',
//     edge: '',
//     id: '1',
//   },
//   {
//     name: 'Tom',
//     edge: '1',
//     id: '2',
//   },
// ];
