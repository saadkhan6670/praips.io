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
  content: [{
            
      type: Schema.Types.ObjectId, 
      ref: 'Content',
      default : [],
    
 
  }],
});

var RubricContentSchema = new Schema({
  question: String,
  answer: String,
  views: Number,
  created: { type: String, default: Date.now() },
  updated: String 
})


var ContactFormSchema = new Schema({
  toEmail: {type: String},
  visitorName: {type:String},
  content: {type: String},
  created: {type : Date, default: Date.now()}
})

var SearchSchema = new Schema({
  content: {type: String},
  created: {type: Date,default: Date.now() }
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


