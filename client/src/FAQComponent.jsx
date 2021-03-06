import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { CreateRubric, slugify } from './Services'
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';
import Search from './Search'


@observer class FAQComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            RubricInput: '',
            RubricSlug: '',
            ModalComponent: '',
            Show: false,
            Modalvalue: '',
            RubricIndex: '',
            RubricId: '',
            redirect: false,
            SearchValue: '',
            deleteconfirm: '',
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
        this.props.store.getRubrics()
    }
    componentWillUnmount() {
        this.props.store.searchInput = '';
    }


    async HandleChange(e) {

        await this.setState({
            RubricInput: CreateRubric(e.target.value),
            RubricSlug: slugify(e.target.value)
        })

    }

    async handleAddBtn() {

        // Logic to handel ADD button
        if (this.state.RubricInput.length === 0) {
         

            document.getElementById('alertMessage').style.visibility = "visible"
            document.getElementById('alertMessage').innerHTML = "<strong>Warning: Rubric Name Can't be empty</strong>"
            

            setTimeout(() => {
            document.getElementById('alertMessage').style.visibility = "hidden"
              
            }, 3000);
        }
        else {
            await this.props.store.createRubric(this.state.RubricInput, this.state.RubricSlug)
            await this.props.store.getRubrics()

            document.getElementById('alertMessage').style.visibility = "visible"
            document.getElementById('alertMessage').innerHTML = "<strong>Rubric Added successfully</strong>"
            document.getElementById('alertMessage').className = "  alert alert-success"
          

            setTimeout(() => {
            document.getElementById('alertMessage').style.visibility = "hidden"
              
            }, 3000);
        
                this.refs.rubricInput.value = '';
           
           
        }
        // Logic ends
    }

    mouseHover(event, id) {
        document.getElementsByClassName("AdminIcons")[id].style.visibility = "visible"
    }

    mouseOut(event, id) {
        document.getElementsByClassName("AdminIcons")[id].style.visibility = "hidden"
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
            RubricIndex: index,
            Modalvalue: this.props.store.Rubrics[index].name,
            RubricId: data._id
        })
    }


    async deleteHandle(event, data, index) {
        await this.setState({
            deleteconfirm: true,
            Modalvalue: data.name,
            RubricIndex: index,
            RubricId: data._id
        })
        this.handleModalShow()

    }

    upHandle(event, data, index) {
        if (index !== 0) {
            var sortFrom = data.sort;
            var sortTo = data.sort - 1;
            var sortFromIndex = index;
            var sortToindex = sortFromIndex - 1
            var sortToId = this.props.store.Rubrics[sortToindex]._id;

            this.props.store.SortRubric(data._id, sortTo, sortToId, sortFrom)

        }
    }

    downHandle(event, data, index) {

        if (index !== this.props.store.Rubrics.length - 1) {
            var sortFrom = data.sort; //3
            var sortTo = data.sort + 1; //4 
            var sortFromIndex = index;//2
            var sortToindex = sortFromIndex + 1 //3 
            var sortToId = this.props.store.Rubrics[sortToindex]._id;

            this.props.store.SortRubric(data._id, sortTo, sortToId, sortFrom)

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
            this.props.store.searchInput = ''
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
            <div className="content-wrapper" id="intro" style={{overflowY : "scroll"}}>
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
                            <input  type="text" className="form-control searchInput" ref="searchInput"
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
                                        onClick={(e) => { this.handleSearchClick(e) }} type="button" className="btn searchBtn">
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
                                        <div key={key} className="col-md-6 col-sm-6 col-xs-6">

                                            <div
                                                onMouseOver={(e) => { this.mouseHover(e, key) }}
                                                onMouseLeave={(e) => { this.mouseOut(e, key) }}
                                                className="right_btn" style={{marginTop: this.props.store.redirect ? '16px' : '43px'}}>
                                                <span className="AdminIcons ">
                                                    {this.props.store.redirect ?
                                                        <div>
                                                            <img onClick={(e) => this.editHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/edit icon.png`} alt="" />
                                                            <img onClick={(e) => this.deleteHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="" />
                                                            <img onClick={(e) => this.upHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src={`${process.env.PUBLIC_URL}/images/up icon.png`} alt="" />
                                                            <img onClick={(e) => this.downHandle(e, data, key)} style={{ cursor: "pointer" }} src={`${process.env.PUBLIC_URL}/images/down icon.png`} alt="" />
                                                        </div>
                                                        : null}
                                                </span>
                                                <Link style={{ textDecoration: "none", }} to={`/faq${data.slug}`} >

                                                    <button
                                                        className="btn btn-lg" >
                                                        {data.name.toUpperCase()}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    }

                    {
                        this.props.store.redirect ?
                            <div className="col-md-12 col-sm-12 col-xs-12 AddRubric" style={{paddingTop: "15px"}}>
                                 <div id="alertMessage" className="alert alert-danger">
            <strong >Warning: Rubric Name Can't be empty </strong>
        </div>
                            
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{textAlign:"center" ,paddingBottom : "9px"}}>
                            <label className="label1">Add A new Rubric </label>
                            </div>
                                <div className="col-md-8 col-sm-8 col-sx-8">
                                
                                    <div className="form-group">

                                        <div className="loginInputs">

                                            <input onChange={(e) => { this.HandleChange(e) }} type="text" ref="rubricInput"  className="form-control" placeholder="enter the name of Rubric" />

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-4 col-xs-4 add_btn" >
                                    <button onClick={(e) => this.handleAddBtn(e)} className="btn btn-lg" >
                                        ADD
                                        </button>
                                </div>
                            </div> : null
                    }

                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12" >
                            <div className="right_btn">
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal component */}
                <Modal show={this.state.Show} onHide={this.handleModalClose}>
                    {this.state.deleteconfirm === true ?
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Confimrmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are sure you want to delete <Modal.Title>{this.state.Modalvalue} ?</Modal.Title>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={(e) => {
                                    this.props.store.RemoveRubric(this.state.RubricId , this.state.RubricIndex)
                                    this.setState({
                                        deleteconfirm: false,
                                        Show: false,
                                        Modalvalue: ''
                                    })
                                    
                                }}>Delete</Button>
                            </Modal.Footer> </div> : <div>
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
                                    
                                    this.props.store.UpdateRubric(this.state.RubricId, this.state.Modalvalue, slugify(this.state.Modalvalue))
                                    this.setState({
                                        Show: false,
                                        Modalvalue: ''
                                    })
                                }}>Change</Button>
                            </Modal.Footer> </div>}

                </Modal>
                {/* Modal component */}
            </div>

        )
    }
}

export default FAQComponent;
