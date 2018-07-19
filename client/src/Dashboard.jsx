import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CircularProgressbar from 'react-circular-progressbar';
import { RemoveOverflow } from './Services';
import { orderBy } from 'lodash'
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';


@observer class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sortOrder: 'asc',
            show: false,
            modalContent: '',
            modalTitle: ''
        }
    }

    componentDidMount() {
        this.props.store.getAllResearches();
        this.props.store.getAllContacts();
        this.props.store.getRubrics();

        let socket = io.connect(process.env.socketURL);

        socket.on('update', (data) => {
            switch (data.api) {
                case 'RubricsChanged':
                    this.props.store.getRubrics()
                    break;

                case 'ContactChanged':
                    this.props.store.getAllContacts()
                    break;

                case 'ResearchChanged':
                    this.props.store.getAllResearches();
                    break;

                default:
                    return
            }
        })

    }

    handleSortButton(sortOrder) {
        this.setState({
            sortOrder: sortOrder
        })
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }



    handleRubricsModal = () => {
        this.setState({
            modalContent:   <table className="table">
            <thead>
                <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">Rubrics</th>
                    <th scope="col">Question</th>
                    <th scope="col">Views</th>
                </tr>
            </thead>
            <tbody>
                {this.props.store.Rubrics.map((d, i) => {

                    return (
                        <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{d.name}</td>
                            <td style={{width : "290px"}}>{d.rubricContent[0].content.question}</td>
                            <td>{d.rubricContent[0].content.views}</td>
                        </tr>
                    )
                }
                )}


            </tbody>
        </table>,
            modalTitle: 'ALL FAQS'
        })


        this.handleShow()
    }


    handleResearchLoad = () => {

  this.setState({
            modalContent:   <table className="table">
            <thead>
                <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">Research</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                {this.props.store.Researches.map((d, i) => {

                    return (
                        <tr>
                            <th scope="row">{i + 1}</th>
                            <td style={{width : "290px"}}>{d.content}</td>
                            <td>{new Date(d.createdAt).toDateString()}</td>
                        </tr>
                    )
                }
                )}


            </tbody>
        </table>,
            modalTitle: 'ALL Researches Done by User'
        })


        this.handleShow()
    }



    // REACT RENDER 
    render() {

        let content = [];
        let views = 0;
        let filteredContent = []
        let filteredResearches = []
        let sortedContent = []



        this.props.store.Rubrics.forEach(rubrics => {

            rubrics.rubricContent.forEach(rubricsContent => {
                content.push(rubricsContent)
                if (rubricsContent.content.views !== 0) {
                    views += 1;

                }
            })

        });

        filteredContent = this.props.store.Rubrics.filter((d, index1) => {

            return index1 <= 2;


        })

        filteredResearches = this.props.store.Researches.filter((d, index1) => {

            return index1 <= 1;


        })
        sortedContent = filteredContent.length !== 0 ? orderBy(filteredContent, (d) => {

            return d.rubricContent[0].content.views;
        }, this.state.sortOrder) : [];



        return this.props.store.redirect ? (

            <div className="content-wrapper dashboard" style={{ background: "#eee" }}>
                <div className="container-fluid dashcontainer">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 headcol">

                            <h3 className="heading">Dashboard</h3>

                        </div>
                    </div>
                    <div className="row" style={{ height: "53px" }}>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <p style={{ marginTop: "4px" }}>Follow in real time the performance of your FAQ</p>
                        </div>
                    </div>
                    <div className="row" style={{ minHeight: "55px", backgroundColor: "white", paddingLeft: "10px", borderRadius: '4px' }}>
                        <div className="col-md-4 col-sm-4 col-xs-12 statsUpperBar">

                            {this.props.store.Researches.length}<br />

                            <span style={{ fontSize: "11px", color: '#80808096' }}>  Research done by users </span>

                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12" style={{ borderLeft: "3px #00A79D solid", fontSize: "15px", marginTop: "7px", fontWeight: "bold" }}>


                            {this.props.store.Contacts.length}   <br />
                            <span style={{ fontSize: "12px", color: '#80808096' }}>  Message Sent </span>

                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12" style={{ borderLeft: "3px #00A79D solid", fontSize: "15px", marginTop: "7px", fontWeight: "bold" }}>
                            {/* <h4 >60</h4>
                            <p style={{ fontSize: "12px" }}>Questions in FAQ</p> */}
                            {content.length}<br />
                            <span style={{ fontSize: "12px", color: '#80808096' }}> Questions in FAQ </span>

                        </div>
                    </div>


                    <div className="row" style={{ minHeight: "20px", paddingLeft: "0px" }}> </div>






                    <div className="row" style={{ minHeight: "350px", backgroundColor: "white", padding: "14px 1px 0px", borderRadius: '4px' }}>

                        <div className="row" style={{ padding: "0px 15px 0px" }}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{ textAlign: "left", fontWeight: "bold" }}>
                                OVERVIEW - QUESTION | ANSWER
                           <hr style={{ marginTop: "11px" }} />

                            </div>
                        </div>

                        <div className="row" style={{ textAlign: " center" }}>
                            <h6 style={{ textAlign: "center", marginTop: "0px" }}>QUESTIONS SEEN</h6>
                            <CircularProgressbar percentage={Math.round((views / content.length) * 100)} />
                        </div>

                        <div className="container-fluid" style={{ padding: "13px 0px 28px 84px", height: "151px" }}>

                            <table className="table" style={{ fontSize: "12px" }}>
                                <thead>
                                    <tr>
                                        <th style={{ borderBottom: "none", padding: '0px', paddingBottom: '14px' }}>Rubrics</th>
                                        <th style={{ borderBottom: "none", padding: '0px', paddingBottom: '14px' }}>Question</th>
                                        <th style={{ borderBottom: "none" }} >Views
                                        <span className="glyphicon glyphicon-triangle-top" style={{ cursor: "pointer" }} onClick={() => this.handleSortButton('asc')}> </span>
                                            <span className="glyphicon glyphicon-triangle-bottom" style={{ cursor: "pointer" }} onClick={() => this.handleSortButton('desc')}></span> </th>
                                        {/* <th style={{ borderBottom: "none"}} ><span className="glyphicon glyphicon-triangle-top" style={{display: "block"}}></span> <span className="glyphicon glyphicon-triangle-bottom"></span></th> */}
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        sortedContent.map((d, k) => {
                                            return (
                                                <tr>
                                                    <td style={{ borderTop: "none" }}>{d.name}</td>
                                                    <td style={{ borderTop: "none", padding: '0px 0px 14px' }}>{RemoveOverflow(d.rubricContent[0].content.question, 25)}</td>
                                                    <td style={{ borderTop: "none", padding: '0px 0px 14px' }}>{d.rubricContent[0].content.views}</td>
                                                </tr>
                                            )
                                        })}



                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12"><a
                                style={{ float: "right", color: "#00A79D", padding: "0px 29px", cursor: "pointer" }}
                                onClick={this.handleRubricsModal}
                            >LOAD MORE...</a></div>
                        </div>
                    </div>





                    <div className="row" style={{ height: "20px" }}>

                    </div>


                    <div className="row" style={{ height: "125px", backgroundColor: "white", paddingLeft: "10px", borderRadius: '4px' }}>
                        <div className="row" style={{ padding: "4px 15px 0px" }}>
                            <div className="col-md-12 col-sm-12" style={{ textAlign: "left", fontWeight: "bold" }}>
                                ENTRIES ENTERED BY USERS IN THE SEARCH BOX
                           <hr style={{ marginTop: "6px" }} />

                            </div>
                        </div>

                        <div className="row" style={{ padding: "0px 15px 0px", height: "40px" }}>
                            <ul style={{ listStyleType: "none", padding: " 0px 14px" }}>
                                {filteredResearches.map((d) => {

                                    return (
                                        <li>{d.content}</li>

                                    )
                                })}

                            </ul>
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12"><a 
                            style={{ float: "right", color: "#00A79D", padding: "0px 29px", cursor: "pointer" }}
                            onClick = {this.handleResearchLoad}
                            
                            >LOAD MORE...</a></div>
                        </div>


                    </div>
                </div>
                <Modal animation={true} show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsClass="modalDashboard">
                      

                {this.state.modalContent}


                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsClass="modalDashboard-btn" onClick={() => this.handleClose()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        ) : <Redirect to="/login" />
    }
}

export default Dashboard;
