import React, { Component } from 'react';
import { observer } from 'mobx-react';

var slideIndex = 1;

var x = document.getElementsByClassName("mySlides");


class FAQInfo extends Component {

    async getRubricsData() {
        await this.props.store.getRubrics()
        this.showDivs(slideIndex)
    }
 
     showDivs(n) {
        var i;
        if (n > x.length) {
            slideIndex = 1
        
        }    
        if (n < 1) {
            slideIndex = x.length
        }
        for (i = 0; i < x.length; i++) {
           x[i].style.display = "none";  
        }
        x[this.props.store.Rubrics.map( d => {return d.slug}).indexOf(`/${this.props.match.params.slugName}`)].style.display = "block";  
        // x[slideIndex].style.display = "block";  
        
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
       this.showDivs(slideIndex += n);
    }

    

    render() {
        let array = this.props.store.Rubrics.map( d => {return d})
        // console.log(array[1])
        console.log(this.props.store.Rubrics.map( d => {return d.slug}).indexOf(`/${this.props.match.params.slugName}`))

        let content = this.props.store.Rubrics.find((data => { return data.slug === `/${this.props.match.params.slugName}` }));
        return (
            <div className="content-wrapper" id="intro">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="head_text">
                                <h1>Frenquently Asked Questions Info</h1>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="subText">
                                <p>Tips and Answer from the Lorum Ipsum Team</p>
                            </div>
                        </div>
                    </div>
                    <div className="row search_row">
                        <div className="form-group has-success has-feedback">

                            <div className="col-md-12">
                                <input type="text" className="form-control" id="inputSuccess" placeholder="How can we help" />
                                <span className="glyphicon glyphicon-search form-control-feedback"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ padding: "35px 65px 0 65px", overflowY: "scroll", height: "250px", marginRight: "0px" }}>

                    <h4 style={{ color: "grey" }}>{content === undefined ? null : content.name}</h4>
                    {
                        content === undefined ? null : content.content.map((data, key) => {
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
                <div className="row" style={{ height: "150px" }}>
                    <div className="col-md-12 col-sm-12"></div>
                </div>


                <div className="row" style={{ padding: "35px 65px 0 65px", height: "100px" }}>
                    <div className="col-md-2 col-sm-2">
                        <a className="left" href="#" >
                            <span className="glyphicon glyphicon-chevron-left" style={{ background: "#83C75A" }} onClick={() => this.plusDivs(-1)}></span>
                        </a>
                    </div>
                    <div className="col-md-4 col-sm-4 mySlides">

                                <div>
                                    {/* <button className="btn btn-lg sliderBtn" > {this.props.store.Rubrics[1].name === undefined ? null :this.props.store.Rubrics[1].name} </button> */}

                                </div>
                            </div>
                    {this.props.store.Rubrics.map(data => {

                        return (<div>
                            <div className="col-md-4 col-sm-4 mySlides">

                                <div>
                                    <button className="btn btn-lg sliderBtn" > {data.name} </button>

                                </div>
                            </div>
                        </div>)
                    })}



                    <div className="col-md-2 col-sm-2">
                        <a class="right" >
                            <span className="glyphicon glyphicon-chevron-right" style={{ background: "#83C75A", textDecoration: "none" }} onClick={() => this.plusDivs(1)}></span>
                        </a>
                    </div>



                </div>
                <div className="row" style={{ height: '10px', textAlign: "center" }}>Can't find what you looking for? <a style={{ color: "#83C75A" }} href="#">Submit a feature request</a></div>
            </div>
        )
    }
}

export default observer(FAQInfo);
