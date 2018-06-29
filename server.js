var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

var cookieParser = require('cookie-parser');
var session = require ('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'anystringoftext',
                saveUninitialized: true,
                resave: true}));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');

/*app.use('/', function(req, res) {
    res.send('Our First Express program!');
    console.log(req.cookies);
    console.log('******************************');
    console.log(req.session);
});*/

require('./app/routes.js')(app);

app.listen(port, () => {
    console.log('Server running on port: ' + port);
});