import { observable } from 'mobx';
import axios from 'axios'

class PraipsStore {


    @observable Rubrics = [];
    @observable About = [];
    @observable searchInput = '';


    async getRubrics() {

        await axios.get(`${process.env.apiURL}/api/getAllRubrics`).then((response) => {


            this.Rubrics = response.data


        })
            .catch((error) => {

                console.log(error)
            })
    }

    async getAbout() {

        await axios.get(`${process.env.apiURL}/api/getAbout`).then((response) => {

            this.About = response.data

        })
            .catch((error) => {

                console.log(error)
            })
    }

    createContact(data) {

        return axios.post(`${process.env.apiURL}/api/createContact`, data)
    }


    updateViews(id, views) {
        axios.post(`${process.env.apiURL}/api/updateViews`, { id: id, views: views }).then((response) => {

        })
            .catch((error) => {

                console.log(error)
            })
    }

    createResearch(content) {

        return axios.post(`${process.env.apiURL}/api/createResearch`, {content : content}).then((response) => {

        })
            .catch((error) => {

                console.log(error)
            })
    }


}



const store = new PraipsStore();

export default store;