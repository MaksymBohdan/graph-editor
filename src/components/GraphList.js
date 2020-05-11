import React, { useContext } from 'react';
import styled from 'styled-components';
import { GraphListContext } from '../context/graphListContext';

const GraphList = () => {
  const { graphs } = useContext(GraphListContext);

  return (
    <GraphListStyled>
      {graphs.map(({ name }) => (
        <GraphItem key={name}>{name}</GraphItem>
      ))}
    </GraphListStyled>
  );
};

const GraphListStyled = styled.ul`
  width: 100%;
  background-color: darkgray;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-grow: 0;
`;

const GraphItem = styled.li`
  width: 30px;
  height: 30px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid black;
  margin: 10px;
  line-height: 24px;
  background: white;
`;

export default GraphList;
