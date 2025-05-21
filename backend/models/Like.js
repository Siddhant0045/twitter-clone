const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

likeSchema.index({ tweet: 1, user: 1 }, { unique: true }); 

module.exports = mongoose.model('Like', likeSchema);
