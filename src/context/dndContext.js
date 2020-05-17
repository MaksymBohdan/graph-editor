/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useRef, useContext } from 'react';
import { GraphListContext } from './graphListContext';

const DnDContext = createContext();

let draggableId = null;
let offsetX = null;
let offsetY = null;

const DnDContextProvider = ({ children }) => {
  const refList = useRef(null);
  const graphRef = useRef({});

  const { graphs, moveGraph } = useContext(GraphListContext);

  useEffect(() => {
    Object.values(graphRef.current).forEach((el) =>
      el.addEventListener('dragstart', onDrag)
    );

    refList.current.addEventListener('dragover', (e) => e.preventDefault());
    refList.current.addEventListener('drop', onDrop);

    return () => {
      Object.values(graphRef.current).forEach((el) =>
        el.removeEventListener('dragstart', onDrag)
      );

      refList.current.removeEventListener('dragover', (e) =>
        e.preventDefault()
      );
      refList.current.removeEventListener('drop', onDrop);
    };
  }, [graphs.length]);

  const onDrag = (e) => {
    const id = e.currentTarget.dataset.id;

    offsetX = e.offsetX;
    offsetY = e.offsetY;
    draggableId = id;
  };

  const onDrop = (e) => {
    moveGraph(draggableId, {
      left: e.pageX - offsetX,
      top: e.pageY - offsetY - 100,
    });

    draggableId = null;
    offsetX = null;
    offsetY = null;
  };
  return (
    <DnDContext.Provider value={{ refList, graphRef }}>
      {children}
    </DnDContext.Provider>
  );
};

export { DnDContextProvider, DnDContext };
