const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_path: { type: String, required: true },
    slug:{type: String, required: true},
    user_id: { type: String, required: true },
    likes:{ type: Number, default:0 },
    status: { type: Number, default:1 },
}, { timestamps: true });


postsSchema.pre('save', async function (next) {
    var ars = require('arslugify');
    if (!this.isModified('slug')) {
      next();
    }
    this.slug=ars(this.title);
  });


module.exports = mongoose.model('Posts', postsSchema);