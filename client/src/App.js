import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

// COmponents
import About from './About/index'
import MenuComponent from './MenuComponent'
import FAQComponent from './FAQComponent'
import FAQInfo from './FAQInfo'
import AdminLogin from './AdminLogin'
import Dashboard from './Dashboard'
import Contact from './Contact'
import MobileNav from './MobileNav'

@observer class App extends Component {
  constructor(props){
    super(props)
    this.state={
      displayState : "none"
    }
  }


  render() {
    return (
      <div className="footer">
        <div id="wrapper">

          <BrowserRouter>
         
            <div>
            <MobileNav store={this.props.store}/>
              <MenuComponent store={this.props.store} />
              <Switch>

                <Route exact path="/" render={(props) => { return <FAQComponent store={this.props.store} {...props} /> }} />
                <Route exact path="/faq" render={(props) => { return <FAQComponent store={this.props.store} {...props} /> }} />
                <Route path="/faq/:slugName" render={(props) => { return <FAQInfo store={this.props.store} {...props} /> }} />

                <Route path="/login" render={(props) => { return <AdminLogin store={this.props.store} {...props} /> }} />
                <Route path="/contact" render={(props) => { return <Contact store={this.props.store} {...props} /> }} />                
                <Route path="/dashboard" render={(props) => {  return <Dashboard store={this.props.store} {...props} /> }} />
                <Route path="/script" render={(props) => {  return <Script store={this.props.store} {...props} /> }} />
                
              </Switch>
              <About store={this.props.store} />
            </div>
          </BrowserRouter>
        </div>

      </div>
    );


  }


}

export default App;
