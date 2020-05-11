import React, { useContext } from 'react';
import styled from 'styled-components';
import { GraphListContext } from '../context/graphListContext';

const GraphList = () => {
  const {
    graphs,
    handleCurrentGraph,
    resetCurrentGraph,
    currentGraph,
  } = useContext(GraphListContext);

  const getCurrentGraph = (e) => {
    const id = e.target.dataset.id;

    if (id) {
      handleCurrentGraph(+id);
      return;
    }

    resetCurrentGraph();
  };

  return (
    <GraphListStyled onClick={getCurrentGraph}>
      {graphs.map(({ name, id }) => (
        <GraphItem key={id} data-id={id} isCurrent={id === currentGraph.id}>
          {name.length > 10 ? name.substring(1, 10) + '...' : name}
        </GraphItem>
      ))}
    </GraphListStyled>
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
  background-color: darkgray;
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
`;

export default GraphList;
