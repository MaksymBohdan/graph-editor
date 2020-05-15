import React from 'react';
import ReactDOM from 'react-dom';
import { GraphListProvider } from './context/graphListContext';
import App from './components/App';
import './index.css';

ReactDOM.render(
  <GraphListProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GraphListProvider>,
  document.getElementById('root')
);
