const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const Message = require('./Message.model.ts');
const User =  require('./User.model.ts');
const Group = require('./Group.model.ts');

const groupChatSchema = new Schema({
  unique_name: {
    type: String,
    required: true,
    unique: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('GroupChat', groupChatSchema);