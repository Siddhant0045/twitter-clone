const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  photoURL: { type: String },

  // Make these optional if not provided for OAuth users:
  username: { type: String }, // remove required: true
  passwordHash: { type: String }, // remove required: true
});

module.exports = mongoose.model('User', userSchema);
