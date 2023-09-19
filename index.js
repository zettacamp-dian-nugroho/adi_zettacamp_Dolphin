/** @format */

const express = require('express');
const app = express();
const port = 3000;

const RouterListSongs = require('./routes/ListSongs');

app.use(RouterListSongs);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
