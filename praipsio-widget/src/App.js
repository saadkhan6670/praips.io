import React, { Component } from 'react';
import Widget from './Widget/index'
import store from './store/widgetStore'


class App extends Component {
  render() {
    return (
      <div>
    <Widget store = {store}/>
      </div>
    );
  }
}

export default App;
