import {observable } from 'mobx';
import axios from 'axios'

class PraipsStore {


     Rubrics = observable([]) ;
     About = observable([]);


  async  getRubrics  ()  {

       await axios.get('http://localhost:5000/api/getAllRubrics').then((response) => {
           response.data.forEach(element => {
              this.Rubrics.push(element) 
           });

        })
        .catch((error) => {

            console.log(error)
        })
    }

    async getAbout () {

        await  axios.get('http://localhost:5000/api/getAbout').then((response) => {
           
        this.About.push(response.data)
       
 
         })
         .catch((error) => {
 
             console.log(error)
         })
    }

}

const store = new PraipsStore() ;

export default store;