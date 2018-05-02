import { observable } from 'mobx';
import axios from 'axios'
import {getCookie} from '../Services'

class PraipsStore {


    @observable Rubrics = [];
    @observable About = [];
    @observable LoginKey = getCookie('key');
    @observable redirect = Boolean(getCookie('redirect'));
    @observable id = ''

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

    async checkKey() {
        await axios.get(`${process.env.apiURL}/api/LogKeyAuth?LogKey=${this.LoginKey}`).then((response) => {
            
        }).catch((error) => {
            console.log(error)
        })
    }

    async createRubric(rubricName , rubricSlug) {
        
        await axios.post(`${process.env.apiURL}/api/createRubric`,{name:rubricName , slug : rubricSlug}).then((response) => {
            return response.data
            
        }).catch((error) => {
            console.log(error)
        })
    }

}


const store = new PraipsStore();

export default store;