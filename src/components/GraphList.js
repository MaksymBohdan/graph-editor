/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { GraphListContext } from '../context/graphListContext';
import ConnectionLine from './ConnectionLine';

let draggableId = null;
let offsetX = null;
let offsetY = null;

const GraphList = () => {
  const refList = useRef();

  const {
    graphs,
    handleCurrentGraph,
    resetCurrentGraph,
    currentGraph,
    graphRef,
    moveGraph,
  } = useContext(GraphListContext);

  /*
   * MANAGE GRAPH
   */
  const getCurrentGraph = (e) => {
    const id = e.target.dataset.id;

    if (!id && Object.keys(currentGraph).length === 0) return;

    if (!id) {
      resetCurrentGraph();
      return;
    }

    handleCurrentGraph(id);
  };

  /*
   * CONNECTION LOGIC
   */
  const [locations, setLocation] = useState([]);

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

        setLocation((prev) => [...prev, { posnALeft, posnBLeft }]);
      });

  useEffect(() => {
    filteredGraphs();
  }, [graphs.length]);

  /*
   * DND
   */

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
    draggableId = null;
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
      <GraphListStyled onClick={getCurrentGraph} ref={refList}>
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
            <GraphTitle>
              {item.name.length > 10
                ? item.name.substring(1, 10) + '...'
                : item.name}
            </GraphTitle>
          </GraphItem>
        ))}

        {/* <ConnectionLine locations={locations} graphs={graphs} /> */}
      </GraphListStyled>
    </>
  );
};

const GraphListStyled = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  position: absolute;
  top: 100px;
  bottom: 0px;
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  flex: 0, 0, 1;
`;

const GraphItem = styled.li`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;

  width: 100px;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkgray;

  border-radius: 50%;
  cursor: pointer;
  outline: ${({ isCurrent }) => (isCurrent ? '1px solid red' : 'none')};

  border: 1px solid black;
`;

const GraphTitle = styled.span``;

export default GraphList;
