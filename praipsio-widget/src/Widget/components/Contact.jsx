import React, { Component } from 'react';
import { isEmail } from 'validator';

var labelStyles = {
    display: "flex",
    fontWeight: "550",
    color: "grey"
}

var textAreaStyle = {
    width: "100%",
    height: "90px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "0px 0px 2px",
    backgroundColor: "inherit"


}

var inputFieldStyles = {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
    height: "30px",
    backgroundColor: "inherit"
}

var contactBtnsDivStyles = {
    textAlign: "center",
    padding: "26px 0px 0px 0px"
}
var sendBtnStyles = {
    backgroundColor: "#83C75A",
    padding: "10px 41px",
    color: "white",
    border: "1px #83C75A solid",
    borderRadius: "9px",
    cursor: "pointer"
}

var backToSearchBtnStyles = {
    backgroundColor: "inherit",
    padding: "11px 20px",
    marginRight: "29px",
    color: "rgb(204, 204, 204)",
    border: "1px solid rgb(204, 204, 204)",
    borderRadius: "9px",
    cursor: "pointer"

}

var contactAlertDiv = {
    padding: "1px",
    textAlign: "center",
    display: "none"
}

class Contact extends Component {
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
            document.getElementById("spacingDiv").style.display = "block"
        document.getElementById('helpText').innerHTML =  "Help"
            
            
            

            var data = {
                visitorName: this.refs.Name.value,
                toEmail: this.refs.Email.value,
                content: this.refs.Message.value,
            }
            this.props.store.createContact(data).then((response) => {

                document.getElementById('contactAlert').style.display = "block"
            document.getElementById('helpText').innerHTML =  "Message Sent"
      
                


            }).catch((error) => {

                document.getElementById('contactAlert').style.display = "block"
                document.getElementById('contactAlert').innerHTML = "<strong> Sorry </strong> We are unable to process your request at this moment"
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

            <div className="container-fluid">
                {/* <h2 id="headingMsg">Submit a Feature Request</h2> */}

                <form id="contactForm" onSubmit={(e) => { this.contactSubmit(e) }} onKeyDown={(e) => this.handleEnterKey(e)}>
                    <div >
                        <label style={labelStyles}>How can we help? <span style={{ color: "#1eace2" }}>*</span></label> <span ref="messageReq" className="reqMsg"></span>
                        <textarea name="message" style={textAreaStyle} ref='Message'
                            onChange={() => this.onChangeValidation(this.refs.Message.name)}></textarea>
                    </div>

                    <div>
                        <label style={labelStyles}>Your name <span style={{ color: "#1eace2" }}>*</span> </label> <span ref="nameReq" className="reqMsg"></span>
                        <input type="text" name="name" style={inputFieldStyles} ref="Name" onChange={() => this.onChangeValidation(this.refs.Name.name)} />
                    </div>

                    <div >
                        <label style={labelStyles}>Your email <span style={{ color: "#1eace2" }}>*</span></label> <span ref="emailReq" className="reqMsg"></span>
                        <input type="text" name="email" style={inputFieldStyles} ref="Email" onChange={() => this.onChangeValidation(this.refs.Email.name)} />
                    </div>

                    <div style={contactBtnsDivStyles}>


                        <input type="button" style={backToSearchBtnStyles} value="Back to Search" />

                        <input type="submit" style={sendBtnStyles} value="Send" />

                    </div>
                </form>

                <div className="row" id="spacingDiv" ></div>

                <div id="contactAlert" style={contactAlertDiv} >

                    <p>One of our agent will contact you shortly by email </p>
                    <input type="submit" style={sendBtnStyles} value="Help" />


                </div>
            </div>

        );
    }
}

export default Contact;
