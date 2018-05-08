import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@observer class MenuComponent extends Component {
    render() {
        console.log(this.props)
        return (

            <div id="sidebar-wrapper">
                <Link to="/" title="Papris Logo">

                    <div className="logo-wrapper">
                        <div className="logo">
                            <img src={`${process.env.PUBLIC_URL}/images/praips Logo.png`} alt="praips Logo" />

                        </div>
                    </div>
                </Link>

                <Link title="Frenquently Asked Questions" id="Frenquently Asked Questions" onClick={() => { this.props.store.searchInput = "" }} to="/faq">
                    <div className={this.props.location.pathname === "/faq" ? "menuitemsActive" :"menuitems" } >
                        <div >
                            <div className= {this.props.location.pathname === "/faq" ? "menuimageActive" : "menuimage"}>
                                <img src={`${process.env.PUBLIC_URL}/images/info.png`} alt="info icon" />
                            </div>
                        </div>
                    </div>
                </Link>
                <hr />

                {this.props.store.redirect ?
                    <div>

                        <Link title="FAQ Widget" to="/install" id="FAQ Widget">
                            <div className={this.props.location.pathname === "/install" ? "menuitemsActive" :"menuitems" }>
                                <div >
                                    <div className= {this.props.location.pathname === "/install" ? "menuimageActive" : "menuimage"}>
                                        <img src={`${process.env.PUBLIC_URL}/images/script icon.png`} alt="script icon" width="64%"/>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <hr />

                        <Link title="FAQ Dashboard" to="/dashboard" id="FAQ Dashboard">
                            <div className={this.props.location.pathname === "/dashboard" ? "menuitemsActive" :"menuitems" }>
                                <div>
                                    <div className= {this.props.location.pathname === "/dashboard" ? "menuimageActive" : "menuimage"}>
                                        <img src={`${process.env.PUBLIC_URL}/images/analytics icon.png`} alt="analytics icon" width="83%"/>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div> : null
                }
            </div>
        )
    }
}

export default withRouter(MenuComponent);
