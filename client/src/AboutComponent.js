import React, { Component } from 'react';



class AboutComponent extends Component {


    render() {
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
                    <div className="row">
                        <div className="right_log">
                            <img src={require('./images/p-logo-right.png')} alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="right_text">
                            <h4>Lorum Ipsum</h4>
                            <p>Lorem ipsum dolor sit amet consect</p>
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
                                    <p>Lorem ipsum dolor sit amet. consectet
                                        adipiscing elit. sed do eiusmod
                                        tempor dunt ut labore et dolor magna
                                        aliqua. minim veniam, quis nostrud
                                        exercit mco laboris nisi ut aliquip
                                        ex ea comod adisit dolor..</p>
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
