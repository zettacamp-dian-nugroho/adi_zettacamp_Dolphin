/** @format */

const express = require('express');
const router = express.Router();
const FunctionListSongs = require('../data/MainListSongs');
const jwt = require('../middleware/JWT');

router.use(express.json());

router.get('/generate-token', (req, res) => {
  try {
    const result = jwt.GenerateJWTToken(req.body);
    res.json({ result });
  } catch (err) {
    console.log(err);
  }
});

router.get('/check-token', (req, res) => {
  try {
    const result = jwt.VerfyJWTToken(req);
    res.json({ result });
  } catch (err) {
    console.log(err);
  }
});

router.get('/data-songs-by-artist', jwt.MiddlewareVerifyToken, (req, res) => {
  try {
    const result = FunctionListSongs.GroupByArtist();
    res.json({ message: result });
  } catch (err) {
    console.log(err);
  }
});

router.get('/data-songs-by-genre', jwt.MiddlewareVerifyToken, (req, res) => {
  try {
    const result = FunctionListSongs.GroupByGenre();
    res.json({ message: result });
  } catch (err) {
    console.log(err);
  }
});

router.get('/data-group-random-songs-under-one-hours', jwt.MiddlewareVerifyToken, (req, res) => {
  try {
    const result = FunctionListSongs.GroupRandomSongUnder60Minute();
    res.json({ message: result });
  } catch (err) {
    console.log(err);
  }
});

//Explore
router.get('/explore-data-songs-by-artist', jwt.MiddlewareVerifyToken, (req, res) => {
  try {
    const result = FunctionListSongs.ExploreGroupByArtist(req.body);
    res.json({ message: result });
  } catch (err) {
    console.log(err);
  }
});

router.get('/explore-data-songs-by-genre', jwt.MiddlewareVerifyToken, (req, res) => {
  try {
    const result = FunctionListSongs.ExploreGroupByGenre(req.body);
    res.json({ message: result });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
