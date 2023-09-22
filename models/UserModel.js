/** @format */

const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UsersSchema);
