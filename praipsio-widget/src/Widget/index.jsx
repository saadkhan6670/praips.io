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
    backgroundColor: "#be0d0d",
    color: "white",
    padding: "22px 65px",
    borderRadius: "11px",
    border: "1px solid #be0d0d",
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
    textAlign: "center",

}


var widgetHeaderStyle = {
    height: "28px",
    width: "auto",
    backgroundColor: "#be0d0d",
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
    color: "#be0d0d",

    fontSize: "13px"
}

var askBtnStyles = {
    backgroundColor: "#be0d0d",
    color: "white",
    padding: "10px 36px",
    borderRadius: "19px",
    border: "1px solid #be0d0d",
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
    borderTop: "2.7px solid lightgrey"
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
            screenWidth: window.screen.width
        }
    }

    componentWillMount() {
        this.props.store.getRubrics()

    }
    handleHelp() {

        this.refs.widgetHelpBtn.style.display = "none"
        this.refs.widgetContainer.style.display = "block"
        this.refs.widgetHeaderDiv.style.display = "block"
        document.getElementById('helpText').innerHTML = "Aide"
        this.refs.widgetSearchInput.style.display = "block"
        document.getElementsByClassName('widGetInput')[0].focus()

    }


    handleSearch() {
        if (document.getElementsByClassName('widGetInput')[0].value.length !== 0) {
            this.props.store.searchInput = document.getElementsByClassName('widGetInput')[0].value
            this.refs.searchResultDiv.style.display = "block"
            this.refs.askQuestionBtnDiv.style.display = "block"
            this.refs.widgetSearchInput.style.backgroundColor = "#be0d0d"
            this.refs.widgetHeaderDiv.style.height = "9px"

            if (window.screen.width <= 1755) {
                this.refs.widgetContainer.style.width = "25%"


            }

            if (window.screen.width <= 1536) {
                this.refs.widgetContainer.style.width = "25%"


            }

            if (window.screen.width <= 1440) {
                this.refs.widgetContainer.style.width = "30%"


            }
            if (window.screen.width <= 1024) {
                this.refs.widgetContainer.style.width = "42%"


            }
            if (window.screen.width <= 768) {
                this.refs.widgetContainer.style.width = "57%"


            }
            if (window.screen.width <= 425) {
                this.refs.widgetContainer.style.width = "95.5%"

            }
            if (window.screen.width <= 375) {
                this.refs.widgetContainer.style.width = "95%"

            }
            if (window.screen.width <= 320) {
                this.refs.widgetContainer.style.width = "94%"

            }
            this.props.store.createResearch(document.getElementsByClassName('widGetInput')[0].value)



        }



    }



    handleQuestionClick(selectedQue,questionId, questionViews, questionRef) {
        counter++
        this.props.store.selectedQue = selectedQue
        this.refs.widgetSearchInput.style.display = "none"

        this.refs.searchResultDiv.style.display = "none"
        this.refs.questionAnswerDiv.style.display = "block"
        this.refs.backArrow.style.display = "block"
        this.refs.widgetHeaderDiv.style.height = "28px"

        if(this.refs[questionRef].className === "view") {
            questionViews += 1;
            this.props.store.updateViews(questionId, questionViews)
        }
        

    }

    handleAskQuestionClick() {
        counter++
        this.refs.widgetSearchInput.style.display = "none"

        this.refs.searchResultDiv.style.display = "none"
        this.refs.questionAnswerDiv.style.display = "none"
        this.refs.askQuestionBtnDiv.style.display = "none"
        document.getElementById('helpText').innerHTML = "Envoyez-vous votre question"

        this.refs.backArrow.style.display = "block"
        document.getElementById('contactDiv').style.display = "block"
        this.refs.widgetHeaderDiv.style.height = "28px"

    }

    handleMinimize() {
        this.refs.widgetSearchInput.style.display = "none"
        this.refs.widgetHeaderDiv.style.display = "none"
        this.refs.searchResultDiv.style.display = "none"
        this.refs.questionAnswerDiv.style.display = "none"
        this.refs.askQuestionBtnDiv.style.display = "none"
        document.getElementById('contactDiv').style.display = "none"
        document.getElementById('contactAlert').style.display = "none"
        
        this.refs.widgetHelpBtn.style.display = "block"
        this.refs.widgetSearchInput.style.backgroundColor = ""
        this.refs.widgetHeaderDiv.style.height = "28px"

        if (window.screen.width <= 1755) {
            this.refs.widgetContainer.style.width = "20%"


        }

        if (window.screen.width <= 1536) {
            this.refs.widgetContainer.style.width = "20%"


        }

        if (window.screen.width <= 1440) {
            this.refs.widgetContainer.style.width = "22%"


        }
        if (window.screen.width <= 1024) {
            this.refs.widgetContainer.style.width = "27%"


        }
        if (window.screen.width <= 768) {
            this.refs.widgetContainer.style.width = "36%"


        }
        if (window.screen.width <= 425) {
            this.refs.widgetContainer.style.width = "70%"

        }
        if (window.screen.width <= 375) {
            this.refs.widgetContainer.style.width = "80%"

        }
        if (window.screen.width <= 320) {
            this.refs.widgetContainer.style.width = "85%"

        }

    }

    handleBack() {

        if (counter === 1) {

            if (document.getElementById('contactDiv').style.display === "block") {
                document.getElementById('contactDiv').style.display = "none"
                this.refs.searchResultDiv.style.display = "block"
                this.refs.widgetSearchInput.style.display = "block"
                this.refs.askQuestionBtnDiv.style.display = "block"
                this.refs.backArrow.style.display = "none"
                document.getElementById('helpText').innerHTML = "Aide"
                this.refs.widgetHeaderDiv.style.height = "9px"


                counter--;
            }

            if (this.refs.questionAnswerDiv.style.display === "block") {
                this.refs.questionAnswerDiv.style.display = "none"
                this.refs.searchResultDiv.style.display = "block"
                this.refs.widgetSearchInput.style.display = "block"
                this.refs.askQuestionBtnDiv.style.display = "block"
                this.refs.backArrow.style.display = "none"
                this.refs.widgetHeaderDiv.style.height = "9px"

                counter--;

            }

        }

        if (counter === 2) {
            if (document.getElementById('contactDiv').style.display === "block") {
                document.getElementById('contactDiv').style.display = "none"
                this.refs.questionAnswerDiv.style.display = "block"
                this.refs.askQuestionBtnDiv.style.display = "block"
                document.getElementById('helpText').innerHTML = "Aide"
                this.refs.widgetHeaderDiv.style.height = "9px"

                counter--;


            }
        }

    }

    handleRelatedQue(selectedQue,questionId, questionViews, questionRef) {
        this.props.store.selectedQue = selectedQue;
        if(this.refs[questionRef].className === "view") {
            questionViews += 1;
            this.props.store.updateViews(questionId, questionViews)
        }
    }

    handleBacktoSearch = () => {
        document.getElementById('contactDiv').style.display = "none"

        this.refs.searchResultDiv.style.display = "block"
        this.refs.widgetSearchInput.style.display = "block"
        this.refs.askQuestionBtnDiv.style.display = "block"
        document.getElementById('helpText').innerHTML = "Aide"
        this.refs.widgetHeaderDiv.style.height = "9px"
        this.refs.backArrow.style.display = "none"
    }


    render() {
        
        let content = [];
        this.props.store.Rubrics.forEach(element => {

            element.rubricContent.forEach(rubricsContent => {
                content.push(rubricsContent)
            })

        });
        filteredContent = content.length ? content.filter((d, i) => {
            return d.content.question.toLowerCase().indexOf(this.props.store.searchInput.toLowerCase()) !== -1;
        }) : null;

        var contentToDiplay = content.length ? filteredContent.filter((d, i) => { return i <= 3 }) : null;
        var questionData = content.length ? filteredContent.find((d) => { 
            return d.content.question === this.props.store.selectedQue 
        }) : null

        var relatedQues = content.length ? filteredContent.filter((d, i) => {
            return d.content.question !== this.props.store.selectedQue && i <= 1
        }) : null


        return (
            <div id="widgetParent">
                <style type="text/css"> {
                    "\
              \
                    #widgetParent div {\
                        font-family: Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;\
                      \
                        -webkit-box-sizing: content-box!important;\
                        -moz-box-sizing: content-box!important;\
                        box-sizing: content-box!important;\
                       \
                    }\
               \
                    #widgetParent{\
                        height: unset;\
                        -webkit-box-sizing: border-box!important;\
                        -moz-box-sizing: border-box!important;\
                        box-sizing: border-box!important;\
                }\
                .widGetInput {\
                            line-height: normal;\
                }\
                .widgetTextarea {\
                    line-height: normal;\
                }\
                .widgetBtn {\
                    height: unset;\
                }\
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
            .widgetContainerDiv {\
                width: 20%;\
            }\
                 @media (max-width: 1024px) { \
                    .widgetContainerDiv {\
                        width: 28%;\
                    }\
                 }\
                 @media (max-width: 768px) { \
                    .widgetContainerDiv {\
                        width: 36%;\
                    }\
                 }\
                 @media (max-width: 426px) { \
                    #widgetParent {\
                        display: none;\
                    }\
                 }\
                 @media (max-width: 376px) { \
                    #widgetParent {\
                        display: none;\
                    }\
                 }\
                 @media (max-width: 321px) { \
                    #widgetParent {\
                        display: none;\
                    }\
                 }\
            "}</style>
                <div className="helpBtn" style={helpdivStyles} ref="widgetHelpBtn">
                    <button style={helpbtnStyles} onClick={() => this.handleHelp()}></button>

                </div>
                <div className="widgetContainerDiv" ref="widgetContainer" style={widgetContainerStyle}>
                    <div ref="widgetHeaderDiv" style={widgetHeaderStyle}>
                        <span ref="backArrow" style={backStyles} onClick={() => this.handleBack()}></span>
                        <span id="helpText">Aide</span>   <span  style={minimizeStyles} onClick={() => this.handleMinimize()}></span>

                    </div>

                    <div ref="widgetSearchInput" style={searchDivStyle}>
                        <div style={searchInnerDivStyle}>
                            <div style={searchInputDivStyle} id="searchInputDivId">

                                <input className="widGetInput" type="text" placeholder="Comment pouvons-nous vous aider ?"
                                    onKeyDown={(e) => { return e.keyCode === 13 ? this.handleSearch() : null }} style={searchInputStyle} />

                            </div>

                            <div style={searchBtnDivStyle}>

                                <div onClick={() => this.handleSearch()} style={searchBtnStyle}> </div>
                            </div>

                        </div>

                    </div>
                    <div ref="searchResultDiv" style={searchResultStyle}>
                        <h5 ref="searchResultHeading" style={{ padding: "0px 0px 0px 22px" ,fontWeight: "bold"}}>
                            {filteredContent !== null ? filteredContent.length !== 0 ? "Les meilleures réponses" : null : null}</h5>
                        <ol style={{ lineHeight: "1.7em", paddingLeft: "30px" }}>
                            {
                                filteredContent === null ? <div> obtenir des données..</div> : filteredContent.length !== 0 ?
                                    contentToDiplay.map((d,i) => {
                                        return (
                                            // eslint-disable-next-line
                                            <li><a
                                            className="view"
                                                ref={`question${i}`}
                                                onClick={ () => this.handleQuestionClick(d.content.question,d.content._id, d.content.views , `question${i}`)} 
                                                style={listAnchorStyle} href="#">
                                                {d.content.question}
                                            </a></li>
                                        )
                                    }) :
                                    <div style={{ textAlign: "center" }}>
                                        <h4 style={{ color: "black" }}>Nous n’avons pas trouvé de résultat pour {this.props.store.searchInput} </h4>
                                        <ul style={{ color: 'darkgray', textAlign: "left" }}>


                                            <h5>Ces conseils peuvent aider: </h5>
                                            <li>  
Essayez moins de mots. Ex: Délais de livraison </li>
                                            <li> Essayez différents mots-clés.   </li>
                                        </ul>
                                    </div>
                            }


                        </ol>

                    </div>
                    <div ref="questionAnswerDiv" style={questionAnswer}>

                        <h5 style={{ fontWeight: "bold" }}>{questionData ? questionData.content.question : null}</h5>
                        <p style={{ fontSize: "13px" }}>{questionData ? questionData.content.answer : null}</p>


                        <hr />
                        <h6 style={{ color: "darkgray", margin: "12px 0px" }}>
Articles Liés</h6>
                        <ul style={{ margin: "5px 0px" }}>

                            {filteredContent === null ? null : relatedQues.map((d,i) => {
                                return (
                                    <li style={relatedArticleListStyle}
                                    className="view"
                                    
                                    ref={`relQuestion${i}`}
                                 onClick={() => this.handleRelatedQue(d.content.question,d.content._id, d.content.views , `question${i}`)}
                                    // eslint-disable-next-line
                                    > <a href='#' style={{ color: "black" }}>{RemoveOverflow(d.content.question, 50)} </a></li>
                                )
                            })}

                        </ul>


                    </div>

                    <div id="contactDiv" style={contactDivStyles}>
                        <Contact store={this.props.store} handleBacktoSearch={this.handleBacktoSearch} handleSuccessHelpBtn/>
                    </div>
                    <div ref="askQuestionBtnDiv" style={askQuestionDiv}>

                        <button  className="widgetBtn" style={askBtnStyles} onClick={() => this.handleAskQuestionClick()}>Poser une question</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default Widget;
