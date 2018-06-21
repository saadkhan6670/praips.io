import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AboutComponent from './components/AboutComponent' 



@observer class About extends Component {


    constructor(props) {
        super(props)
        this.state = {
            cssToggle: '',

            Message: '',
            ModalComponent: '',
            Show: false,
            Modalvalue: '',
            uploadName: '',
            redirect: false,

        }
    }

    componentWillMount() {
        this.props.store.getAbout()
        if (this.props.store.redirect === true) {
            this.props.store.getUserData()
        }
    }

 

    handleSubmit(e) {
        e.preventDefault()
        var formData = new FormData();
        var imagefile = document.querySelector('#imageFile');
        formData.append(this.state.uploadName, imagefile.files[0]);
        this.props.store.uploadImages(formData, this.state.uploadName).then((response) => {

            switch (this.state.uploadName) {
                case 'profile':
                    this.props.store.User.profilePath = `/images/${response.data}`
                    break;

                case 'logo':
                    this.props.store.About.logoPath = `/images/${response.data}`
                    break;
                default:
                    return;
            }

        })
            .catch((error) => {
                console.log(error)
            })

    }



    render() {
        return (
            <div id="about">
               <AboutComponent store={this.props.store}/>
            </div>

        )
    }
}


export default About;
