var express = require('express');
var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./server/config/main');
var bodyParser = require('body-parser');
var colors = require('colors');
var favicon = require('serve-favicon');
var cors = require('cors');
var app = express();

apiRouter = require('./server/routes/index');

//app.set('view engine', 'ejs');
//app.engine('.html', require('ejs').renderFile());
app.use(cors());
app.use(express.static(path.join(__dirname + '/public')));
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Enable CORS from client-side
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//connect to mongo
mongoose.connect(config.database);

//send apiRouter
require('./server/routes/index')(app);
//use for development
config.dev(app);
///use for production
app.use(config.prod);

app.listen(process.env.PORT || config.port, function() {
    console.log(`now running on port:'${config.port}`);
});
