import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './stores/stores';


ReactDOM.render(
    <App store={store} />
, document.getElementById('root'));
registerServiceWorker();
