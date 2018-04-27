
var axios = require('axios');
var password = "tH,3]>YRyjBE";
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var Schema = mongoose.Schema;

const Rubrics = mongoose.model('Rubrics');
const RubricContent = mongoose.model('RubricContent');





// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', // generated ethereal user
    pass: password // generated ethereal password
  }
});


exports.HTTPHeaders = (req, res) => {
  res.send(req.headers)
}

exports.postData = (req, res) => {
  let New_Rubrics = new Rubrics(req.body)

  New_Rubrics.save( (err , rubric) => {

    res.send(rubric)
  })
 
  }

  exports.postContent = (req, res) => {
    let NewRubricContent = new RubricContent(req.body);
    NewRubricContent.save( (err,data) => {
      if(err) {
        res.send(err)
      }
      else {
        Rubrics.update({ _id: req.query._id }, { $push: { content: data._id } }, (data) => {
         return
        })
      res.send(data)

      }
    })
   
    }
    
  