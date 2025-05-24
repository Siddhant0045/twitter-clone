const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  imageURL: { type: String}
});

module.exports = mongoose.model('Tweet', tweetSchema);
