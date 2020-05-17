import React from 'react';
import { Title } from '../GraphListStyled';

const GraphTitle = ({ name }) => {
  return (
    <Title>{name.length > 10 ? name.substring(1, 10) + '...' : name}</Title>
  );
};

export default GraphTitle;
