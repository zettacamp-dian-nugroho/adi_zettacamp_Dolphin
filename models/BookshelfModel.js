/** @format */

const mongoose = require('mongoose');

const BookshelfSchema = new mongoose.Schema(
  {
    book_genre: {
      type: String,
      unique: true,
      required: true,
    },
    all_book_genres: {
      book_genre: [
        {
          type: String,
        },
      ],
    },
    book_collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookList',
      },
    ],
    publishers: [
      {
        publisher_name: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('BookshelfLists', BookshelfSchema);
