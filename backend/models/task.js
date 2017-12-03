var mongoose = require('mongoose');

// Define our user schema
var taskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please Provide A Name']
    },
    description: String,
    deadline: {
      type: Date,
      required: [true, 'Please Provide A Deadline']
    },
    completed: {
      type: Boolean,
      default: false
    },
    assignedUser: {
      type: String,
      default: ""
    },
    assignedUserName: {
      type: String,
      default: "unassigned"
    },
    dateCreated: {
      type: Date,
      default: Date.now
    }
  }, { versionKey: false });

module.exports = mongoose.model('Task', taskSchema);