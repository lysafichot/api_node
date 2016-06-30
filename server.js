var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var methodOverride = require('method-override');

var port = process.env.PORT || 8080;

var jwt    = require('jsonwebtoken');
var config = require('./config/database');
var User   = require('./app/models/user');


var app         = express();
mongoose.connect(config.database,function(){
    /* Drop the DB */
   /* mongoose.connection.db.dropDatabase();*/
});
app.set('lyly', config.secret);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded());

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('dev'));

require('./app/apiRouter')(app);


// SERVER
app.listen(port);
console.log('http://localhost:' + port);
exports = module.exports = app;
