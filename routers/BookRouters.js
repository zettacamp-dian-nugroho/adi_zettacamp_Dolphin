/** @format */

const express = require('express');
const router = express();

const Book = require('../functions/BookFunctions');

router.use(express.json());

// ENDPOINT FOR BOOKS START HERE
router.post('/insert-book', async (req, res) => {
  try {
    await Book.InsertOneBookData(req.body)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err.name}`);
      });
  } catch (err) {
    console.log(`Endpoint Catch Error ${err}`);
    res.json({ messages: `Gagal insert data buku!` });
  }
});

router.post('/insert-books', async (req, res) => {
  try {
    await Book.InsertBookDatas(req.body)
      .then((result) => {
        res.json({ messages: result });
      })
      .catch((err) => {
        console.log(`Endpoint TryCatch Error ${err.name}`);
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

router.get('/get-book:id', async (req, res) => {
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

router.put('/update-book:id', async (req, res) => {
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

// router.put('/update-author-book:author', async (req, res) => {
//   try {
//     await Book.UpdateAuthorBook(req.params.author, req.body)
//       .then((result) => {
//         res.json({ messages: result });
//       })
//       .catch((err) => {
//         console.log(`Endpoint TryCatch Error ${err}`);
//         if (err) {
//           res.json({ messages: `Gagal update data! Data author tidak ada.` });
//         }
//       });
//   } catch (err) {
//     console.log(`Endpoint Catch Error ${err.name}`);
//     res.json({ messages: `Data author tidak ada.` });
//   }
// });

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

router.delete('/delete-book:id', async (req, res) => {
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
// ENDPOINT FOR BOOKS END HERE

// ENDPOINT FOR BOOK TRANSACTION START HERE
router.put('/process-transaction:id', async (req, res) => {
  try {
    const processTransaction = await Book.ProcessTransaction(req.params.id, req.body);
    if (!processTransaction) {
      res.json({ messages: 'Data kosong!' });
    } else {
      res.json({ processTransaction });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data transaksi tidak ada.` });
  }
});

router.get('/get-transactions', async (req, res) => {
  try {
    const getAllBooks = await Book.GetTransactionDatas();
    if (!getAllBooks) {
      res.json({ messages: 'Data kosong!' });
    } else {
      res.json({ getAllBooks });
    }
  } catch (err) {
    console.log(`Endpoint Catch Error ${err.name}`);
    res.json({ messages: `Data transaksi tidak ada.` });
  }
});
// ENDPOINT FOR BOOK TRANSACTION END HERE
module.exports = router;
