
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var Schema = mongoose.Schema;

//Models
const Rubrics = mongoose.model('Rubrics');
const RubricContent = mongoose.model('RubricContent');
const Users = mongoose.model('Users');
const Contact = mongoose.model('Contact');
const Search = mongoose.model('Search');
const About = mongoose.model('About');



//create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahsankhan1911@gmail.com',
    pass: 'ekpagalsilarki'
  }
});


exports.adminLogIn = (req, res) => {
  Users.findOne({ email: req.body.email, password: req.body.password }, (err, data) => {

    if (!data) {
      res.send(false)
    }
    else {
      res.send(true)
    }
  })
}

exports.createRubric = (req, res) => {
  let New_Rubrics = new Rubrics(req.body)

  New_Rubrics.save((err, rubric) => {

    res.send(rubric)
  })

}


exports.updateRubcric = (req, res) => {
  let date = new Date();
  console.log(date.getUTCDate())

  Rubrics.findByIdAndUpdate(req.query.id, { $set: { name: req.body.name, updatedAt: Date.now() } }, { new: true }, (err, data) => {

    if (!data) {
      res.send("No rubric found to update")
    }

    else {
      res.send("Rubric updated");
    }
  })
}

exports.getAllRubrics = (req, res) => {

  Rubrics.find({}).populate('content').exec((err, data) => {

    if (!data) {
      res.send(err)
    }

    else {
      res.send(data);
    }
  })
}





exports.createRubcricContent = (req, res) => {
  let NewRubricContent = new RubricContent(req.body);
  NewRubricContent.save((err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      Rubrics.update({ _id: mongoose.Types.ObjectId(req.query.id) }, { $push: { content: data._id } }, (data) => {
        return
      })
      res.send(data)

    }
  })

}

exports.updateRubcricContent = (req, res) => {
  RubricContent.findByIdAndUpdate(req.query.id, {
    $set:
      { name: req.body.name, question: req.body.question, answer: req.body.answer, updatedAt: Date.now() }
  },

    { new: true }, (err, data) => {

      if (!data) {
        res.send("Rubric content not found to update")
      }

      else {
        res.send("Rubric content updated");
      }
    })

}

exports.createAbout = (req, res) => {
  let NewAbout = new About(req.body);
  NewRubricContent.save((err, data) => {
    if (!data) {
      res.send(err);
    }
    else {
      res.send(data);

    }
  })

}

exports.updateAbout = (req, res) => {
  About.findOneAndUpdate({ name: req.body.name }, { new: true }, (err, doc) => {

    if (!doc) {
      res.send(err);
    }

    else {
      res.send("About updated successfully !");
    }
  })

}

exports.getAbout = (req, res) => {

  About.findOne({}, (err, data) => {

    if (!data) {
      res.send(err)
    }

    else {

      res.send(data);
    }
  })
}


exports.createContact = (req, res) => {
  let NewContact = new Contact(req.body);



  NewContact.save((err, data) => {
    if (!data) {
      res.send(err);
    }
    else {
      let mailOptions = {
        from: 'ahsankhan1911@gmail.com', // sender address
        to: 'safbusiness2017@gmail.com', // list of receivers
        subject: 'New Contact Request', // Subject line
        html: "<h1>New Contact Request </h1>   <p><b>Name: </b>" + req.body.visitorName + "</p> <p><b>Email: </b>" + req.body.toEmail + "</p> <p><b>Mesage: </b>" + req.body.content + "</p>"
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.send(error);
        }
        res.send(info);
      });

    }
  })

}