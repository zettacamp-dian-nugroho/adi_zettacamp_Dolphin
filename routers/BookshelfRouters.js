/** @format */

const express = require('express');
const router = express();

const Bookshelf = require('../functions/BookshelfFunctions');

router.use(express.json());

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
    const getOneBook = await Bookshelf.GetBookshelfsDataByBook(req.params.id);
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

router.get('/get-bookshelf/by-book/:id', async (req, res) => {
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

// NOT SURE update-bookshelfs IS GOOD
router.put('/update-bookshelfs', async (req, res) => {
  try {
    await Bookshelf.UpdateBookshelfsDatas()
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
// NOT SURE update-bookshelfs IS GOOD

router.put('/update-bookshelf/:id', async (req, res) => {
  try {
    await Bookshelf.UpdateBookshelfsOneData(req.params.id, req.body)
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
        if (err) {
          res.json({ messages: `Gagal update data! Data buku tidak ada.` });
        }
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data buku tidak ada.` });
  }
});

router.delete('/delete-bookshelf/by-book/:id', async (req, res) => {
  try {
    await Bookshelf.DeleteOneBookshelf(req.params.id)
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
