/** @format */

const mongoose = require('mongoose');

const BookTransactionSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BookTransaction', BookTransactionSchema);
