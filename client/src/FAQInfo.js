import React, { Component } from 'react';


class FAQInfo extends Component {
    

    render() {
        return (
            <div className="content-wrapper" id="intro">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="head_text">
                            <h1>Frenquently Asked Questions Info</h1>
                        </div>

                    </div>
                </div>
                {console.log(this.props.match.params.slugName)}
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
            </div>
        </div>
        )
    }
}

export default FAQInfo;
