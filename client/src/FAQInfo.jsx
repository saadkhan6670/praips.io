import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Modal, Button, FormGroup, FormControl, Overlay, Popover } from 'react-bootstrap';
import { sortBy } from 'lodash'
import Search from './Search'
import { ValidateImageSize, ValidateImageType, insertTextAtCursor } from './Services'


var slideIndex = 1;
var slideIndex2 = 2;

let content, displayContent, sortedContent;
var x = document.getElementsByClassName("mySlides");

const ImagePopOver = (props) => (
    <Overlay
        show={props.show}
        target={props.target}
        placement="top"
        //   container='form-grou'
        containerPadding={20}


    >
    {/* {console.log(props.ansRef)} */}

        <Popover id="popover-contained" title="Upload your picture">
            <input type="file"
                name={props.uploadName} id={props.fileId} style={{ padding: "0px 0px 8px 1px" }} />
            <Button
                onClick={() => {props.handleImage(props.fileId, props.ansRef)}}
                style={{ backgroundColor: "#be0d0d", color: "white", height: "30px", padding: "5px 11px" }}
                bsSize="small">upload
             </Button> {props.fileUploadMsg}
        </Popover>
    </Overlay>
);

const LinkPopOver = (props) => (
    
      <Overlay
        show={props.show}
        target={props.target}
        placement="top"
        //   container='form-grou'
        containerPadding={20}
    >
        <Popover id="popover-contained" title="Enter the link of text">
            <input type="text" id="linkText" />
            <Button
                onClick={props.handleLink}
                style={{ backgroundColor: "#be0d0d", color: "white", height: "30px", padding: "5px 11px" }}
                bsSize="small">enter
             </Button>
        </Popover>
    </Overlay>
)

@observer class FAQInfo extends Component {
    constructor(props) {
        super();

        this.state = {
            question: '',
            questionId: '',
            questionIndex: '',
            answer: {value : ''},
            Message: '',
            Show: false,
            redirect: false,
            deleteconfirm: '',
            showImgPopover: false,
            showLinkPopover: false,
            target: '',
            uploadName: 'answer',
            fileUploadMsg: ''
        }
    }


    async getRubricsData() {

        await this.props.store.getRubrics()
        await this.showDivs(slideIndex, slideIndex2)

    }

    showDivs(n1, n2) {


        var i;
        if (n1 > x.length) {
            slideIndex = 1;

        }
        if (n2 > x.length) {
            slideIndex2 = 1;
        }
        if (n1 < 1) {
            slideIndex = x.length
            // slideIndex2 = x.length -1
        }
        if (n2 < 1) {
            slideIndex2 = x.length
            // slideIndex2 = x.length -1
        }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }


