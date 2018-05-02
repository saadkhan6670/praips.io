import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

var searchBtnStyles = {
    background: "white", 
    color: "#ccc", 
    borderLeft: "none",
     borderColor: "#ccc", 
    boxShadow: "inset 0 1px 1px rgba(0,0,0,.075)",
    borderTopRightRadius: "10px", 
    borderBottomRightRadius: "10px"
}


@observer class FAQComponent extends Component {
    constructor(props) {
        super();

        this.state = {
 searchInput: ''
        }
    }


    async getRubricsData() {
     await   this.props.store.getAbout()
        
        await this.props.store.getRubrics()
    }
    
    componentDidMount() {
        this.getRubricsData()
    }

    handleSearchClick () {

    }

    handleSearchInput  (e) {
this.setState({
    searchInput : e.target.value
})
    }
    render() {
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
                    <div className="input-group" id="adv-search">
                            <input type="text" className="form-control"
                            onKeyDown={(e) => {e.keyCode === 13 ? this.handleSearchInput(e) :  null}}
                            onChange={(e) => this.handleSearchInput(e)} value={this.state.searchInput} placeholder="How can we help"/>
                            <div className="input-group-btn">
                                <div className="btn-group" >

                                  <Link to={`/faq${this.props.store.Rubrics[0] === undefined  ? null : this.props.store.Rubrics[0].slug}?search=${this.state.searchInput}`}>  <button onClick={() => this.handleSearchClick()} title="Click to Search.." type="button" className="btn btn-primary" style={searchBtnStyles}><span className="glyphicon glyphicon-search"></span></button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{height:"40px"}}></div>

                    <div className="row" style={{ overflowY:  "scroll", height: "300px" }}>
                        {this.props.store.Rubrics.map((data, key) => {
                            return (
                                <div className="col-md-6 col-sm-6" key={key}>
                                    <div className="right_btn">
                                         <Link style={{ textDecoration: "none", }} to={`/faq${data.slug}`} >
                                        <button className="btn btn-lg" >
                                           {data.name}
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>

        )
    }
}

export default FAQComponent;
