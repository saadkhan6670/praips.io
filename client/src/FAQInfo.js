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
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="subText">
                                <p>Tips and Answer from the Lorum Ipsum Team</p>
                            </div>
                        </div>
                    </div>
                    <div className="row search_row">
                        <div class="form-group has-success has-feedback">

                            <div class="col-md-12">
                                <input type="text" class="form-control" id="inputSuccess" placeholder="How can we help" />
                                <span class="glyphicon glyphicon-search form-control-feedback"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FAQInfo;
