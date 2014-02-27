var mongoose = require('mongoose'),
    crypto = require('crypto');

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
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  }
  
  var User = mongoose.model('User', userSchema);
  
  User.find({}).exec(function (err, collection) {
    if(collection.length === 0){
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt,'jeffrey');
      User.create({firstName: "Jeffrey", lastName: "Nolte", userName: "jeffreynolte", salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = createSalt();
      hash = hashPwd(salt, 'mary');
      User.create({firstName: "Mary", lastName: "Nolte", userName: "marynolte", salt: salt, hashed_pwd: hash, roles: []});
      salt = createSalt();
      hash = hashPwd(salt, 'dan');
      User.create({firstName: "Chris", lastName: "Nolte", userName: "chrisnolte", salt: salt, hashed_pwd: hash });      
    }
  })
  
}


function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}