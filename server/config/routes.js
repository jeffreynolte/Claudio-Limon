var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {
  
  app.get('/api/users', auth.requiresRole('admin'), function (req, res) {
    User.find({}).exec(function (err, collection) {
      res.send(collection);
    })
  })
  
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