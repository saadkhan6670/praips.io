import {observable} from 'mobx'
import axios from 'axios';


class widgetStore {

    @observable Rubrics = [];
    @observable searchInput = '';
    @observable selectedQue = '';

async getRubrics() {
        await axios.get(`${process.env.apiURL}/api/getAllRubrics`).then((response) => {
            this.Rubrics = response.data


        })
            .catch((error) => {
                console.log(error)
            })
    }

    createContact(data) {
        return axios.post(`${process.env.apiURL}/api/createContact`, data)
    }   
}



const store = new widgetStore()

export default store