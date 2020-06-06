import React, { createContext, useState, useRef } from 'react';
import { newId, getRandomLocation } from '../utils';

const GraphListContext = createContext();

const GraphListProvider = ({ children }) => {
  const [graphs, setGraph] = useState([]);
  const [currentGraph, setCurrentGraph] = useState({});
  const [arrows, setArrow] = useState([]);
  const refList = useRef(null);

  // ARROW
  const createNewArrow = (graph) => {
    const newArrow = {
      id: `arrow-${newId()}`,
      mainId: graph.id,
      relatedId: graph.edge,
    };

    setArrow((prev) => [...prev, newArrow]);
  };

  const deleteArrow = (idToDelete) => {
    setArrow((prevArrow) =>
      prevArrow.filter((arrow) => arrow.id !== idToDelete)
    );
  };

  const updateArrow = (arrowToUpdate, relatedId) => {
    setArrow((prevArrow) =>
      prevArrow.map((arrow) =>
        arrow.id === arrowToUpdate.id ? { ...arrowToUpdate, relatedId } : arrow
      )
    );
  };

  const manageArrow = (idGraph, data) => {
    const oldGraph = graphs.find(({ id }) => id === idGraph);

    // CHECK EXISTED ARROW
    const existredArrow = arrows.find(
      ({ mainId, relatedId }) =>
        mainId === oldGraph.id && relatedId === oldGraph.edge
    );

    // IF NOTHING TO UPDATE
    if (!existredArrow && !data.edge) return;

    if (existredArrow && data.edge) {
      updateArrow(existredArrow, data.edge);
      return;
    }

    if (existredArrow && !data.edge) {
      deleteArrow(existredArrow.id);
      return;
    }

    createNewArrow({ id: idGraph, edge: data.edge });
  };

  // GRAPHS
  const saveNewGraph = (data) => {
    const randomLocation = getRandomLocation(refList.current);
    const newGraph = { id: newId(), ...data, ...randomLocation };

    if (data.edge) {
      createNewArrow(newGraph);
    }

    setGraph((prevGraph) => [...prevGraph, newGraph]);
  };

  const updateGraph = (idGraph, data) => {
    setGraph((prevGraphs) =>
      prevGraphs.map((graph) =>
        graph.id === idGraph ? { ...graph, ...data } : graph
      )
    );
  };

  const editGraph = (idGraph, data) => {
    manageArrow(idGraph, data);
    updateGraph(idGraph, data);
  };

  const chooseGraph = (e) => {
    const graphId = e.currentTarget.id;

    if (!graphId && Object.keys(currentGraph).length === 0) return;

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
        refList,
        updateGraph,
      }}
    >
      {children}
    </GraphListContext.Provider>
  );
};

export { GraphListProvider, GraphListContext };
