import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from './stores/stores'

@observer class MenuComponent extends Component {

    render() {
        return (

            <div id="sidebar-wrapper">
                <div className="logo-wrapper">
                    <div className="logo">
                        <img src='./images/praips Logo.png' alt="" />
                    </div>
                </div>
                <Link to="/faq">
                <div className="faq">
                    <div >
                        <div className="question">
                            <img src='./images/info.png' alt="info icon" />
                        </div>
                    </div>

                    <div className="faqText">
                     FAQ 
                    </div>
                </div>
                </Link>
                <hr/>

                    {  store.redirect === true ?
                    <div>
                     <Link to="/install">
                     <div className="faq">
                         <div >
                             <div className="question">
                                 <img src='./images/script icon.png' alt="script icon" />
                             </div>
                         </div>
     
                         <div className="faqText">
                          INSTALL 
                         </div>
                     </div>
                     </Link>
                     <hr/>
     
                      <Link to="/dashboard">
                     <div className="faq">
                         <div>
                             <div className="question">
                                 <img src='./images/analytics icon.png' alt="analytics icon" />
                             </div>
                         </div>
     
                         <div className="faqText">
                          ANALYTICS 
                         </div>
                     </div>
                     </Link>
                     </div>  : null
                    }
                
                
            </div>
        )
    }
}

export default MenuComponent;
