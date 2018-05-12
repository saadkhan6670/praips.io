import React, { Component } from 'react';
import { observer } from 'mobx-react';

import {Redirect} from 'react-router-dom'


var textAreaStyle = {
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
    resize: "none",
    padding: "27px 12px",
    color : "lightgrey",
    overflowY: "hidden",
    cursor: "copy"
}
@observer class Script extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sortOrder: 'asc'
        }
    }

    handleCopy () {
        document.getElementById('scriptValue').select()
        document.execCommand("Copy")
    }
  

    render() {
  
        return   this.props.store.redirect ?  (

            <div className="content-wrapper">
                <div className="container-fluid" style={{ paddingRight: "30px", paddingLeft: "32px" }}>
                <div style={{height : "220px"}}></div>
                <div className="form-group">
                            <label style={{color : "#c7c2c2"}}>Copy paste this code into an HTML element on your page     or HTML file </label>
                            <textarea name="message" className="form-control" id='scriptValue' style={textAreaStyle}
                              value={`<script src="${process.env.PUBLIC_URL}/static/js/widget.js"></script>
                              <div id="praipsWidget"></div>
                              `}
                               ></textarea>
                        </div>

                        <div style={{textAlign : "center"}}>
                         
                           <input type="button" className="btn copyBtn" value="copy" onClick={() => this.handleCopy()}/>
                        </div>
                </div>
            </div>
        ) : <Redirect to="/login"/>
    }
}

export default Script;
