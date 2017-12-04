var mongoose = require('mongoose');

// Define our login schema
var loginScheme = new mongoose.Schema({
    netid: String,
    password: String
  }, { versionKey: false });

module.exports = mongoose.model('Login', loginScheme);