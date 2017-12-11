var mongoose = require('mongoose');

// Define our class schema
var classSchema = new mongoose.Schema({
    number: Number,
    major: String,
    name: String,
    creditHours: Number,
    quality: Number,
    difficulty: Number,
    hours: Number,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
      }
    ],
  }, { versionKey: false });

module.exports = mongoose.model('Class', classSchema);