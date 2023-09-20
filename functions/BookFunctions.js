/** @format */

const Books = require('../models/BooksModel');
const InsertOneBookData = async (BookData) => {
  const tempListGenre = new Set();
  for (const nameListGenre of BookData.book_genre) {
    tempListGenre.add(nameListGenre);
  }

  const FixListGenre = new Array();
  for (const nameListGenre of tempListGenre) {
    FixListGenre.push(nameListGenre);
  }

  const Book = new Books({
    book_title: BookData.book_title,
    book_genre: FixListGenre,
    author: BookData.author,
    publisher_name: BookData.publisher_name,
    price_of_book: BookData.price_of_book,
    stock_of_book: BookData.stock_of_book,
  });

  return await Book.save()
    .then((result) => {
      console.log(`Function Success Insert Data ${result}`);
      return `Success insert data!`;
    })
    .catch((err) => {
      console.log(`Function Error! ${err}`);
      return `Gagal insert data! ${err}`;
    });
};

const InsertBookDatas = async (BookData) => {
  const ArrayObjectBookDatas = new Array();

  for (const BookDatas of BookData) {
    const tempListGenre = new Set();
    for (const nameListGenre of BookDatas.book_genre) {
      tempListGenre.add(nameListGenre);
    }

    const FixListGenre = [...tempListGenre];
    const Book = new Books({
      book_title: BookDatas.book_title,
      book_genre: FixListGenre,
      author: BookDatas.author,
      publisher_name: BookDatas.publisher_name,
      price_of_book: BookDatas.price_of_book,
      stock_of_book: BookDatas.stock_of_book,
    });
    ArrayObjectBookDatas.push(Book);
  }

  return await Books.insertMany(ArrayObjectBookDatas)
    .then((result) => {
      console.log(`Function Success Insert Data ${result}`);
      return `Success insert data!`;
    })
    .catch((err) => {
      console.log(`Function Error! ${err}`);
      return `Gagal insert data! ${err}`;
    });
};

const GetBookDatas = async () => {
  const isHaveBookDatas = await Books.find({});

  if (isHaveBookDatas.length > 0) {
    return isHaveBookDatas;
  } else {
    return false;
  }
};

const GetOneBookData = async (BookId) => {
  const isHaveBookDatas = await Books.findById(BookId);

  if (isHaveBookDatas) {
    return isHaveBookDatas;
  } else {
    return false;
  }
};

const UpdateOneBookData = async (BookId, BookData) => {
  const isHaveBookDatas = await Books.findById(BookId);

  const tempBookGenre = new Set();
  for (const listgenre of BookData.book_genre) {
    tempBookGenre.add(listgenre);
  }

  const FixGenre = [...tempBookGenre]
  const UpdateDataBook = {
    book_title: BookData.book_title,
    // $addtoset: {
    //   book_genre: BookData.book_genre,
    // },
    book_genre: FixGenre,
    author: BookData.author,
    publisher_name: BookData.publisher_name,
    price_of_book: BookData.price_of_book,
    stock_of_book: BookData.stock_of_book,
  };

  if (isHaveBookDatas) {
    return await Books.findByIdAndUpdate(BookId, UpdateDataBook, { new: true })
      .then((result) => {
        return `Berhasil update data buku!`;
      })
      .catch((err) => {
        return `Gagal update data! ${err}`;
      });
  } else {
    return `Gagal update data! Data buku tidak ada. ${err}`;
  }
};

const DeleteOneBookData = async (BookId) => {
  const isHaveBookDatas = await Books.findById(BookId);

  if (isHaveBookDatas) {
    return await Books.findByIdAndDelete(BookId)
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

const ResetBookCollection = async () => {
  return await Books.deleteMany({})
    .then((result) => {
      return `Berhasil menghapus data buku!`;
    })
    .catch((err) => {
      return `Gagal menghapus data! ${err}`;
    });
};

module.exports = {
  InsertOneBookData,
  InsertBookDatas,
  GetBookDatas,
  GetOneBookData,
  UpdateOneBookData,
  DeleteOneBookData,
  ResetBookCollection,
};
