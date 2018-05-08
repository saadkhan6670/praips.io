import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
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
  constructor(props){
    super(props)
    this.state={
      displayState : "none"
    }
  }

  handleClick = () => {
    
     document.getElementsByClassName("sidebar-wrapper")[0].style.display = "block"
   
  }
  render() {
    return (
      <div className="footer">
        <div id="wrapper">

          <BrowserRouter>
            <div>
              <div id="btn" className="toggle-left" onClick={() => this.handleClick()}>
                <i className="fa fa-bars menu" aria-hidden="true"></i>
              </div>

              <Link to="/" title="Papris Logo">
                  <div className="toggle-logo">
                    <img src={`${process.env.PUBLIC_URL}/images/praips Logo.png`} alt="praips Logo" />
                </div>
              </Link>

              <div id="btn" className="toggle-right" onClick={this.handleClick}>
                <i className="glyphicon glyphicon-th-large" aria-hidden="true"></i>
              </div>
              <MenuComponent store={this.props.store} />
              <Switch>

                <Route exact path="/" render={(props) => { return <FAQComponent store={this.props.store} {...props} /> }} />
                <Route exact path="/faq" render={(props) => { return <FAQComponent store={this.props.store} {...props} /> }} />
                <Route path="/faq/:slugName" render={(props) => { return <FAQInfo store={this.props.store} {...props} /> }} />

                <Route path="/login" render={(props) => { return <AdminLogin store={this.props.store} {...props} /> }} />
                <Route path="/contact" render={(props) => { return <Contact store={this.props.store} {...props} /> }} />
                <Route path="/dashboard" render={(props) => { return <Dashboard store={this.props.store} {...props} /> }} />
              </Switch>
              <AboutComponent store={this.props.store} />

              {this.props.store.redirect ? null :
                <div className="container footer_text">
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <div className="text">
                        <p>Are you an admin of this page? <Link to="/login"> Login In</Link></p>
                      </div>
                    </div>
                  </div>

                </div>}
            </div>
          </BrowserRouter>
        </div>

      </div>
    );


  }


}

export default App;
