const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema({
    post_id: { type: String, required: true },
    user_id: { type: String, required: true },
    likes: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Likes', likesSchema);