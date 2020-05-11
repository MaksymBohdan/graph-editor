import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GraphListContext } from '../context/graphListContext';

const GraphCreate = () => {
  const { saveNewGraph } = useContext(GraphListContext);
  const [graphName, setGraphName] = useState('');

  const onSave = () => {
    saveNewGraph(graphName);
    setGraphName('');
  };

  return (
    <CreateGraphCmp>
      New GRAPH
      <input
        type="text"
        name="newGraph"
        onChange={(e) => setGraphName(e.target.value)}
        value={graphName}
      />
      <button onClick={onSave}>Save</button>
    </CreateGraphCmp>
  );
};

const CreateGraphCmp = styled.div`
  display: flex;
  flex-direction: column;
`;

export default GraphCreate;
