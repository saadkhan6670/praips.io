import React, { Component } from 'react';
import { observer } from 'mobx-react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';


@observer class AdminLogin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Message: '',

        }
    }

    async getRubricsData() {
        await this.props.store.getRubrics()
    }

    componentDidMount() {
        this.getRubricsData()
    }

    handleLogin() {

        axios.post(`${process.env.apiURL}/api/adminLogIn`, {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value

        })
            .then((response) => {
                if (response.data) {
                    axios.get(`${process.env.apiURL}/api/loginKey`)
                        .then((response2) => {
                            this.props.store.LoginKey = response2.data.logInKey;
                            this.props.store.redirect = true

                            this.props.store.id = response2.data._id
                            

                            var now = new Date();
                            var time = now.getTime();
                            var expireTime = time + 1000 * 100000;
                            now.setTime(expireTime);                           
                            document.cookie = `key=${this.props.store.LoginKey};  expires=${now.toGMTString()} path=/`;
                            document.cookie = `user_id=${response.data._id};  expires=${now.toGMTString()} path=/`;
                        this.props.store.getUserData()
                            
                       this.props.history.push({
                           pathname : '/'
                       })

             
                        }).catch(() => {
                            this.setState({

                                Message:
                                    <div className="alert alert-danger">
                                        <strong >Please Check Your Internet Connection...</strong>
                                    </div>
                            })
                        })
                }
                else {

                    this.setState({

                        Message:
                            <div className="alert alert-danger">
                                <strong >Invalid username or password</strong>
                            </div>
                    })
                }

            }).catch(() => {
                this.setState({
                
                    Message:
                    <div className="alert alert-danger">
                        <strong >Please Check Your Internet Connection...</strong>
                    </div>
                })
            })

    }


    render() {
        return (
            <div className="content-wrapper" id="intro">
                <div className="container-  ">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="subText">
                                <p>Are You an admin of Lorem Ipsum?</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="head_text">
                                    <h1>Log In</h1>
                                </div>

                            </div>
                        </div>

                        <div className="row search_row">
                            <div className="form-group has-success has-feedback">

                                <div className="col-md-12">
                                    <input id="email" type="text" className="form-control" placeholder="Email Address" />
                                </div>
                            </div>
                        </div>

                        <div className="row search_row">
                            <div className="form-group has-success has-feedback">

                                <div className="col-md-12">
                                    <input id="password" type="text" className="form-control" placeholder="Password" />
                                </div>
                            </div>
                        </div>

                        <div className="row search_row">
                            <div className="form-group has-success has-feedback">

                                <div className="col-md-12">
                                    <button type="button" onClick={(e) => this.handleLogin(e)} class="btn btn-primary">SEND</button>

                                </div>
                            </div>
                        </div>
                        {this.state.Message}

                    </div>
                </div>
        </div>
        )
    }
}

export default AdminLogin;
