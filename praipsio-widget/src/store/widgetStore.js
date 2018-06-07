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

    createResearch(content) {

        return axios.post(`${process.env.apiURL}/api/createResearch`, {
            content: content
        }).then((response) => {
        })
            .catch((error) => {
                console.log(error)
            })
    }

    updateViews(id, views) {
        axios.post(`${process.env.apiURL}/api/updateViews`, {
            id: id,
            views: views
        }).then((response) => {
        })
            .catch((error) => {
                console.log(error)
            })
    }
}



const store = new widgetStore()

export default store