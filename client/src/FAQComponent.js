import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import {toTitleCase , removeWhitespaces} from './Services'



@observer class FAQComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            RubricInput: '',
            RubricSlug : '',
            Message : '' ,
        }
    }

    componentDidMount() {
        this.props.store.checkKey()
        this.props.store.getRubrics()
    }

    HandleChange(e) {

        this.setState({
            RubricInput: e.target.value
        })

    }

    handleAddBtn() {

        // Logic to handel ADD button
        if (this.state.RubricInput.length === 0) {
            this.setState({
                Message :   <div className="alert alert-danger">
                <strong>Warning: Rubric Name Can't be empty </strong> 
            </div>
            })
        
        }
        else {
this.setState ({
    RubricSlug : removeWhitespaces(this.state.RubricInput) } )

            this.props.store.createRubric("data" , this.state.RubricSlug)
            this.setState({
                Message : ''
            })
        // console.log("from rendr" ,this.state.RubricSlug)



        }
        // Logic ends
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

                    <div className="row search_row">
                        <div className="form-group has-success has-feedback">

                            <div className="col-md-6 col-sm-6">
                                <input onChange={(e) => { this.HandleChange(e) }} value={this.state.RubricInput} type="text" className="form-control" placeholder="enter the name of Rubric" />
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-6 col-sm-6" >
                            <div className="right_btn">

                                <button onClick={(e) => this.handleAddBtn(e)} style={{ width: "140px" }} className="btn btn-lg" >
                                    ADD
                                        </button>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6" >
                            <div className="right_btn">

                                {this.state.Message}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default FAQComponent;
