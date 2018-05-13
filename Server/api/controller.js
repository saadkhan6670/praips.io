
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var Schema = mongoose.Schema;
var server = require('http').createServer()
const socketIO = require('socket.io')
const uuidv1 = require('uuid/v1');
var {
  sortBy
} = require('lodash')

//Models
const Rubrics = mongoose.model('Rubrics');
const RubricContent = mongoose.model('RubricContent');
const Users = mongoose.model('Users');
const Contact = mongoose.model('Contact');
const Search = mongoose.model('Search');
const About = mongoose.model('About');
const LogKey = mongoose.model('LogKey');




server.listen(8080)

var io = socketIO.listen(server)


exports.getdata = (req, res) => {
  Rubrics.find({}).sort('sort').populate({ path: 'content', options: { sort: { 'sort': 1 } } }).exec((err, data) => {
    res.send(data);

  })
}

exports.tesAPI = (req, res) => {
  Rubrics.findByIdAndUpdate(req.body.rubricId, { $pull: { rubricContent: { content: req.body.id } } }, (err, update) => {
    if (update) {
      res.send(update)
    }

    else {
      res.send(err)
    }
  })
}


//create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahsankhan1911@gmail.com',
    pass: ''
  }
});

// Admin Login API
exports.adminLogIn = (req, res) => {
  Users.findOne({ email: req.body.email, password: req.body.password }).select('_id role profilePath username redirect').exec((err, data) => {

    if (!data) {
      res.send(false)
    }
    else {

      res.send(data)
    }
  })
}

exports.LoginKey = (req, res) => {
  var LogInKey = uuidv1()
  var NewLogKey = new LogKey({
    logInKey: LogInKey
  });
  NewLogKey.save((err, data) => {
    res.send(data);
  })

}


//Authenticating LogIn Key
exports.LogKeyAuth = (req, res) => {
  LogKey.findOne({
    logInKey: req.query.LogKey
  }, (err, data) => {
    if (!data) {
      res.send(false)
    } else {
      res.send(true);
    }
  })
}

// Logout logic
exports.DelLogKey = (req, res) => {
  LogKey.findByIdAndRemove(req.body.id, (err, data) => {
    if (data) {
      res.send(data)
    } else {
      res.send(err)

    }
  })
}

// Admin Api Ends

// API for Rubrics
exports.createRubric = (req, res) => {
  let New_Rubrics = new Rubrics(req.body)
  New_Rubrics.save((err, rubric) => {
    res.send(rubric)
  })
  io.emit('update', { api: 'RubricsChanged' })
}

exports.updateRubcric = (req, res) => {

  let date = new Date();

  Rubrics.findByIdAndUpdate(req.body.id, { $set: { name: req.body.name, slug: req.body.slug, updatedAt: Date.now() } }, { new: true }, (err, data) => {
    if (!data) {
      res.send("No rubric found to update")
    }

    else {
      res.send("Rubric updated");
    }
  })
  io.emit('update', { api: 'RubricsChanged' })

}

exports.removeRubrics = (req, res) => {

  req.body.idArr.forEach(idData => {
    Rubrics.findByIdAndUpdate(idData, { $inc: { 'sort': -1 } }, { new: true }, (err, data) => {
      return
    })
  })

  Rubrics.findByIdAndRemove(req.body.id, (err, data) => {

    if (!data) {
      res.send("No rubric found to remove")
    }

    else {
      res.send("Rubric Removed");
    }
  })

  io.emit('update', { api: 'RubricsChanged' })

}



exports.getAllRubrics = (req, res) => {
  Rubrics.find().sort('sort')
    .populate({ path: 'rubricContent.content', model: 'RubricContent' })
    .exec((err, data) => {

      if (!data) {
        res.send(err)
      }

      else {
        res.send(data);
      }
    })


}
exports.sortRubrics = (req, res) => {
  Rubrics.findByIdAndUpdate(req.body.toId, { $set: { sort: req.body.toSort } }, { new: true }, (err, data) => {
    Rubrics.findByIdAndUpdate(req.body.fromId, { $set: { sort: req.body.fromSort } }, { new: true }, (err, data2) => {
      res.send("Rubric Updated")
    })
  })
}

// Api for Rubric ends

