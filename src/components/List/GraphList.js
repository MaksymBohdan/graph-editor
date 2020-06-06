import React, { useContext } from 'react';
/* COMPONENTS */
import ConnectionLine from '../Connection/ConnectionLine';
import GraphTitle from './cmp/GraphTitle';
/* OTHERS*/
import { GraphListStyled, GraphItem } from './GraphListStyled';
import { GraphListContext } from '../../context/graphListContext';
import {
  getBordersOfElement,
  generateGraphPosition,
  generateArrowPosition,
} from '../../utils';

const GraphList = () => {
  const {
    graphs,
    chooseGraph,
    currentGraph,
    arrows,
    refList,
    updateGraph,
  } = useContext(GraphListContext);

  const handleDrag = (event) => {
    event.preventDefault();
    const graph = event.currentTarget;

    // ARROWS TO MOVE
    const arrowMainToMove = arrows
      .filter(({ mainId }) => mainId === graph.id)
      .map((el) => document.getElementById(el.id));

    const arrowHeadToMove = arrows
      .filter(({ relatedId }) => relatedId === graph.id)
      .map((el) => document.getElementById(el.id));

    // GRAPH SIZE
    const graphWidth = graph.offsetWidth;
    const graphHeight = graph.offsetHeight;

    // POSITION OF CURRENT CLICK
    const clickY = event.clientY - graph.getBoundingClientRect().top;
    const clickX = event.clientX - graph.getBoundingClientRect().left;

    // BORDERS OF PARRENT ELEMENT
    const parrentBorder = getBordersOfElement(refList.current);

    const onMouseMove = (event) => {
      // CURRENT TOP/LEFT GRAPH POSITION
      const topGraph = event.pageY - clickY;
      const leftGraph = event.pageX - clickX;

      // GENERATE GRAPH POSITION PARAMS
      const graphData = {
        topGraph,
        leftGraph,
        graphWidth,
        graphHeight,
        parrentBorder,
      };

      // NEW GRAPH POSITION
      const { newTopGraph, newLeftGraph } = generateGraphPosition(graphData);

      // MOVING GRAPH
      graph.style.top = newTopGraph + 'px';
      graph.style.left = newLeftGraph + 'px';

      // MOVING ARROW
      if (arrowMainToMove.length) {
        arrowMainToMove.map((arrow) => {
          const {
            newTopArrowPosition,
            newLeftArrowPostiton,
          } = generateArrowPosition(graphData);

          arrow.setAttribute('y1', newTopArrowPosition);
          arrow.setAttribute('x1', newLeftArrowPostiton);
        });
      }

      if (arrowHeadToMove.length) {
        arrowHeadToMove.map((arrow) => {
          const {
            newTopArrowPosition,
            newLeftArrowPostiton,
          } = generateArrowPosition(graphData);

          arrow.setAttribute('y2', newTopArrowPosition);
          arrow.setAttribute('x2', newLeftArrowPostiton);
        });
      }
    };

    // TO MOVE A GRAPH
    document.addEventListener('mousemove', onMouseMove);

    // TO STOP MOVING A GRAPH
    document.onmouseup = function () {
      // //SAVE UPDATED LOCATION
      updateGraph(graph.id, {
        top: Number.parseFloat(graph.style.top),
        left: Number.parseFloat(graph.style.left),
      });

      document.removeEventListener('mousemove', onMouseMove);
    };
  };

  return (
    <GraphListStyled onClick={chooseGraph} ref={refList}>
      {graphs.map((item) => (
        <GraphItem
          key={item.id}
          onDragStart={() => false}
          onMouseDown={handleDrag}
          isCurrent={item.id === currentGraph.id}
          style={{ top: item.top, left: item.left }}
          id={item.id}
        >
          <GraphTitle name={item.name} />
        </GraphItem>
      ))}

      <ConnectionLine />
    </GraphListStyled>
  );
};

export default GraphList;
