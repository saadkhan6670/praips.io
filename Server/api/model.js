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
  createdAt: {
    type: Date, default: Date.now,
  },
  updatedAt: {
    type: Date , default: null ,
  },
  content: [{
            
      type: Schema.Types.ObjectId, 
      ref: 'RubricContent',
      default : [],
    
 
  }],
});

var RubricContentSchema = new Schema({
  question: String,
  answer: String,
  views: {type: Number, default: null},
  createdAt: { 
    type: Date, default: Date.now 
  },
  updatedAt:{
    type: Date, default: null
  } 
})


var ContactFormSchema = new Schema({
  toEmail: {type: String},
  visitorName: {type:String},
  content: {type: String},
  createdAt: {type : Date, default: Date.now}
})

var SearchSchema = new Schema({
  content: {type: String},
  createdAt: {type: Date,default: Date.now }
})

var AboutSchema = new Schema({
  name: {type: String},
  logoPath: {type: String}, 
  description: {type: String},
  slogan: {type: String}
})


module.exports = mongoose.model('Users', UsersSchema);
module.exports = mongoose.model('Rubrics', RubricsSchema);
module.exports = mongoose.model('RubricContent', RubricContentSchema  );
module.exports = mongoose.model('Contact', ContactFormSchema);
module.exports = mongoose.model('Search', SearchSchema);
module.exports = mongoose.model('About', AboutSchema);