exports.createRubcricContent = (req, res) => {
  let NewRubricContent = new RubricContent(req.body);
  NewRubricContent.save((err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      Rubrics.update({ _id: mongoose.Types.ObjectId(req.body.id) }, { $push: { content: data._id } }, (data) => {
        return
      })
      res.send(data)

    }
  })
  io.emit('update', { api: 'RubricsChanged' })
}


exports.SortRubricContent = (req, res) => {
  RubricContent.findByIdAndUpdate(req.body.toId, { $set: { sort: req.body.toSort } }, { new: true }, (err, data) => {
    RubricContent.findByIdAndUpdate(req.body.fromId, { $set: { sort: req.body.fromSort } }, { new: true }, (err, data2) => {
      res.send("Rubric Updated")
    })
  })
}

exports.updateRubcricContent = (req, res) => {
  RubricContent.findByIdAndUpdate(req.body.id, {
    $set:
      { question: req.body.question, answer: req.body.answer, updatedAt: Date.now() }
  },

    { new: true }, (err, data) => {

      if (!data) {
        res.send("Rubric content not found to update")
      }

      else {

        res.send("Rubric content updated");
      }
    })

  io.emit('update', { api: 'RubricsChanged' })
}


exports.removeRubricContent = (req, res) => {

  RubricContent.findOneAndRemove({ _id: req.body.IdToremove }, (err, data) => {

    if (!data) {
      res.send("No rubric Content found to remove")
    }

    else {
      Rubrics.findByIdAndUpdate(req.body.RubricId, 
        { $pull: { rubricContent: { content: req.body.IdToremove } } }, 
        { }, 
        (err, update) => {
        if (update) {
          

        }
      })
    }
  })



  io.emit('update', { api: 'RubricsChanged' })

}

// Rubric content ends

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
  About.findByIdAndUpdate(req.body._id, {
    $set: {
      name: req.body.name,
      logoPath: req.body.logoPath,
      description: req.body.description,
      slogan: req.body.slogan,
      siteUrl: req.body.siteUrl
    }
  }, { new: true }, (err, doc) => {

    if (!doc) {
      res.send(err);
    }

    else {
      res.send(doc);
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
  io.emit('update', { api: 'ContactChanged' })

}

exports.getAllContacts = (req, res) => {
  Contact.find({}, (err, doc) => {

    if (!doc) {
      res.send(err)
    }
    else {
      res.send(doc)
    }
  })

}

exports.updateViews = (req, res) => {
  RubricContent.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), { $set: { views: req.body.views } }, { new: true }, (err, doc) => {

    if (err) {
      res.send(err)
    }

    else {
      console.log('doc', doc)
      res.send(doc)
    }
  })
  io.emit('update', { api: 'RubricsChanged' })

}


exports.createResearch = (req, res) => {
  let NewSearchQuery = new Search(req.body);
  NewSearchQuery.save((err, doc) => {

    if (!doc) {
      res.send(err);
    }

    else {
      res.send(doc)
    }
  })
  io.emit('update', { api: 'ResearchChanged' })

}

exports.getAllResearches = (req, res) => {
  Search.find({}, (err, doc) => {

    if (!doc) {
      res.send(err)
    }
    else {
      res.send(doc)
    }
  })

}


exports.uploadProfileImg = (req, res) => {
  // console.log(r)
  if (req.file) {
    Users.findByIdAndUpdate(req.query.user_id, { $set: { profilePath: `/images/${req.file.filename}` } }, (err, doc) => {
      if (!doc) {
        res.send("Cannot change profile picture at this moment")
      }

      else {
        res.send(req.file.filename)
      }
    })
  }

  else {
    console.log("No file uploaded")
  }

}

exports.uploadLogoImg = (req, res) => {
  // console.log(r)
  if (req.file) {
    About.findByIdAndUpdate(req.query.about_id, { $set: { logoPath: `/images/${req.file.filename}` } }, (err, doc) => {
      if (!doc) {
        res.send("Cannot change logo  at this moment")
      }

      else {
        res.send(req.file.filename)
      }
    })
  }

  else {
    console.log("No file uploaded")
  }

}



exports.getUserData = (req, res) => {
  Users.findById(req.params.user_id).select('_id role profilePath username').exec((err, user) => {

    if (!user) {
      res.send("No user found ")
    }

    else {
      res.send(user)
    }
  })

}
