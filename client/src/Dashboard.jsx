import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from './stores/stores'
import CircularProgressbar from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

@observer class MenuComponent extends Component {

    render() {
        return (

            <div className="content-wrapper" style={{ background: "#ccc" }}>
                <div className="container-fluid" style={{ paddingRight: "30px", paddingLeft: "32px" }}>
                    <div className="row" style={{ background: "#ccc", height: "50px" }}>
                        <div className="col-md-12 col-sm-12">
                            <div className="head_text">
                                <h1>Dashboard</h1>
                            </div>


                        </div>
                    </div>
                    <div className="row" style={{ height: "80px" }}>
                        <div className="col-md-12 col-sm-12">
                            <div className="subText">
                                <p>Follow in real time the performance of your FAQ</p>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ minHeight: "70px", backgroundColor: "white", paddingLeft: "10px" }}>
                        <div className="col-md-4 col-sm-4" style={{ borderLeft: "3px #83C75A solid" }}>
                            <h4 >1628</h4>
                            <p style={{ fontSize: "12px" }}>Research done by users</p>


                        </div>
                        <div className="col-md-4 col-sm-4" style={{ borderLeft: "3px #83C75A solid" }}>

                            <h4 >328</h4>
                            <p style={{ fontSize: "12px" }}>Message Sent</p>

                        </div>
                        <div className="col-md-4 col-sm-4" style={{ borderLeft: "3px #83C75A solid" }}>
                            <h4 >60</h4>
                            <p style={{ fontSize: "12px" }}>Questions in FAQ</p>

                        </div>
                    </div>


                    <div className="row" style={{ minHeight: "50px", paddingLeft: "0px" }}> </div>


                    <div className="row" style={{ minHeight: "400px", backgroundColor: "white", padding: "14px 1px 0px" }}>

                        <div className="row" style={{ padding: "4px 15px 0px" }}>
                            <div className="col-md-12 col-sm-12" style={{ textAlign: "left" }}>
                                OVERVIEW - QUESTION | ANSWER
                           <hr style={{ marginTop: "11px" }} />

                            </div>
                        </div>

                        <div className="row" style={{ textAlign: " center" }}>
                            <h5 style={{ textAlign: "center" }}>QUESTIONS SEEN</h5>
                            <CircularProgressbar percentage={80} />
                        </div>

                        <div className="row" style={{ padding: "10px 51px 0px" }}>

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John</td>
                                        <td>Doe</td>
                                        <td>john@example.com</td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>Moe</td>
                                        <td>mary@example.com</td>
                                    </tr>
                                    <tr>
                                        <td>July</td>
                                        <td>Dooley</td>
                                        <td>july@example.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                    </div>
                    <div className="row" style={{ minHeight: "25px" }}> </div>


                    <div className="row" style={{ minHeight: "120px", backgroundColor: "white", paddingLeft: "10px" }}>
                        <div className="col-md-4 col-sm-4" style={{}}>

                        </div>
                        <div className="col-md-4 col-sm-4" style={{}}>



                        </div>
                        <div className="col-md-4 col-sm-4" style={{}}>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuComponent;
