const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
  sessionToken: {
    type: String,
    unique: true,
    alias: 'session_token'
  },
  userId: {
    type: String,
    alias: 'user_id'
  },
  expires: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    onDelete: 'CASCADE'
  }
});


const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
