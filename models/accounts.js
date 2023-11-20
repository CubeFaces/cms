const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  type: String,
  provider: String,
  providerAccountId: {
    type: String,
    alias: 'provider_account_id'
  },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    onDelete: 'CASCADE'
  }
});

const AccountModel = mongoose.model('Account', accountSchema);

module.exports = AccountModel;
