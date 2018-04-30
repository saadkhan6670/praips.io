import React, { Component } from 'react';
import './App.css';
// import '../src/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AboutComponent from './AboutComponent'
import FAQComponent from './FAQComponent'
import FAQInfo from './FAQInfo'
import MenuComponent from './MenuComponent'
import {observer} from 'mobx-react';


  @observer class App extends Component {

  render() {
    return (
      <div className="footer">
        <div id="wrapper">


          <BrowserRouter>
            <div>

              <MenuComponent />

            <Switch>
              <Route exact path="/"  render ={ (props ) => { return <FAQComponent store={this.props.store} {...props}/>} }/>
              <Route exact path="/faq" render ={ (props) => {  return <FAQComponent store={this.props.store} {...props}/>} } />
              <Route path="/faq/:slugName"    render ={ (props) => {  return <FAQInfo store={this.props.store} {...props}/>} }/>   
            </Switch>
          </div>
        </BrowserRouter>
      <AboutComponent  store={this.props.store}/>
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
