var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/climon',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  },
  production: {
    db: 'mongodb://jeffreynolte:m0x13p4ss!@ds033059.mongolab.com:33059/climon_prod',
    rootPath: rootPath,
    port: process.env.PORT || 80
  } 
}