var mailer = require("nodemailer");
var config = require("../config/config");

exports.smtpTransport = mailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: config.mailer.auth.user,
    pass: config.mailer.auth.pass
  }
});

exports.mailDefaults = {
  from: config.mailer.defaultFromAddress,
  to: "developer@getmoxied.net",
  subject: "New Account Created for user at Claudio Limon",
  bcc: "Claudio Limon <mail@claudiolimon.com.mx>, Moxie Developer <developer@getmoxied.net>",
  html: ""
}

