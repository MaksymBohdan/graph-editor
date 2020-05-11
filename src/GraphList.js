import React from 'react';
import styled from 'styled-components';

const GraphList = () => {
  const list = [
    {
      name: 'Nick',
      edges: '',
    },
    {
      name: 'Tom',
      edges: '',
    },

    {
      name: 'Bob',
      edges: '',
    },
  ];

  return (
    <GraphListStyled>
      {list.map(({ name }) => (
        <GraphItem key={name}>{name}</GraphItem>
      ))}
    </GraphListStyled>
  );
};

const GraphListStyled = styled.ul`
  background-color: darkgray;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const GraphItem = styled.li`
  width: 30px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid black;
  margin: 10px;
`;

export default GraphList;
