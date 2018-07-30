import React, { Component } from 'react';
import { observer } from 'mobx-react';



@observer class Modal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sortOrder: 'asc'
        }
    }

   
  

    render() {
  return (
    <Modal show={this.state.Show} onHide={this.handleModalClose}>
        <div>
            <Modal.Header closeButton>
                <Modal.Title>
                   {this.props.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                 {this.props.Body}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => {

                    e.preventDefault()
                    var idArr = [];

                    sortedContent.filter((data, index) => {
                        if (index > this.state.questionIndex) {
                            return idArr.push(data.content._id)
                        }
                    })

                    this.props.store.RemoveRubricContent(content._id, this.state.questionId, idArr)

                    this.setState({
                        deleteconfirm: false,
                        Show: false,
                    })
                }}>Effacer</Button>
            </Modal.Footer> </div>}
</Modal>
  )
    }
}

export default Modal;
