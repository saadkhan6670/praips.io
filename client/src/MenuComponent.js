import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from './stores/stores';


@observer class MenuComponent extends Component {
    constructor(props){
        super(props);
        this.state = {isToggle: false};
        this.handleClick =  this.handleClick.bind(this);
      }
      handleClick(e){
        this.setState({isToggle: !this.state.isToggle});
      }
    render() {
        return (

            // toggle 
            <div>
                <div id="btn" className="toggle" onClick= {this.handleClick}>
                    <i className="fa fa-bars menu" aria-hidden="true"></i>
                </div>

             {/*toggle*/}
                <div id="sidebar-wrapper" style={{display: this.state.isToggle ? 'block': 'block'}}>
                    <div></div>

                    <ul className="sidebar_nav">
                        <li>
                            <a href="index.html">
                                <div className="logo-wrapper">
                                    <div className="logo">
                                        <img src={'../public/images/praipsLogo.png'} alt="" />
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li className="faq_li">
                            <a href="index.html">
                                <div className="faq">
                                    <div className="question-wrapper">
                                        <div className="question">
                                            <img src="./assets/images/question.png" alt="" />
                                        </div>
                                    </div>

                                    <div className="faqText">FAQ</div>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="index.html">Home</a>
                        </li>

                        <li>
                            <a href="index.html">About</a>
                        </li>

                        <li>
                            <a href="index.html">Faq</a>
                        </li>

                        <li>
                            <a href="index.html">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
            // ./left col
        )
    }
}

export default MenuComponent;
