import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-right: ${(props) => (props.toggle ? '250px' : '0px')};
  transition: 0.5s;
  border: 1px solid black;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  position: relative;
`;

export const Header = styled.div`
  min-height: 100px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddButton = styled.button`
  margin-right: 15px;
  padding: 10px;
  width: 100px;
`;

export const Main = styled.div`
  flex-grow: 1;
  display: flex;
`;

export const Sidebar = styled.div`
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

export const Close = styled.span`
  font-size: 34px;
  cursor: pointer;
  margin-left: auto;
  padding-right: 15px;
`;
