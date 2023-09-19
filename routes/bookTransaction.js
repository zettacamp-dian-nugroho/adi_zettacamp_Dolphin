/** @format */

const express = require('express');
const router = express.Router();
const dataBookPurchasing = require('../data/bookPurchasing');

router.use(express.json());

router.get('/data-transaction', (req, res) => {
  // res.json(dataBookPurchasing.dataBuku);
  try {
    res.json(dataBookPurchasing.DisplayDataTransaction());
  } catch (err) {
    console.log(err);
  }
});

router.post('/process-transaction', (req, res) => {
  try {
    dataBookPurchasing.BookPurchasing(req.body).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/calculate-credit', async (req, res) => {
  try {
    const result = await dataBookPurchasing.getCalculateCredit(req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

//NEW
router.get('/event-loop', (req, res) => {
  dataBookPurchasing
    .eventLoopWithPromise()
    .then((result) => {
      const isDone = result ? false : true;
      res.json({ message: isDone, DataBuku: dataBookPurchasing.DisplayDataTransaction() });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get('/event-loop-await', async (req, res) => {
  try {
    const result = await dataBookPurchasing.eventLoopWithPromise();
    const isDone = result ? false : true;
    res.json({ message: isDone, DataBuku: dataBookPurchasing.DisplayDataTransaction() });
  } catch (err) {
    console.log(err);
  }
});

router.get('/event-loop-noawait', (req, res) => {
  try {
    const result = dataBookPurchasing.eventLoopWithPromise();
    const isDone = result ? false : true;
    res.json({ message: isDone, DataBuku: dataBookPurchasing.DisplayDataTransaction() });
  } catch (err) {
    console.log(err);
  }
});

router.get('/event-loop-console', (req, res) => {
  try {
    console.log(dataBookPurchasing.eventLoopWithPromise());
    const result = dataBookPurchasing.eventLoopWithPromise();
    const isDone = result ? false : true;
    res.json({ message: isDone, DataBuku: dataBookPurchasing.DisplayDataTransaction() });
  } catch (err) {
    console.log(err);
  }
});

//Different
router.get('/explore', (req, res) => {
  dataBookPurchasing
    .exploreEventLoopWithWriteFile()
    .then((result) => {
      const isDone = result ? true : false;
      res.json({ message: isDone, DataBuku: dataBookPurchasing.DisplayDataTransaction() });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get('/explore-await', async (req, res) => {
  try {
    const result = await dataBookPurchasing.exploreEventLoopWithWriteFile();
    const isDone = result ? true : false;
    res.json({ message: isDone, DataBuku: dataBookPurchasing.DisplayDataTransaction() });
  } catch (err) {
    console.log(err);
  }
});

router.get('/explore-noawait', (req, res) => {
  try {
    console.log(dataBookPurchasing.exploreEventLoopWithWriteFile());
    const result = dataBookPurchasing.exploreEventLoopWithWriteFile();
    const isDone = result ? false : true;
    res.json({ message: isDone, DataBuku: dataBookPurchasing.DisplayDataTransaction() });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
