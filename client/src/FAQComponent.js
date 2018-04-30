import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';



@observer class FAQComponent extends Component {

    async getRubricsData() {
        await this.props.store.getRubrics()
    }
    
    componentDidMount() {
        this.getRubricsData()
    }


    render() {

        return (
            <div className="content-wrapper" id="intro">
                <div className="container-  ">
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
                        <div className="form-group has-success has-feedback">

                            <div className="col-md-12">
                                <input type="text" className="form-control" id="inputSuccess" placeholder="How can we help" />
                                <span className="glyphicon glyphicon-search form-control-feedback"></span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {this.props.store.Rubrics.map((data, key) => {
                            return (
                                <div className="col-md-6 col-sm-6" key={key}>
                                    <div className="right_btn">
                                         <Link style={{ textDecoration: "none", }} to={`/faq${data.slug}`} >
                                        <button className="btn btn-lg" >
                                           {data.name}
                                        </button>
                                        </Link>
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
