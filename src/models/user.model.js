const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    profilePic: {
      type: String,
      trim: true,
    },
    password: {
  type: String,
  trim: true,
  minlength: 8,
  select: false,
  validate(value) {
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      throw new Error('Password must contain at least one letter and one number');
    }
  },
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
