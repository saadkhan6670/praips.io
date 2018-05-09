import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';


@observer class AboutComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            cssToggle :''
        }
    }
 
    componentWillMount() {
        this.props.store.getAbout()
        if (this.props.store.redirect === true) {
            this.props.store.getUserData()
        }
    }

    handleLogOut() {
        this.props.store.LogOutandDelKey()
    }

    editHandle() {
        document.getElementById('aboutData').style.display = "none"
        document.getElementById('aboutForm').style.display = "block"
    }

    handleCancel() {
        document.getElementById('aboutData').style.display = "block"
        document.getElementById('aboutForm').style.display = "none"
    }

    handleChange(event, fieldName) {
        this.props.store[fieldName] = event.target.value
    }
    render() {
        return (
            <div>
                {this.props.store.redirect ? <div className="AdminProfile">
                    <div className="AdminProfile-wrapper">
                        <div className="col-md-3 col-sm-3 col-xs-3 profileImage" style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${process.env.PUBLIC_URL}${this.props.store.User.profilePath})`, height: "inherit", borderTopLeftRadius: "inherit", borderBottomLeftRadius: "inherit" }}>

                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 profileNamediv">
                            < div className="profileName">{this.props.store.User.username}</div>
                            <br />
                            <span className="profileRole">{this.props.store.User.role}</span>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-3" style={{ cursor: "pointer", borderLeft: "1px solid lightgrey", height: "inherit", borderTopRightRadius: "inherit", borderBottomRightRadius: "inherit", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundImage: `url(${process.env.PUBLIC_URL}/images/camera.png)` }}></div>
                    </div>
                    <button onClick={() => this.handleLogOut()} className="btn logoutbtn"><span>LOGOUT</span></button>
                </div> : null}

                <div className={this.props.store.redirect ? "AdminRight-wrapper" : "right-wrapper"} id="intro">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 ">
                            <div className="about_text">
                                <h4>ABOUT</h4>
                                <hr className="hr_about" />
                            </div>
                        </div>
                    </div>
                    <div className={this.state.cssToggle ? "container-fluid AdminAboutContainer" : "container-fluid"} id="aboutData">

                        <div >
                            <div className="row">
                                {this.props.store.redirect ?
                                    <img onClick={(e) => this.editHandle(e)} className="aboutedit" src={`${process.env.PUBLIC_URL}/images/edit icon.png`} alt="" />
                                    : null}
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
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="right_btn">
                                        <button className="btn btn-lg" style={{ textTransform: 'uppercase' }}>{this.props.store.About.siteUrl}</button>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
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

                    <div className="container-fluid" id="aboutForm">

                        <form onSubmit={(e) => { this.contactSubmit(e) }} onKeyDown={(e) => this.handleEnterKey(e)}>
                            <div className=" col-md-12 col-sm-12 col-xs-12 form-group">
                                <label >Logo  </label> <span ref="nameReq" className="reqMsg"></span>
                                <input type="text" name="name" className="form-control" />
                            </div>
                            <div className=" col-md-12 col-sm-12 col-xs-12 form-group">
                                <label >Name  </label> <span ref="nameReq" className="reqMsg"></span>
                                <input type="text" name="name" className="form-control" value={this.props.store.About.name} />
                            </div>
                            <div className=" col-md-12 col-sm-12 col-xs-12 form-group">
                                <label >Slogan(100 characters) </label> <span ref="emailReq" className="reqMsg"></span>
                                <input type="text" name="email" className="form-control" value={this.props.store.About.slogan} />
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 form-group">
                                <label >Site web</label> <span ref="emailReq" className="reqMsg"></span>
                                <input type="text" name="email" className="form-control" value={this.props.store.About.siteUrl} />
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 form-group">
                                <label >Description </label> <span ref="messageReq" className="reqMsg"></span>
                                <textarea name="message" className="form-control" style={{ height: "150px" }} value={this.props.store.About.description}></textarea>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 about_btns">
                                <input type="submit" className="btn btn-lg" value="Edit" />
                                <input type="button" className="btn btn-lg" value="Cancel" onClick={() => { this.handleCancel() }} />

                            </div>
                        </form>
                    </div>
                </div>
                {this.props.store.redirect ? null :
                <div className="container footer_text">
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <div className="text">
                        <p>Are you an admin of this page? <Link to="/login"> Login In</Link></p>
                      </div>
                    </div>
                  </div>

                </div>}
            </div>

        )
    }
}


export default AboutComponent;
