const ViModel = require('./api/model');
var RubricsJson = require('./Rubrics.json');
var RubricsContentJson = require('./RubricsContent.json');
var mongoose = require('mongoose');

const Rubrics = mongoose.model('Rubrics');
const RubricContent = mongoose.model('RubricContent');
const Users = mongoose.model('Users');
const Contact = mongoose.model('Contact');
const Search = mongoose.model('Search');
const About = mongoose.model('About');


var sortKey = 0;

console.log("connecting Database..")
mongoose.connect(`mongodb://localhost/praipsDB`, { useMongoClient: true }, function (err) {
    if (err) {
        console.log(err.message);
    }

});


console.log("Putting data in Rubrics")

RubricsJson.forEach(element => {
    let NewRubric = new Rubrics(element);

    NewRubric.rubricContent = NewRubric.rubricContent.map(element2 => {
        var contentsend = {
            content: mongoose.Types.ObjectId(element2.content),
            sort: element2.sort
        }

        return contentsend;
    })
    NewRubric.save((err, data) => {

        if (err) {
            console.log(err.message)
        }
    })
});

console.log(RubricsJson.length + " rubrics saved in Database");

RubricsContentJson.forEach((element) => {
    let NewRubricContent = new RubricContent(element)

    NewRubricContent.save((err, data) => {

        if (err) {
            console.log(err.message)
        }

    })
})
console.log(RubricsContentJson.length + "contents saved in RubricsContent")

let NewUser = new Users({ email: 'bonjour@monsauveur.fr', password: 'monsauveur-praips', username: 'Bonjour', role: 'Administrator' });

NewUser.save((err, data) => {

    if (err) {
        console.log(err.message);
    }
})

console.log("Test User Created")

let NewAbout = new About({
    name: 'Lorem Ipsum',
    logoPath: '/images/praips Logo.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur nibh ligula, et scelerisque nisl lobortis vel. Vestibulum id tortor urna. Phasellus quis purus vel quam convallis efficitur',
    slogan: 'Lorem ipsum dolor sit amet consectetur',
    siteUrl: 'www.website.io'
})
NewAbout.save((err, data) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log("About has been created")
    }
})
