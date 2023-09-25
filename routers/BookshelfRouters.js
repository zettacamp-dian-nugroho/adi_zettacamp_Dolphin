/** @format */

const express = require('express');
const router = express();

const Bookshelf = require('../functions/BookshelfFunctions');

router.use(express.json());

// CREATE ENDPOINT HERE
router.post('/insert-bookshelf', async (req, res) => {
  try {
    await Bookshelf.InsertOneBookshelf(req.body)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err}`);
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err}`);
    res.json({ messages: `Gagal insert data!` });
  }
});

router.post('/insert-bookshelfs', async (req, res) => {
  try {
    await Bookshelf.InsertBookshelfDatas(req.body)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err}`);
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err}`);
    res.json({ messages: `Gagal insert data!` });
  }
});

// READ ENDPOINT HERE
router.get('/get-bookshelfs', async (req, res) => {
  try {
    const getAllBooks = await Bookshelf.GetBookshelfsDatas();
    if (!getAllBooks) {
      res.json({ messages: 'Data kosong!' });
    } else {
      res.json({ Bookshelf: getAllBooks });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

router.get('/get-bookshelf/:id', async (req, res) => {
  try {
    const getOneBook = await Bookshelf.GetBookshelfsData(req.params.id);
    if (!getOneBook) {
      res.json({ messages: 'Data tidak ada!' });
    } else {
      res.json({ messages: getOneBook });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

// DATA 1 BUKU DI BEBERAPA BOOK GENRE
router.get('/get-bookshelf/book/:id', async (req, res) => {
  try {
    const getOneBook = await Bookshelf.GetBookshelfsDataByBook(req.params.id);
    if (!getOneBook) {
      res.json({ messages: 'Data tidak ada!' });
    } else {
      res.json({ messages: getOneBook });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

router.get('/get-bookshelf/books/project/', async (req, res) => {
  try {
    const getOneBook = await Bookshelf.GetBooksFromBookshelfs();
    if (!getOneBook) {
      res.json({ messages: 'Data tidak ada!' });
    } else {
      res.json({ messages: getOneBook });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

// DATA BOOKSHELFS DARI NAMA PENULIS
router.get('/get-bookshelf/author/:author', async (req, res) => {
  try {
    const getOneBook = await Bookshelf.GetBookByAuthor(req.params.author);
    if (!getOneBook) {
      res.json({ messages: 'Data tidak ada!' });
    } else {
      res.json({ messages: getOneBook });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

// DATA BOOKSHELFS DARI NAMA PUBLISHER
router.get('/get-bookshelf/publisher/:publisher', async (req, res) => {
  try {
    const getOneBook = await Bookshelf.GetBooksByFilterPublisher(req.params.publisher);
    if (!getOneBook) {
      res.json({ messages: 'Data tidak ada!' });
    } else {
      res.json({ messages: getOneBook });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

router.get('/get-bookshelf-distinct', async (req, res) => {
  try {
    const getOneBook = await Bookshelf.GetDistinctData();
    if (!getOneBook) {
      res.json({ messages: 'Data tidak ada!' });
    } else {
      res.json({ messages: getOneBook });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

// UPDATE ENDPOINT HERE
router.put('/update-bookshelfs', async (req, res) => {
  try {
    await Bookshelf.UpdateBookshelfsDatas()
      .then((result) => {
        res.json({ messages: `Sukses update data!` });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err}`);
        res.json({ messages: `Gagal update data! Data buku tidak ada.` });
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

router.put('/update-bookshelf/:id', async (req, res) => {
  try {
    await Bookshelf.UpdateBookshelfsOneData(req.params.id, req.body)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err}`);
        res.json({ messages: `Gagal update data! Data buku tidak ada.` });
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

// UPDATE EMBEDDED DATA
router.put('/update-bookshelf/publisher/:id/:publisher', async (req, res) => {
  try {
    await Bookshelf.UpdateBookshelfsDataPublisher(req.params.id, req.params.publisher, req.body)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err}`);
        res.json({ messages: `Gagal update data! Data buku tidak ada.` });
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

// DELETE ENDPOINT HERE
router.delete('/reset-bookshelf-collection', async (req, res) => {
  try {
    const getAllBooks = await Bookshelf.ResetBookshelfCollection();
    if (!getAllBooks) {
      res.json({ messages: 'Data kosong!' });
    } else {
      res.json({ messages: getAllBooks });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

router.delete('/delete-bookshelf/:id', async (req, res) => {
  try {
    await Bookshelf.DeleteOneBookshelf(req.params.id)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err}`);
        res.json({ messages: `Gagal update data! Data buku tidak ada.` });
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

module.exports = router;
