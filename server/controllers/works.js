var Work = require('mongoose').model('Work'),
  encrypt = require('../utilities/encryption');

exports.getWorks = function(req, res) {
  console.log("get Works");
  var workId = req.query._id;
  if (workId) {
    Work.findOne({
      _id: workId
    }).exec(function(err, collection) {
      res.send(collection);
    })
  } else {
    Work.find({}).exec(function(err, collection) {
      res.send(collection);
    })
  }
}

exports.getWorksByCat = function(req, res) {
  console.log("getWorksByCat");
  var workCat = req.query.cat;  
  console.log("work category =", workCat);
  
  if (workCat) {
    Work.find({
      categories: workCat
    }).exec(function(err, collection) {
      res.send(collection);
    })
  } else {
    Work.find({}).exec(function(err, collection) {
      res.send(collection);
    })
  }
}

exports.createWork = function(req, res, next) {
  var workData = req.body;
  Work.create(workData, function(err, user) {
    if (err) {
      res.status(400);
      return res.send({
        reason: err.toString()
      });
    }
    res.send({
      work_created: "true"
    });
  })

}

exports.updateWork = function(req, res) {
  var workUpdates = req.body;
  
  Work.findById(workUpdates._id, function(err, work) {
            
    work.title = workUpdates.title;
    work.subtitle = workUpdates.subtitle;
    work.isPublic = workUpdates.isPublic;
    work.description = workUpdates.description;
    work.images = workUpdates.images;
    work.categories = workUpdates.categories;
    
    work.save(function(err) {
      console.log("work saved");
      if (err) {
        res.status(400);
        return res.send({
          reason: err.toString()
        })
      }
      res.send(req.work);
    })
  })

}

exports.deleteWork = function(req, res) {
  
  Work.remove({
    _id: req.query._id
  }, function(err, work) {
    if (err) {
      res.status(400);
      return res.send({
        reason: err.toString()
      })
    }
    res.send({
      work_deleted: "true"
    });
  })
}
