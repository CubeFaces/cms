const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

  name: String,
  password: String,
  email: {
    type: String,
    unique: true
  },
  emailVerified: Date,
  image: String,
  role: {
    type: String,
    enum: ['ADMIN', 'PATIENT', 'DOCTOR', 'RECEPTIONIST'],
    default: 'PATIENT'
  },
  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }],
  sessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
