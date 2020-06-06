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

  const editArrow = (idGraph, data) => {
    // FINF OLD GRAPH
    const oldGraph = graphs.find(({ id }) => id === idGraph);

    // CHECK EXISTED ARROW
    const existredArrow = arrows.find(
      ({ mainId, relatedId }) =>
        mainId === oldGraph.id && relatedId === oldGraph.edge
    );

    // IF NOTHING TO UPDATE
    if (!existredArrow && !data.edge) return;

    // UPDATE EXISTED ARROW
    if (existredArrow && data.edge) {
      setArrow((prevArrow) =>
        prevArrow.map((arrow) =>
          arrow.id === existredArrow.id
            ? { ...existredArrow, relatedId: data.edge }
            : arrow
        )
      );

      return;
    }

    // REMOVE ARROW
    if (existredArrow && !data.edge) {
      setArrow((prevArrow) =>
        prevArrow.filter((arrow) => arrow.id !== existredArrow.id)
      );
      return;
    }

    // ADD NEW ARROW
    setArrow((prev) => [
      ...prev,
      {
        id: `arrow-${Date.now().toString()}`,
        mainId: idGraph,
        relatedId: data.edge,
      },
    ]);
  };

  const saveNewGraph = (data) => {
    const newGraph = { id: Date.now().toString(), ...data };

    if (data.edge) {
      createNewArrow(newGraph);
    }

    setGraph((prevGraph) => [...prevGraph, newGraph]);
  };

  const editGraph = (idGraph, data) => {
    editArrow(idGraph, data);

    const editedGraphs = graphs.map((graph) =>
      graph.id === idGraph ? { ...graph, ...data } : graph
    );

    setGraph(editedGraphs);
  };

  const chooseGraph = (e) => {
    const graphId = e.target.id;

    if (!graphId && Object.keys(currentGraph).length === 0) return;
    console.log('chooseGraph', graphId);

    if (!graphId) {
      setCurrentGraph({});
      return;
    }

    const current = graphs.find(({ id }) => id === graphId);

    setCurrentGraph(current);
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
