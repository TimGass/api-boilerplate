import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

UserSchema.statics.authenticate = (user, password) => new Promise(resolve => {
  bcrypt.compare(password, user.password, (err, match) => {
    if(err){
      return resolve(false);
    }
    if (match === true) {
      return resolve(true);
    }
    return resolve(false);
  });
});

UserSchema.methods.generateJWT = function() {
  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      expiresIn: '10h',
    },
    "bogality"
  );
};

UserSchema.pre('save', async function (next) {
  if (this.password.length !== 60) {
    let hash = await bcrypt.hash(this.password, 10).catch(err => err);
    if (hash instanceof Error) {
      return next(hash);
    }
    this.password = hash;
    return next();
  }
  return next();
});

module.exports.User = mongoose.model('User', UserSchema);