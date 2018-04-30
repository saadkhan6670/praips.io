import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';


let dummyArr = ["Lorem Ipsum1", "Lorem Ipsum2", "Lorem Ipsum3", "Lorem Ipsum4", "Lorem Ipsum5", "Lorem Ipsum6",]

class FAQComponent extends Component {

    async getRubricsData() {
        await this.props.store.getRubrics()
    }
    componentDidMount() {
        this.getRubricsData()
    }

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
                    <div className="row search_row">
                        <div class="form-group has-success has-feedback">

                            <div class="col-md-12">
                                <input type="text" class="form-control" id="inputSuccess" placeholder="How can we help" />
                                <span class="glyphicon glyphicon-search form-control-feedback"></span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {this.props.store.Rubrics.map((data, key) => {
                            return (
                                <div className="col-md-6 col-sm-6" key={key}>
                                    <div className="right_btn">
                                        <button className="btn btn-lg" >
                                            <Link style={{ textDecoration: "none" }} to={`/faq${data.slug}`} >{data.name}</Link>
                                        </button>
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

export default observer(FAQComponent);
