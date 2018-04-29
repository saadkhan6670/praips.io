import React, { Component } from 'react';
 import {observer} from 'mobx-react';

 class FAQInfo extends Component {
    
    async getRubricsData() {
        await this.props.store.getRubrics()
    }
    componentDidMount () {
        this.getRubricsData()
            }


    render() {
        let content =  this.props.store.Rubrics.find( (data => {return  data.slug === `/${this.props.match.params.slugName}`} ));
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
                        <div class="form-group has-success has-feedback">

                            <div class="col-md-12">
                                <input type="text" class="form-control" id="inputSuccess" placeholder="How can we help" />
                                <span class="glyphicon glyphicon-search form-control-feedback"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style= {{ padding:" 0 65px 0 65px" ,overflowY : "scroll", height: "500px"}}>
                
                     <h4 style={{color : "grey"}}>{content === undefined ? null : content.name }</h4>
                {          
                  content === undefined ? null :   content.content.map( (data, key) => {
                        return (
                    <div className="col-lg-12" key={key}>
                     <h5>{data.question}</h5>
                     <p>{data.answer}</p>
                     <hr/>
                    </div>
                      )})
                }
            
                </div>
            </div>
        )
    }
}

export default observer(FAQInfo);
