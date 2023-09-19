/** @format */

const mongoose = require('mongoose');
const hobbiesModel = require('./hobbies.model');
const addressModel = require('./address.model');

const profileSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  complete_address: addressModel.schema,
  hobbies: [hobbiesModel.schema],
});

module.exports = mongoose.model('Profile', profileSchema);
