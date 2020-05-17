import React from 'react';
import ReactDOM from 'react-dom';
/* COMPONENTS */
import App from './App';
/* OTHERS*/
import { GraphListProvider } from './context/graphListContext';
import './index.css';

ReactDOM.render(
  <GraphListProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GraphListProvider>,
  document.getElementById('root')
);
