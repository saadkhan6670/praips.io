import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuComponent extends Component {

    render() {
        return (

            <div id="sidebar-wrapper">
                <div className="logo-wrapper">
                    <div className="logo">
                        <img src={require('./images/p-logo.png')} alt="" />
                    </div>
                </div>
                <div className="faq">
                    <div className="question-wrapper">
                        <div className="question">
                            <img src={require('./images/question.png')} alt="" />
                        </div>
                    </div>

                    <div className="faqText">
                        <a href="">FAQ</a>
                    </div>

                {/*<div>
                        <Link to="/faq"> Faq Copm </Link>
                        {<Link to="/faq/:slugName"> Faq Info </Link> }
                    </div>*/}

                </div>
            </div>
        )
    }
}

export default MenuComponent;
