// Load required packages
var mongoose = require('mongoose');
var classes = require('./class');
var reviews = require('./review');

// Define our student schema
var studentSchema = new mongoose.Schema({
    netid: String,
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

// Export the Mongoose model
module.exports = mongoose.model('Student', studentSchema);