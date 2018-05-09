import React, { Component } from 'react';
import { observer } from 'mobx-react';
import axios from 'axios'


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
                        {this.state.Message}
            
                <div className="container-fluid" style={{}}>
                    <div id="logInFormWrapper">
                            <div className="subText">
                                <p>Are You an administrator of {this.props.store.About.name} ?</p>

                            </div>
                  
                                <div style={{textAlign: "center"}}>
                                    <h2 style={{marginTop: "0px"}}>Log In</h2>

                            </div>
                            <div className="form-group">

                                <div className=" loginInputs">
                                    <input id="email" type="text" className="form-control"  placeholder="Email Address" 
                                    style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/user-icon.png)` , backgroundSize: "19px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "14px",}}/>
                                </div>
                            </div>

                            <div className="form-group">

                                <div className="loginInputs">
                                    <input  id="password" type="text" className="form-control" placeholder="Password"
                                    style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/pass-icon.png)`, backgroundSize: "16px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "14px",}}
                                    />
                                </div>
                            </div>

                            <div className="form-group">

                                <div className="logInSendBtn">
                                    <button type="button" className="btn form-control" onClick={(e) => this.handleLogin(e)}>SEND</button>

                                </div>
                            </div>
                    </div>
                </div>
        </div>
        )
    }
}

export default AdminLogin;
