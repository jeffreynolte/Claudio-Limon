var express = require('express'),
    stylus = require('stylus');
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
  return stylus(str).set('filename', path);
}

app.configure(function(){
  app.set('views', __dirname + '/server/views');
  app.set('view engine', 'jade');  
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(stylus.middleware(
    {
      src: __dirname + '/public',
      compile: compile
    }
  ));
  app.use(express.static(__dirname + '/public'));
});

console.log(env);
if(env === 'development') {
  mongoose.connect('mongodb://localhost/climon');    
} else {
  mongoose.connect('mongodb://jeffreynolte:m0x13p4ss!@ds033059.mongolab.com:33059/climon_prod');  
}




var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error..."));
db.once('open', function callback() {
  console.log("climon db opened");
});

var messageSchema = mongoose.Schema({message : String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;

Message.findOne().exec(function(err, messageDoc){
  mongoMessage = messageDoc.message;
})

app.get('/partials/:partialsPath', function(req, res){
  res.render('partials/' + req.params.partialsPath);
  console.log("rendering the partial: " + req.params.partialsPath);
})
// always use client side routing for the entire app to eliminate redundancy.
app.get('*', function(req, res){
  res.render('index', {
    mongoMessage : mongoMessage
  });
});



var port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port " + port + " and express is running");