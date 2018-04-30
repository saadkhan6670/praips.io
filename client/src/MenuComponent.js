import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuComponent extends Component {

    render() {
        return (

            <div id="sidebar-wrapper">
                <div className="logo-wrapper">
                    <div className="logo">
                        <img src='./images/p-logo.png' alt="" />
                    </div>
                </div>
                <Link to="/faq">
                <div className="faq">
                    <div className="question-wrapper">
                        <div className="question">
                            <img src='./images/question.png' alt="" />
                        </div>
                    </div>

                    <div className="faqText">
                     FAQ 
                    </div>
                </div>
                </Link>
                
            </div>
        )
    }
}

export default MenuComponent;
