import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import { observer } from 'mobx-react';

// COmponents
import AboutComponent from './AboutComponent'
import MenuComponent from './MenuComponent'
import FAQComponent from './FAQComponent'
import FAQInfo from './FAQInfo'
import AdminLogin from './AdminLogin'
import Dashboard from './Dashboard'
import Contact from './Contact'

@observer class App extends Component {

  render() {
    return (
      <div className="footer">
        <div id="wrapper">

          <BrowserRouter>
            <div>

              <MenuComponent redirect={this.props.store.redirect} />
              <Switch>
               <Route exact path="/" render={(props) => { this.props.store.checkKey(); return <FAQComponent store={this.props.store} {...props} /> }} />
                <Route exact path="/faq" render={(props) => { this.props.store.checkKey(); return <FAQComponent store={this.props.store} {...props} /> }} />
                <Route path="/faq/:slugName" render={(props) => { this.props.store.checkKey(); return <FAQInfo store={this.props.store} {...props} /> }} />
                <Route path="/login" render={(props) => { return <AdminLogin store={this.props.store} {...props} /> }} />
                <Route path="/contact" render={(props) => { return <Contact store={this.props.store} {...props} /> }} />                
                <Route path="/dashboard" render={(props) => { this.props.store.checkKey(); return <Dashboard store={this.props.store} {...props} /> }} />
              </Switch>
              <AboutComponent store={this.props.store}/>
              
              {this.props.store.redirect ? null :
              <div className="container footer_text">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="text">
                      <p style={{ margin: "0 137px 10px" }}>Are you an admin of this page? <Link to="/login"> Login In</Link></p>
                    </div>
                  </div>
                </div>

              </div> }
            </div>
          </BrowserRouter>
        </div>

      </div>
    );


  }


}

export default App;
