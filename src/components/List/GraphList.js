import React, { useContext, useRef } from 'react';
/* COMPONENTS */
import ConnectionLine from '../Connection/ConnectionLine';
import GraphTitle from './cmp/GraphTitle';
/* OTHERS*/
import { GraphListStyled, GraphItem } from './GraphListStyled';
import { GraphListContext } from '../../context/graphListContext';

const GraphList = () => {
  const refList = useRef(null);
  const refSvg = useRef(null);

  const { graphs, chooseGraph, currentGraph, arrows } = useContext(
    GraphListContext
  );

  const handleDrag = (event) => {
    event.preventDefault();
    // GRAPHS
    const graph = event.currentTarget;
    // const graphId = event.currentTarget.id;

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
    const topParrent = refList.current.getBoundingClientRect().top;
    const leftParrent = refList.current.getBoundingClientRect().left;
    const rightParrent = refList.current.getBoundingClientRect().right;
    const bottomParrent = refList.current.getBoundingClientRect().bottom;

    const onMouseMove = (event) => {
      // CURRENT TOP/LEFT GRAPH POSITION
      const topGraph = event.pageY - clickY;
      const leftGraph = event.pageX - clickX;

      // NEW GRAPH POSITION
      let newTopGraph = topGraph - topParrent + 'px';
      let newLeftGraph = leftGraph + 'px';

      // TOP
      if (topParrent > topGraph) {
        newTopGraph = topParrent - 100 + 'px';
      }
      // LEFT
      if (leftParrent > leftGraph) {
        newLeftGraph = leftParrent + 'px';
      }
      // RIGHT
      if (rightParrent < leftGraph + graphWidth) {
        newLeftGraph = rightParrent - graphWidth + 'px';
      }
      // BOTTOM
      if (bottomParrent < topGraph + graphHeight) {
        newTopGraph = bottomParrent - topParrent - graphHeight + 'px';
      }

      // MOVING ARROW
      if (arrowMainToMove.length) {
        arrowMainToMove.map((arrow) => {
          arrow.setAttribute('y1', topGraph - topParrent + 50);
          arrow.setAttribute('x1', leftGraph + 50);
        });
      }

      if (arrowHeadToMove.length) {
        arrowHeadToMove.map((arrow) => {
          arrow.setAttribute('y2', topGraph - topParrent + 50);
          arrow.setAttribute('x2', leftGraph + 50);
        });
      }

      // MOVING GRAPH
      graph.style.top = newTopGraph;
      graph.style.left = newLeftGraph;
    };

    // TO MOVE A GRAPH
    document.addEventListener('mousemove', onMouseMove);

    // TO STOP MOVING A GRAPH
    document.onmouseup = function () {
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
          top={item.top}
          left={item.left}
        >
          <GraphTitle name={item.name} />
        </GraphItem>
      ))}

      <ConnectionLine refSvg={refSvg} />
    </GraphListStyled>
  );
};

export default GraphList;
