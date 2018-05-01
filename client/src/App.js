import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import store from './stores/stores';

// Components
import AboutComponent from './AboutComponent'
import FAQComponent from './FAQComponent'
import FAQInfo from './FAQInfo'
import MenuComponent from './MenuComponent'
import AdminLogin from './AdminLogin'


class App extends Component {

  render() {
    return (
      <div className="footer">
        <div id="wrapper">


          <BrowserRouter>
            <div>

              <MenuComponent />

              <Switch>
                <Route exact path="/" render={(props) => { return <FAQComponent store={this.props.store} {...props} /> }} />
                <Route exact path="/faq" render={(props) => { return <FAQComponent store={this.props.store} {...props} /> }} />
                <Route path="/faq/:slugName" render={(props) => { return <FAQInfo store={this.props.store} {...props} /> }} />
                <Route path="/login" render={(props) => { return <AdminLogin store={this.props.store} {...props} /> }} />

              </Switch>
            <AboutComponent store={this.props.store} />
            <div className="container footer_text">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="text">
                    <p>Are you an admin of this page? <Link to="/login"> Login In</Link></p>
                  </div>
                </div>
              </div>

            </div>
            </div>
            
          </BrowserRouter>
        </div>
      </div>
    );


  }


}

export default observer(App);
