import React, { createContext, useState } from 'react';

const GraphListContext = createContext();

const GraphListProvider = ({ children }) => {
  const [graphs, setGraph] = useState([]);
  const [currentGraph, setCurrentGraph] = useState({});
  const [arrows, setArrow] = useState([]);

  const createNewArrow = (graph) => {
    const newArrow = {
      id: `arrow-${Date.now().toString()}`,
      mainId: graph.id,
      relatedId: graph.edge,
    };

    setArrow((prev) => [...prev, newArrow]);
  };

  const saveNewGraph = (data) => {
    const newGraph = { id: Date.now().toString(), ...data };

    if (data.edge) {
      createNewArrow(newGraph);
    }

    setGraph((prevGraph) => [...prevGraph, newGraph]);
  };

  const editGraph = (idGraph, data) => {
    const editedGraphs = graphs.map((graph) =>
      graph.id === idGraph ? { ...graph, ...data } : graph
    );

    setGraph(editedGraphs);
  };

  const chooseGraph = (e) => {
    const graphId = e.target.dataset.id;

    if (!graphId && Object.keys(currentGraph).length === 0) return;

    if (!graphId) {
      setCurrentGraph({});
      return;
    }

    const current = graphs.find(({ id }) => id === graphId);

    setCurrentGraph(current);
  };

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
        chooseGraph,
        currentGraph,
        editGraph,
        arrows,
      }}
    >
      {children}
    </GraphListContext.Provider>
  );
};

export { GraphListProvider, GraphListContext };
