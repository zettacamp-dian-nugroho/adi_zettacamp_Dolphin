/** @format */

const express = require('express');
const router = express.Router();
const dataBookPurchasing = require('../data/bookPurchasing');

router.use(express.json());

router.get('/data-transaction', (req, res) => {
  // res.json(dataBookPurchasing.dataBuku);
  res.send(dataBookPurchasing.DisplayDataTransaction());
});

router.post('/process-transaction', (req, res) => {
  res.json(dataBookPurchasing.BookPurchasing(req.body));
});

module.exports = router;
