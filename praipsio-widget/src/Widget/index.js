import React, { Component } from 'react';


var helpdivStyles = {
    position: "fixed",
    bottom: "5px",
    right: "10px",
}

var helpbtnStyles = {
    backgroundColor: "#83C75A",
    color: "white",
    padding: "13px 50px",
    borderRadius: "14px",
    border: "1px solid #83C75A",
    fontSize: "20px"
}
var widgetContainerStyle = {
    position: "fixed",
    bottom: "5px",
    right: "10px",
    backgroundColor: "#ebedefa3",
    width: "20%",
    textAlign: "center",
    display: "none",

}


var widgetHeaderStyle = {
    height: "30px",
    width: "auto",
    backgroundColor: "#83C75A",
    textAlign: "center",
    fontSize: "21px",
    color: "white",
    padding: "10px 10px"

}

var searchDivStyle = {

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
    backgroundPositionX: "262px"

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

class Widget extends Component {

    handleSearch() {
        console.log("running")
    }

    handleHelp() {
        this.refs.widgetHelpBtn.style.display = "none"
        this.refs.widgetContainer.style.display = "block"
    }
    render() {
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
                    <button style={helpbtnStyles} onClick={() => this.handleHelp()}>Help</button>

                </div>
                <div ref="widgetContainer" style={widgetContainerStyle}>
                    <div style={widgetHeaderStyle}> Help  </div>

                    <div ref="widgetSearchInput" style={searchDivStyle}>
                    
                        <input className="widGetInput" type="text" placeholder="How can we help ?" onKeyDown={(e) => { return e.keyCode === 13 ? this.handleSearch() : null }} style={searchInputStyle} />
                    </div>
                    <div ref="searchResultDiv">
                        <h5 style={{ padding: "0px 176px 0px 0px" }}>Best Asnwers</h5>
                        <ol >
                            <li>  <a style={listAnchorStyle} href="#">Sed eleifend ac lorem in hendrerit. Morbi mattis luctus massa </a></li>
                            <li>  <a style={listAnchorStyle} href="#">Sed eleifend ac lorem in hendrerit. Morbi mattis luctus massa </a> </li>

                            <li>  <a style={listAnchorStyle} href="#">Sed eleifend ac lorem in hendrerit. Morbi mattis luctus massa </a> </li>

                        </ol>

                    </div>
                    <hr />
                    <div ref="askQuestionBtnDiv" style={{textAlign: "right"}}>
                        <button style={askBtnStyles}>Ask a question</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Widget;
