import mongoose from 'mongoose';
import moment from 'moment';

const AccessToken = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  expireAt: {
    type: Date,
    default: () => moment().add(10, 'hours'),
  },
}, { timestamps: true });

AccessToken.pre('save', function (next) {
  this.constructor.findOne({ user: this.user }, (err, storedToken) => {
    if (err) {
      return next(err);
    } else if (!storedToken) {
      // do nothing, that means there is no old token to delete.
      return next();
    }
    return storedToken.remove(err => {
      if (err) return next(err);
      return next();
    });
  });
});

module.exports = mongoose.model('AccessToken', AccessToken);