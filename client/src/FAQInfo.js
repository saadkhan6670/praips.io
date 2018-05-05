import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';


var slideIndex = 1;
var slideIndex2 = 2;

var searchBtnStyles = {
    background: "white",
    color: "#ccc",
    borderLeft: "none",
    borderColor: "#ccc",
    boxShadow: "inset 0 1px 1px rgba(0,0,0,.075)",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px"
}

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

        if (this.refs[imgref].getAttribute('src') === "/images/plus icon.png" & this.refs[imgref].className === "view") {
            this.refs[imgref].setAttribute('src', "/images/minu icon.png")
            this.refs[imgref].className = ""
            this.refs[pRef].style.display = "block"
            views += 1;
            return this.props.store.updateViews(viewId, views)
        }
        else if (this.refs[imgref].getAttribute('src') === "/images/plus icon.png") {
            this.refs[imgref].setAttribute('src', "/images/minu icon.png")
            this.refs[pRef].style.display = "block"
        }
        else {
            this.refs[imgref].className = ""
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
        console.log("from search")
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



    render() {
        let content = this.props.store.Rubrics === undefined ? null : this.props.store.Rubrics.find((data => { return data.slug === `/${this.props.match.params.slugName}` }))
        let filteredContent = content === undefined ? null : content.content.filter((d) => { return d.question.toLowerCase().indexOf(this.props.store.searchInput.toLowerCase()) !== -1 })

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
                            <input type="text" className="form-control" placeholder="How can we help" ref="searchInput"
                                onKeyDown={(e) => { return e.keyCode === 13 ? this.handleClick(this.refs.searchInput.value) : null }}
                            />
                            <div className="input-group-btn">
                                <div className="btn-group" role="group">

                                    <button title="Click to Search.." type="button"
                                        onClick={() => this.handleClick(this.refs.searchInput.value)} className="btn btn-primary" style={searchBtnStyles}>
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <h4 style={{ color: "grey", padding: "14px 65px 0px" }}>{content === undefined ? null : content.name}</h4>

                <div className="row" style={{ padding: "0px 65px 0 65px", overflowY: "scroll", height: "250px", marginRight: "0px" }}>

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
                            return (
                                <div className="col-lg-12" key={key}>

                                    <h5 style={{ width: "90%" }}><b>{data.question}</b> </h5>

                                    <img src="/images/plus icon.png"
                                        style={{
                                            cursor: "pointer",
                                            position: "sticky", float: "right", bottom: "87%"
                                        }}
                                        ref={`plus${key}`}
                                        // handling the answer toggle and view update with its id
                                        onClick={() => this.handleContentOnOff(`plus${key}`, `answer${key}`, data._id, data.views)}
                                        className="view"
                                    />


                                    <p style={{ display: "none" }} ref={`answer${key}`}>{data.answer}</p>
                                    <hr />
                                </div>
                            )
                        })
                    }

                </div>
                <div className="row" style={{ height: "39px" }}>
                    <div className="col-md-12 col-sm-12"></div>
                </div>


                <div className="row" style={{ padding: "35px 65px 0 65px", height: "100px" }}>
                    <div className="col-md-2 col-sm-2">
                        <a className="left"  >
                            <span className="glyphicon glyphicon-chevron-left" style={{ background: "#83C75A" }} onClick={() => this.plusDivs(-1)}></span>
                        </a>
                    </div>
                    {this.props.store.Rubrics.map((data, key) => {

                        return (<div key={key}>
                            <div className="col-md-4 col-sm-4 mySlides">

                                <div>
                                    <Link to={`/faq${data.slug}`}>  <button className="btn btn-lg sliderBtn" > {data.name} </button> </Link>

                                </div>
                            </div>
                        </div>)
                    })}



                    <div className="col-md-2 col-sm-2">
                        <a className="right" >
                            <span className="glyphicon glyphicon-chevron-right" style={{ background: "#83C75A", textDecoration: "none" }} onClick={() => this.plusDivs(1)}></span>
                        </a>
                    </div>



                </div>
                <div className="row" style={{ height: '10px', textAlign: "center" }}>Can't find what you looking for? <Link to="/contact" style={{ color: "#83C75A" }} >Submit a feature request</Link></div>
            </div>
        )
    }
}

export default FAQInfo;
