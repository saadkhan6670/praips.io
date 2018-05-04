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

                    this.refs.nameReq.innerHTML = "name can't contain less than 3 characters or numbers"
                    this.refs.Name.style.borderColor = "red"
                }
                if (this.refs.Name.value === "") {
                    this.refs.nameReq.innerHTML = "name is required"
                    this.refs.Name.style.borderColor = "red"
                }
                if (this.refs.Name.value.length >= 3) {

                    this.refs.nameReq.innerHTML = null
                    this.refs.Name.style.borderColor = "#ccc"
                }
                break;
            case "email":

                if (!isEmail(this.refs.Email.value)) {

                    this.refs.emailReq.innerHTML = "invalid email"
                    this.refs.Email.style.borderColor = "red"
                }

                if (this.refs.Email.value === "") {
                    this.refs.emailReq.innerHTML = "email is required"
                    this.refs.Email.style.borderColor = "red"
                }
                if (isEmail(this.refs.Email.value)) {
                    this.refs.emailReq.innerHTML = null
                    this.refs.Email.style.borderColor = "#ccc"
                }
                break;
            case "message":
                if (this.refs.Message.value === "") {
                    this.refs.messageReq.innerHTML = "message is required"
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

             var  data = {
                visitorName: this.refs.Name.value,
                toEmail: this.refs.Email.value,
                content: this.refs.Message.value,
             }
       this.props.store.createContact(data).then((response) => {

                document.getElementById("request-process").style.display = "none"
                document.getElementById('contactAlert').style.display = "block"


            }).catch((error) => {

                document.getElementById("request-process").style.display = "none"
                document.getElementById('contactAlert').style.display = "block"
                document.getElementById('contactAlert').innerHTML = "<strong> Sorry </strong> We are unable to process your request at this moment"
                document.getElementById('contactAlert').style.backgroundColor = "#f44336"
            })
        }

    }
    handleEnterKey (e) {
        if(e.keyCode === 13) {
            this.contactSubmit(e)
        }
    }

    render() {
        return (
            <div className="content-wrapper" id="intro">

                <div className="container-fluid">
                    <form id="contactForm" onSubmit={(e) => { this.contactSubmit(e) }} onKeyDown={(e) => this.handleEnterKey(e)}>
                    <h2>Submit a Feature Request</h2>
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
                        <Link to="/faq">    <input type="button" className="btn btn-lg" value="BACK TO FAQ" />  </Link>

                            <input type="submit" className="btn btn-lg" value="SEND" />

                        </div>
                    </form>
                    <div id="request-process"><h4>Processing your request</h4>
                        <span className="fa fa-spinner fa-spin fa-3x fa-fw"></span>
                    </div>
                    <div id="contactAlert">
                    <h2>Message sent</h2>
                    <span  className="alert-decline" ><p>One of our agent will contact you shortly by email <br />
                        <strong> Thank You </strong></p>
                     <Link to="/faq">   <input type="submit" className="btn btn-lg" value="BACK TO FAQ"  /> </Link>
                        
                    </span>
                    </div>
                </div>
            </div>

        )
    }
}


export default Contact;