import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';
import { observer } from 'mobx-react';

@observer class AboutComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            Show: false,
            Modalvalue: '',
        }
    }

    componentWillMount() {
        this.props.store.getAbout()
    }

    handleModalClose = () => {
        this.setState({
            Show: false
        })
    }

    handleModalShow = () => {
        this.setState({ Show: true });
    }

    handleLogOut() {
        this.props.store.LogOutandDelKey()
    }

    render() {
        return (
            <div>
                {this.props.store.redirect ? <div className ="">
                <div className=" AdminProfile-wrapper">

                </div>
                <button onClick={() => this.handleLogOut()} className="btn btn-md"><span>LOGOUT</span></button>
                </div> : null }
           
                <div className={this.props.store.redirect ? "AdminRight-wrapper" : "right-wrapper"} id="intro">

                    <div className={this.state.cssToggle ? "container-fluid AdminAboutContainer" : "container-fluid"}>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="about_text">
                                    <h4>ABOUT</h4>
                                    <hr className="hr_about" />
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className="row">
                            {this.props.store.redirect ? 
                                <img onClick={(e) => this.editHandle(e)} style={{ cursor: "pointer", position: "absolute", right: "19%" }} src='./images/edit icon.png' alt="" />
                                : null }
                                <div className="right_log">
                                    <img src={this.props.store.About.logoPath} alt="" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="right_text">
                                    <h4>{this.props.store.About.name}</h4>
                                    <p>{this.props.store.About.slogan}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="right_btn">
                                        <button className="btn btn-lg"><span>WWW.WEBSITE.IO</span></button>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="content_text">
                                        <div className="desc">
                                            <h4>Description</h4>
                                            <p>{this.props.store.About.description}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal component */}
                    <Modal show={this.state.Show} onHide={this.handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Enter The Name Of Rubric</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                >
                                    <FormControl
                                        type="text"
                                        value={this.state.Modalvalue}
                                        placeholder="Enter text"
                                        onChange={(e) => {
                                            this.setState({
                                                Modalvalue: e.target.value
                                            })
                                        }}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={(e) => {
                                this.setState({
                                    Show: false,
                                })
                            }}>Change</Button>
                        </Modal.Footer>
                    </Modal>
                    {/* Modal component */}
                </div>
            </div>

        )
    }
}


export default AboutComponent;
