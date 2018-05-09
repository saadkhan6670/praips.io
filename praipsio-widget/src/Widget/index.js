import React, { Component } from 'react';
import Contact from './components/Contact'


var helpdivStyles = {
    position: "fixed",
    bottom: "5px",
    right: "10px",
}

var helpbtnStyles = {
    backgroundColor: "#83C75A",
    color: "white",
    padding: "22px 65px",
    borderRadius: "11px",
    border: "1px solid #83C75A",
    fontSize: "19px",
     backgroundImage: `url(${process.env.PUBLIC_URL}/images/help-icon.png)`,
    backgroundSize: "75px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    


}
var widgetContainerStyle = {
    position: "fixed",
    bottom: "5px",
    right: "10px",
    backgroundColor: "#f1f1f1",
    width: "20%",
    textAlign: "center",

}


var widgetHeaderStyle = {
    height: "28px",
    width: "auto",
    backgroundColor: "#83C75A",
    textAlign: "center",
    fontSize: "19px",
    color: "white",
    padding: "10px 10px",
    display: "none",

}

var searchDivStyle = {
    display: "none",

    width: "auto",
    padding: "14px"
}

var searchInputStyle = {
    width: "92%",
    border: "none",
    padding: "13px",
    borderRadius: "6px",
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/search-icon.png)`,
    backgroundSize: "22px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    backgroundPositionX: "95%"

}

var listAnchorStyle = {
    color: "#83C75A",

    fontSize: "13px"
}

var askBtnStyles = {
    backgroundColor: "#83C75A",
    color: "white",
    padding: "10px 36px",
    borderRadius: "19px",
    border: "1px solid #83C75A",
    fontSize: "14px"

}

var questionAnswer = {
    textAlign: "left",
    padding: "0px 10px",
    display: "none"
}

var searchResultStyle = {
    display: "none",
    padding: "0px 5px",
    textAlign: "left"
}

var askQuestionDiv = {
    textAlign: "right",
    display: "none",
    padding: "8px"
}

var contactDivStyles = {
    padding: "11px 19px",
    textAlign: "left",
    lineHeight: "29px",
    display: "none",

}

var minimizeStyles = {

    backgroundImage: `url(${process.env.PUBLIC_URL}/images/minimize-icon.png)`,

    display: "inline-block",
    backgroundSize: "15px",
    backgroundRepeat: "no-repeat",

    height: "18px",
    width: "22px",
    float: "right",
    marginTop: "12px",
    cursor: "pointer"
}

var backStyles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/back-arrow.png)`,

    backgroundSize: "17px",
    backgroundRepeat: "no-repeat",

    height: "18px",
    width: "22px",
    float: "left",
    marginTop: "8px",
    cursor: "pointer",
    display: "none"
}

