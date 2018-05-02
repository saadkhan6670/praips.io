import {observable  } from 'mobx';
import axios from 'axios'

class PraipsStore {


<<<<<<< HEAD
     Rubrics = observable([]) ;
     About = observable([]);
=======
    @observable Rubrics = []  ;
    @observable About = [] ;
>>>>>>> 060d98bf80b86b1e675ce46e33957b2d2246671b


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