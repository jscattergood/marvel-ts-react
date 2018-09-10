import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Page from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Page />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
