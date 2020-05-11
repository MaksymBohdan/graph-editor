import React, { useState } from 'react';
import styled from 'styled-components';

const Layout = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Wrapper toggle={toggle}>
      <Header>
        <div />
        <span>Graph Creator</span>
        <AddButton onClick={() => setToggle(true)}>Add node</AddButton>
      </Header>
      <Main>
        {children}
        <Sidebar toggle={toggle}>
          <Close onClick={() => setToggle(false)}> &times;</Close>
          <p>someText</p>
        </Sidebar>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-right: ${(props) => (props.toggle ? '250px' : '0px')};
  transition: 0.5s;
  border: 1px solid black;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: white;
  position: relative;
`;

const Header = styled.div`
  padding: 40px 0;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled.button`
  margin-right: 15px;
`;

const Main = styled.div`
  flex-grow: 1;
  background: white;
  display: flex;
`;

const Sidebar = styled.div`
  width: ${(props) => (props.toggle ? '250px' : '0px')};
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #111;
  transition: 0.5s;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Close = styled.span`
  font-size: 34px;
  cursor: pointer;
  margin-left: auto;
  padding-right: 15px;
`;

export default Layout;
