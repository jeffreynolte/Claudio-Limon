var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var secrets = require('./secrets') || "";

module.exports = {
  development: {
    db: 'mongodb://localhost/climon',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  },
  production: {
    db: process.env.DB_URL,
    rootPath: rootPath,
    port: process.env.PORT || 80
  },
  mailer: {
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
    defaultFromAddress: "Claudio Limon <mail@claudiolimon.com.mx>"
  }
}