import {observable  } from 'mobx';
import axios from 'axios'

class PraipsStore {


    @observable Rubrics = []  ;
    @observable About = [] ;


   async getRubrics  ()  {

    await    axios.get(`${process.env.apiURL}/api/getAllRubrics`).then((response) => {
           

      this.Rubrics = response.data
          

        })
        .catch((error) => {

            console.log(error)
        })
    }

   async getAbout () {

        await  axios.get(`${process.env.apiURL}/api/getAbout`).then((response) => {
       
         this.About = response.data
 
         })
         .catch((error) => {
 
             console.log(error)
         })
    }

}

const store = new PraipsStore() ;

export default store;