var auth = require('./auth'),
    users = require('../controllers/users'),
    mongoose = require('mongoose'),  
    User = mongoose.model('User');
    

module.exports = function (app) {
  
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  
  
  app.get('/partials/*', function(req, res){
    res.render('../../public/app/' + req.params);
    console.log("rendering the partial: " + req.params);
  })
  
  app.post('/login', auth.authenticate);  

  app.post('/logout', function (req, res) {
    req.logout();
    res.end();
  });  

  // break out strucuture for admin and public
  app.get('/admin', function(req, res){
    res.redirect('admin/index');
  });

  app.get('/admin/*', function(req, res){
    res.render('admin/index', {
      bootstrappedUser: req.user
    });
  });
  
  app.get('*', function(req, res){
    res.render('public/index');
  });
}