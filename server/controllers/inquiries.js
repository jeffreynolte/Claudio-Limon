var Inquiries = require('mongoose').model('Inquiries'),
    mailer = require('../utilities/mailer');


exports.getInquiries = function(req, res) {
  Inquiries.find({}).exec(function(err, collection) {
    res.send(collection);
  })
}


exports.createInquiry = function(req, res, next) {
  var inquiryData = req.body,
      sentDate = new Date(inquiryData.updated);

  Inquiries.create(inquiryData, function(err, user) {
    if (err) {
      res.status(400);
      return res.send({
        reason: err.toString()
      });
    }
        
    mailer.mailDefaults.to = "Claudio Limon <mail@claudiolimon.com.mx>, Jeffrey Nolte <jnolte@getmoxied.net>";  
    mailer.mailDefaults.html = "Hi! you have a new message from the website:" + 
    "<br/><br/><strong>From:</strong><br/> " + inquiryData.sender_name +
    "<br/><br/><strong>Email:</strong><br/> " + inquiryData.sender_email +
    "<br/><br/><strong>Message:</strong><br/><p> " + inquiryData.sender_message + "</p>" +
    "<br/><br/><strong>Sent:</strong> " + sentDate.toString();
    
    mailer.smtpTransport.sendMail(mailer.mailDefaults, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        mailer.smtpTransport.close();
    });
        
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

