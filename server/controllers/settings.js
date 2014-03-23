var Settings = require('mongoose').model('Settings');


exports.getSettings = function(req, res) {
  Settings.find({}).exec(function(err, collection) {
    res.send(collection);
  })
}

exports.updateSettings = function(req, res) {
  var settingsUpdates = req.body;
  
  console.log(settingsUpdates);

  if (!req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  
  Settings.update(settingsUpdates, function (err, numberAffected, raw) {
    if(err){
      res.status(400);
      return res.send({
        reason: err.toString()
      })
    }
    console.log('The number of updated documents was %d', numberAffected);
    console.log('The raw response from Mongo was ', raw);
  }) 
}
