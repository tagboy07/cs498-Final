var mongoose = require('mongoose');

// Define our login schema
var loginScheme = new mongoose.Schema({
    Username: String,
    password: String
  }, { versionKey: false });

module.exports = mongoose.model('Login', loginScheme);