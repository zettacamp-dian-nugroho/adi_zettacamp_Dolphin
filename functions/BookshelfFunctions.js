/** @format */

const Bookshelfs = require('../models/BookshelfModel');
const Books = require('../models/BooksModel');

const InsertOneBookshelf = async (BookshelfData) => {
  const tempAllDocumentWithSameGenre = await Books.find({ book_genre: BookshelfData.book_genre });

  const listBookSameGenre = new Array();
  for (const listbooks of tempAllDocumentWithSameGenre) {
    listBookSameGenre.push(listbooks._id);
  }

  const Bookshelf = new Bookshelfs({
    book_genre: BookshelfData.book_genre,
    book_collections: listBookSameGenre,
  });

  return await Bookshelf.save()
    .then((result) => {
      console.log(`Function Success Insert Data ${result}`);
      return `Success insert data!`;
    })
    .catch((err) => {
      console.log(`Function Error ${err}`);
      return `Gagal insert data! ${err}`;
    });
};

const InsertBookshelfDatas = async (BookshelfData) => {
  const ArrayObjectBookshelfsDatas = new Array();

  for (const listbookshelfsdatas of BookshelfData) {
    const Bookshelf = new Bookshelfs({
      book_genre: listbookshelfsdatas.book_genre,
    });

    ArrayObjectBookshelfsDatas.push(Bookshelf);
  }

  return await Bookshelfs.insertMany(ArrayObjectBookshelfsDatas)
    .then((result) => {
      console.log(`Function Success Insert Data ${result}`);
      return `Success insert data!`;
    })
    .catch((err) => {
      console.log(`Function Error! ${err}`);
      return `Gagal insert data! ${err}`;
    });
};

const GetBookshelfsData = async (BookshelfId) => {
  const isHaveBookDatas = await Bookshelfs.findById(BookshelfId);

  if (isHaveBookDatas) {
    return isHaveBookDatas;
  } else {
    return false;
  }
};

const GetBookshelfsDatas = async () => {
  const isHaveBookshelfsDatas = await Bookshelfs.find().populate('book_collections');
  // const isHaveBookshelfsDatas = await Bookshelfs.aggregate([
  //   {
  //     $lookup: {
  //       from: 'booklists',
  //       localField: 'book_collections',
  //       foreignField: '_id',
  //       as: 'lists_of_books',
  //     },
  //   },
  // ]);

  if (isHaveBookshelfsDatas.length > 0) {
    return isHaveBookshelfsDatas;
  } else {
    return false;
  }
};

const GetBookshelfsDataByBook = async (BookId) => {
  const isHaveBookDatas = await Bookshelfs.find({ book_collections: BookId });

  if (isHaveBookDatas) {
    return isHaveBookDatas;
  } else {
    return false;
  }
};

const UpdateBookshelfsOneData = async (BookshelfId, NewData) => {
  const tempAllDocumentWithSameGenre = await Books.find({ book_genre: NewData.book_genre });

  const listBookSameGenre = new Array();
  for (const listbooks of tempAllDocumentWithSameGenre) {
    listBookSameGenre.push(listbooks._id);
  }

  return await Bookshelfs.findOneAndUpdate(
    { _id: BookshelfId },
    { $set: { book_collections: listBookSameGenre, book_genre: NewData.book_genre } }
  )
    .then((result) => {
      return `Berhasil update data buku!`;
    })
    .catch((err) => {
      return `Gagal update data! ${err}`;
    });
};

const UpdateBookshelfsDatas = async () => {
  const isHaveBookshelfsDatas = await Bookshelfs.find({});
  const tempListBookshelfs = new Set();
  for (const listbookshelfs of isHaveBookshelfsDatas) {
    tempListBookshelfs.add(listbookshelfs.book_genre);
  }

  for (const nameListBookshelfs of tempListBookshelfs) {
    const tempAllDocumentWithSameGenre = await Books.find({ book_genre: nameListBookshelfs });

    const listBookSameGenre = new Array();
    for (const listbooks of tempAllDocumentWithSameGenre) {
      listBookSameGenre.push(listbooks._id);
    }

    return await Bookshelfs.findOneAndUpdate(
      { book_genre: nameListBookshelfs },
      { $set: { book_genre: nameListBookshelfs, book_collections: listBookSameGenre } }
    )
      .then((result) => {
        return `Berhasil update data buku!`;
      })
      .catch((err) => {
        return `Gagal update data! ${err}`;
      });
  }
};

const DeleteOneBookshelf = async (BookshelfId) => {
  const isHaveBookDatas = await Bookshelfs.findById(BookshelfId);

  if (isHaveBookDatas) {
    return await Bookshelfs.findByIdAndDelete(BookshelfId)
      .then((result) => {
        return `Berhasil menghapus data buku!`;
      })
      .catch((err) => {
        return `Gagal menghapus data! ${err}`;
      });
  } else {
    return `Gagal menghapus data! Data buku tidak ada. ${err}`;
  }
};

const ResetBookshelfCollection = async () => {
  return await Bookshelfs.deleteMany({})
    .then((result) => {
      return `Berhasil menghapus data buku!`;
    })
    .catch((err) => {
      return `Gagal menghapus data! ${err}`;
    });
};

module.exports = {
  InsertOneBookshelf,
  InsertBookshelfDatas,
  GetBookshelfsData,
  GetBookshelfsDatas,
  GetBookshelfsDataByBook,
  UpdateBookshelfsOneData,
  UpdateBookshelfsDatas,
  DeleteOneBookshelf,
  ResetBookshelfCollection,
};
