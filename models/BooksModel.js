/** @format */

const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema(
  {
    book_title: {
      type: String,
      required: true,
      unique: true,
    },
    book_genre: [
      {
        type: String,
      },
    ],
    author: {
      type: String,
      required: true,
    },
    publisher_name: {
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
