// Load required packages
var mongoose = require('mongoose');
var classes = require('./class');
var reviews = require('./review');
var bcrypt = require('bcrypt');


// Define our student schema
var studentSchema = new mongoose.Schema({
    username: String,
    password: String,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
      }
    ],
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classes"
      }
    ]
}, { versionKey: false });

studentSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

studentSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Export the Mongoose model
module.exports = mongoose.model('Student', studentSchema);
