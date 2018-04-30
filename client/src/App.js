import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AboutComponent from './AboutComponent'
import FAQComponent from './FAQComponent'
import FAQInfo from './FAQInfo'
import MenuComponent from './MenuComponent'
import {observer, inject} from 'mobx-react';
import store from './stores/stores';


  class App extends Component {

  render() {
    return (

      <div id="wrapper">
        

        <BrowserRouter>
          <div>

          <MenuComponent/>

            <Switch>
              <Route exact path="/"  render ={ (props ) => { return <FAQComponent store={this.props.store} {...props}/>} }/>
              <Route exact path="/faq" render ={ (props) => {  return <FAQComponent store={this.props.store} {...props}/>} } />
              <Route path="/faq/:slugName"    render ={ (props) => {  return <FAQInfo store={this.props.store} {...props}/>} }/>   
            </Switch>
          </div>
        </BrowserRouter>
  <AboutComponent  store={this.props.store}/>
     
      </div>
    );
  }
}

export default observer(App);
