import {observable} from 'mobx'
import axios from 'axios';


class widgetStore {

    @observable Rubrics = [];

async getRubrics() {
        await axios.get(`${process.env.apiURL}/api/getAllRubrics`).then((response) => {
            console.log(response.data)
            this.Rubrics = response.data


        })
            .catch((error) => {
                console.log(error)
            })
    }

}

const store = new widgetStore()

export default store