        x[slideIndex - 1].style.display = "block";
        x[slideIndex2 - 1].style.display = "block";


    }


    componentDidMount() {

        this.getRubricsData()
    }



    handleContentOnOff(imgref, pRef, viewId, views) {

        if (this.refs[imgref].getAttribute('src') === `${process.env.PUBLIC_URL}/images/plus-icon.png` & this.refs[imgref].className === "view Plus") {
            this.refs[imgref].setAttribute('src', `${process.env.PUBLIC_URL}/images/minus-icon.png`)
            this.refs[imgref].className = "Minus"
            this.refs[pRef].style.display = "block"

            if (this.props.store.redirect) {
                views += 1;
                this.props.store.updateViews(viewId, views)
            }

        }
        else if (this.refs[imgref].getAttribute('src') === `${process.env.PUBLIC_URL}/images/plus-icon.png`) {
            this.refs[imgref].setAttribute('src', `${process.env.PUBLIC_URL}/images/minus-icon.png`)
            this.refs[imgref].className = "Minus"
            this.refs[pRef].style.display = "block"
        }
        else {
            this.refs[imgref].className = "Plus"
            this.refs[imgref].setAttribute('src', `${process.env.PUBLIC_URL}/images/plus-icon.png`)
            this.refs[pRef].style.display = "none"
        }
    }



    componentWillUnmount() {
        this.props.store.searchInput = '';
    }

    plusDivs(n) {
        this.showDivs(slideIndex += n, slideIndex2 += n);
    }



    handleSearchClick(searchInput) {
        if (searchInput.length === 0) {
            this.props.history.push({
                search: ''
            })
            this.props.store.searchInput = ''
        }
        else {
            this.props.store.searchInput = searchInput
            this.props.history.push({
                pathname: `/faq/${this.props.match.params.slugName}`,
                search: `search=${this.props.store.searchInput}`
            })

            this.props.store.createResearch(searchInput)
        }

    }




    handleModalClose = () => {
        this.setState({
            Show: false,
            deleteconfirm: false,
        })

    }

    handleModalShow = () => {
        this.setState({ Show: true });
    }

    editHandle(event, data, index) {
        this.handleModalShow()
        this.setState({
            question: data.content.question,
            answer: data.content.answer,
            questionId: data.content._id
        })
    }

    deleteHandle(event, data, removeindex) {

        event.preventDefault()

        this.setState({
            questionId: data.content._id,
            deleteconfirm: true,
            questionIndex: removeindex
        })
        this.handleModalShow()
    }

    upHandle(event, data, index) {
        if (index !== 0) {
            var sortToData = sortedContent[index - 1]
            var sortFrom = data.sort;
            var sortTo = sortToData.sort

            this.props.store.SortRubricContent(data.content._id, sortTo, sortToData.content._id, sortFrom, content._id)
        }
    }

    downHandle(event, data, index) {
        if (index !== sortedContent.length - 1) {
            var sortToData = sortedContent[index + 1]
            var sortFrom = data.sort;
            var sortTo = sortToData.sort
            this.props.store.SortRubricContent(data.content._id, sortTo, sortToData.content._id, sortFrom)
        }

    }

    mouseHover(event, id) {
        document.getElementsByClassName("AdminIcons")[id].style.visibility = "visible"
    }

    mouseOut(event, id) {
        document.getElementsByClassName("AdminIcons")[id].style.visibility = "hidden"
    }

    AddRubricContent(event) {
        event.preventDefault()

        if (this.refs.Question.value.length !== 0 && this.refs.addAnswer.value.length !== 0) {

            this.props.store.createRubricContent(
                this.refs.Question.value,
                this.refs.addAnswer.value,
                content._id,
                content.rubricContent.length)


            //    var answerPara =  document.createElement("p");
            //    answerPara.innerHTML = this.refs.Answer.value
            //  var asnwerParent =   document.getElementById(`ansParent${content.rubricContent.length-1}`)
            //  console.log(asnwerParent.childNodes[0])
            //  asnwerParent.insertBefore(answerPara, asnwerParent.childNodes[0])

            this.refs.Question.value = ''
            this.refs.addAnswer.value = ''

        }
    }



    handleImageEnter = (e) => {
        this.setState({ target: e.target, showImgPopover: !this.state.showImgPopover });
    }

    handleLinkEnter = (e) => {
        this.setState({ target: e.target, showLinkPopover: !this.state.showLinkPopover });
    }

    handleLink = () => {
        var LinkText = document.getElementById('linkText')
        var start = this.refs.Answer.selectionStart;
        var end = this.refs.Answer.selectionEnd;
        var selectedText = this.refs.Answer.value.substring(start, end)
        if (this.refs.Answer.value.length) {
            this.refs.Answer.value = this.refs.Answer.value.replace(selectedText, `<a target="_blank" href=${LinkText.value}>${selectedText}</a>`)

        }

        this.setState({
            showLinkPopover: !this.state.showLinkPopover
        })

    }

    handleImage =   (fileId, ansRef) =>   {
        

        this.setState({
            fileUploadMsg: <span>Please wait...</span>
        })
        var formData = new FormData();
        var imagefile = document.querySelector(`#${fileId}`);

        formData.append(this.state.uploadName, imagefile.files[0]);

        if (ValidateImageSize(imagefile.files[0].size)) {

            if (ValidateImageType(imagefile.files[0].type)) {

                this.props.store.uploadImages(formData, this.state.uploadName).then((response) => {
                    if (ansRef.value.length) {

                        insertTextAtCursor(ansRef, `<br/><img width="100%" src=${process.env.PUBLIC_URL}/images/${response.data} alt="answerImg"/>`)
                    }
                    else {
                        insertTextAtCursor(ansRef, `<img width="100%" src=${process.env.PUBLIC_URL}/images/${response.data} alt="answerImg"/>`)
                    }
                    this.setState({
                        showImgPopover: !this.state.showImgPopover,
                        fileUploadMsg: ''
                    })

                })
                    .catch((error) => {
                        this.setState({
                            fileUploadMsg: <span style={{ color: "red" }}>An Error Occured !</span>
                        })
                    })
            }

            else {
                this.setState({
                    fileUploadMsg: <span style={{ color: "red" }}>Accepts .png .jpg .jpeg only !</span>
                })
            }

        }

        else {
            this.setState({
                fileUploadMsg: <span style={{ color: "red" }}>Max file size is 2MB !</span>
            })
        }
    }




    render() {
        // console.log(this.refs.answer1);
        content = this.props.store.Rubrics === undefined ?
            null :
            this.props.store.Rubrics.find((data => {
                return data.slug === `/${this.props.match.params.slugName}`

            }))

        displayContent = content === undefined ?
            null :
            content.rubricContent.map((d) => {
                return d;
            })


        sortedContent = content === undefined ?
            null : sortBy(displayContent, [(d) => { return d.sort }]);

        // because react does not read html in a string so
        if (sortedContent) {

            sortedContent.forEach((d, i) => {
                // console.log("p ref is ",this.refs[`answer${i}`])

                if (this.refs[`answer${i}`]) {


                    this.refs[`answer${i}`].innerHTML = d.content.answer
                }

            })
        }

        return (
            <div className="content-wrapper" id="intro" style={{ overflowY: "scroll", overflowX: "hidden" }}>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="head_text">
                                <h1 onClick={this.checking}>Questions fréquemment posées</h1>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="subText">
                                <p>Astuces et réponses de {this.props.store.About.name} équipe</p>
                            </div>
                        </div>
                    </div>
                    <div className="row search_row">

                        <div className="input-group" id="adv-search">
                            <input type="text" className="form-control searchInput" placeholder="Comment pouvons-nous vous aider" ref="searchInput"
                                onKeyDown={(e) => { return e.keyCode === 13 ? this.handleSearchClick(this.refs.searchInput.value) : null }}

                            />
                            <div className="input-group-btn">
                                <div className="btn-group" role="group">

                                    <button title="Cliquer pour chercher.." type="button"
                                        onClick={() => this.handleSearchClick(this.refs.searchInput.value)} className="btn searchBtn">
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <h4
                    className="row RubricName" style={{ display: this.props.store.searchInput.length !== 0 ? "none" : "block" }} >
                    {content === undefined ? null : content.name.toUpperCase()}</h4>
                <div className={this.props.store.redirect ? "row AdminRubricContent scrollbar" : "row RubricContent scrollbar"} id="style-3" >
                    {
                        displayContent === null || content.rubricContent.length === 0 ? null : this.props.store.searchInput.length !== 0 ?
                            <Search store={this.props.store} />

                            : sortedContent.map((data, key) => {
                                return (<div key={key}>

                                    <div className="col-md-12 col-sm-12 col-xs-12"
                                        onMouseOver={(e) => { this.mouseHover(e, key) }}
                                        onMouseLeave={(e) => { this.mouseOut(e, key) }}
                                        key={key}>

                                        <div className="col-md-8 col-sm-8  col-xs-8" >
                                            <h5><b>{data.content.question}</b></h5>
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-3" style={{ padding: "0 0 0 0" }}>
                                            <div className="AdminIcons" style={{ padding: "3px 0 0 0" }}>
                                                {this.props.store.redirect ?
                                                    <div>
                                                        <img onClick={(e) => this.editHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "6px", width: "21px" }} src={`${process.env.PUBLIC_URL}/images/edit icon.png`} alt="" />
                                                        <img onClick={(e) => this.deleteHandle(e, data, key)} className="editimg" style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="" />
                                                        <img onClick={(e) => this.upHandle(e, data, key)} className="editimg" style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/up icon.png`} alt="" />
                                                        <img onClick={(e) => this.downHandle(e, data, key)} className="editimg" style={{ cursor: "pointer" }} src={`${process.env.PUBLIC_URL}/images/down icon.png`} alt="" />
                                                    </div>
                                                    : null}
                                            </div>
                                        </div>


                                        {/* Question/Answer hide and show and views update */}

                                        <div className="col-md-1 col-sm-1 col-xs-1" style={{ padding: "0.5% 0 0px 1%" }}>
                                            <img src={`${process.env.PUBLIC_URL}/images/plus-icon.png`} alt="plus icon"
                                                ref={`plus${key}`}
                                                // handling the answer toggle and view update with its id
                                                onClick={() => this.handleContentOnOff(`plus${key}`, `answer${key}`, data.content._id, data.content.views)}
                                                className="view Plus"
                                            /><br />


                                        </div>


                                    </div>
                                    <div id={`ansParent${key}`} className="col-md-12 col-sm-12 col-sx-12">

                                        <p ref={`answer${key}`}></p>
                                        {this.props.store.redirect ?
                                            <div className="questionDiv">
                                                <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/eye-icon.png)` }}>
                                                    <span style={{ margin: "0 1px 0 1px" }}> {data.content.views} </span>

                                                </div>
                                            </div>
                                            : null}
                                        <hr className="FaqInfoHr" />
                                    </div>
                                    {/* -------- */}

                                </div>
                                )
                            })
                    }
                    {this.props.store.redirect ?
                        <div className="AddRubricContent " style={{ textAlign: "center" }}>
                            <label className="label1">Ajouter une question / réponse </label>
                            <form >
                                <div className="form-group">

                                    <input type="text" placeholder="Question" className="form-control" ref="Question" />
                                </div>




                                <div className="form-group">
                                    <ImagePopOver 
                                    show={this.state.showImgPopover}
                                    target={this.state.target}
                                    handleImage = {this.handleImage}
                                    uploadName ={this.state.uploadName}
                                    fileUploadMsg = {this.state.fileUploadMsg}
                                    fileId= "newAnsFile"
                                    ansRef={this.refs.addAnswer}
                                    />
                                    <LinkPopOver
                                      show={this.state.showLinkPopover}
                                      target={this.state.target}
                                   
                                      handleLink = {this.handleLink}
                                    />

                                    <span
                                        onClick={this.handleImageEnter}
                                        style={{
                                            backgroundImage: `url(${process.env.PUBLIC_URL}/images/img-button.png)`,

                                        }} className="btnImg">
                                    </span>
                                    <span
                                        onClick={this.handleLinkEnter}
                                        style={{
                                            backgroundImage: `url(${process.env.PUBLIC_URL}/images/link-button.png)`,


                                        }} className="btnLink"> </span>

                                    <textarea placeholder="Answer" className="form-control scrollbar" id="style-3" ref='addAnswer'></textarea>
                                </div>

                                <div className="addContentbtn">
                                    <button className="btn btn-lg" onClick={(e) => this.AddRubricContent(e)} > Add </button>
                                </div>
                            </form>
                        </div> : null}
                </div>


                <div className={this.props.store.redirect ? "col-md-12 col-sm-12 col-sx-12 AdminSlider" : "col-md-12 col-sm-12 col-sx-12 slider"}>
                    <div className="col-md-1 col-sm-1 col-xs-1">

                        <img className="leftArrow" onClick={() => this.plusDivs(-1)} src={`${process.env.PUBLIC_URL}/images/left arrow.png`} alt="left arrow" />

                    </div>

                    {this.props.store.Rubrics.map((data, key) => {
                        return (<div key={key}>
                            <div className="col-md-4 col-sm-4 col-xs-4 mySlides">
                                <div>
                                    <Link to={`/faq${data.slug}`}>  <button className={this.props.store.redirect ? "btn btn-lg AdminSliderbtn" : "btn btn-lg sliderBtn"} > {data.name} </button> </Link>
                                </div>
                            </div>
                        </div>)
                    })}

                    <div className="col-md-1 col-sm-1 col-xs-1 rightArrow">

                        <img className="rightArrow" onClick={() => this.plusDivs(-1)} src={`${process.env.PUBLIC_URL}/images/right arrow.png`} alt="right arrow" />

                    </div>

                    <div className="row contactbtn">Vous n’avez pas trouvé votre réponse? <Link to="/contact" style={{ color: "#be0d0d" }} >envoyernous
