import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AboutComponent from './AboutComponent'
import FAQComponent from './FAQComponent'
import FAQInfo from './FAQInfo'
import MenuComponent from './MenuComponent'

class App extends Component {
  render() {
    return (

      <div id="wrapper">
        

        <BrowserRouter>
          <div>

          <MenuComponent/>

            <Switch>
              <Route exact path="/" component={FAQComponent} />
              <Route exact path="/faq" component={FAQComponent} />
              <Route path="/faq/:slugName" component={FAQInfo} />
            </Switch>
          </div>
        </BrowserRouter>

        <AboutComponent />
      </div>
    );
  }
}

export default App;
