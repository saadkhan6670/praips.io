import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator';


import { observer } from 'mobx-react';


@observer class Contact extends Component {

    onChangeValidation(fieldName) {

        switch (fieldName) {
            case "name":
                // validation for name field if user provide less than 3 chars
                if (this.refs.Name.value.length < 3) {

                    this.refs.nameReq.innerHTML = "le nom ne peut pas contenir moins de 3 caractères ou chiffres"
                    this.refs.Name.style.borderColor = "red"
                }
                if (this.refs.Name.value === "") {
                    this.refs.nameReq.innerHTML = "Le nom est requis"
                    this.refs.Name.style.borderColor = "red"
                }
                if (this.refs.Name.value.length >= 3) {

                    this.refs.nameReq.innerHTML = null
                    this.refs.Name.style.borderColor = "#ccc"
                }
                break;
            case "email":

                if (!isEmail(this.refs.Email.value)) {

                    this.refs.emailReq.innerHTML = "email invalide"
                    this.refs.Email.style.borderColor = "red"
                }

                if (this.refs.Email.value === "") {
                    this.refs.emailReq.innerHTML = "email est requis"
                    this.refs.Email.style.borderColor = "red"
                }
                if (isEmail(this.refs.Email.value)) {
                    this.refs.emailReq.innerHTML = null
                    this.refs.Email.style.borderColor = "#ccc"
                }
                break;
            case "message":
                if (this.refs.Message.value === "") {
                    this.refs.messageReq.innerHTML = "un message est requis"
                    this.refs.Message.style.borderColor = "red"
                }
                else {
                    this.refs.messageReq.innerHTML = null
                    this.refs.Message.style.borderColor = "#ccc"
                }
                break;
            default:
                return;

        }
    }


    contactSubmit(e) {
        e.preventDefault();

        if (this.refs.Name.value.length < 3) {
            this.refs.nameReq.innerHTML = "name can't contain less than 3 characters or numbers"
            this.refs.Name.style.borderColor = "red"
        }

        if (this.refs.Name.value === "") {
            this.refs.nameReq.innerHTML = "name is required"
            this.refs.Name.style.borderColor = "red"
        }

        if (!isEmail(this.refs.Email.value)) {

            this.refs.emailReq.innerHTML = "invalid email"
            this.refs.Email.style.borderColor = "red"
        }

        if (this.refs.Email.value === "") {

            this.refs.emailReq.innerHTML = "email is required"
            this.refs.Email.style.borderColor = "red"
        }

        if (this.refs.Message.value === "") {
            this.refs.messageReq.innerHTML = "message is required"
            this.refs.Message.style.borderColor = "red"
        }

        if (this.refs.Name.value !== "" && this.refs.Email.value !== "" && this.refs.Message.value !== "" && isEmail(this.refs.Email.value)) {
           
            document.getElementById("contactForm").style.display = "none"
            document.getElementById("request-process").style.display = "block"
            document.getElementById("spacingDiv").style.display = "block"
            document.getElementById("headingMsg").innerHTML = ""

            var data = {
                visitorName: this.refs.Name.value,
                toEmail: this.refs.Email.value,
                content: this.refs.Message.value,
            }
            this.props.store.createContact(data).then((response) => {

                document.getElementById("request-process").style.display = "none"
                document.getElementById('contactAlert').style.display = "block"
                document.getElementById("headingMsg").innerHTML = "Message envoyé"

            }).catch((error) => {

                document.getElementById("request-process").style.display = "none"
                document.getElementById('contactAlert').style.display = "block"
                document.getElementById('contactAlert').innerHTML = "<strong> Pardon </strong> Nous ne sommes pas en mesure de traiter votre demande en ce moment"
                document.getElementById('contactAlert').style.backgroundColor = "#f44336"
            })
        }

    }
    handleEnterKey(e) {
        if (e.keyCode === 13) {
            this.contactSubmit(e)
        }
    }

    render() {
        return (
            <div className="content-wrapper" id="intro">
                <div className="container-fluid contact">
                    <h2 id="headingMsg">Envoyez-vous votre question</h2>

                    <form id="contactForm" onSubmit={(e) => { this.contactSubmit(e) }} onKeyDown={(e) => this.handleEnterKey(e)}>
                        <div className="form-group">
                            <label className="label1">Comment pouvons-nous vous aider? <span style={{ color: "#1eace2" }}>*</span></label> <span ref="messageReq" className="reqMsg"></span>
                            <textarea name="message" className="form-control textarea" ref='Message'
                                onChange={() => this.onChangeValidation(this.refs.Message.name)}></textarea>
                        </div>

                        <div className="form-group">
                            <label className="label2">Votre nom <span style={{ color: "#1eace2" }}>*</span> </label> <span ref="nameReq" className="reqMsg"></span>
                            <input type="text" style={{ marginTop: "11px", height: "38px", backgroundColor: "#fdfdfd" }} name="name" className="form-control" ref="Name" onChange={() => this.onChangeValidation(this.refs.Name.name)} />
                        </div>

                        <div className="form-group">
                            <label className="label3">Votre email <span style={{ color: "#1eace2" }}>*</span></label> <span ref="emailReq" className="reqMsg"></span>
                            <input type="text" style={{ marginTop: "5px", height: "38px", backgroundColor: "#fdfdfd" }} name="email" className="form-control" ref="Email" onChange={() => this.onChangeValidation(this.refs.Email.name)} />
                        </div>

                        <div className="submit_btn">

                            <Link to="/faq" style={{ textDecoration: "none" }}>
                                <input type="button" className="btn btn-lg backToFaq" value="RETOUR À LA FAQ" />
                            </Link>
                            <input type="submit" className="btn btn-lg" value="ENVOYER" />

                        </div>
                    </form>
                    <div className="row" id="spacingDiv" style={{ minHeight: "95px" }}></div>
                    <div id="request-process"><h4>Traitement de votre demande</h4>
                        <span className="fa fa-spinner fa-spin fa-3x fa-fw"></span>
                    </div>
                    <div id="contactAlert">
                    <img className="Success" src={`${process.env.PUBLIC_URL}/images/success.png`} alt="" />
                        
                        <span  >
                            <p className="Successpara" >Nous répondrons à vos questions le plus
précisément possible et dans les plus brefs délais
! </p>

                            <Link  to="/faq">   <input type="submit" className="btn btn-lg Successbtn" value="RETOUR À LA FAQ" /> </Link>

                        </span>

                    </div>
                </div>
            </div>

        )
    }
}


export default Contact;
