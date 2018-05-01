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
       await  this.showDivs(slideIndex , slideIndex2)


    }
 
     showDivs(n1, n2) {
        
         
        var i;
        if (n1 > x.length) {
            slideIndex = 1;
            
        }    
        if(n2 > x.length) {
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
        x[slideIndex2 -1].style.display = "block";      
        
        
      }

    componentDidMount() {
   
        this.getRubricsData()
        
    }

    handleContentOnOff(spanref, pRef) {
        if (this.refs[spanref].className === "glyphicon glyphicon-minus contentToggle") {
            this.refs[spanref].className = "glyphicon glyphicon-plus contentToggle"
            this.refs[pRef].style.display = "none"
        }
        else {
            this.refs[spanref].className = "glyphicon glyphicon-minus contentToggle"
            this.refs[pRef].style.display = "block"
        }
    }



    plusDivs(n) {

       this.showDivs(slideIndex += n, slideIndex2 += n);
    }

    

    render() {

        let content = this.props.store.Rubrics.find((data => { return data.slug === `/${this.props.match.params.slugName}` }));

        return (
            <div className="content-wrapper" id="intro">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="head_text">
                                <h1>Frenquently Asked Questions</h1>
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
                        <div className="form-group has-success has-feedback">

                            <div className="col-md-12">
                                <input type="text" className="form-control" ref="searchInput" placeholder="How can we help" />
                                <span className="glyphicon glyphicon-search form-control-feedback"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 style={{ color: "grey" ,padding: "14px 65px 0px"}}>{content === undefined ? null : content.name}</h4>
                
                <div className="row" style={{ padding: "0px 65px 0 65px", overflowY: "scroll", height: "250px", marginRight: "0px" }}>

                    {
                        content === undefined ? <p>getting data...</p> : content.content.map((data, key) => {
                            return (
                                <div className="col-lg-12" key={key}>

                                    <h5><b>{data.question}</b>         <span style={{ cursor: "pointer" }} ref={`plus${key}`} onClick={() => this.handleContentOnOff(`plus${key}`, `answer${key}`)} className="glyphicon glyphicon-plus contentToggle"></span>       </h5>
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
                    {this.props.store.Rubrics.map((data, key)=> {

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
