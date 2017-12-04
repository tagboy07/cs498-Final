var mongoose = require('mongoose');

// Define our student schema
var studentSchema = new mongoose.Schema({
    netid: String,
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class"
    },
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