var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var secrets = require('./secrets');



console.log(secrets)

module.exports = {
  development: {
    db: 'mongodb://localhost/climon',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  },
  production: {
    db: secrets.db.production,
    rootPath: rootPath,
    port: process.env.PORT || 80
  },
  mailer: {
    auth: {
      user: secrets.gmail.user_name,
      pass: secrets.gmail.password
    },
    defaultFromAddress: "Claudio Limon <mail@claudiolimon.com.mx>"
  }
}