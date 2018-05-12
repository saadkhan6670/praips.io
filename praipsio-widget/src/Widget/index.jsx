import React, { Component } from 'react';
import Contact from './components/Contact'
import { observer } from 'mobx-react';

var filteredContent = []
var counter = 0;

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

    cursor: "pointer"

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

var searchInnerDivStyle = {
    width: "92%",
    border: "none",
    backgroundColor: "white",
    padding: "12px 12px 17px",
    borderRadius: "6px",
    height: "15px"


}

var searchBtnDivStyle = {

    textAlign: "right",
    width: "20%",
    float: "right"

}
var searchBtnStyle = {

    height: '17px',
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/search-icon.png)`,
    backgroundSize: "19px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    backgroundPositionX: "91%",
    cursor: "pointer"
}

var searchInputDivStyle = {
    textAlign: "left",
    float: "left",
    width: "80%"
}
var searchInputStyle = {
    width: "100%",
    border: "none",



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
    height: "194px",
    textAlign: "left",
    padding: "7px 10px",
    display: "none",
    overflowY: "scroll"
}

var searchResultStyle = {
    display: "none",
    padding: "0px 5px",
    textAlign: "left",

}

var askQuestionDiv = {
    textAlign: "right",
    display: "none",
    padding: "10px",
    borderTop : "2.7px solid lightgrey"
}

var contactDivStyles = {
    padding: "11px 19px",
    textAlign: "left",
    lineHeight: "31px",
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

var relatedArticleListStyle = {

    backgroundImage: `url(${process.env.PUBLIC_URL}/images/question-mark-icon.png)`,

    display: "inline-block",
    backgroundSize: "16px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",

    fontSize: "13px",
    margin: "5px 0px 0px -37px",
    listStyle: "none",
    textIndent: "21px"
}

var RemoveOverflow = (str, strlength) => {
    if (str.length > strlength) {
        str = str.substring(0, strlength) + "..."
        return str;
    }
    else {
        return str
    }


}

@observer class Widget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            testState: ""
        }
    }

    componentWillMount() {
        this.props.store.getRubrics()

    }
    handleHelp() {

        this.refs.widgetHelpBtn.style.display = "none"
        this.refs.widgetContainer.style.display = "block"
        this.refs.widgetHeaderDiv.style.display = "block"
        document.getElementById('helpText').innerHTML = "Help"
        this.refs.widgetSearchInput.style.display = "block"
        document.getElementsByClassName('widGetInput')[0].focus()

    }


    handleSearch() {
        if (document.getElementsByClassName('widGetInput')[0].value.length !== 0) {
            this.props.store.searchInput = document.getElementsByClassName('widGetInput')[0].value
            this.refs.searchResultDiv.style.display = "block"
            this.refs.askQuestionBtnDiv.style.display = "block"
            this.refs.widgetContainer.style.width = "25%"
            this.refs.widgetSearchInput.style.backgroundColor = "rgb(131, 199, 90)"
            this.refs.widgetHeaderDiv.style.height = "9px"
        }



    }



    handleQuestionClick(selectedQue) {
        counter++
        console.log(counter)
        this.props.store.selectedQue = selectedQue
        this.refs.widgetSearchInput.style.display = "none"

        this.refs.searchResultDiv.style.display = "none"
        this.refs.questionAnswerDiv.style.display = "block"
        this.refs.backArrow.style.display = "block"
        this.refs.widgetHeaderDiv.style.height = "28px"


    }

    handleAskQuestionClick() {
        counter++
        console.log(counter)
        this.refs.widgetSearchInput.style.display = "none"

        this.refs.searchResultDiv.style.display = "none"
        this.refs.questionAnswerDiv.style.display = "none"
        this.refs.askQuestionBtnDiv.style.display = "none"
        document.getElementById('helpText').innerHTML = "Submit a Feature Request"

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
        this.refs.widgetSearchInput.style.backgroundColor = ""
        this.refs.widgetHeaderDiv.style.height = "28px"



    }

    handleBack() {
        if (this.refs.searchResultDiv.style.display === "none" && this.refs.questionAnswerDiv.style.display === "block") {
            this.refs.questionAnswerDiv.style.display = "none"
            this.refs.searchResultDiv.style.display = "block"
            this.refs.widgetSearchInput.style.display = "block"

        }

        if(this.refs.searchResultDiv.style.display === "block") {
            this.refs.backArrow.style.display = "none"
        }


        if (this.refs.contactDiv.style.display === "block") {

            this.refs.contactDiv.style.display = "none"
            this.refs.backArrow.style.display = "none"
            this.refs.searchResultDiv.style.display = "block"
            this.refs.widgetSearchInput.style.display = "block"
            this.refs.askQuestionBtnDiv.style.display = "block"

            document.getElementById('helpText').innerHTML = "Help"

        }
        


    }

    handleRelatedQue(selectedQue) {
        this.props.store.selectedQue = selectedQue;
    }


    render() {
        let content = [];
        this.props.store.Rubrics.forEach(element => {

            element.content.forEach(rubricsContent => {
                content.push(rubricsContent)
            })

        });
        filteredContent = content.length ? content.filter((d, i) => {
            return d.question.toLowerCase().indexOf(this.props.store.searchInput.toLowerCase()) !== -1;
        }) : null;

        var contentToDiplay = content.length ? filteredContent.filter((d, i) => { return i <= 3 }) : null;
        var questionData = content.length ? filteredContent.find((d) => { return d.question === this.props.store.selectedQue }) : null

        var relatedQues = content.length ? filteredContent.filter((d, i) => { 
            return d.question !== this.props.store.selectedQue && i <= 1
         }) : null


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
            .widGetInput:focus {\
                outline : none;\
            }\
            #searchInputDivId:focus {\
                 outline : 'blue'\
            }\
            "}</style>
                <div style={helpdivStyles} ref="widgetHelpBtn">
                    <button style={helpbtnStyles} onClick={() => this.handleHelp()}></button>

                </div>
                <div ref="widgetContainer" style={widgetContainerStyle}>
                    <div ref="widgetHeaderDiv" style={widgetHeaderStyle}>
                        <span ref="backArrow" style={backStyles} onClick={() => this.handleBack()}></span>
                        <span id="helpText">Help</span>   <span style={minimizeStyles} onClick={() => this.handleMinimize()}></span>

                    </div>

                    <div ref="widgetSearchInput" style={searchDivStyle}>
                        <div style={searchInnerDivStyle}>
                            <div style={searchInputDivStyle} id="searchInputDivId">

                                <input className="widGetInput" type="text" placeholder="How can we help ?"
                                    onKeyDown={(e) => { return e.keyCode === 13 ? this.handleSearch() : null }} style={searchInputStyle} />

                            </div>

                            <div style={searchBtnDivStyle}>

                                <div onClick={() => this.handleSearch()} style={searchBtnStyle}> </div>
                            </div>

                        </div>

                    </div>
                    <div ref="searchResultDiv" style={searchResultStyle}>
                        <h5 ref="searchResultHeading" style={{ padding: "0px 0px 0px 22px" }}>
                        {filteredContent !== null ? filteredContent.length !== 0 ? "Best Answers" : null : null}</h5>
                        <ol style={{ lineHeight: "1.7em", paddingLeft: "30px" }}>
                            {
                                filteredContent === null ? <div> getting data..</div> : filteredContent.length !== 0 ? 
                                contentToDiplay.map(d => {
                                    return (
                                        <li><a 
                                        onClick={() => this.handleQuestionClick(d.question)} style={listAnchorStyle} href="#">{d.question}
                                        </a></li>
                                    )
                                }) :
                                    <div style={{ textAlign: "center" }}>
                                        <h4 style={{ color: "black" }}>We didn't find result for {this.props.store.searchInput} </h4>
                                        <ul style={{ color: 'darkgray', textAlign: "left" }}>


                                            <h5>These tips might help: </h5>
                                            <li>  Try fewer words. Ex: Time delivery </li>
                                            <li> Try different keywords.   </li>
                                            <li> Try a more general search (ex: "games and apps" instead of "frontierville").  </li>
                                        </ul>
                                    </div>
                            }


                        </ol>

                    </div>
                    <div ref="questionAnswerDiv" style={questionAnswer}>

                        <h5>{questionData ? questionData.question : null}</h5>
                        <p style={{ fontSize: "13px" }}>{questionData ? questionData.answer : null}</p>


                        <hr />
                        <h6 style={{ color: "darkgray", margin: "12px 0px" }}>Related Articles</h6>
                        <ul style={{ margin: "5px 0px" }}>

                            {filteredContent === null ? null : relatedQues.map(d => {
                                return (
                                    <li style={relatedArticleListStyle}
                                        onClick={() => this.handleRelatedQue(d.question)}
                                    > <a href='#' style={{ color: "black" }}>{RemoveOverflow(d.question, 50)} </a></li>
                                )
                            })}

                        </ul>


                    </div>

                    <div ref="contactDiv" style={contactDivStyles}>
                        <Contact store={this.props.store} />
                    </div>
                    <div ref="askQuestionBtnDiv" style={askQuestionDiv}>

                        <button style={askBtnStyles} onClick={() => this.handleAskQuestionClick()}>Ask a question</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default Widget;
