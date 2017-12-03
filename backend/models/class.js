var mongoose = require('mongoose');

// Define our class schema
var classSchema = new mongoose.Schema({
    number: String,
    major: String,
    name: String,
    creditHours: Integer,
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