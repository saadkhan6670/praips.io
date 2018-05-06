import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CircularProgressbar from 'react-circular-progressbar';
import { RemoveOverflow } from './Services';
import { orderBy } from 'lodash'
import io from 'socket.io-client';

@observer class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sortOrder: 'asc'
        }
    }

    componentDidMount() {
        this.props.store.getAllResearches();
        this.props.store.getAllContacts();
        this.props.store.getRubrics();

     let socket =   io.connect('http://localhost:8080');

    socket.on('update', (data) => {
      switch(data.api) {
          case 'RubricsChanged': 
        this.props.store.getRubrics()
        break;  
        
        case 'ContactChanged':
        this.props.store.getAllContacts()
        break;

        case 'ResearchChanged': 
        this.props.store.getAllResearches();
        
      }
    })

    }

    handleSortButton(sortOrder) {
        this.setState({
            sortOrder: sortOrder
        })
    }

    render() {
        let content = [];
        let views;
        let filteredContent = []
        let filteredResearches = []

        let sortedContent = []



        this.props.store.Rubrics.forEach(rubrics => {

            rubrics.content.forEach(rubricsContent => {
                content.push(rubricsContent)
                if (rubricsContent.views !== 0) {
                    views = rubricsContent.views

                }
            })

        });

        filteredContent = this.props.store.Rubrics.filter((d, index1) => {

            return index1 <= 2;


        })

        filteredResearches = this.props.store.Researches.filter((d, index1) => {

            return index1 <= 1;


        })

        sortedContent = orderBy(filteredContent, (d) => {

            return d.content[0].views;
        }, this.state.sortOrder)


        return (

            <div className="content-wrapper" style={{ background: "#eee" }}>
                <div className="container-fluid" style={{ paddingRight: "30px", paddingLeft: "32px" }}>
                    <div className="row" style={{ height: "45px" }}>
                        <div className="col-md-12 col-sm-12">

                            <h3 style={{ fontWeight: "850" }}>Dashboard</h3>



                        </div>
                    </div>
                    <div className="row" style={{ height: "60px", }}>
                        <div className="col-md-12 col-sm-12">
                            <p>Follow in real time the performance of your FAQ</p>
                        </div>
                    </div>
                    <div className="row" style={{ minHeight: "55px", backgroundColor: "white", paddingLeft: "10px", borderRadius: '4px' }}>
                        <div className="col-md-4 col-sm-4" style={{ borderLeft: "3px #83C75A solid", fontSize: "15px", marginTop: "7px", fontWeight: "bold" }}>

                            {this.props.store.Researches.length}      <br />

                            <span style={{ fontSize: "12px", color: '#80808096' }}>  Research done by users </span>

                        </div>
                        <div className="col-md-4 col-sm-4" style={{ borderLeft: "3px #83C75A solid", fontSize: "15px", marginTop: "7px", fontWeight: "bold" }}>


                            {this.props.store.Contacts.length}   <br />
                            <span style={{ fontSize: "12px", color: '#80808096' }}>  Message Sent </span>

                        </div>
                        <div className="col-md-4 col-sm-4" style={{ borderLeft: "3px #83C75A solid", fontSize: "15px", marginTop: "7px", fontWeight: "bold" }}>
                            {/* <h4 >60</h4>
                            <p style={{ fontSize: "12px" }}>Questions in FAQ</p> */}
                            {content.length}<br />
                            <span style={{ fontSize: "12px", color: '#80808096' }}> Questions in FAQ </span>

                        </div>
                    </div>


                    <div className="row" style={{ minHeight: "20px", paddingLeft: "0px" }}> </div>






                    <div className="row" style={{ minHeight: "350px", backgroundColor: "white", padding: "14px 1px 0px", borderRadius: '4px' }}>

                        <div className="row" style={{ padding: "0px 15px 0px" }}>
                            <div className="col-md-12 col-sm-12" style={{ textAlign: "left", fontWeight: "bold" }}>
                                OVERVIEW - QUESTION | ANSWER
                           <hr style={{ marginTop: "11px" }} />

                            </div>
                        </div>

                        <div className="row" style={{ textAlign: " center" }}>
                            <h6 style={{ textAlign: "center", marginTop: "0px" }}>QUESTIONS SEEN</h6>
                            <CircularProgressbar percentage={views / content.length * 100} />
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
                                                    <td style={{ borderTop: "none", padding: '0px 0px 14px' }}>{RemoveOverflow(d.content[0].question, 25)}</td>
                                                    <td style={{ borderTop: "none", padding: '0px 0px 14px' }}>{d.content[0].views}</td>
                                                </tr>
                                            )
                                        })}
                                    {/* <tr>
                                   <td style={{ borderTop: "none" ,  padding: '0px 0px 14px'   }}>Doesdaasas</td>
                                   
                                   <td style={{ borderTop: "none" ,padding: '0px 0px 14px'  }}>Doeasdasdadasasdaasdas</td>
                                            <td style={{ borderTop: "none" , padding: '0px 7px 14px'  }}>23</td>
                                      </tr>
                                        
                                      <tr>
                                   <td style={{ borderTop: "none" ,  padding: '0px 0px 14px'   }}>Doesdaasas</td>
                                   
                                   <td style={{ borderTop: "none" ,padding: '0px 0px 14px'  }}>Doeasdasdadasasdaasdas</td>
                                            <td style={{ borderTop: "none" , padding: '0px 7px 14px'  }}>23</td>
                                      </tr>
                                      <tr>
                                   <td style={{ borderTop: "none" ,  padding: '0px 0px 14px'   }}>Doesdaasas</td>
                                   
                                   <td style={{ borderTop: "none" ,padding: '0px 0px 14px'  }}>Doeasdasdadasasdaasdas</td>
                                            <td style={{ borderTop: "none" , padding: '0px 7px 14px'  }}>23</td>
                                      </tr> */}


                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12"><a style={{ float: "right", color: " #8bc500", padding: "0px 29px", cursor: "pointer" }}>LOAD MORE...</a></div>
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
                            <div className="col-md-12 col-sm-12"><a style={{ float: "right", color: " #8bc500", padding: "0px 29px", cursor: "pointer" }}>LOAD MORE...</a></div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