votre question</Link></div>

                </div>

                {/* Modal component */}
                <Modal show={this.state.Show} onHide={this.handleModalClose}>
                    {this.state.deleteconfirm === true ?
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Supprimer Confimrmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Êtes-vous sûr de vouloir supprimer cette question
    ?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={(e) => {

                                    e.preventDefault()
                                    var idArr = [];

                                    sortedContent.filter((data, index) => {
                                        if (index > this.state.questionIndex) {
                                            return idArr.push(data.content._id)
                                        }
                                    })

                                    this.props.store.RemoveRubricContent(content._id, this.state.questionId, idArr)

                                    this.setState({
                                        deleteconfirm: false,
                                        Show: false,
                                    })
                                }}>Effacer</Button>
                            </Modal.Footer> </div> : <div>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Modifier votre question ou réponse</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <FormGroup controlId="formBasicText">
                                        <Modal.Title>Question</Modal.Title>

                                        <input type="text" onChange={(e) => {
                                            this.setState({
                                                question: e.target.value
                                            })
                                        }} placeholder="Enter text" value={this.state.question} className="form-control" ref="Question" />

                                        <FormControl.Feedback />
                                    </FormGroup>

                                    <FormGroup controlId="formBasicText" >
                                    <ImagePopOver 
                                    show={this.state.showImgPopover}
                                    target={this.state.target}
                                    handleImage = {this.handleImage}
                                    uploadName ={this.state.uploadName}
                                    fileUploadMsg = {this.state.fileUploadMsg}
                                    fileId="editAnsFile"
                                    ansRef={this.refs.editAnswer}
                                    />
                                    <LinkPopOver
                                      show={this.state.showLinkPopover}
                                      target={this.state.target}
                                   
                                      handleLink = {this.handleLink}
                                    />
                                        <Modal.Title style={{display: "inline"}}>Répondre</Modal.Title>

                                        <span
                                        onClick={this.handleImageEnter}
                                        style={{
                                            backgroundImage: `url(${process.env.PUBLIC_URL}/images/img-button.png)`,
                                            padding : "24px 0px 0px 18px"

                                        }} className="btnImg">
                                    </span>
                                    <span
                                        onClick={this.handleLinkEnter}
                                        style={{
                                            backgroundImage: `url(${process.env.PUBLIC_URL}/images/link-button.png)`,
                                             padding : "26px 0px 0px 25px"

                                        }} className="btnLink"> </span>
                                        <textarea placeholder="Enter text" 

                                        onChange={(e) => {
                                            this.setState(this.state.answer.value = e.target.value)
                                        }} 
                                        
                                        className="form-control" value={this.state.answer} ref='editAnswer'></textarea>

                                        <FormControl.Feedback />
                                    </FormGroup>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={(e) => {
                                    this.props.store.UpdateRubricContent(this.state.questionId, this.state.question, this.state.answer)
                                    this.setState({
                                        Show: false,
                                    })
                                }}>Changement</Button>
                            </Modal.Footer>
                        </div>}
                </Modal>
                {/* Modal component */}
            </div>
        )
    }
}

export default FAQInfo;
