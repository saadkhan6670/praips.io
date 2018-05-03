import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { CreateRubric, CreateRubricSlug } from './Services'
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';


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
        }
    }

    componentDidMount() {
        this.props.store.checkKey()
        this.props.store.getRubrics()
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

    }

    downHandle(event, data, index) {

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

                    <div className="RubricStyles">
                        {this.props.store.Rubrics.map((data, key) => {
                            return (
                                <div key={key} className="col-md-6" style={{ marginTop: "30px" }}>
                                    <div
                                        style={{ padding: '2%' }}
                                        key={key}>

                                        <div
                                            onMouseOver={(e) => { this.mouseHover(e, key) }}
                                            onMouseLeave={(e) => { this.mouseOut(e, key) }}
                                            className="right_btn">
                                                <div className="AdminIcons ">
                                            {this.props.store.redirect ?
                                                    <div>
                                                    <img onClick={(e) => this.editHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src='./images/edit icon.png' alt="" />
                                                    <img onClick={(e) => this.deleteHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src='./images/trash.png' alt="" />
                                                    <img onClick={(e) => this.upHandle(e, data, key)} style={{ cursor: "pointer", marginRight: "10px" }} src='./images/up icon.png' alt="" />
                                                    <img onClick={(e) => this.downHandle(e, data, key)} style={{ cursor: "pointer" }} src='./images/down icon.png' alt="" />
                                                    </div>
                                                    : null }
                                                    </div>
                                                <Link style={{ textDecoration: "none", }} to={`/faq${data.slug}`} >
                                                    <button
                                                        className="btn btn-lg" >
                                                        {data.name}
                                                    </button>
                                                </Link>
                                        </div>
                                    </div>
                                    </div>
                                    )
                                })}
        
                    </div>
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
