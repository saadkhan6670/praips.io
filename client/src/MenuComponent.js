import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

@observer class MenuComponent extends Component {

    render() {
        return (

            <div id="sidebar-wrapper">
                <Link to="/" title="Papris Logo">

                    <div className="logo-wrapper">
                        <div className="logo">
                            <img src={`${process.env.PUBLIC_URL}/images/praips Logo.png`} alt="praips Logo" />

                        </div>
                    </div>
                </Link>

                <Link title="Frenquently Asked Questions" onClick={() => { this.props.store.searchInput = "" }} to="/faq">
                    <div className="menuitems">
                        <div >
                            <div className="menuimage">
                                <img
                                 src={`${process.env.PUBLIC_URL}/images/info.png`} alt="info icon" />
                            </div>
                        </div>

                        <div className="menutext">
                            FAQ
                    </div>
                    </div>
                </Link>
                <hr />

                {this.props.store.redirect ?
                    <div>

                        <Link title="FAQ Widget" to="/install">
                            <div className="menuitems">
                                <div >
                                    <div className="menuimage">
                                        <img src={`${process.env.PUBLIC_URL}/images/script icon.png`} alt="script icon" />
                                    </div>
                                </div>

                                <div className="menutext">
                                    INSTALL
                         </div>
                            </div>
                        </Link>
                        <hr />

                        <Link title="FAQ Dashboard" to="/dashboard">
                            <div className="menuitems">
                                <div>
                                    <div className="menuimage">
                                        <img src={`${process.env.PUBLIC_URL}/images/analytics icon.png`} alt="analytics icon" />
                                    </div>
                                </div>

                                <div className="menutext">
                                    ANALYTICS
                         </div>
                            </div>
                        </Link>
                    </div> : null
                }
            </div>
        )
    }
}

export default MenuComponent;
