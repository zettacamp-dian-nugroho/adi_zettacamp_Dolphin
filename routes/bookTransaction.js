/** @format */

const express = require('express');
const router = express.Router();
const dataBookPurchasing = require('../data/bookPurchasing');

router.use(express.json());

router.get('/credit-date', (req, res) => {
  try {
    dataBookPurchasing.getCreditPrice(totalPrice, howLongCredit, dateOfCredit, biayaTambahan, tambahanPadaBulanKe, isAdditionalPrice).then((result) => {
      res.json(result);
    })
  } catch (err) {
    console.log(err);
  }
});

router.get('/data-transaction', (req, res) => {
  // res.json(dataBookPurchasing.dataBuku);
  try {
    dataBookPurchasing.DisplayDataTransaction().then((result) => {
      res.json(result);
    })
  } catch (err) {
    console.log(err);
  }
});

router.post('/process-transaction', (req, res) => {
  try {
    dataBookPurchasing.BookPurchasing(req.body).then((result) => {
      res.send(result);
    })
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
