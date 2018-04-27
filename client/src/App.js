import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Async from 'react-code-splitting';

const FAQComponent = () => <Async load={import('./FAQComponent')} />;
const FAQInfo = () => <Async load={import('./FAQInfo')} />;



class App extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div class="row">

            <div style={{ backgroundColor: "white", marginRight: "1%" }} className="col-md-1">
            
            <a href="/faq-component" > faq cop </a> <br/>
            <a href="/faq-info" > faq Info </a>
            
            </div>

            <div style={{ backgroundColor: "white", marginRight: "1%" }} className="col-md-6">

              <BrowserRouter>
                <div>
                  <Switch>

                    <Route path="/faq-component" component={FAQComponent} />
                    <Route exact path="/faq-info" component={FAQInfo} />

                  </Switch>
                </div>
              </BrowserRouter>

            </div>

            <div style={{ backgroundColor: "white" }} className="col-md-4">

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
