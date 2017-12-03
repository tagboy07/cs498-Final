// Load required packages
var mongoose = require('mongoose');
var tasks = require('./task');

// Define our user schema
var userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please Provide A Name']
    },
    email: {
      type: String,
      required: [true, 'Please Provide An Email']
    },
    pendingTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks"
      }
    ],
    dateCreated: {
      type: Date,
      default: Date.now
    }
}, { versionKey: false });

// Export the Mongoose model
module.exports = mongoose.model('User', userSchema);