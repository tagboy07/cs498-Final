var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// Define our login schema
var loginScheme = new mongoose.Schema({
    Username: String,
    password: String
  }, { versionKey: false });

loginScheme.plugin(passportLocalMongoose);
module.exports = mongoose.model('Login', loginScheme);
