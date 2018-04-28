import React, { Component } from 'react';
import { Link } from 'react-router-dom';

let dummyArr = [ "Lorem Ipsum1", "Lorem Ipsum2","Lorem Ipsum3","Lorem Ipsum4","Lorem Ipsum5","Lorem Ipsum6",]

class FAQComponent extends Component {


    render() {
        return (
            <div className="content-wrapper" id="intro">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="head_text">
                                <h1>Frenquently Asked Questions</h1>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="subText">
                                <p>Tips and Answer from the Lorum Ipsum Team</p>
                            </div>
                        </div>
                    </div>
                    <div className="row" style= {{ padding:" 0 65px 0 65px"}}>
                        <div className="col-lg-12">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="How can we help"/>
                                <span className="input-group-btn">
                                    <button className="btn btn-default searchBtn" type="button" ><i className="fa fa-search" aria-hidden="true"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                    {dummyArr.map (data => {
                        return (
                        <div className="col-md-6 col-sm-6">
                        <div className="right_btn">
                            <Link to={`/faq/${data}`} className="btn btn-lg">{data}</Link>
                        </div>
                    </div>
                        )
                    })}
                        
                    </div>

                </div>
            </div>
            
        )
    }
}

export default FAQComponent;
