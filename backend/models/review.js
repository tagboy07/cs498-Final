var mongoose = require('mongoose');

// Define our student schema
var studentSchema = new mongoose.Schema({
    username: String,
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class",
        required: true
    },
    classNumber: Number,
    classMajor: String,
    quality: Number,
    difficulty: Number,
    hours: Number,
    comment: String,
    anon: {
      type: Boolean,
      default: false
    },
    dateCreated: {
      type: Date,
      default: Date.now
    }
  }, { versionKey: false });

module.exports = mongoose.model('Review', studentSchema);
