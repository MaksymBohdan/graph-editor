/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from 'react';
import { throttle, debounce } from 'throttle-debounce';
/* COMPONENTS */
import ConnectionLine from '../Connection/ConnectionLine';
import GraphTitle from './cmp/GraphTitle';
/* OTHERS*/
import { GraphListStyled, GraphItem } from './GraphListStyled';
import { GraphListContext } from '../../context/graphListContext';

let draggableId = null;
let offsetX = null;
let offsetY = null;

const GraphList = () => {
  const refList = useRef(null);
  const graphRef = useRef({});

  const { graphs, chooseGraph, currentGraph, moveGraph } = useContext(
    GraphListContext
  );

  useEffect(() => {
    // HANDLE DRAG START
    Object.values(graphRef.current).forEach((el) =>
      el.addEventListener('dragstart', onDrag)
    );

    // HANDLE DROP
    refList.current.addEventListener('dragover', (e) => e.preventDefault());
    refList.current.addEventListener('drop', onDrop);

    // HANDLE REMOVE LISTENERS
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
    <>
      <GraphListStyled onClick={chooseGraph} ref={refList}>
        {graphs.map((item) => (
          <GraphItem
            draggable="true"
            ref={(el) => (graphRef.current[item.id] = el)}
            key={item.id}
            isCurrent={item.id === currentGraph.id}
            data-id={item.id}
            top={item.top}
            left={item.left}
          >
            <GraphTitle name={item.name} />
          </GraphItem>
        ))}

        <ConnectionLine graphs={graphs} graphRef={graphRef} />
      </GraphListStyled>
    </>
  );
};

export default GraphList;
