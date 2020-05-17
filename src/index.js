import React from 'react';
import ReactDOM from 'react-dom';
/* COMPONENTS */
import App from './App';
/* OTHERS*/
import { GraphListProvider } from './context/graphListContext';
import { ConnectionsProvider } from './context/connectionsContext';
import { DnDContextProvider } from './context/dndContext';
import './index.css';

ReactDOM.render(
  <GraphListProvider>
    <DnDContextProvider>
      <ConnectionsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ConnectionsProvider>
    </DnDContextProvider>
  </GraphListProvider>,
  document.getElementById('root')
);
