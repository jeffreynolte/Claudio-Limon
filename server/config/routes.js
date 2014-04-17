var auth = require('./auth'),
    users = require('../controllers/users'),
    works = require('../controllers/works'),
    settings = require('../controllers/settings'),
    inquiries = require('../controllers/inquiries'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Settings = mongoose.model('Settings'),
    Inquiries = mongoose.model('Inquiries'),
    Work = mongoose.model('Work');


module.exports = function (app) {

  // users api
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', auth.requiresRole('admin'), users.updateUser);
  app.delete('/api/users', users.deleteUser);

  // work api
  app.get('/api/public/worksCat',  works.getWorksCat);
  app.get('/api/works', auth.requiresRole('admin'), works.getWorks);
  app.post('/api/works', works.createWork);
  app.put('/api/works', auth.requiresRole('admin'), works.updateWork);
  app.delete('/api/works', works.deleteWork);

  // settings api
  app.get('/api/public/settings', settings.getSettings);
  app.get('/api/settings', auth.requiresRole('admin'), settings.getSettings);
  app.put('/api/settings', auth.requiresRole('admin'), settings.updateSettings);

  // inquiries api
  app.get('/api/inquiries', auth.requiresRole('admin'), inquiries.getInquiries);
  app.post('/api/inquiries', inquiries.createInquiry);
  app.delete('/api/inquiries', auth.requiresRole('admin'), inquiries.deleteInquiry);

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

  app.get('/*', function(req, res){
    console.log("render /")
    res.render('index');
  });

  // app.get('/*', function(req, res){
  //   res.render('index');
  // });

  // app.get('*', function(req, res){
  //   console.log("render ")
  //   res.render('index');
  // });
}
