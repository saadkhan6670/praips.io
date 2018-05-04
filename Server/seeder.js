const ViModel =require( './api/model');
var RubricsJson = require('./Rubrics.json');
var RubricsContentJson = require('./RubricsContent.json');
var mongoose = require('mongoose');

const Rubrics = mongoose.model('Rubrics');
const RubricContent = mongoose.model('RubricContent');
const Users = mongoose.model('Users');
const Contact = mongoose.model('Contact');
const Search = mongoose.model('Search');
const About = mongoose.model('About');

console.log("connecting Database..")
mongoose.connect(`mongodb://localhost/praipsDB`, { useMongoClient: true },function(err){
    if(err){
        console.log(err.message);
    }
    
});

console.log("Putting data in Rubrics")

RubricsJson.forEach(element => {
    let NewRubric = new Rubrics(element);

    NewRubric.save( (err, data) => {

        if(err)  {
      console.log(err.message)
        }
    })
});

console.log(RubricsJson.length + " rubrics saved in Database");

RubricsContentJson.forEach( (element) => {

    let NewRubricContent = new RubricContent(element)

    NewRubricContent.save( (err, data) => {

        if(err) {
            console.log(err.message)
        }
        else {
            Rubrics.updateMany({}, {$push: {content : data._id}}, (err, data) => {

                if(err) {
                    console.log(err.message)
                }
            })
        }
    })
})
console.log(RubricsContentJson.length + "contents saved in RubricsContent")

let NewUser = new Users({email: 'abc@gmail.com', password: '12345678', role: 'Administrator'});

NewUser.save((err , data) => {

    if(err) {
        console.log(err.message);
    }
})

console.log("Test User Created")

let NewAbout = new About({name: 'Lorem Ipsum', 
                        logoPath : '/images/praips Logo.png', 
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur nibh ligula, et scelerisque nisl lobortis vel. Vestibulum id tortor urna. Phasellus quis purus vel quam convallis efficitur', 
                        slogan: 'Lorem ipsum dolor sit amet consectetur'
                    })
NewAbout.save((err, data) => {
    if(err) {
        console.log(err.message)
    }
    else {
        console.log("About has been created")
    }
})
