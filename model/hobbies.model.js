/** @format */

const mongoose = require('mongoose');

const hobbiesSchema = new mongoose.Schema({
  name_hobby: String,
});

module.exports = mongoose.model('Hobbies', hobbiesSchema);
