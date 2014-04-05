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
    db: process.env.DB || secrets.production.db,
    rootPath: rootPath,
    port: process.env.PORT || 80
  },
  mailer: {
    auth: {
      user: process.env.MAIL_USER || secrets.mailer.auth.user,
      pass: process.env.MAIL_PASS || secrets.mailer.auth.pass
    },
    defaultFromAddress: "Claudio Limon <mail@claudiolimon.com.mx>"
  }
}

console.log(secrets);