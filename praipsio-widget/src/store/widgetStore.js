import {observable} from 'mobx'
import axios from 'axios';


class widgetStore {

    @observable Rubrics = [];
    @observable searchInput = '';
    @observable selectedQue = '';

async getRubrics() {
        await axios.get(`http://103.11.2.67:5000/api/getAllRubrics`).then((response) => {
            this.Rubrics = response.data


        })
            .catch((error) => {
                console.log(error)
            })
    }

    createContact(data) {
        return axios.post(`http://103.11.2.67:5000/api/createContact`, data)
    }   
}



const store = new widgetStore()

export default store