import styled from 'styled-components';

export const GraphListStyled = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  position: absolute;
  top: 100px;
  bottom: 0px;
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  flex: 0, 0, 1;
`;

export const GraphItem = styled.li`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;

  width: 100px;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkgray;

  border-radius: 50%;
  cursor: pointer;
  outline: ${({ isCurrent }) => (isCurrent ? '1px solid red' : 'none')};

  border: 1px solid black;
`;

export const Title = styled.span``;
