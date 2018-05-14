import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';
import { sortBy } from 'lodash'

var slideIndex = 1;
var slideIndex2 = 2;

let content, filteredContent, sortedContent;
var x = document.getElementsByClassName("mySlides");

@observer class FAQInfo extends Component {
    constructor(props) {
        super();

        this.state = {
            question: '',
            questionId: '',
            questionIndex: '',
            answer: '',
            Message: '',
            Show: false,
            redirect: false,
            deleteconfirm: '',
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
           
            if(this.props.store.redirect) {
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



    handleClick(searchInput) {
        if (searchInput.length === 0) {
            this.props.history.push({
                search: ''
            })
            this.props.store.searchInput = ''
        }
        this.props.store.searchInput = searchInput
        this.props.history.push({
            pathname: `/faq/${this.props.match.params.slugName}`,
            search: `search=${this.props.store.searchInput}`
        })

        this.props.store.createResearch(searchInput)
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

    AddRubricContent = (event) => {
        event.preventDefault()

        if (this.refs.Question.value.length !== 0 && this.refs.Answer.value.length !== 0) {

            this.props.store.createRubricContent(
                this.refs.Question.value,
                this.refs.Answer.value,
                content._id, 
                content.rubricContent.length)

                this.refs.Question.value = ''
                this.refs.Answer.value = ''
                
        }
    }

    render() {
    
        content = this.props.store.Rubrics === undefined ?
            null :
            this.props.store.Rubrics.find((data => {
                return data.slug === `/${this.props.match.params.slugName}`

            }))

        filteredContent = content === undefined ?
            null :
            content.rubricContent.filter((d) => {
                return d.content.question.toLowerCase().indexOf(this.props.store.searchInput.toLowerCase()) !== -1
            })
        sortedContent = content === undefined ?
            null : sortBy(filteredContent, [(d) => { return d.sort }])

        return (
            <div className="content-wrapper" id="intro">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="head_text">
                                <h1 onClick={this.checking}>Frenquently Asked Questions</h1>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="subText">
                                <p>Tips and Answer from the {this.props.store.About.name} Team</p>
                            </div>
                        </div>
                    </div>
                    <div className="row search_row">

                        <div className="input-group" id="adv-search">
                            <input type="text" className="form-control searchInput" placeholder="How can we help" ref="searchInput"
                                onKeyDown={(e) => { return e.keyCode === 13 ? this.handleClick(this.refs.searchInput.value) : null }}

                            />
                            <div className="input-group-btn">
                                <div className="btn-group" role="group">

                                    <button title="Click to Search.." type="button"
                                        onClick={() => this.handleClick(this.refs.searchInput.value)} className="btn btn-primary searchBtn">
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <h4
                    className={this.props.store.redirect ? " AdminRubricName" : "row RubricName"} >
                    {content === undefined ? null : content.name.toUpperCase()}</h4>

                <div className={this.props.store.redirect ? "row AdminRubricContent scrollbar" : "row RubricContent scrollbar"} id="style-3" >
                    {
                        filteredContent === null || content.rubricContent.length === 0 ? null : filteredContent.length === 0 ? <div>
                            <h4>  We didn't find results for {this.props.store.searchInput} </h4>

                            <b style={{ textAlign: "centre" }}>These tips might help :</b>
                            <ul>
                                <li>  Try fewer words. Ex: Time delivery </li>
                                <li> Try different keywords.   </li>
                                <li> Try a more general search (ex: "games and apps" instead of "frontierville").  </li>
                            </ul>
                        </div> : sortedContent.map((data, key) => {
                            return (<div>
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
                                        /><br/>
                                       
                                        
                                    </div>
                                    
                                    
                                </div>
                                <div className="col-md-12 col-sm-12 col-sx-12">

                                    <p ref={`answer${key}`}>{data.content.answer}</p>
                                    {this.props.store.redirect ?
                                    <div className="questionDiv">
                                    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/eye-icon.png)`}}> 
                                     <span style={{margin : "0 1px 0 1px"}}> {data.content.views} </span>
                                    
                                    </div> 
                                               </div>
                                                : null}
                                    <hr className="FaqInfoHr"  />
                                </div>
                                {/* -------- */}
    
                            </div>
                            )
                        })
                    }
                    {this.props.store.redirect ?
                        <div className="AddRubricContent " style={{ textAlign: "center" }}>
                            <label className="label1">Add Question/Answer </label>
                            <form >
                                <div className="form-group">

                                    <input type="text" placeholder="Question" className="form-control" ref="Question" />
                                </div>
                                <div className="form-group">

                                    <textarea placeholder="Answer" className="form-control scrollbar" id="style-3" ref='Answer'></textarea>
                                </div>

                                <div className="addContentbtn">
                                    <button className="btn btn-lg" onClick={this.AddRubricContent} > ADD </button>
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

                    <div className="row contactbtn">Can't find what you looking for? <Link to="/contact" style={{ color: "#83C75A" }} >Submit a feature request</Link></div>

                </div>

                {/* Modal component */}
                <Modal show={this.state.Show} onHide={this.handleModalClose}>
                    {this.state.deleteconfirm === true ?
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Confimrmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are sure you want to delete this question
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
                                }}>Delete</Button>
                            </Modal.Footer> </div> : <div>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit your Question or Answer</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <FormGroup controlId="formBasicText">
                                        <Modal.Title>Question</Modal.Title>
                                        <FormControl
                                            style={{ height: '100px' }}
                                            componentClass="textarea"
                                            value={this.state.question}
                                            placeholder="Enter text"
                                            onChange={(e) => {
                                                this.setState({
                                                    question: e.target.value
                                                })
                                            }}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>

                                    <FormGroup controlId="formBasicText" >
                                        <Modal.Title>Answer</Modal.Title>
                                        <FormControl
                                            style={{ height: '200px' }}
                                            componentClass="textarea"
                                            value={this.state.answer}
                                            placeholder="Enter text"
                                            onChange={(e) => {
                                                this.setState({
                                                    answer: e.target.value
                                                })
                                            }}
                                        />
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
                                }}>Change</Button>
                            </Modal.Footer>
                        </div>}
                </Modal>
                {/* Modal component */}
            </div>
        )
    }
}

export default FAQInfo;
