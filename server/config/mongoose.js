var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

module.exports = function(config){
  mongoose.connect(config.db);    
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, "connection error..."));
  db.once('open', function callback() {
    console.log("climon db opened");
  });  
  
  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String ,
    email: String ,
    salt: String,
    hashed_pwd: String,
    roles: [String]
  });
        
  userSchema.methods = {
    authenticate: function (passwordToMatch) {
      return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
  }
  
  var User = mongoose.model('User', userSchema);
  
  User.find({}).exec(function (err, collection) {
    if(collection.length === 0){
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt,'jeffrey');
      User.create({firstName: "Jeffrey", lastName: "Nolte", userName: "jeffreynolte", email: "jnolte@getmoxied.net", salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'mary');
      User.create({firstName: "Mary", lastName: "Nolte", userName: "marynolte", salt: salt, hashed_pwd: hash, roles: []});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'dan');
      User.create({firstName: "Chris", lastName: "Nolte", userName: "chrisnolte", salt: salt, hashed_pwd: hash });      
    }
  })


  var workSchema = mongoose.Schema({
    title: String,
    quote: String,
    isPublic: Boolean,
    description: String,
    updated: {type: Date, default: Date.now},
    images: [{
      url: String,
      filename: String,
      order: Number
    }],
    categories: []
  });
  
  var Work = mongoose.model('Work', workSchema);  
    
  var settingsSchema = mongoose.Schema({
    page_title: String,
    page_subtitle: String,
    facebook_url: String,
    behance_url: String,
    global_email: String,
    description: String,
    updated: {type: Date, default: Date.now},
  });
  var Settings = mongoose.model('Settings', settingsSchema);    
  
  Settings.find({}).exec(function (err, collection) {
    if(collection.length === 0){
      Settings.create({
        page_title: "Claudio Limon",
        page_subtitle: "Artist &amp; Illustrator",
        facebook_url: "http://facebook.com",
        behance_url: "http://behance.com",
        global_email: "claudio@claudiolimon.com",
        description: "Here is a sample page decription",
        updated: {type: Date, default: Date.now}        
      })
    }
  })
    
  var inquiriesSchema = mongoose.Schema({
    sender_name: String,
    sender_email: String,
    sender_message: String,
    updated: {type: Date, default: Date.now},
  });
  
  var Inquiries = mongoose.model('Inquiries', inquiriesSchema);    
  

    
}