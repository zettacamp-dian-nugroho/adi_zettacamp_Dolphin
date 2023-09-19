/** @format */

const express = require('express');
const router = express();

const Book = require('../functions/BookFunctions');

router.use(express.json());

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

router.get('/get-books', async (req, res) => {
  try {
    const getAllBooks = await Book.GetBookDatas();
    if (!getAllBooks) {
      res.json({ messages: 'Data kosong!' });
    } else {
      res.json({ getAllBooks });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

router.get('/get-book/:id', async (req, res) => {
  try {
    const getOneBook = await Book.GetOneBookData(req.params.id);
    if (!getOneBook) {
      res.json({ messages: 'Data tidak ada!' });
    } else {
      res.json({ getOneBook });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

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

router.delete('/reset-books-collection', async (req, res) => {
  try {
    const getAllBooks = await Book.ResetBookCollection();
    if (!getAllBooks) {
      res.json({ messages: 'Data kosong!' });
    } else {
      res.json({ getAllBooks });
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
