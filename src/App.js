import React, { useState } from 'react';
/* COMPONENTS */
import GraphCreate from './components/Create/GraphCreate';
import GraphList from './components/List/GraphList';
/* OTHERS*/
import { Wrapper, Header, AddButton, Main, Sidebar, Close } from './AppStyled';

const App = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <Wrapper toggle={toggle}>
      <Header>
        <div />
        <span>Graph Creator</span>
        <AddButton onClick={() => setToggle(true)}>Add node</AddButton>
      </Header>
      <Main>
        <GraphList />
        <Sidebar toggle={toggle}>
          <Close onClick={() => setToggle(false)}> &times;</Close>
          <GraphCreate />
        </Sidebar>
      </Main>
    </Wrapper>
  );
};

export default App;
