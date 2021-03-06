import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@observer class MenuComponent extends Component {
    render() {
        return (

            <div className="sidebar-wrapper">
                <Link to="/" title="Papris Logo">

                    <div className="logo-wrapper row">
                        <div className="logo">
                            <img src={`${process.env.PUBLIC_URL}${this.props.store.About.logoPath}`} alt="praips Logo" height= "45px" />

                        </div>
                    </div>
                </Link>
               
                <Link title="Frenquently Asked Questions" id="Frenquently Asked Questions" onClick={() => { this.props.store.searchInput = "" }} to="/faq">
                    <div className={this.props.location.pathname === "/faq" ? "menuitemsActive" :"menuitems" } >
                        <div >
                            <div className= {this.props.location.pathname === "/faq" ? "menuimageActive" : "menuimage"}>
                                <img src={`${process.env.PUBLIC_URL}/images/info.png`} alt="info icon" className="faqimg" />
                            </div>
                        </div>
                    </div>
                </Link>
               

                {this.props.store.redirect ?
                    <div>

                        <Link title="FAQ Widget" to="/script" id="FAQ Widget">
                            <div className={this.props.location.pathname === "/script" ? "menuitemsActive" :"menuitems" }>
                                <div >
                                    <div className= {this.props.location.pathname === "/script" ? "menuimageActive" : "menuimage"}>
                                        <img src={`${process.env.PUBLIC_URL}/images/script icon.png`} alt="script icon" className ="installimg" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                      

                        <Link title="FAQ Dashboard" to="/dashboard" id="FAQ Dashboard">
                            <div className={this.props.location.pathname === "/dashboard" ? "menuitemsActive" :"menuitems" }>
                                <div>
                                    <div className= {this.props.location.pathname === "/dashboard" ? "menuimageActive" : "menuimage"}>
                                        <img src={`${process.env.PUBLIC_URL}/images/analytics icon.png`} alt="analytics icon" className="analyticsimg"/>
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