class Widget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            testState: ""
        }
    }

    componentWillMount () {
        this.props.store.getRubrics()

    }
    handleHelp() {

        this.refs.widgetHelpBtn.style.display = "none"
        this.refs.widgetContainer.style.display = "block"
        this.refs.widgetHeaderDiv.style.display = "block"
        this.refs.helpText.innerHTML = "Help"
        this.refs.widgetSearchInput.style.display = "block"
       document.getElementById('searchInputId').focus()
        
    }


    handleSearch() {
        this.refs.searchResultDiv.style.display = "block"
        this.refs.askQuestionBtnDiv.style.display = "block"
        this.refs.widgetContainer.style.width = "25%"
         this.refs.widgetSearchInput.style.backgroundColor = "rgb(131, 199, 90)"
        //  this.refs.widgetSearchInput.style.backgroundPositionX = "319px" 
         this.refs.widgetHeaderDiv.style.height = "9px"
         

    }



    handleQuestionClick() {
        this.refs.widgetSearchInput.style.display = "none"

        this.refs.searchResultDiv.style.display = "none"
        this.refs.questionAnswerDiv.style.display = "block"
        this.refs.backArrow.style.display = "block"
         this.refs.widgetHeaderDiv.style.height = "28px"


    }

    handleAskQuestionClick() {
        this.refs.widgetSearchInput.style.display = "none"

        this.refs.searchResultDiv.style.display = "none"
        this.refs.questionAnswerDiv.style.display = "none"
        this.refs.askQuestionBtnDiv.style.display = "none"
        this.refs.helpText.innerHTML = "Submit a Feature Request"
        this.refs.backArrow.style.display = "block"
        this.refs.contactDiv.style.display = "block"
         this.refs.widgetHeaderDiv.style.height = "28px"

    }

    handleMinimize() {
        this.refs.widgetSearchInput.style.display = "none"    
        this.refs.widgetHeaderDiv.style.display = "none"
        this.refs.searchResultDiv.style.display = "none"
        this.refs.questionAnswerDiv.style.display = "none"
        this.refs.askQuestionBtnDiv.style.display = "none"
        this.refs.contactDiv.style.display = "none"
        this.refs.widgetContainer.style.width = "20%"
        this.refs.widgetHelpBtn.style.display = "block"

    }

    handleBack() {

        if (this.refs.searchResultDiv.style.display === "none" && this.refs.questionAnswerDiv.style.display === "block") {
            console.log("ye wala if chala")
               this.refs.questionAnswerDiv.style.display = "none"
            this.refs.searchResultDiv.style.display = "block"
            this.refs.widgetSearchInput.style.display = "block"
       
        }

            
       if( this.refs.contactDiv.style.display === "block" &&   this.refs.searchResultDiv.style.display === "none") {
            console.log("nahi ye wala if chala")
           
               this.refs.contactDiv.style.display = "none"
               this.refs.backArrow.style.display = "none"   
               this.refs.searchResultDiv.style.display = "block"
               this.refs.widgetSearchInput.style.display = "block"
               this.refs.askQuestionBtnDiv.style.display = "block"
               this.refs.helpText.innerHTML = "Help"          
       }
    

    }
    render() {
        console.log(this.props.store.Rubrics)
        
        return (
            <div style={{ fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                <style type="text/css"> {
                    "\
            .widGetInput::placeholder {\
                color: lightgrey;\
                opacity: 1;\
                font-style: italic;\
            }\
            \
           .widGetInput:-ms-input-placeholder {\
                color: lightgrey;\
                font-style: italic;\
            }\
            \
           .widGetInput::-ms-input-placeholder {\
                color: lightgrey;\
                font-style: italic;\
            }\
            "}</style>
                <div style={helpdivStyles} ref="widgetHelpBtn">
                    <button style={helpbtnStyles} onClick={() => this.handleHelp()}></button>

                </div>
                <div ref="widgetContainer" style={widgetContainerStyle}>
                    <div ref="widgetHeaderDiv" style={widgetHeaderStyle}>  <span ref="backArrow" style={backStyles} onClick={() => this.handleBack()}></span> <span ref="helpText"></span>   <span style={minimizeStyles} onClick={() => this.handleMinimize()}></span> </div>

                    <div ref="widgetSearchInput" style={searchDivStyle}>

                        <input className="widGetInput" id="searchInputId" type="text" placeholder="How can we help ?" onKeyDown={(e) => { return e.keyCode === 13 ? this.handleSearch() : null }} style={searchInputStyle} />
                    </div>
                    <div ref="searchResultDiv" style={searchResultStyle}>
                        <h5 style={{ padding: "0px 0px 0px 22px" }}>Best Asnwers</h5>
                        <ol>
                            <li>  <a onClick={() => this.handleQuestionClick()} style={listAnchorStyle} href="#">Sed eleifend ac lorem in hendrerit. Morbi mattis luctus massa </a></li>

                        </ol>

                    </div>
                    <div ref="questionAnswerDiv" style={questionAnswer}>
                        <h5>Sed eu dictum est, a rhoncus lorem. In a turpis nunc. Fusce rutrum imperdiet eros, a vehicula justo viverra non</h5>
                        <p style={{ fontSize: "13px" }}>Nulla pulvinar erat sed mi laoreet, eget aliquam leo hendrerit. Ut lacinia ultricies augue, vitae congue arcu tempus ut.</p>
                        <hr />
                        <h6 style={{ color: "darkgray" }}>Related Articles</h6>
                        <ul>
                            <li style={{ fontSize: "13px" }}> Donec sed massa vitae est feugiat consequat et at purus. Quisque dapibus, diam in finibus congue</li>
                            <li style={{ fontSize: "13px" }}> Donec sed massa vitae est feugiat consequat et at purus. Quisque dapibus, diam in finibus congue</li>
                        </ul>


                    </div>

                    <div ref="contactDiv" style={contactDivStyles}>
                        <Contact />
                    </div>
                    <div ref="askQuestionBtnDiv" style={askQuestionDiv}>
                        <hr />

                        <button style={askBtnStyles} onClick={() => this.handleAskQuestionClick()}>Ask a question</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default Widget;
