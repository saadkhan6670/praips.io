import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { toTitleCase, removeWhitespaces } from './Services'
import { Modal , Button , OverlayTrigger, FormGroup, FormControl} from 'react-bootstrap';



@observer class FAQComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            RubricInput: '',
            RubricSlug: '',
            Message: '',
            Hover: '',
            Show: false,
        }
    }

    componentDidMount() {

        // Hover Component
        this.setState({
            Hover: <div className="row AdminIcons ">
                <div className="col-md-1 col-sm-1" >
                    <img onClick={(e) => this.editHandle(e)} style={{cursor: "pointer"}} src='./images/edit icon.png' onClick={this.handleShow} alt="" />
                </div>
                <div className="col-md-1 col-sm-1" >

                    <img onClick={(e) => this.deleteHandle(e)} style={{cursor: "pointer"}} src='./images/trash.png' alt="" />

                </div>
                <div className="col-md-1 col-sm-1" >

                    <img onClick={(e) => this.upHandle(e)} style={{cursor: "pointer"}} src='./images/up icon.png' alt="" />

                </div>
                <div className="col-md-1 col-sm-1" >
                    <img onClick={(e) => this.downHandle(e)}  style={{cursor: "pointer"}} src='./images/down icon.png' alt="" />

                </div>
            </div>
        })

        this.props.store.checkKey()
        this.props.store.getRubrics()
    }

    editHandle() {

    }


    deleteHandle() {

    }

    upHandle() {

    }

    downHandle() {

    }

    async HandleChange(e) {

        await this.setState({
            RubricInput: toTitleCase(e.target.value),
            RubricSlug: removeWhitespaces(e.target.value)
        })

    }

    async handleAddBtn() {

        // Logic to handel ADD button
        if (this.state.RubricInput.length === 0) {
            this.setState({
                Message: <div className="alert alert-danger">
                    <strong>Warning: Rubric Name Can't be empty </strong>
                </div>
            })

        }
        else {
            await this.props.store.createRubric(this.state.RubricInput, this.state.RubricSlug)
            await this.props.store.getRubrics()

            this.setState({
                Message: <div class="alert alert-success">
                    <strong>Rubric Added successful</strong>
                </div>
            })

        }
        // Logic ends
    }

    mouseHover(event, id) {

        document.getElementsByClassName("AdminIcons")[id].style.display = "block"
    }

    // mouseOut(event, id) {
    //     document.getElementsByClassName("AdminIcons")[id].style.display = "none"

    // }

    handleClose = () => {
        this.setState({
            Show: false
        })
    }

    handleShow = () => {
        this.setState({ Show: true });
      }
    
    render() {

        return (
            <div className="content-wrapper" id="intro">
 {/* <Button bsStyle="primary" bsSize="medium" onClick={this.handleShow}>
          Launch demo modal
        </Button> */}
                <div className="container-fluid">
                <Modal show={this.state.Show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <form>
        <FormGroup
          controlId="formBasicText"
        >
          {/* <ControlLabel>Working example with validation</ControlLabel> */}
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
        </FormGroup>
        </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
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

                    <div className="row">
                        {this.props.store.Rubrics.map((data, key) => {
                            return (
                                <div>
                                    <div className="col-md-6 col-sm-6" key={key}>

                                        <div onMouseOver={(e) => { this.mouseHover(e, key) }}
                                            // onMouseLeave={(e) => { this.mouseOut(e, key) }}
                                            className="right_btn">
                                            {this.state.Hover}
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

                    <div className="row search_row">
                        <div className="form-group has-success has-feedback">

                            <div className="col-md-6 col-sm-6">
                                <input onChange={(e) => { this.HandleChange(e) }} type="text" className="form-control" placeholder="enter the name of Rubric" />
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-6 col-sm-6" >
                            <div className="right_btn">

                                <button onClick={(e) => this.handleAddBtn(e)} style={{ width: "140px" }} className="btn btn-lg" >
                                    ADD
                                        </button>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6" >
                            <div className="right_btn">

                                {this.state.Message}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default FAQComponent;
