// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');

// Create our Express application
var app = express();
var login = require('./routes/login');
var classRoute = require('./routes/class');
var review = require('./routes/review');
var student = require('./routes/student');

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Connect to a MongoDB
mongoose.connect(secrets.mongo_connection, { useMongoClient: true});

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app, router);

app.use("/api/login", login);
app.use("/api/class", classRoute);
app.use("/api/review", review);
app.use("/api/student", student);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);