import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { CreateRubric, CreateRubricSlug } from './Services'
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';
import Search from './Search'
var { sortBy } = require('lodash')


@observer class FAQComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            RubricInput: '',
            RubricSlug: '',
            Message: '',
            ModalComponent: '',
            Show: false,
            Modalvalue: '',
            RubricIndex: '',
            RubricId: '',
            redirect: false,
            SearchValue: ''
        }
    }

    componentDidMount() {
        var query = new URLSearchParams(this.props.location.search).get('search');
        this.props.store.searchInput = query ? query : '';
        if (this.props.store.searchInput.length) {
            this.setState({
                redirect: true
            })
        }
        this.props.store.checkKey()
        this.props.store.getRubrics()
    }
    componentWillUnmount() {
        this.props.store.searchInput = '';
    }


    async HandleChange(e) {

        await this.setState({
            RubricInput: CreateRubric(e.target.value),
            RubricSlug: CreateRubricSlug(e.target.value)
        })

    }

    async handleAddBtn() {

        // Logic to handel ADD button
        if (this.state.RubricInput.length === 0) {
            this.setState({
                Message: <div className="alert alert-danger">
                    <strong >Warning: Rubric Name Can't be empty </strong>
                </div>
            })

            setTimeout(() => {
                this.setState({
                    Message: ''
                });
            }, 3000);
        }
        else {
            await this.props.store.createRubric(this.state.RubricInput, this.state.RubricSlug)
            await this.props.store.getRubrics()

            this.setState({
                Message: <div class="alert alert-success">
                    <strong>Rubric Added successful</strong>
                </div>
            })

            setTimeout(() => {
                this.setState({
                    Message: ''
                });
            }, 3000);
        }
        // Logic ends
    }

    mouseHover(event, id) {
        document.getElementsByClassName("AdminIcons")[id].style.display = "block"
    }

    mouseOut(event, id) {
        document.getElementsByClassName("AdminIcons")[id].style.display = "none"
    }

    handleModalClose = () => {
        this.setState({
            Show: false
        })
    }

    handleModalShow = () => {
        this.setState({ Show: true });
    }

    editHandle(event, data, index) {
        this.handleModalShow()
        this.setState({
            RubricIndex: index,
            Modalvalue: this.props.store.Rubrics[index].name,
            RubricId: data._id
        })
    }


    deleteHandle(event, data, index) {
        this.props.store.Rubrics.splice(index, 1)
        this.props.store.RemoveRubric(data._id)
    }

    upHandle(event, data, index) {
        if (index !== 0) {
            var sortFrom = data.sort;
            var sortTo = data.sort - 1;
            var sortFromIndex = index;
            var sortToindex = sortFromIndex - 1
            var sortToId = this.props.store.Rubrics[sortToindex]._id;

            this.props.store.Rubrics[sortToindex].sort = sortFrom;
            this.props.store.Rubrics[sortFromIndex].sort = sortTo;

            this.props.store.SortRubric(data._id, sortTo, sortToId, sortFrom)
            this.props.store.Rubrics = sortBy(this.props.store.Rubrics, [function (o) { return o.sort; }])

        }

    }

    downHandle(event, data, index) {

        if (index !== this.props.store.Rubrics.length - 1) {
            var sortFrom = data.sort; //3
            var sortTo = data.sort + 1; //4 
            var sortFromIndex = index;//2
            var sortToindex = sortFromIndex + 1 //3 
            var sortToId = this.props.store.Rubrics[sortToindex]._id;

            this.props.store.Rubrics[sortToindex].sort = sortFrom;
            this.props.store.Rubrics[sortFromIndex].sort = sortTo;

            this.props.store.SortRubric(data._id, sortTo, sortToId, sortFrom)
            this.props.store.Rubrics = sortBy(this.props.store.Rubrics, [function (o) { return o.sort; }])

        }

    }
    handleSearchClick(searchInput) {
        if (this.state.SearchValue.length === 0) {
            this.setState({
                redirect: false
            })
            this.props.history.push({
                pathname: '/faq',
                search: ''
            })
        }
        else {
            this.props.store.searchInput = this.state.SearchValue;
            this.setState({
                redirect: true
            })
            this.props.history.push({
                pathname: '/faq',
                search: `search=${this.props.store.searchInput}`
            })
            this.props.store.createResearch(this.state.SearchValue)
        }
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
                            <input type="text" className="form-control searchInput" ref="searchInput"
                                value={this.state.SearchValue}
                                onChange={(e) => {
                                    this.setState({
                                        SearchValue: e.target.value
                                    })
                                }}

                                onKeyDown={(e) => { return e.keyCode === 13 ? this.handleSearchClick(e) : null }}
                                placeholder="How can we help" />
                            <div className="input-group-btn">
                                <div className="btn-group" >

                                    <button title="Click to Search.."
                                        onClick={(e) => { this.handleSearchClick(e) }} type="button" className="btn btn-primary searchBtn">
                                        <span className="glyphicon glyphicon-search"> </span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row" style={{ height: "40px" }}></div>
                    {this.props.store.searchInput.length !== 0 ? <Search store={this.props.store} /> :
                        <div className=" row RubricStyles scrollbar" id="style-3">
                            {
                                this.props.store.Rubrics.map((data, key) => {
                                    return (
                                        <div key={key} className="col-md-6">
                                            <div

                                                key={key}>
                                                <div
                                                    onMouseOver={(e) => { this.mouseHover(e, key) }}
                                                    onMouseLeave={(e) => { this.mouseOut(e, key) }}
                                                    className="right_btn">
                                                    <div className="AdminIcons ">
                                                        {this.props.store.redirect ?
                                                            <div>
                                                                <img onClick={(e) => this.editHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/edit icon.png`} alt="" />
                                                                <img onClick={(e) => this.deleteHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="" />
                                                                <img onClick={(e) => this.upHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/up icon.png`} alt="" />
                                                                <img onClick={(e) => this.downHandle(e, data, key)} style={{ cursor: "pointer" }} src={`${process.env.PUBLIC_URL}/images/down icon.png`} alt="" />
                                                            </div>
                                                            : null}
                                                    </div>
                                                    <Link style={{ textDecoration: "none", }} to={`/faq${data.slug}`} >

                                                        <button
                                                            className="btn btn-lg" >
                                                            {data.name.toUpperCase()}
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    }


                    {
                        this.props.store.redirect ?
                            <div className="col-md-12 ">
                                <div className="col-md-8 col-sm-8">

                                    <div className="form-group has-success has-feedback">

                                        <input onChange={(e) => { this.HandleChange(e) }} type="text" className="form-control" placeholder="enter the name of Rubric" />
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-64" >
                                    <div className="right_btn">

                                        <button onClick={(e) => this.handleAddBtn(e)} style={{ width: "140px" }} className="btn btn-lg" >
                                            ADD
                                        </button>
                                    </div>
                                </div>

                            </div> : null
                    }

                    <div className="row">


                        <div className="col-md-6 col-sm-6" >
                            <div className="right_btn">
                                {this.state.Message}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal component */}
                <Modal show={this.state.Show} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter The Name Of Rubric</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <FormControl
                                    type="text"
                                    value={this.state.Modalvalue}
                                    placeholder="Enter text"
                                    onChange={(e) => {
                                        this.setState({
                                            Modalvalue: e.target.value
                                        })
                                    }}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => {
                            this.props.store.Rubrics[this.state.RubricIndex].name = this.state.Modalvalue
                            this.props.store.UpdateRubric(this.state.RubricId, this.state.Modalvalue, CreateRubricSlug(this.state.Modalvalue))
                            this.setState({
                                Show: false,
                                Modalvalue: ''
                            })
                        }}>Change</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal component */}

            </div>

        )
    }
}

export default FAQComponent;
