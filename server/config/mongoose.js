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
    salt: String,
    hashed_pwd: String,
    roles: [String]
  });
  
  userSchema.methods = {
    authenticate: function (passwordToMatch) {
      return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  }
  
  var User = mongoose.model('User', userSchema);
  
  User.find({}).exec(function (err, collection) {
    if(collection.length === 0){
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt,'jeffrey');
      User.create({firstName: "Jeffrey", lastName: "Nolte", userName: "jeffreynolte", salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'mary');
      User.create({firstName: "Mary", lastName: "Nolte", userName: "marynolte", salt: salt, hashed_pwd: hash, roles: []});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'dan');
      User.create({firstName: "Chris", lastName: "Nolte", userName: "chrisnolte", salt: salt, hashed_pwd: hash });      
    }
  })
  
}