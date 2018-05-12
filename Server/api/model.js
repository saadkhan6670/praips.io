'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  username : {
    type: String
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },

  profilePath : {type : String , default: '/images/default-profile.jpg'},
  
  
 
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
  sort:{ type : Number},
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
  }, 
  sort:{ type : Number},
  
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
  name: {type: String  , default: 'Name here..'},
  logoPath: {type: String , default: null}, 
  description: {type: String , default: 'Description here..'},
  slogan: {type: String , default: 'Slogan here..'},
  siteUrl : {type : String , default: 'WEbsite url here..' }
})

var LogKeySchema = new Schema({
  logInKey: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    expires: 86400,
    default: Date.now
  }

})


module.exports = mongoose.model('Users', UsersSchema);
module.exports = mongoose.model('Rubrics', RubricsSchema);
module.exports = mongoose.model('RubricContent', RubricContentSchema  );
module.exports = mongoose.model('Contact', ContactFormSchema);
module.exports = mongoose.model('Search', SearchSchema);
module.exports = mongoose.model('About', AboutSchema);
module.exports = mongoose.model('LogKey', LogKeySchema);



