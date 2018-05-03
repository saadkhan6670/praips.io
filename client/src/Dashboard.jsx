import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from './stores/stores'

@observer class MenuComponent extends Component {

    render() {
        return (

            <div className="content-wrapper" style={{ background: "#ccc" }}>
                <div className="container-fluid">
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
                    <div className="jumbotron" style={{ height: "50px", backgroundColor: "white", paddingLeft: "10px" }}>
                        <div className="col-md-4 col-sm-4" style={{ borderLeft : "3px #83C75A solid" }}>
                            <h4 >1628</h4>
                          <p style={{fontSize: "12px"}}>Research done by users</p>
                            

                        </div>
                        <div className="col-md-4 col-sm-4" style={{ borderLeft : "3px #83C75A solid" }}>

                            <h4 >328</h4>
                          <p style={{fontSize: "12px"}}>Message Sent</p>

                        </div>
                        <div className="col-md-4 col-sm-4"style={{ borderLeft : "3px #83C75A solid" }}>
                            <h4 >60</h4>
                            <p style={{fontSize: "12px"}}>Questions in FAQ</p>

                        </div>
                    </div>



                    <div className="jumbotron" style={{ height: "350px", backgroundColor: "white", paddingLeft: "10px" }}>
                        <div className="col-md-4 col-sm-4" style={{ background: "green" , }}>
                            <div >1628</div>

                        </div>
                        <div className="col-md-4 col-sm-4" style={{ background: "yellow" }}>

                            <div >328</div>


                        </div>
                        <div className="col-md-4 col-sm-4" style={{ background: "red" }}>
                            <div >60</div>

                        </div>
                    </div>

                    
                    <div className="jumbotron" style={{ height: "150px", backgroundColor: "white", paddingLeft: "10px" }}>
                        <div className="col-md-4 col-sm-4" style={{ background: "green" }}>
                            <div >jello</div>

                        </div>
                        <div className="col-md-4 col-sm-4" style={{ background: "yellow" }}>

                            <div >hello</div>


                        </div>
                        <div className="col-md-4 col-sm-4" style={{ background: "red" }}>
                            <div >theek</div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuComponent;
