import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';



class FAQComponent extends Component {

    async getRubricsData() {
        await this.props.store.getRubrics()
    }
    componentDidMount() {
        this.getRubricsData()
    }

    render() {
        return (
            <div className="content-wrapper" id="intro">
                <div className="container-fluid">
                    
                </div>
            </div>

        )
    }
}

export default observer(FAQComponent);
