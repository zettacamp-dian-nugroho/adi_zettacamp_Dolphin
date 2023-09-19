/** @format */

const mongoose = require('mongoose');

const urlServer = 'mongodb://localhost:27017/';
const dbName = 'testCRUD';

mongoose
  .connect(`${urlServer}${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Success connected to MongoDB!');
  })
  .catch((err) => {
    console.error(`Connection error to MongoDB ${err.name}`);
  });

const Profile = require('./model/profile.model');
const insertProfile = new Profile({
  full_name: 'Dian',
  date_of_birth: new Date(2000, 6, 11),
  complete_address: {address: 'Pandean VII, RT004/RW017, Sidoluhur, Godean, Sleman, DIY'},
  hobbies: [
    {
      name_hobby: 'Gitaran',
    },
    {
      name_hobby: 'Apa ya',
    },
  ],
});

// insertProfile
//   .save()
//   .then((result) => {
//     console.log(`Data saved! ${result}`);
//   })
//   .catch((err) => {
//     console.log(err.name);
//   });

// Profile.find({ full_name : "Dian" })
//   .then((users) => {
//     console.log(users);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Profile.findOne({ full_name : "Dian" })
//   .then((users) => {
//     console.log(users);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// db.profiles.insert({})
// db.profiles.insertMany([{}])
// db.profiles.find({})
// db.profiles.findOne({})
// db.profiles.update({})
// db.profiles.updateOne({})
// db.profiles.updateMany({})
// db.profiles.delete({})
// db.profiles.deleteMany({})

// new Date(currentYear, currentMonth, currentDate).toLocaleDateString('id-ID', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })

// db.profiles.updateOne({full_name: "Dian"}, {$set: {full_name:"Adi"}})

// db.profiles.updateOne({"_id" : ObjectId("65040ee2fbeb1a2ad886e0b0")},{$set:{"hobbies":[{"name_hobby":"Gitaran"}]}})

// db.collectionName.update(
//   { _id: ObjectId("documentId") }, // Specify the document to update by its _id
//   { $set: { "arrayField.$[elementFilter].fieldToBeUpdated": newValue } },
//   { arrayFilters: [{ "elementFilter.fieldName": "valueToMatch" }] }
// )