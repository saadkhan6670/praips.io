import React, { Component } from 'react';
import Widget from './Widget/index'
import store from './store/widgetStore'


class App extends Component {
  render() {
    return (
    <Widget store={store}/>
    );
  }
}

export default App;
