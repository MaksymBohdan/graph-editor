import React, { useState } from 'react';

const defaultPerson = {
  name: 'Nick',
  edges: '',
};

const GraphCreate = () => {
  const [people, setPeople] = useState([defaultPerson]);

  return (
    <div>
      <input
        type="text"
        name="newGraph"
        onChange={(e) => {
          setPeople({ name: e.target.value, edges: '' });
        }}
      />
    </div>
  );
};

export default GraphCreate;
