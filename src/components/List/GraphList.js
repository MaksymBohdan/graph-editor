/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
/* COMPONENTS */
import ConnectionLine from '../Connection/ConnectionLine';
/* OTHERS*/
import { GraphListStyled, GraphItem, GraphTitle } from './GraphListStyled';
import { GraphListContext } from '../../context/graphListContext';
import { ConnectionsContext } from '../../context/connectionsContext';
import { DnDContext } from '../../context/dndContext';

const GraphList = () => {
  const { connections } = useContext(ConnectionsContext);
  const { graphs, chooseGraph, currentGraph } = useContext(GraphListContext);
  const { refList, graphRef } = useContext(DnDContext);

  return (
    <>
      <GraphListStyled onClick={chooseGraph} ref={refList}>
        {graphs.map((item) => (
          <GraphItem
            draggable="true"
            ref={(el) => (graphRef.current[item.id] = el)}
            key={item.id}
            isCurrent={item.id === currentGraph.id}
            data-id={item.id}
            top={item.top}
            left={item.left}
          >
            <GraphTitle>
              {item.name.length > 10
                ? item.name.substring(1, 10) + '...'
                : item.name}
            </GraphTitle>
          </GraphItem>
        ))}

        <ConnectionLine connections={connections} graphs={graphs} />
      </GraphListStyled>
    </>
  );
};

export default GraphList;
