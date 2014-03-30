var User = require('mongoose').model('User'),
  encrypt = require('../utilities/encryption'),
  mailer = require('../utilities/mailer');
  
exports.getUsers = function(req, res) {
  //get user id as param
  var userId = req.query._id;

  if (userId) {
    //if user id is in param return one user as object
    User.findOne({
      _id: userId
    }).exec(function(err, collection) {
      res.send(collection);
    })
  } else {
    //if request for /users return array of all users
    User.find({}).exec(function(err, collection) {
      res.send(collection);
    })
  }
}

exports.createUser = function(req, res, next) {
  var userData = req.body;
  userData.salt = encrypt.createSalt();
  userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);    
  User.create(userData, function(err, user) {
    if (err) {
      if (err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Username');
      }
      res.status(400);
      return res.send({
        reason: err.toString()
      });
    }
          
    mailer.mailDefaults.to = userData.email;  
    mailer.mailDefaults.html = "Hi! your account has been created<br/> Username: " + userData.userName + "<br/>Password: " + userData.password;  

    mailer.smtpTransport.sendMail(mailer.mailDefaults, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        mailer.smtpTransport.close();
    });
        
    res.send({
      user_created: "true"
    });
  })

}

exports.updateUser = function(req, res) {
  var userUpdates = req.body;

  console.log(userUpdates);

  //if user is not admin exit.
  if (!req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }

  console.log("updateUser");


  User.findById(userUpdates._id, function(err, user) {
    user.firstName = userUpdates.firstName;
    user.lastName = userUpdates.lastName;
    user.email = userUpdates.email;
    user.userName = userUpdates.userName;
    user.roles = userUpdates.roles;

    if (userUpdates.password && userUpdates.password.length > 0) {
      user.salt = encrypt.createSalt();
      user.hashed_pwd = encrypt.hashPwd(user.salt, userUpdates.password)
    }

    user.save(function(err) {
      console.log("user saved");
      if (err) {
        res.status(400);
        return res.send({
          reason: err.toString()
        })
      }
      res.send(req.user);

    })
  })

}

exports.deleteUser = function(req, res) {

  if (!req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }

  User.remove({
    _id: req.query._id
  }, function(err, user) {
    if (err) {
      res.status(400);
      return res.send({
        reason: err.toString()
      })
    }
    res.send({
      user_deleted: "true"
    });
  })
}
