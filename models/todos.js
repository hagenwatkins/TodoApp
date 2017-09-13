const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.model('Todo', todoSchema);
