/** @format */

const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema(
  {
    book_title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price_of_book: {
      type: Number,
      required: true,
    },
    stock_of_book: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BookList', BooksSchema);
