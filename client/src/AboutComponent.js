import React, { Component } from 'react';

import { observer } from 'mobx-react';

class AboutComponent extends Component {
     getAboutData() {
         this.props.store.getAbout()
    }
    componentWillMount() {
        // this.getAboutData()
        this.props.store.getAbout()
        
    }

    render() {
   
            return (

                <div className="right-wrapper" id="intro">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="about_text">
                                    <h4>ABOUT</h4>
                                    <hr />
                                </div>
                            </div>
                        </div>{
                            this.props.store.About.map((data, key) => {
                                return (
                                    <div key={key}>
                                        <div className="row">
                                            <div className="right_log">
                                                <img src={data.logoPath} alt="" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="right_text">
                                                <h4>{data.name}</h4>
                                                <p>{data.slogan}</p>
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
                                                        <p>{data.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>

                </div>

            )
        }
    }


export default observer(AboutComponent);
