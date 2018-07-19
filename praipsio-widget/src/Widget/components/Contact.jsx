import React, { Component } from 'react';
import { isEmail , isNumeric} from 'validator';

var labelStyles = {
    display: "inline",
    fontWeight: "550",
    color: "grey"
}

var textAreaStyle = {
    width: "100%",
    height: "90px",
    border: "1px solid #ccc",
    borderRadius: "2px",
    padding: "0px 0px 2px",
    backgroundColor: "inherit",
    resize : "none"


}

var inputFieldStyles = {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "2px",
    height: "30px",
    backgroundColor: "inherit",
    lineHeight: "normal"
}

var contactBtnsDivStyles = {
    textAlign: "center",
    padding: "26px 0px 0px 0px"
}
var sendBtnStyles = {
    backgroundColor: "#be0d0d",
    padding: "10px 41px",
    color: "white",
    border: "1px #be0d0d solid",
    borderRadius: "9px",
    cursor: "pointer",
    lineHeight: "normal"
    
}

var backToSearchBtnStyles = {
    backgroundColor: "inherit",
    padding: "11px 20px",
    marginRight: "29px",
    color: "rgb(204, 204, 204)",
    border: "1px solid rgb(204, 204, 204)",
    borderRadius: "9px",
    lineHeight: "normal",
    cursor: "pointer"

}

var contactAlertDiv = {
    height: "288px",
    padding: "1px",
    textAlign: "center",
    display: "none"
}


var reqMsgStyle = {
    color: "red",
    fontSize: "12px",

    textAlign: "center",
}

var successIconStyle = {
    height: '100px',
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/success.png)`,
    backgroundSize: "53px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  
}

var contactGifStyle = {
    height: '300px',
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/data-loading.gif)`,
    backgroundSize: "122px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
}


var processGif = {
    display : "none"
}
class Contact extends Component {
    onChangeValidation(fieldName) {
        switch (fieldName) {
            case "name":
                // validation for name field if user provide less than 3 chars
                if ( this.refs.Name.value.length < 3 ) {
                    this.refs.nameReq.innerHTML = "le nom ne peut pas contenir moins de 3 caractères ou chiffres"
                    this.refs.Name.style.borderColor = "red"

                    
                }
                if ( isNumeric(this.refs.Name.value) ) {
                    this.refs.nameReq.innerHTML = "le nom ne peut pas contenir de nombres"
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
            this.refs.nameReq.innerHTML = "le nom ne peut pas contenir moins de 3 caractères ou chiffres"
            this.refs.Name.style.borderColor = "red"
        }

        if (this.refs.Name.value === "") {
            this.refs.nameReq.innerHTML = "Le nom est requis"
            this.refs.Name.style.borderColor = "red"
        }

        if (!isEmail(this.refs.Email.value)) {

            this.refs.emailReq.innerHTML = "email invalide"
            this.refs.Email.style.borderColor = "red"
        }

        if (this.refs.Email.value === "") {

            this.refs.emailReq.innerHTML = "email est requis"
            this.refs.Email.style.borderColor = "red"
        }

        if (this.refs.Message.value === "") {
            this.refs.messageReq.innerHTML = "un message est requis"
            this.refs.Message.style.borderColor = "red"

        }


        if (this.refs.Name.value !== "" && this.refs.Email.value !== "" && this.refs.Message.value !== "" && isEmail(this.refs.Email.value) && this.refs.Name.value.length > 2 && !isNumeric(this.refs.Name.value)) {
            document.getElementById("contactForm").style.display = "none"
            document.getElementById("request-process").style.display = "block"

            document.getElementById("spacingDiv").style.display = "block"
            document.getElementById('helpText').innerHTML = "Aide"

            var data = {
                visitorName: this.refs.Name.value,
                toEmail: this.refs.Email.value,
                content: this.refs.Message.value,
            }


            this.props.store.createContact(data)
            
            .then((response) => {
                document.getElementById("request-process").style.display = "none"

                document.getElementById('contactAlert').style.display = "block"
                document.getElementById('helpText').innerHTML = "Message envoyé"

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

            <div className="container-fluid">
                {/* <h2 id="headingMsg">Submit a Feature Request</h2> */}

                <form id="contactForm"  onSubmit={(e) => { this.contactSubmit(e) }} onKeyDown={(e) => this.handleEnterKey(e)}>
                    <div >
                        <label style={labelStyles}>Comment pouvons-nous vous aider? <span style={{ color: "#1eace2" }}>*</span></label> <span ref="messageReq" style={reqMsgStyle}></span>
                        <textarea className="widgetTextarea" name="message" style={textAreaStyle} ref='Message'
                            onChange={() => this.onChangeValidation(this.refs.Message.name)}></textarea>
                    </div>

                    <div>
                        <label style={labelStyles}>Votre nom <span style={{ color: "#1eace2" }}>*</span> </label> <span ref="nameReq" style={reqMsgStyle}></span>
                        <input type="text" name="name" style={inputFieldStyles} ref="Name" onChange={() => this.onChangeValidation(this.refs.Name.name)} />
                    </div>

                    <div >
                        <label style={labelStyles}>Votre email <span style={{ color: "#1eace2" }}>*</span></label> <span ref="emailReq" style={reqMsgStyle}></span>
                        <input type="text" name="email" style={inputFieldStyles} ref="Email" onChange={() => this.onChangeValidation(this.refs.Email.name)} />
                    </div>

                    <div style={contactBtnsDivStyles}>


                        <input type="button" style={backToSearchBtnStyles}  onClick={() => {this.props.handleBacktoSearch()}}value="Retour" />

                        <input type="submit" style={sendBtnStyles} value="Envoyer" />

                    </div>
                </form>

                <div className="row" id="spacingDiv" ></div>
                <div id="request-process" style={processGif}>
                {/* <h4>Processing your request</h4> */}
                        <div style={contactGifStyle}></div>
                    </div>
                <div id="contactAlert" style={contactAlertDiv} >
                  <div style={successIconStyle}></div>
                    <p style={{fontSize : "14px"}}>Nous répondrons à vos questions le plus
précisément possible et dans les plus brefs délais
! </p>
<input type="submit" onClick={ ()=> { this.props.handleSuccessHelpBtn()}} style={sendBtnStyles} value="Aide" />


                </div>
            </div>

        );
    }
}

export default Contact;
