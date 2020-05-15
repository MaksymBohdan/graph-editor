/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GraphListContext } from '../context/graphListContext';
import ConnectionLine from './ConnectionLine';

const GraphList = () => {
  const {
    graphs,
    handleCurrentGraph,
    resetCurrentGraph,
    currentGraph,
    graphRef,
  } = useContext(GraphListContext);

  const getCurrentGraph = (e) => {
    const id = e.target.dataset.id;

    if (!id && Object.keys(currentGraph).length === 0) return;

    if (!id) {
      resetCurrentGraph();
      return;
    }

    handleCurrentGraph(id);
  };

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

  return (
    <>
      <GraphListStyled onClick={getCurrentGraph}>
        {graphs.map((item) => (
          <GraphItem
            ref={(el) => (graphRef.current[item.id] = el)}
            key={item.id}
            data-id={item.id}
            isCurrent={item.id === currentGraph.id}
          >
            {item.name.length > 10
              ? item.name.substring(1, 10) + '...'
              : item.name}
          </GraphItem>
        ))}

        <ConnectionLine locations={locations} graphs={graphs} />
      </GraphListStyled>
    </>
  );
};

const GraphListStyled = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  ${'' /* background-color: darkgray; */}
  flex-wrap: wrap;
  flex: 0, 0, 1;
`;

const GraphItem = styled.li`
  min-width: 100px;
  min-height: 100px;
  margin: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  outline: ${({ isCurrent }) => (isCurrent ? '1px solid red' : 'none')};
  border: 1px solid black;
`;

export default GraphList;
