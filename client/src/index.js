import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import axios from 'axios'

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './stores/stores';
import NetworkError from './NetworkError'

async function checkKey() {
    await axios.get(`${process.env.apiURL}/api/LogKeyAuth?LogKey=${store.LoginKey}`).then((response) => {

        store.redirect = response.data


        ReactDOM.render(
            <App store={store} />
            , document.getElementById('root'));

    }).catch((error) => {
     
        ReactDOM.render(
            <NetworkError />
            , document.getElementById('root'));
    })
}
checkKey()

registerServiceWorker();
