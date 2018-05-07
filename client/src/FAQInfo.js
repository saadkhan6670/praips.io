import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

var slideIndex = 1;
var slideIndex2 = 2;

var x = document.getElementsByClassName("mySlides");


@observer class FAQInfo extends Component {
    constructor(props) {
        super();

        this.state = {

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

        if (this.refs[imgref].getAttribute('src') === "/images/plus icon.png" & this.refs[imgref].className === "view Plus") {
            this.refs[imgref].setAttribute('src', "/images/minu icon.png")
            this.refs[imgref].className = "Minus"
            this.refs[pRef].style.display = "block"
            views += 1;
            return this.props.store.updateViews(viewId, views)
        }
        else if (this.refs[imgref].getAttribute('src') === "/images/plus icon.png") {
            this.refs[imgref].setAttribute('src', "/images/minu icon.png")
            this.refs[imgref].className = "Minus"
            this.refs[pRef].style.display = "block"
        }
        else {
            this.refs[imgref].className = "Plus"
            this.refs[imgref].setAttribute('src', "/images/plus icon.png")
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
                pathname: '/faq',
                search: ''
            })
        }
        this.props.store.searchInput = searchInput
        this.props.history.push({
            pathname: '/faq/penatibus',
            search: `search=${this.props.store.searchInput}`
        })

        this.props.store.createResearch(searchInput)
    }

    mouseHover(event, id) {
        document.getElementsByClassName("AdminIcons")[id].style.display = "block"
    }

    mouseOut(event, id) {
        document.getElementsByClassName("AdminIcons")[id].style.display = "none"
    }



    render() {
        console.log("re render")
        let content = this.props.store.Rubrics === undefined ? null : this.props.store.Rubrics.find((data => { return data.slug === `/${this.props.match.params.slugName}` }))
        let filteredContent = content === undefined ? null : content.content.filter((d) => { return d.question.toLowerCase().indexOf(this.props.store.searchInput.toLowerCase()) !== -1 })

        // let content = this.props.store.Rubrics === undefined ? null : this.props.store.Rubrics.find((data => { return data.slug === `/odio` }))
        // let filteredContent = content === undefined ? null : content.content.filter((d) => { return d.question.toLowerCase().indexOf(this.props.store.searchInput.toLowerCase()) !== -1 })

        return (
            <div className="content-wrapper" id="intro">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="head_text">
                                <h1 onClick={this.checking}>Frenquently Asked Questions</h1>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
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
                <h4 className="RubricName">{content === undefined ? null : content.name.toUpperCase()}</h4>

                <div className="row RubricContent scrollbar" id="style-3" >

                    {
                        filteredContent === null ? <p>getting data...</p> : filteredContent.length === 0 ? <div>
                            <h4>  We didn't find results for {this.props.store.searchInput} </h4>

                            <b style={{ textAlign: "centre" }}>These tips might help :</b>
                            <ul>
                                <li>  Try fewer words. Ex: Time delivery </li>
                                <li> Try different keywords.   </li>
                                <li> Try a more general search (ex: "games and apps" instead of "frontierville").  </li>
                            </ul>

                        </div> : filteredContent.map((data, key) => {
                            return (<div>
                                <div className="col-md-12"
                                    // onMouseOver={(e) => { this.mouseHover(e, key) }}
                                    // onMouseLeave={(e) => { this.mouseOut(e, key) }}
                                    key={key}>

                                    <div className="col-md-8" >

                                        <h5><b>{data.question}</b>  </h5>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="AdminIcons" style={{ padding: "3px 0 0 6%" }}>
                                        {this.props.store.redirect ?
                                            <div>
                                                <img onClick={(e) => this.editHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/edit icon.png`} alt="" />
                                                <img onClick={(e) => this.deleteHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="" />
                                                <img onClick={(e) => this.upHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/up icon.png`} alt="" />
                                                <img onClick={(e) => this.downHandle(e, data, key)} style={{ cursor: "pointer" }} src={`${process.env.PUBLIC_URL}/images/down icon.png`} alt="" />
                                            </div>
                                            : null}
                                    </div>
                                    </div>
                                    <div className="col-md-1" style={{ padding: "0.5% 0 0px 1%" }}>
                                        <img src="/images/plus icon.png" alt="plus icon"
                                            ref={`plus${key}`}
                                            // handling the answer toggle and view update with its id
                                            onClick={() => this.handleContentOnOff(`plus${key}`, `answer${key}`, data._id, data.views)}
                                            className="view Plus"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">

                                    <p ref={`answer${key}`}>{data.answer}</p>
                                    <hr className="FaqInfoHr" />
                                </div>
                            </div>
                            )
                        })
                    }
                </div>

                <div className="col-md-12" style={{
                    width:"100%",
                    
                    marginTop: "25%",
                }}>
                    <div className="col-md-1 col-sm-1" style = {{ cursor : "pointer"}}>
                        
                        <img onClick={() => this.plusDivs(-1)} src={`${process.env.PUBLIC_URL}/images/left arrow.png`} alt="left arrow" />
                    
                    </div>

                    {this.props.store.Rubrics.map((data, key) => {
                        return (<div key={key}>
                            <div className="col-md-4 col-sm-4 mySlides" style={{marginLeft : "5%"}}>
                                <div>
                                    <Link to={`/faq${data.slug}`}>  <button className="btn btn-lg sliderBtn" style={{}} > {data.name} </button> </Link>
                                </div>
                            </div>
                        </div>)
                    })}

                    <div className="col-md-1 col-sm-1" style = {{ cursor : "pointer" , marginLeft:"2%" }}>
                        
                        <img onClick={() => this.plusDivs(-1)} src={`${process.env.PUBLIC_URL}/images/right arrow.png`} alt="right arrow" />
                    
                    </div>
                    

                </div>
                <div className="row contactbtn">Can't find what you looking for? <Link to="/contact" style={{ color: "#83C75A" }} >Submit a feature request</Link></div>
            </div>
        )
    }
}

export default FAQInfo;
