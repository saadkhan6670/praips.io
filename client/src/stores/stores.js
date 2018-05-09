import {
    observable
} from 'mobx';
import axios from 'axios'
import {
    getCookie
} from '../Services'
var {
    sortBy
} = require('lodash')

class PraipsStore {
    @observable Rubrics = [];
    @observable About = {};
    @observable Researches = [];
    @observable Contacts = [];
    @observable User = {};
    @observable LoginKey = getCookie('key');
    @observable redirect = false
    @observable id = ''
    @observable searchInput = '';


    async getRubrics() {
        await axios.get(`${process.env.apiURL}/api/getAllRubrics`).then((response) => {
                this.Rubrics = sortBy(response.data, [function (o) {
                    return o.sort;
                }])
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
            this.redirect = response.data
            document.cookie = `redirect=${this.redirect}; path=/`;
        }).catch((error) => {
            console.log(error)
        })
    }


    async createRubric(rubricName, rubricSlug) {
        await axios.post(`${process.env.apiURL}/api/createRubric`, {
            name: rubricName,
            slug: rubricSlug
        }).then((response) => {
            return response.data

        }).catch((error) => {
            console.log(error)
        })
    }

    createContact(data) {
        return axios.post(`${process.env.apiURL}/api/createContact`, data)
    }


    getAllContacts() {

        axios.get(`${process.env.apiURL}/api/getAllContacts`).then((response) => {

                this.Contacts = response.data

            })
            .catch((error) => {

                console.log(error)
            })
    }



    updateViews(id, views) {
        axios.post(`${process.env.apiURL}/api/updateViews`, {
                id: id,
                views: views
            }).then((response) => {})
            .catch((error) => {
                console.log(error)
            })
    }

    UpdateRubric(id, name, slug) {
        axios.post(`${process.env.apiURL}/api/updateRubcric`, {
                id: id,
                name: name,
                slug: slug
            })
            .then((response) => {
                return

            }).catch((error) => {
                console.log(error)
            })
    }

    SortRubric(sortFromId, sortTo, sortToId, sortFrom) {
        axios.post(`${process.env.apiURL}/api/sortRubrics`, {
                toId: sortFromId,
                toSort: sortTo,
                fromId: sortToId,
                fromSort: sortFrom
            })
            .then((response) => {
                return

            }).catch((error) => {
                console.log(error)
            })
    }

    RemoveRubric(id) {
        axios.post(`${process.env.apiURL}/api/removeRubrics`, {
                id: id
            })
            .then((response) => {
                return

            }).catch((error) => {
                console.log(error)
            })
    }

    async LogOutandDelKey() {
        await axios.post(`${process.env.apiURL}/api/DelLogKey`, {
            id: this.id
        }).then((response) => {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
            window.location.reload();

        }).catch((error) => {
            console.log(error)
        })
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

    getAllResearches(content) {

        axios.get(`${process.env.apiURL}/api/getAllResearches`).then((response) => {

                this.Researches = response.data

            })
            .catch((error) => {

                console.log(error)
            })
    }

    getUserData() {

        axios.get(`${process.env.apiURL}/api/getUserData/${getCookie('user_id')}`).then((response) => {
                this.User = response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }

   async UpdateRubricContent(id, question, answer) {
        await axios.post(`${process.env.apiURL}/api/updateRubcricContent`, {
                id: id,
                question: question,
                answer: answer
            })
            .then((response) => {
                return

            }).catch((error) => {
                console.log(error)
            })
    }

    RemoveRubricContent(id) {
        axios.post(`${process.env.apiURL}/api/removeRubricContent`, {
                id: id
            })
            .then((response) => {
                return

            }).catch((error) => {
                console.log(error)
            })
    }

}

const store = new PraipsStore();

export default store;