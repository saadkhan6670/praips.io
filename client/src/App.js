import React, { Component } from 'react';
import './App.css';
// import '../src/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import AboutComponent from './AboutComponent'
import FAQComponent from './FAQComponent'
import FAQInfo from './FAQInfo'
import MenuComponent from './MenuComponent'

class App extends Component {
  render() {
    return (
      <div className="footer">
        <div id="wrapper">


          <BrowserRouter>
            <div>

              <MenuComponent />

              <Switch>
                <Route exact path="/" component={FAQComponent} />
                <Route exact path="/faq" component={FAQComponent} />
                <Route path="/faq/:slugName" component={FAQInfo} />
              </Switch>
            </div>
          </BrowserRouter>

          <AboutComponent />


        </div>
        <div className="container footer_text">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="text">
                <p>Are you an admin of this page? <a href=""> Login In</a></p>
              </div>
            </div>
          </div>


        </div>
      </div>

    );


  }


}

export default App;
