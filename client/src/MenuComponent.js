import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

@observer class MenuComponent extends Component {

    render() {
        return (

            <div id="sidebar-wrapper">
                <div className="logo-wrapper">
                    <div className="logo">
                        <img src={`${process.env.PUBLIC_URL}/images/praips Logo.png`} alt="praips Logo" />
                    </div>
                </div>
                <Link to="/faq">
                <div className="faq">
                    <div >
                        <div className="question">
                            <img src={`${process.env.PUBLIC_URL}/images/info.png`} alt="info icon" />
                        </div>
                    </div>

                    <div className="faqText">
                     FAQ 
                    </div>
                </div>
                </Link>
                <hr/>

                    {  this.props.redirect ?
                    <div>
                     <Link to="/install">
                     <div className="faq">
                         <div >
                             <div className="question">
                                 <img src={`${process.env.PUBLIC_URL}/images/script icon.png`} alt="script icon" />
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
                                 <img src={`${process.env.PUBLIC_URL}/images/analytics icon.png`} alt="analytics icon" />
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
