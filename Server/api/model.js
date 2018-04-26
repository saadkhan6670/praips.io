'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
 
});

var RubricsSchema = new Schema({

  name: {
    type: String,
  },
  slug: {
    type: String,

  },
  created: {
    type: String,
  },
  updated: {
    type: String,
  },
  content: {
    _id: mongoose.Types.ObjectId(),      
      type: Array,
      default : [],
      question: String ,
      answer: String,
      views : Number,
      created: {type : String, default: Date.now() },
      updated : String 
 
  },
});

var StyleSchema = new Schema({
  style: {
    type: String
  },


});

var AdminSchema = new Schema({
  createdAt: { type: Date, expires: 3600, default: Date.now },
  username: {
    type: String,
    default: 'admin'
  },
  password: {
    type: String,
    default: 'admin'
  },
  logInKeys: { type: Array, default: []}

});

var ChatSchema = new Schema({
  username :  {
    type: String
  },
  nameSpace: {
    type: String
  },
  messages: {type : Array, default : []},
  notify : {type: String , default: true}
})


module.exports = mongoose.model('Users', UsersSchema);
module.exports = mongoose.model('Rubrics', RubricsSchema);
module.exports = mongoose.model('Style', StyleSchema);
module.exports = mongoose.model('Admin', AdminSchema);
module.exports = mongoose.model('Chat', ChatSchema  );

