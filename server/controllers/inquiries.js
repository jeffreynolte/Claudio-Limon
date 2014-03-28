var Inquiries = require('mongoose').model('Inquiries');


exports.getInquiries = function(req, res) {
  Inquiries.find({}).exec(function(err, collection) {
    res.send(collection);
  })
}


exports.createInquiry = function(req, res, next) {
  var inquiryData = req.body;

  Inquiries.create(inquiryData, function(err, user) {
    if (err) {
      res.status(400);
      return res.send({
        reason: err.toString()
      });
    }
    res.send({
      inquiry_sent: "true"
    });
  })

}

exports.deleteInquiry = function(req, res) {

  Inquiries.remove({
    _id: req.query._id
  }, function(err, user) {
    if (err) {
      res.status(400);
      return res.send({
        reason: err.toString()
      })
    }
    res.send({
      inquiry_deleted: "true"
    });
  })
}

