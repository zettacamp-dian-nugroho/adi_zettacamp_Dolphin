/** @format */

const express = require('express');
const router = express();

const Book = require('../functions/BookFunctions');

router.use(express.json());

// CREATE ENDPOINT HERE
router.post('/insert-book', async (req, res) => {
  try {
    await Book.InsertOneBookData(req.body)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err}`);
      });
  } catch (err) {
    res.json({ messages: `Gagal insert data buku!` });
    console.log(`Endpoint Catch Error ${err}`);
  }
});

router.post('/insert-books', async (req, res) => {
  try {
    await Book.InsertBookDatas(req.body)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err}`);
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err}`);
    res.json({ messages: `Gagal insert data buku!` });
  }
});

// READ ENDPOINT HERE
router.get('/get-books', async (req, res) => {
  try {
    const getAllBooks = await Book.GetBookDatas();
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

router.get('/get-book/book/:id', async (req, res) => {
  try {
    const getOneBook = await Book.GetOneBookData(req.params.id);
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

router.get('/get-book/author/:author', async (req, res) => {
  try {
    const getOneBook = await Book.GetOneBookDataWithProject(req.params.author);
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

router.get('/get-book/publisher/:publisher', async (req, res) => {
  try {
    const getOneBook = await Book.GetOneBookByPublisher(req.params.publisher);
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
router.put('/update-book/:id', async (req, res) => {
  try {
    await Book.UpdateOneBookData(req.params.id, req.body)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err}`);
        if (err) {
          res.json({ messages: `Gagal update data! Data buku tidak ada.` });
        }
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

// DELETE ENDPOINT HERE
router.delete('/reset-books-collection', async (req, res) => {
  try {
    const getAllBooks = await Book.ResetBookCollection();
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

router.delete('/delete-book/:id', async (req, res) => {
  try {
    await Book.DeleteOneBookData(req.params.id)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err}`);
        if (err) {
          res.json({ messages: `Gagal update data! Data buku tidak ada.` });
        }
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

module.exports = router;
