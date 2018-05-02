import React, { Component } from 'react';

import { observer } from 'mobx-react';


@observer class AboutComponent extends Component {
     getAboutData() {
         this.props.store.getAbout()
    }
    componentWillMount() {
        // this.getAboutData()
        this.props.store.getAbout()
        
    }

    render() {
        console.log()
        return (
                <div className="right-wrapper" id="intro">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="about_text">
                                    <h4>ABOUT</h4>
                                    <hr className="hr_about"/>
                                </div>
                            </div>
                        </div>
                                    <div >
                                        <div className="row">
                                            <div className="right_log">
                                                <img src={this.props.store.About.logoPath} alt="" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="right_text">
                                                <h4>{this.props.store.About.name}</h4>
                                                <p>{this.props.store.About.slogan}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <div className="right_btn">
                                                    <button className="btn btn-lg"><span>WWW.WEBSITE.IO</span></button>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <div className="content_text">
                                                    <div className="desc">
                                                        <h4>Description</h4>
                                                        <p>{this.props.store.About.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                    </div>

                </div>

            )
        }
    }


export default AboutComponent;
