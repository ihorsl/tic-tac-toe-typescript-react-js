/**
 *  The "Tic-Tac-Toe" game, created with TypeScript/React.js
 *
 *  The author's homepage: https://ihorsl.com
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import AppTicTacToe from './AppTicTacToe';

const root = ReactDOM.createRoot(
  document.getElementById('tic-tac-toe-app') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppTicTacToe />
  </React.StrictMode>
);
