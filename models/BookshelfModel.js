/** @format */

const mongoose = require('mongoose');

const BookshelfSchema = new mongoose.Schema(
  {
    book_genre: {
      type: String,
      unique: true,
      required: true,
    },
    book_collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookList',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('BookshelfLists', BookshelfSchema);
