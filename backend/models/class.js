var mongoose = require('mongoose');

// Define our class schema
var classSchema = new mongoose.Schema({
    crn: String,
    number: String,
    major: String,
    name: String,
    quality: Integer,
    difficulty: Integer,
    hours: Integer,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
      }
    ],
  }, { versionKey: false });

module.exports = mongoose.model('Class', classSchema);