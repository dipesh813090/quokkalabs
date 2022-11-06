const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: { type: String, required: true },
    mobile_number: { type: Number },
    email: { type: String, required: true,unique: true },
    password: { type: String, required: true },
    status: { type: Number, default:1 },
    loggedIn:{ type: Number, default:0 },
    _token:{type:String,required:true}
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

module.exports = mongoose.model('User', userSchema);