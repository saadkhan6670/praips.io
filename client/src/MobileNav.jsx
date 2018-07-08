import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import AboutForMobile from './About/components/AboutForMobile'

@observer class MobileNav extends Component {

    handleLeftClick = () => {
        var style = document.getElementsByClassName("mobile-sidebar-wrapper")[0].style
        if (style.display === "none" || style.display === "") {
            style.display = "block"
        }

        else {
            style.display = "none"

        }
    }

    handleRightClick = () => {
        if(window.screen.width <= 768) {
            document.getElementById("mySidenav").style.width = "40%";

            window.setTimeout( () => {
                document.getElementById("main").style.width = "60%";
            
                document.getElementById("main").style.backgroundColor = "rgba(0,0,0,0.4)";
            }, 350)

        }

        if(window.screen.width <= 425) {
            document.getElementById("mySidenav").style.width = "60%";

            window.setTimeout( () => {
                document.getElementById("main").style.width = "40%";
            
                document.getElementById("main").style.backgroundColor = "rgba(0,0,0,0.4)";
            }, 350)

        }
      
       
    }

    handlecloseNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.width = "0";
        
        document.getElementById("main").style.backgroundColor ="white";
    }



    render() {
        return (
            <div>
                <div className="toggle-nav">

                    <div id="mySidenav" className="sidenav">
                        <a href="javascript:void(0)" className="closebtn" onClick={this.handlecloseNav}>&times;</a>
                       <AboutForMobile store={this.props.store}/> 
                    </div>
                    <div id="main"></div>
                   


                    <span id="btn"
                        className="toggle-left  col-sm-4 col-xs-4"
                        onClick={this.handleLeftClick}>
                        <i className="fa fa-bars menu" aria-hidden="true"></i>
                    </span>

                    <span className="toggle-logo  col-sm-4 col-xs-4">
                        <Link to="/" title="Papris Logo">
                            <img src={`${process.env.PUBLIC_URL}${this.props.store.About.logoPath}`} alt="praips Logo" />
                        </Link>

                    </span>

                    <span id="btn" className="toggle-right  col-sm-4 col-xs-4" onClick={this.handleRightClick}>
                        <i className="glyphicon glyphicon-th-large" aria-hidden="true"></i>
                    </span>

                </div>

                {/*mobile menu */}
                <div className="mobile-sidebar-wrapper">

                    <Link title="Frenquently Asked Questions" id="Frenquently Asked Questions" onClick={() => { this.props.store.searchInput = "" }} to="/faq">
                        <div className={this.props.location.pathname === "/faq" ? "menuitemsActive" : "menuitems"} >
                            <div >
                                <div className={this.props.location.pathname === "/faq" ? "menuimageActive" : "menuimage"}>
                                    <img src={`${process.env.PUBLIC_URL}/images/info.png`} alt="info icon" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <hr />

                    {this.props.store.redirect ?
                        <div>

                            <Link title="FAQ Widget" to="/script" id="FAQ Widget">
                                <div className={this.props.location.pathname === "/script" ? "menuitemsActive" : "menuitems"}>
                                    <div >
                                        <div className={this.props.location.pathname === "/script" ? "menuimageActive" : "menuimage"}>
                                            <img src={`${process.env.PUBLIC_URL}/images/script icon.png`} alt="script icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <hr />

                            <Link title="FAQ Dashboard" to="/dashboard" id="FAQ Dashboard">
                                <div className={this.props.location.pathname === "/dashboard" ? "menuitemsActive" : "menuitems"}>
                                    <div>
                                        <div className={this.props.location.pathname === "/dashboard" ? "menuimageActive" : "menuimage"}>
                                            <img src={`${process.env.PUBLIC_URL}/images/analytics icon.png`} alt="analytics icon" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div> : null
                    }
                </div>
            </div>

        )
    }
}


export default withRouter(MobileNav);
