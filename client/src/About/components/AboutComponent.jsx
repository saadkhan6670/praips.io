import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';



@observer class AboutComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            cssToggle: '',

            Message: '',
            ModalComponent: '',
            Show: false,
            Modalvalue: '',
            uploadName: '',
            redirect: false,

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

    editHandle = () =>  {
        document.getElementById('aboutData').style.display = "none"
        document.getElementById('aboutForm').style.display = "block"
    }

    handleCancel() {
        document.getElementById('aboutData').style.display = "block"
        document.getElementById('aboutForm').style.display = "none"
    }

    handleChange(event, fieldName) {
        this.props.store.About[fieldName] = event.target.value


    }

    handleEnterKey(e) {
        if (e.keyCode === 13) {
            this.editSubmit(e)
        }
    }
    editSubmit(e) {
        e.preventDefault()
        this.props.store.updateAbout()
        document.getElementById('aboutData').style.display = "block"
        document.getElementById('aboutForm').style.display = "none"

    }

    handleModalClose = () => {
        this.setState({
            Show: false
        })
    }

    handleModalShow(uploadName, modalTitle) {
        this.setState({

            Show: true,
            uploadName: uploadName,
            modalTitle: modalTitle
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        var formData = new FormData();
        var imagefile = document.querySelector('#imageFile');
        formData.append(this.state.uploadName, imagefile.files[0]);
        this.props.store.uploadImages(formData, this.state.uploadName).then((response) => {

            switch (this.state.uploadName) {
                case 'profile':
                    this.props.store.User.profilePath = `/images/${response.data}`
                    break;

                case 'logo':
                    this.props.store.About.logoPath = `/images/${response.data}`
                    break;
                default:
                    return;
            }

        })
            .catch((error) => {
                console.log(error)
            })

    }

    handleUrlClick (e) {
        e.preventDefault()
        window.open(`http://${this.props.store.About.siteUrl}` , '_blank');
    }

    render() {
        return (
            <div>
                 {this.props.store.redirect ? <div className="AdminProfile">
                    <div className="AdminProfile-wrapper">
                        <div className="col-md-3 col-sm-3 col-xs-3 profileImage"
                            style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${process.env.PUBLIC_URL}${this.props.store.User.profilePath})`, height: "inherit", borderTopLeftRadius: "inherit", borderBottomLeftRadius: "inherit" }}>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 profileNamediv">
                            < div className="profileName">{this.props.store.User.username}</div>
                            <br />
                            <span className="profileRole">{this.props.store.User.role}</span>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-3" onClick={() => this.handleModalShow('profile', 'Upload your Proflie Photo')}
                            style={{ cursor: "pointer", borderLeft: "1px solid lightgrey", height: "inherit", borderTopRightRadius: "inherit", borderBottomRightRadius: "inherit", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundImage: `url(${process.env.PUBLIC_URL}/images/camera.png)` }}></div>
                    </div>
                    <button onClick={() => this.handleLogOut()} className="btn logoutbtn"><span>DECONNECTER</span></button>
                </div> : null}
                <div className={this.props.store.redirect ? "AdminRight-wrapper" : "right-wrapper"} id="intro">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 ">
                            <div className="about_text">
                                <h4>A propos</h4>
                                <hr className="hr_about" />
                            </div>
                        </div>
                    </div>
                    <div className={this.state.cssToggle ? "container-fluid AdminAboutContainer" : "container-fluid"} id="aboutData">
                        <div >
                            <div className="row">
                                {this.props.store.redirect ?
                                    <img title="Edit About" onClick={this.editHandle} className="aboutedit" src={`${process.env.PUBLIC_URL}/images/edit icon.png`} alt="" />
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
                                        <button  
                                        onClick={(e) => {this.handleUrlClick(e)}}
                                        className="btn btn-lg" style={{ textTransform: 'uppercase' }}>
                                        {this.props.store.About.siteUrl}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="content_text">
                                        <div className="desc">
                                            <h4>La description</h4>
                                            <p>{this.props.store.About.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid" id="aboutForm" >
                        <form onKeyDown={(e) => this.handleEnterKey(e)} style={{ textAlign: "center" }}>
                            <div className=" col-md-12 col-sm-12 col-xs-12 form-group">
                                <label >Logo  </label> <span ref="nameReq" className="reqMsg"></span>
                                <input type="text" className="form-control" placeholder="upload your file"
                                    onClick={() => this.handleModalShow('logo', 'Upload your Logo')} />
                            </div>
                            <div className=" col-md-12 col-sm-12 col-xs-12 form-group">
                                <label >Prénom  </label> <span ref="nameReq" className="reqMsg"></span>
                                <input type="text" className="form-control" value={this.props.store.About.name} onChange={(e) => this.handleChange(e, 'name')} />
                            </div>
                            <div className=" col-md-12 col-sm-12 col-xs-12 form-group">
                                <label >Slogan (100 caractères) </label> <span ref="emailReq" className="reqMsg"></span>
                                <input type="text" className="form-control" value={this.props.store.About.slogan} onChange={(e) => this.handleChange(e, 'slogan')} />
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 form-group">
                                <label >Site web</label> <span ref="emailReq" className="reqMsg"></span>
                                <input type="text" className="form-control" value={this.props.store.About.siteUrl} onChange={(e) => this.handleChange(e, 'siteUrl')} />
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 form-group">
                                <label >La description </label> <span ref="messageReq" className="reqMsg"></span>
                                <textarea className="form-control" style={{ height: "150px" }} value={this.props.store.About.description} onChange={(e) => this.handleChange(e, 'description')}></textarea>
                            </div>
                            <div className=" form-group about_btns">
                                <input type="submit" className="btn btn-lg" value="Modifier" onClick={(e) => { this.editSubmit(e) }} />
                                <input type="button" className="btn btn-lg" value="Annuler" onClick={() => { this.handleCancel() }} />
                            </div>
                        </form>
                    </div>
                </div>
                {this.props.store.redirect ? null :
                    <div className="container footer_text">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="text">
                                    <p>Êtes-vous un administrateur de cette page? <Link to="/login"> Se connecter</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>}
                <Modal show={this.state.Show} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => { e.preventDefault() }}  >
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <FormControl
                                    type="file"
                                    name={this.state.uploadName}
                                    id="imageFile"
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <FormControl
                                    type="submit"
                                    value="Submit"
                                    onClick={(e) => this.handleSubmit(e)}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        )
    }
}


export default AboutComponent;
