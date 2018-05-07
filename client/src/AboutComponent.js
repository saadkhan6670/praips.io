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
        if(this.props.store.redirect === true) {
        this.props.store.getUserData()

    }
    
        
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
    console.log("from Abut",this.props.store.User.username)
        
        return (
            <div>
                {this.props.store.redirect ? <div className ="">
                <div className="AdminProfile-wrapper">
             <div className="col-md-3 col-sm-3" style={{ backgroundSize : "cover",  backgroundRepeat: "no-repeat", backgroundImage: `url(${process.env.PUBLIC_URL}${this.props.store.User.profilePath})`, height: "inherit" , borderTopLeftRadius : "inherit", borderBottomLeftRadius : "inherit"}}>

             </div>
             <div className="col-md-6 col-sm-6" style={{ height: "inherit"   ,  fontSize: "18px"}}>
                 {this.props.store.User.username} <br/>
                 <span style={{    fontSize: "13px" ,  color: "lightgray"}}>{this.props.store.User.role}</span>
                 </div> 
               <div className="col-md-3 col-sm-3" style={{  cursor: "pointer" ,  borderLeft: "1px solid lightgrey", height: "inherit" , borderTopRightRadius : "inherit", borderBottomRightRadius : "inherit", backgroundSize : "35px 31px",backgroundPosition: "center",  backgroundRepeat: "no-repeat", backgroundImage: `url(${process.env.PUBLIC_URL}/images/camera.png)`}}></div> 
                </div>
                <button style={{backgroundColor: "#83C75A" , color: "white"}} onClick={() => this.handleLogOut()} className="btn"><span>LOGOUT</span></button>
                </div> : null }
           
                <div className={this.props.store.redirect ? "AdminRight-wrapper" : "right-wrapper"} id="intro">

                    <div className={this.state.cssToggle ? "container-fluid AdminAboutContainer aboutData" : "container-fluid aboutData"}>
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
                                <img onClick={(e) => this.editHandle(e)} style={{ cursor: "pointer", position: "absolute", right: "19%" }} src={`${process.env.PUBLIC_URL}/images/edit icon.png`} alt="" />
                                : null }
                                <div className="right_log">
                                    <img src={`${process.env.PUBLIC_URL}${this.props.store.About.logoPath}`} alt="" />
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
                                        <button className="btn btn-lg" style={{textTransform: 'uppercase'}}>{this.props.store.About.siteUrl}</button>
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

                      <div className="container-fluid">
                
                    <form id="contactForm" onSubmit={(e) => { this.contactSubmit(e) }} onKeyDown={(e) => this.handleEnterKey(e)}>
                        <div className="form-group">
                            <label >How can we help? <span style={{ color: "#1eace2" }}>*</span></label> <span ref="messageReq"   className="reqMsg"></span>
                            <textarea name="message" className="form-control" ref='Message' style={{ height: "200px" }} onChange={() => this.onChangeValidation(this.refs.Message.name)}></textarea>
                        </div>
                        <div className="form-group">
                            <label >Your name <span style={{ color: "#1eace2" }}>*</span> </label> <span  ref="nameReq" className="reqMsg"></span>
                            <input type="text"  name="name" className="form-control" ref="Name" onChange={() => this.onChangeValidation(this.refs.Name.name)} />
                        </div>
                        <div className="form-group">
                            <label >Your email <span style={{ color: "#1eace2" }}>*</span></label> <span ref="emailReq" className="reqMsg"></span>
                            <input type="text" name="email"  className="form-control" ref="Email" onChange={() => this.onChangeValidation(this.refs.Email.name)} />
                        </div>
                        <div className="submit_btn">
                          <input type="button" className="btn btn-lg" value="BACK TO FAQ" />  

                            <input type="submit" className="btn btn-lg" value="SEND" />

                        </div>
                    </form>
                    <div className="row" id="spacingDiv"style={{minHeight: "250px"}}></div>
                    <div id="request-process"><h4>Processing your request</h4>
                        <span className="fa fa-spinner fa-spin fa-3x fa-fw"></span>
                    </div>
                    <div id="contactAlert">
                    <span  ><p>One of our agent will contact you shortly by email <br />
                        <strong> Thank You </strong></p>
                        <input type="submit" className="btn btn-lg" value="BACK TO FAQ"  />
                        
                    </span>
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
