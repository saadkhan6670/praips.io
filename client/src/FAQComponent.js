import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import Search from './Search'

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
            redirect: false
        }
    }


    async getRubricsData() {
        await this.props.store.getAbout()

        await this.props.store.getRubrics()
    }

    componentDidMount() {
        var query = new URLSearchParams(this.props.location.search).get('search');
        this.props.store.searchInput = query ? query : '';
        if(this.props.store.searchInput.length) {
            this.setState({
                redirect: true
            })
        }
         this.getRubricsData()
    }
    componentWillUnmount() {
        this.props.store.searchInput = '';

    }
    handleSearchClick(searchInput) {
        if (searchInput.length === 0) {
            this.setState({
                redirect: false
            })
            this.props.history.push({
                pathname: '/faq',
                search:''
              })
        }
        else {
            this.props.store.searchInput = searchInput;

            this.setState({
                redirect: true
            })
            this.props.history.push({
                pathname: '/faq',
                search: `search=${this.props.store.searchInput}`
              })

            this.props.store.createResearch(searchInput)

        }


    }
    render() {
        console.log(this.state.redirect)
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
                                <input type="text" className="form-control" ref="searchInput"
                                    onKeyDown={(e) => { return e.keyCode === 13 ? this.handleSearchClick(this.refs.searchInput.value) : null }}
                                    placeholder="How can we help" />
                                <div className="input-group-btn">
                                    <div className="btn-group" >

                                        <button title="Click to Search.."
                                            onClick={(e) => { this.handleSearchClick(this.refs.searchInput.value) }} type="button" className="btn btn-primary" style={searchBtnStyles}>
                                            <span className="glyphicon glyphicon-search">
                                            </span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ height: "40px" }}></div>

                        {  this.state.redirect  ?  <Search store={this.props.store} /> :
                    
                    <div className="row" style={{ overflowY: "scroll", height: "300px" }}>
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
                    }
                     
                      
                    </div>
                </div>

            )
    }
}

export default FAQComponent;
