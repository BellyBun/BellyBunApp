// server/src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  gender: String,
  babies: [
    {
      name: String,
      dueDate: Date,
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
